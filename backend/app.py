from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os
from dotenv import load_dotenv
import requests
import json
from datetime import datetime, timedelta
import re
from api_providers import get_all_providers, get_api_provider, search_providers, get_provider_categories
from config import config

# Load environment variables
load_dotenv()

# Get environment
env = os.environ.get('FLASK_ENV', 'production')

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(config[env])

# Initialize extensions
db = SQLAlchemy(app)

# Configure CORS based on environment
if env == 'production':
    CORS(app, origins=app.config['CORS_ORIGINS'])
else:
    CORS(app, origins=app.config['CORS_ORIGINS'])

# Database Models
class APIConnection(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    base_url = db.Column(db.String(500), nullable=False)
    auth_type = db.Column(db.String(50), nullable=False)  # 'api_key', 'bearer', 'basic', 'oauth'
    auth_data = db.Column(db.Text)  # JSON string containing auth credentials
    headers = db.Column(db.Text)  # JSON string for additional headers
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)

class QueryHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    api_connection_id = db.Column(db.Integer, db.ForeignKey('api_connection.id'), nullable=False)
    user_query = db.Column(db.Text, nullable=False)
    interpreted_query = db.Column(db.Text)
    api_endpoint = db.Column(db.String(500))
    response_data = db.Column(db.Text)
    status = db.Column(db.String(20), default='success')  # 'success', 'error', 'pending'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# AI Query Processor
