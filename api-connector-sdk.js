/**
 * API Connector AI - JavaScript SDK
 * Easy integration for HTML websites
 * 
 * Usage:
 * 1. Include this script in your HTML: <script src="https://yourdomain.com/api-connector-sdk.js"></script>
 * 2. Initialize: const apiConnector = new APIConnectorAI('your-api-key');
 * 3. Make queries: apiConnector.query('Get weather in New York').then(data => { ... });
 */

class APIConnectorAI {
    constructor(apiKey, options = {}) {
        this.apiKey = apiKey;
        this.baseUrl = options.baseUrl || window.location.origin;
        this.debug = options.debug || false;
        this.cache = new Map();
        this.cacheExpiry = options.cacheExpiry || 300000; // 5 minutes default
        
        // Initialize event system
        this.events = {};
        
        // Auto-detect and bind data attributes
        this.bindDataAttributes();
        
        this.log('API Connector AI SDK initialized');
    }

    /**
     * Make a natural language query to the API Connector
     */
    async query(naturalLanguageQuery, options = {}) {
        try {
            const cacheKey = `query_${naturalLanguageQuery}`;
            
            // Check cache first
            if (!options.skipCache && this.cache.has(cacheKey)) {
                const cached = this.cache.get(cacheKey);
                if (Date.now() - cached.timestamp < this.cacheExpiry) {
                    this.log('Returning cached result for:', naturalLanguageQuery);
                    return cached.data;
                }
            }

            this.log('Making query:', naturalLanguageQuery);
            
            const response = await fetch(`${this.baseUrl}/api/query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    query: naturalLanguageQuery,
                    connection_id: options.connectionId
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            // Cache the result
            this.cache.set(cacheKey, {
                data: data,
                timestamp: Date.now()
            });
            
            // Emit success event
            this.emit('querySuccess', { query: naturalLanguageQuery, data });
            
            return data;

        } catch (error) {
            this.log('Query error:', error);
            this.emit('queryError', { query: naturalLanguageQuery, error });
            throw error;
        }
    }

    /**
     * Get all available API connections
     */
    async getConnections() {
        try {
            const response = await fetch(`${this.baseUrl}/api/connections`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            this.log('Error fetching connections:', error);
            throw error;
        }
    }

    /**
     * Get available API providers
     */
    async getProviders(category = null) {
        try {
            let url = `${this.baseUrl}/api/providers`;
            if (category) {
                url += `?category=${encodeURIComponent(category)}`;
            }

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            this.log('Error fetching providers:', error);
            throw error;
        }
    }

    /**
     * Auto-bind elements with data-api-* attributes
     */
    bindDataAttributes() {
        // Bind elements with data-api-query attribute
        document.addEventListener('DOMContentLoaded', () => {
            this.bindQueryElements();
            this.bindButtonElements();
            this.bindFormElements();
        });
    }

    /**
     * Bind elements with data-api-query for automatic data loading
     */
    bindQueryElements() {
        const elements = document.querySelectorAll('[data-api-query]');
        
        elements.forEach(async (element) => {
            const query = element.getAttribute('data-api-query');
            const connectionId = element.getAttribute('data-connection-id');
            const template = element.getAttribute('data-template');
            const autoLoad = element.getAttribute('data-auto-load') !== 'false';
            
            if (autoLoad) {
                try {
                    const data = await this.query(query, { connectionId });
                    this.renderData(element, data, template);
                } catch (error) {
                    this.renderError(element, error);
                }
            }
        });
    }

    /**
     * Bind buttons with data-api-action
     */
    bindButtonElements() {
        const buttons = document.querySelectorAll('[data-api-action]');
        
        buttons.forEach((button) => {
            button.addEventListener('click', async (event) => {
                event.preventDefault();
                
                const action = button.getAttribute('data-api-action');
                const query = button.getAttribute('data-api-query');
                const targetSelector = button.getAttribute('data-target');
                const connectionId = button.getAttribute('data-connection-id');
                
                if (action === 'query' && query) {
                    const target = targetSelector ? document.querySelector(targetSelector) : button.nextElementSibling;
                    
                    try {
                        button.disabled = true;
                        button.textContent = 'Loading...';
                        
                        const data = await this.query(query, { connectionId });
                        
                        if (target) {
                            this.renderData(target, data);
                        }
                        
                    } catch (error) {
                        if (target) {
                            this.renderError(target, error);
                        }
                    } finally {
                        button.disabled = false;
                        button.textContent = button.getAttribute('data-original-text') || 'Query API';
                    }
                }
            });
            
            // Store original button text
            button.setAttribute('data-original-text', button.textContent);
        });
    }

    /**
     * Bind forms with data-api-form
     */
    bindFormElements() {
        const forms = document.querySelectorAll('[data-api-form]');
        
        forms.forEach((form) => {
            form.addEventListener('submit', async (event) => {
                event.preventDefault();
                
                const formData = new FormData(form);
                const query = formData.get('query') || form.getAttribute('data-api-query');
                const targetSelector = form.getAttribute('data-target');
                const connectionId = form.getAttribute('data-connection-id');
                
                if (query) {
                    const target = targetSelector ? document.querySelector(targetSelector) : form.nextElementSibling;
                    
                    try {
                        const submitBtn = form.querySelector('[type="submit"]');
                        if (submitBtn) {
                            submitBtn.disabled = true;
                            submitBtn.textContent = 'Processing...';
                        }
                        
                        const data = await this.query(query, { connectionId });
                        
                        if (target) {
                            this.renderData(target, data);
                        }
                        
                    } catch (error) {
                        if (target) {
                            this.renderError(target, error);
                        }
                    } finally {
                        const submitBtn = form.querySelector('[type="submit"]');
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.textContent = 'Submit';
                        }
                    }
                }
            });
        });
    }

    /**
     * Render data in an element
     */
    renderData(element, data, template = null) {
        if (template) {
            element.innerHTML = this.applyTemplate(template, data);
        } else if (Array.isArray(data.result)) {
            element.innerHTML = this.renderList(data.result);
        } else if (typeof data.result === 'object') {
            element.innerHTML = this.renderObject(data.result);
        } else {
            element.innerHTML = `<div class="api-result">${data.result}</div>`;
        }
        
        element.classList.add('api-loaded');
        element.classList.remove('api-error', 'api-loading');
    }

    /**
     * Render error in an element
     */
    renderError(element, error) {
        element.innerHTML = `<div class="api-error">Error: ${error.message}</div>`;
        element.classList.add('api-error');
        element.classList.remove('api-loaded', 'api-loading');
    }

    /**
     * Apply template to data
     */
    applyTemplate(template, data) {
        return template.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
            return this.getNestedValue(data, path.trim()) || '';
        });
    }

    /**
     * Get nested value from object using dot notation
     */
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, obj);
    }

    /**
     * Render array as HTML list
     */
    renderList(items) {
        if (!items || items.length === 0) {
            return '<div class="api-empty">No data available</div>';
        }

        const listItems = items.slice(0, 10).map(item => {
            if (typeof item === 'object') {
                return `<li class="api-list-item">${this.renderObject(item)}</li>`;
            } else {
                return `<li class="api-list-item">${item}</li>`;
            }
        }).join('');

        return `<ul class="api-list">${listItems}</ul>`;
    }

    /**
     * Render object as HTML
     */
    renderObject(obj) {
        if (!obj) return '<div class="api-empty">No data</div>';

        const entries = Object.entries(obj).slice(0, 5);
        const items = entries.map(([key, value]) => {
            const displayValue = typeof value === 'object' ? 
                JSON.stringify(value).substring(0, 100) + '...' : 
                String(value).substring(0, 200);
            return `<div class="api-item"><strong>${key}:</strong> ${displayValue}</div>`;
        }).join('');

        return `<div class="api-object">${items}</div>`;
    }

    /**
     * Event system
     */
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }

    /**
     * Utility methods
     */
    log(...args) {
        if (this.debug) {
            console.log('[API Connector AI]', ...args);
        }
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
        this.log('Cache cleared');
    }

    /**
     * Set cache expiry time
     */
    setCacheExpiry(milliseconds) {
        this.cacheExpiry = milliseconds;
        this.log('Cache expiry set to', milliseconds, 'ms');
    }
}

// Auto-initialize if API key is provided via data attribute
document.addEventListener('DOMContentLoaded', () => {
    const scriptTag = document.querySelector('script[data-api-key]');
    if (scriptTag) {
        const apiKey = scriptTag.getAttribute('data-api-key');
        const baseUrl = scriptTag.getAttribute('data-base-url');
        const debug = scriptTag.getAttribute('data-debug') === 'true';
        
        window.apiConnector = new APIConnectorAI(apiKey, { baseUrl, debug });
    }
});

// Add default CSS styles
const style = document.createElement('style');
style.textContent = `
    .api-result, .api-error, .api-loading, .api-empty {
        padding: 10px;
        margin: 10px 0;
        border-radius: 4px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .api-result {
        background-color: #f8f9fa;
        border: 1px solid #dee2e6;
    }
    
    .api-error {
        background-color: #f8d7da;
        border: 1px solid #f5c6cb;
        color: #721c24;
    }
    
    .api-loading {
        background-color: #d1ecf1;
        border: 1px solid #bee5eb;
        color: #0c5460;
    }
    
    .api-empty {
        background-color: #fff3cd;
        border: 1px solid #ffeaa7;
        color: #856404;
    }
    
    .api-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    
    .api-list-item {
        padding: 8px;
        margin: 4px 0;
        background-color: #ffffff;
        border: 1px solid #e9ecef;
        border-radius: 3px;
    }
    
    .api-object .api-item {
        margin: 4px 0;
        padding: 4px 0;
        border-bottom: 1px solid #eee;
    }
    
    .api-object .api-item:last-child {
        border-bottom: none;
    }
    
    .api-object strong {
        color: #495057;
    }
    
    [data-api-action] {
        cursor: pointer;
    }
    
    [data-api-action]:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APIConnectorAI;
} 