from importlib import import_module

# Import the Flask app from backend.app
backend_app = import_module('backend.app')

# Vercel will look for a top-level variable called "app"
# The imported module already defines `app`, so just re-export it.
app = backend_app.app  # type: ignore

# Optional: expose `handler` for compatibility with some deployment runtimes
def handler(environ, start_response):  # pragma: no cover
    return app(environ, start_response) 