class AIQueryProcessor:
    def __init__(self):
        self.openai_api_key = os.environ.get('OPENAI_API_KEY')
        self.providers = get_all_providers()
    
    def detect_api_provider(self, base_url):
        """Detect API provider based on base URL"""
        base_url_lower = base_url.lower()
        
        for provider_key, provider_config in self.providers.items():
            provider_url = provider_config['base_url'].lower()
            # Remove template variables for comparison
            provider_url_clean = re.sub(r'\{[^}]+\}', '', provider_url)
            
            if any(domain in base_url_lower for domain in [
                provider_url_clean.replace('https://', '').replace('http://', '').split('/')[0],
                provider_key
            ]):
                return provider_key, provider_config
        
        return None, None
    
    def extract_numbers(self, query):
        """Extract numbers from query text"""
        numbers = re.findall(r'\b\d+\b', query)
        return [int(n) for n in numbers]
    
    def extract_quoted_text(self, query):
        """Extract text within quotes"""
        matches = re.findall(r"'([^']*)'|\"([^\"]*)\"", query)
        return [match[0] or match[1] for match in matches]
    
    def extract_location(self, query):
        """Extract location from query"""
        # Common location patterns
        location_patterns = [
            r'(?:for|in|at|near)\s+([A-Za-z\s,]+?)(?:\s|$|,)',
            r'weather\s+(?:for|in|at|near)?\s*([A-Za-z\s,]+?)(?:\s|$)',
            r'temperature\s+(?:for|in|at|near)?\s*([A-Za-z\s,]+?)(?:\s|$)'
        ]
        
        for pattern in location_patterns:
            match = re.search(pattern, query, re.IGNORECASE)
            if match:
                return match.group(1).strip()
        return None
    
    def interpret_query(self, user_query, api_config):
        """
        Enhanced query interpretation using provider configurations
        """
        interpretation = {
            'endpoint': '',
            'method': 'GET',
            'params': {},
            'filters': {}
        }
        
        query_lower = user_query.lower()
        
        # Detect API provider
        provider_key, provider_config = self.detect_api_provider(api_config.base_url)
        
        if provider_config and 'endpoints' in provider_config:
            # Use provider-specific patterns
            endpoints = provider_config['endpoints']
            query_patterns = provider_config.get('query_patterns', {})
            
            # Match query patterns to endpoints
            best_match = None
            best_score = 0
            
            for endpoint_key, endpoint_path in endpoints.items():
                if endpoint_key in query_patterns:
                    patterns = query_patterns[endpoint_key]
                    score = sum(1 for pattern in patterns if pattern in query_lower)
                    if score > best_score:
                        best_score = score
                        best_match = (endpoint_key, endpoint_path)
            
            if best_match:
                endpoint_key, endpoint_path = best_match
                interpretation['endpoint'] = endpoint_path
                
                # Add provider-specific parameters
                self._add_provider_specific_params(
                    interpretation, query_lower, provider_key, endpoint_key
                )
        
        else:
            # Fallback to generic patterns
            self._interpret_generic_query(interpretation, query_lower, api_config)
        
        # Extract common parameters
        numbers = self.extract_numbers(user_query)
        if numbers:
            if 'limit' not in interpretation['params'] and 'per_page' not in interpretation['params']:
                interpretation['params']['per_page'] = numbers[0]
                interpretation['params']['limit'] = numbers[0]
        
        return interpretation
    
    def _add_provider_specific_params(self, interpretation, query_lower, provider_key, endpoint_key):
        """Add provider-specific parameters based on the API type"""
        
        if provider_key == 'github':
            if endpoint_key == 'commits':
                # GitHub commits parameters
                if 'since' in query_lower:
                    interpretation['params']['since'] = self._extract_date(query_lower)
                if 'author' in query_lower:
                    author = self._extract_after_keyword(query_lower, 'author')
                    if author:
                        interpretation['params']['author'] = author
                        
        elif provider_key == 'wordpress':
            if endpoint_key == 'posts':
                if 'search' in query_lower:
                    search_terms = self.extract_quoted_text(query_lower)
                    if search_terms:
                        interpretation['params']['search'] = search_terms[0]
                if 'category' in query_lower:
                    interpretation['params']['categories'] = self._extract_after_keyword(query_lower, 'category')
                if 'published' in query_lower:
                    interpretation['params']['status'] = 'publish'
                    
        elif provider_key in ['openweather', 'weatherapi']:
            location = self.extract_location(query_lower)
            if location:
                interpretation['params']['q'] = location
            if 'forecast' in query_lower:
                interpretation['endpoint'] = interpretation['endpoint'].replace('current', 'forecast')
                
        elif provider_key == 'twitter':
            if 'search' in query_lower:
                search_terms = self.extract_quoted_text(query_lower)
                if search_terms:
                    interpretation['params']['query'] = search_terms[0]
                    
        elif provider_key == 'spotify':
            if 'search' in query_lower:
                search_terms = self.extract_quoted_text(query_lower)
                if search_terms:
                    interpretation['params']['q'] = search_terms[0]
                if 'artist' in query_lower:
                    interpretation['params']['type'] = 'artist'
                elif 'album' in query_lower:
                    interpretation['params']['type'] = 'album'
                elif 'track' in query_lower:
                    interpretation['params']['type'] = 'track'
                    
        elif provider_key == 'youtube':
            if 'search' in query_lower:
                search_terms = self.extract_quoted_text(query_lower)
                if search_terms:
                    interpretation['params']['q'] = search_terms[0]
                interpretation['params']['part'] = 'snippet'
                
        elif provider_key == 'reddit':
            if 'subreddit' in query_lower:
                subreddit = self._extract_after_keyword(query_lower, 'subreddit')
                if subreddit:
                    interpretation['endpoint'] = f'/r/{subreddit}'
                    
        elif provider_key == 'newsapi':
            if 'search' in query_lower:
                search_terms = self.extract_quoted_text(query_lower)
                if search_terms:
                    interpretation['params']['q'] = search_terms[0]
            if 'country' in query_lower:
                country = self._extract_after_keyword(query_lower, 'country')
                if country:
                    interpretation['params']['country'] = country[:2].lower()
                    
    def _interpret_generic_query(self, interpretation, query_lower, api_config):
        """Fallback generic query interpretation"""
        
        # Generic REST patterns
        if any(word in query_lower for word in ['get', 'fetch', 'retrieve', 'show', 'list']):
            interpretation['method'] = 'GET'
        elif any(word in query_lower for word in ['create', 'add', 'post', 'new']):
            interpretation['method'] = 'POST'
        elif any(word in query_lower for word in ['update', 'edit', 'modify']):
            interpretation['method'] = 'PUT'
        elif any(word in query_lower for word in ['delete', 'remove']):
            interpretation['method'] = 'DELETE'
            
        # Generic endpoint patterns
        if any(word in query_lower for word in ['user', 'users', 'profile', 'account']):
            interpretation['endpoint'] = '/users'
        elif any(word in query_lower for word in ['post', 'posts', 'article', 'blog']):
            interpretation['endpoint'] = '/posts'
        elif any(word in query_lower for word in ['comment', 'comments']):
            interpretation['endpoint'] = '/comments'
        elif any(word in query_lower for word in ['data', 'all', 'list']):
            interpretation['endpoint'] = '/data'
        else:
            interpretation['endpoint'] = '/'
            
    def _extract_date(self, query):
        """Extract date from query"""
        # Simple date extraction - can be enhanced
        if 'today' in query:
            return datetime.now().isoformat()
        elif 'yesterday' in query:
            return (datetime.now() - timedelta(days=1)).isoformat()
        return None
        
    def _extract_after_keyword(self, query, keyword):
        """Extract text after a specific keyword"""
        pattern = f'{keyword}\\s+([\\w\\s]+?)(?:\\s|$)'
        match = re.search(pattern, query, re.IGNORECASE)
        return match.group(1).strip() if match else None

