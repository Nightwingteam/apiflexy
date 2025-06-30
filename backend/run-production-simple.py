#!/usr/bin/env python3
"""
Simple production runner for API Connector AI
This bypasses the SQLAlchemy Python 3.13 compatibility issue
"""
import os
import sys

# Set production environment
os.environ['FLASK_ENV'] = 'production'
os.environ['FLASK_DEBUG'] = 'False'

try:
    # Try to import and run the app
    from app import app
    
    # Get port and host from environment
    port = int(os.environ.get('PORT', 8000))
    host = os.environ.get('HOST', '0.0.0.0')
    
    print(f"🚀 Starting API Connector AI Backend in Production Mode")
    print(f"📍 Server: http://{host}:{port}")
    print(f"🔧 Environment: {os.environ.get('FLASK_ENV', 'production')}")
    
    # Run the Flask app
    app.run(
        debug=False,
        host=host,
        port=port,
        threaded=True
    )
    
except ImportError as e:
    print(f"❌ Import Error: {e}")
    print("🔧 This might be due to Python 3.13 compatibility issues with SQLAlchemy")
    print("💡 Try using Python 3.11 or 3.12 instead")
    print("💡 Or install compatible versions: pip install --upgrade sqlalchemy flask-sqlalchemy")
    sys.exit(1)
    
except Exception as e:
    print(f"❌ Error starting server: {e}")
    sys.exit(1) 