# Initialize AI processor
ai_processor = AIQueryProcessor()

# Routes
@app.route('/')
def index():
    return jsonify({'message': 'API Connector AI Backend is running!'})

@app.route('/api/connections', methods=['GET'])
def get_connections():
    connections = APIConnection.query.filter_by(is_active=True).all()
    return jsonify([{
        'id': conn.id,
        'name': conn.name,
        'base_url': conn.base_url,
        'auth_type': conn.auth_type,
        'created_at': conn.created_at.isoformat()
    } for conn in connections])

@app.route('/api/connections', methods=['POST'])
def create_connection():
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['name', 'base_url', 'auth_type']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Create new connection
    connection = APIConnection(
        name=data['name'],
        base_url=data['base_url'],
        auth_type=data['auth_type'],
        auth_data=json.dumps(data.get('auth_data', {})),
        headers=json.dumps(data.get('headers', {}))
    )
    
    db.session.add(connection)
    db.session.commit()
    
    return jsonify({
        'id': connection.id,
        'name': connection.name,
        'message': 'API connection created successfully'
    }), 201

@app.route('/api/connections/<int:connection_id>', methods=['DELETE'])
def delete_connection(connection_id):
    connection = APIConnection.query.get_or_404(connection_id)
    connection.is_active = False
    db.session.commit()
    return jsonify({'message': 'Connection deleted successfully'})

@app.route('/api/query', methods=['POST'])
def process_query():
    data = request.get_json()
    
    if 'query' not in data or 'connection_id' not in data:
        return jsonify({'error': 'Missing required fields: query and connection_id'}), 400
    
    # Get API connection
    connection = APIConnection.query.get_or_404(data['connection_id'])
    
    # Interpret the query
    user_query = data['query']
    interpretation = ai_processor.interpret_query(user_query, connection)
    
    # Build the API request
    url = connection.base_url.rstrip('/') + interpretation['endpoint']
    
    # Prepare authentication
    auth_data = json.loads(connection.auth_data) if connection.auth_data else {}
    headers = json.loads(connection.headers) if connection.headers else {}
    
    if connection.auth_type == 'api_key':
        if 'api_key' in auth_data and 'api_key_header' in auth_data:
            headers[auth_data['api_key_header']] = auth_data['api_key']
    elif connection.auth_type == 'bearer':
        if 'token' in auth_data:
            headers['Authorization'] = f"Bearer {auth_data['token']}"
    elif connection.auth_type == 'basic':
        # Basic auth would be handled by requests.auth
        pass
    
    try:
        # Make the API request
        if interpretation['method'] == 'GET':
            response = requests.get(url, headers=headers, params=interpretation['params'])
        else:
            response = requests.post(url, headers=headers, json=interpretation['params'])
        
        response.raise_for_status()
        response_data = response.json()
        
        # Save query history
        history = QueryHistory(
            api_connection_id=connection.id,
            user_query=user_query,
            interpreted_query=json.dumps(interpretation),
            api_endpoint=url,
            response_data=json.dumps(response_data),
            status='success'
        )
        db.session.add(history)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': response_data,
            'interpretation': interpretation,
            'query_id': history.id
        })
    
    except requests.exceptions.RequestException as e:
        # Save failed query
        history = QueryHistory(
            api_connection_id=connection.id,
            user_query=user_query,
            interpreted_query=json.dumps(interpretation),
            api_endpoint=url,
            response_data=str(e),
            status='error'
        )
        db.session.add(history)
        db.session.commit()
        
        return jsonify({
            'success': False,
            'error': str(e),
            'interpretation': interpretation
        }), 500

@app.route('/api/history', methods=['GET'])
def get_query_history():
    history = QueryHistory.query.order_by(QueryHistory.created_at.desc()).limit(50).all()
    return jsonify([{
        'id': h.id,
        'user_query': h.user_query,
        'api_endpoint': h.api_endpoint,
        'status': h.status,
        'created_at': h.created_at.isoformat()
    } for h in history])

@app.route('/api/test-connection', methods=['POST'])
def test_connection():
    data = request.get_json()
    
    # Test the API connection with intelligent endpoint detection
    try:
        base_url = data['base_url'].rstrip('/')
        auth_data = data.get('auth_data', {})
        headers = data.get('headers', {})
        
        # Set up authentication
        if data['auth_type'] == 'api_key' and 'api_key' in auth_data:
            headers[auth_data.get('api_key_header', 'X-API-Key')] = auth_data['api_key']
        elif data['auth_type'] == 'bearer' and 'token' in auth_data:
            headers['Authorization'] = f"Bearer {auth_data['token']}"
        
        # Detect API provider and use appropriate test endpoints
        provider_key = ai_processor.detect_api_provider(base_url)
        test_endpoints = []
        
        if provider_key == 'openweathermap':
            test_endpoints = ['/weather?q=London', '/data/2.5/weather?q=London']
        elif provider_key == 'github':
            test_endpoints = ['/user', '/repos', '/']
        elif provider_key == 'openai':
            test_endpoints = ['/models', '/v1/models']
        elif provider_key == 'stripe':
            test_endpoints = ['/charges', '/v1/charges']
        elif provider_key == 'newsapi':
            test_endpoints = ['/everything?q=test', '/v2/everything?q=test']
        elif provider_key == 'twitter':
            test_endpoints = ['/2/tweets/search/recent?query=test', '/1.1/statuses/user_timeline.json']
        elif provider_key == 'youtube':
            test_endpoints = ['/search?part=snippet&q=test', '/v3/search?part=snippet&q=test']
        elif provider_key == 'spotify':
            test_endpoints = ['/v1/search?q=test&type=track', '/search?q=test&type=track']
        else:
            # Generic test endpoints for unknown APIs
            test_endpoints = ['/', '/api', '/v1', '/health', '/status', '/ping']
        
        # Try each test endpoint
        last_error = None
        for endpoint in test_endpoints:
            try:
                test_url = base_url + endpoint
                response = requests.get(test_url, headers=headers, timeout=10)
                
                # Consider various success conditions
                if response.status_code in [200, 201, 202]:
                    return jsonify({
                        'success': True,
                        'status_code': response.status_code,
                        'test_endpoint': endpoint,
                        'response_size': len(response.content),
                        'message': f'Connection test successful! Tested endpoint: {endpoint}'
                    })
                elif response.status_code == 401:
                    return jsonify({
                        'success': False,
                        'status_code': response.status_code,
                        'test_endpoint': endpoint,
                        'error': 'Authentication failed - please check your API credentials'
                    }), 401
                elif response.status_code == 403:
                    return jsonify({
                        'success': False,
                        'status_code': response.status_code,
                        'test_endpoint': endpoint,
                        'error': 'Access forbidden - check API permissions and rate limits'
                    }), 403
                elif response.status_code == 404:
                    # Continue to next endpoint
                    last_error = f"Endpoint {endpoint} not found (404)"
                    continue
                else:
                    last_error = f"HTTP {response.status_code}: {response.text[:200]}"
                    continue
                    
            except requests.exceptions.Timeout:
                last_error = f"Timeout connecting to {endpoint}"
                continue
            except requests.exceptions.ConnectionError:
                last_error = f"Connection error to {endpoint}"
                continue
            except requests.exceptions.RequestException as e:
                last_error = f"Request error to {endpoint}: {str(e)}"
                continue
        
        # If we get here, all endpoints failed
        return jsonify({
            'success': False,
            'error': f'All test endpoints failed. Last error: {last_error}',
            'tested_endpoints': test_endpoints,
            'suggestion': 'Please verify the base URL and authentication credentials'
        }), 400
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Connection test failed: {str(e)}'
        }), 500

# API Provider endpoints
@app.route('/api/providers', methods=['GET'])
def get_providers():
    """Get all available API providers"""
    providers = get_all_providers()
    # Convert to list format for frontend
    provider_list = []
    for key, config in providers.items():
        provider_list.append({
            'key': key,
            'name': config['name'],
            'base_url': config['base_url'],
            'auth_type': config['auth_type'],
            'description': config['description'],
            'example_queries': config.get('example_queries', [])
        })
    return jsonify(provider_list)

@app.route('/api/providers/categories', methods=['GET'])
def get_provider_categories_endpoint():
    """Get providers organized by categories"""
    categories = get_provider_categories()
    providers = get_all_providers()
    
    # Add provider details to categories
    result = {}
    for category, provider_keys in categories.items():
        result[category] = []
        for key in provider_keys:
            if key in providers:
                config = providers[key]
                result[category].append({
                    'key': key,
                    'name': config['name'],
                    'description': config['description'],
                    'base_url': config['base_url'],
                    'auth_type': config['auth_type']
                })
    
    return jsonify(result)

@app.route('/api/providers/search', methods=['GET'])
def search_providers_endpoint():
    """Search providers by query"""
    query = request.args.get('q', '')
    if not query:
        return jsonify([])
    
    results = search_providers(query)
    return jsonify(results)

@app.route('/api/providers/<provider_key>', methods=['GET'])
def get_provider_details(provider_key):
    """Get detailed information about a specific provider"""
    provider = get_api_provider(provider_key)
    if not provider:
        return jsonify({'error': 'Provider not found'}), 404
    
    return jsonify({
        'key': provider_key,
        **provider
    })

# Settings Management
class UserSettings(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(50), default='default')  # For multi-user support later
    category = db.Column(db.String(50), nullable=False)
    setting_key = db.Column(db.String(100), nullable=False)
    setting_value = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class APIKey(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    service = db.Column(db.String(100), nullable=False)
    key_value = db.Column(db.Text, nullable=False)  # Encrypted in production
    status = db.Column(db.String(20), default='Active')
    last_used = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)

# Settings endpoints
@app.route('/api/settings', methods=['GET'])
def get_settings():
    """Get user settings"""
    settings = UserSettings.query.filter_by(user_id='default').all()
    
    # Organize settings by category
    result = {}
    for setting in settings:
        if setting.category not in result:
            result[setting.category] = {}
        
        # Parse JSON values
        try:
            import json
            result[setting.category][setting.setting_key] = json.loads(setting.setting_value)
        except:
            result[setting.category][setting.setting_key] = setting.setting_value
    
    # Default settings if none exist
    if not result:
        result = {
            'notifications': {
                'email': True,
                'push': False,
                'queryAlerts': True,
                'connectionStatus': True,
            },
            'appearance': {
                'darkMode': False,
                'compactMode': False,
                'language': 'en',
            },
            'privacy': {
                'analytics': True,
                'crashReports': True,
                'shareUsage': False,
            },
            'api': {
                'timeout': 30,
                'retries': 3,
                'caching': True,
            }
        }
    
    return jsonify(result)

@app.route('/api/settings', methods=['POST'])
def save_settings():
    """Save user settings"""
    data = request.get_json()
    
    try:
        # Delete existing settings for this user
        UserSettings.query.filter_by(user_id='default').delete()
        
        # Save new settings
        for category, settings in data.items():
            for key, value in settings.items():
                setting = UserSettings(
                    user_id='default',
                    category=category,
                    setting_key=key,
                    setting_value=json.dumps(value) if isinstance(value, (dict, list)) else str(value)
                )
                db.session.add(setting)
        
        db.session.commit()
        return jsonify({'message': 'Settings saved successfully'})
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/api-keys', methods=['GET'])
def get_api_keys():
    """Get user API keys"""
    keys = APIKey.query.filter_by(is_active=True).all()
    return jsonify([{
        'id': key.id,
        'name': key.name,
        'service': key.service,
        'status': key.status,
        'lastUsed': key.last_used.isoformat() if key.last_used else None,
        'created_at': key.created_at.isoformat()
    } for key in keys])

@app.route('/api/api-keys', methods=['POST'])
def create_api_key():
    """Create new API key"""
    data = request.get_json()
    
    required_fields = ['name', 'service', 'key_value']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    api_key = APIKey(
        name=data['name'],
        service=data['service'],
        key_value=data['key_value'],  # In production, encrypt this
        status='Active'
    )
    
    db.session.add(api_key)
    db.session.commit()
    
    return jsonify({
        'id': api_key.id,
        'message': 'API key created successfully'
    }), 201

@app.route('/api/api-keys/<int:key_id>', methods=['PUT'])
def update_api_key(key_id):
    """Update API key"""
    key = APIKey.query.get_or_404(key_id)
    data = request.get_json()
    
    if 'name' in data:
        key.name = data['name']
    if 'service' in data:
        key.service = data['service']
    if 'key_value' in data:
        key.key_value = data['key_value']
    if 'status' in data:
        key.status = data['status']
    
    db.session.commit()
    return jsonify({'message': 'API key updated successfully'})

@app.route('/api/api-keys/<int:key_id>', methods=['DELETE'])
def delete_api_key(key_id):
    """Delete API key"""
    key = APIKey.query.get_or_404(key_id)
    key.is_active = False
    db.session.commit()
    return jsonify({'message': 'API key deleted successfully'})

@app.route('/api/api-keys/<int:key_id>/test', methods=['POST'])
def test_api_key(key_id):
    """Test API key functionality"""
    key = APIKey.query.get_or_404(key_id)
    
    try:
        # Update last used timestamp
        key.last_used = datetime.utcnow()
        db.session.commit()
        
        # Test the key based on service
        if key.service.lower() == 'openai':
            headers = {'Authorization': f'Bearer {key.key_value}'}
            response = requests.get('https://api.openai.com/v1/models', headers=headers, timeout=10)
        elif key.service.lower() == 'github':
            headers = {'Authorization': f'token {key.key_value}'}
            response = requests.get('https://api.github.com/user', headers=headers, timeout=10)
        elif key.service.lower() == 'stripe':
            headers = {'Authorization': f'Bearer {key.key_value}'}
            response = requests.get('https://api.stripe.com/v1/charges', headers=headers, timeout=10)
        else:
            return jsonify({'error': 'API key testing not implemented for this service'}), 400
        
        if response.status_code == 200:
            key.status = 'Active'
            db.session.commit()
            return jsonify({
                'success': True,
                'message': f'{key.service} API key is working correctly'
            })
        else:
            key.status = 'Invalid'
            db.session.commit()
            return jsonify({
                'success': False,
                'error': f'API key test failed with status {response.status_code}'
            }), 400
    
    except Exception as e:
        key.status = 'Error'
        db.session.commit()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# Create tables safely (only if they don't exist)
with app.app_context():
    try:
        # Check if tables exist before creating
        from sqlalchemy import inspect
        inspector = inspect(db.engine)
        existing_tables = inspector.get_table_names()
        
        if not existing_tables:
            db.create_all()
            print("✅ Database tables created successfully")
        else:
            print(f"✅ Database already initialized with {len(existing_tables)} tables")
    except Exception as e:
        print(f"⚠️  Database initialization warning: {e}")

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    host = os.environ.get('HOST', '0.0.0.0')
    debug = env != 'production'
    app.run(debug=debug, host=host, port=port) 