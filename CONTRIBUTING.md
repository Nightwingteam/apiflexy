# Contributing to API Connector AI 🤝

We love your input! We want to make contributing to API Connector AI as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

## Pull Requests

Pull requests are the best way to propose changes to the codebase. We actively welcome your pull requests:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.
6. Issue that pull request!

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- Git

### Local Development

1. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/api-connector-ai.git
   cd api-connector-ai
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd backend && source venv/bin/activate && python app.py
   
   # Terminal 2 - Frontend
   cd frontend && npm start
   ```

## Code Style

### Frontend (React/JavaScript)

- Use ESLint and Prettier for code formatting
- Follow React best practices and hooks patterns
- Use Material-UI components consistently
- Write meaningful component and variable names

### Backend (Python/Flask)

- Follow PEP 8 style guide
- Use type hints where appropriate
- Write docstrings for functions and classes
- Keep functions small and focused

### General Guidelines

- Write clear, concise commit messages
- Keep pull requests focused on a single feature/fix
- Add comments for complex logic
- Update documentation when needed

## Testing

### Frontend Testing

```bash
cd frontend
npm test
```

### Backend Testing

```bash
cd backend
source venv/bin/activate
python -m pytest
```

## Reporting Bugs

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](https://github.com/yourusername/api-connector-ai/issues).

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Feature Requests

We welcome feature requests! Please provide:

- Clear description of the feature
- Use case and motivation
- Possible implementation approach
- Any relevant examples or mockups

## Adding New API Providers

To add support for a new API provider:

1. **Backend**: Add provider configuration in the providers module
2. **Frontend**: Update the provider list and categories
3. **Documentation**: Add usage examples
4. **Testing**: Ensure connection testing works

Example provider configuration:
```python
{
    "name": "New API",
    "category": "Social Media",
    "auth_type": "api_key",
    "base_url": "https://api.example.com/v1",
    "endpoints": {
        "posts": "/posts",
        "users": "/users"
    }
}
```

## Documentation

- Update README.md for significant changes
- Add inline comments for complex code
- Update API documentation for backend changes
- Include examples for new features

## Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

### Communication

- Use clear, descriptive issue titles
- Provide context in discussions
- Be patient with response times
- Help others when you can

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special thanks in project documentation

## Questions?

Feel free to reach out:
- Open a [GitHub Discussion](https://github.com/yourusername/api-connector-ai/discussions)
- Join our [Discord community](https://discord.gg/apiconnector)
- Email: contribute@apiconnector.ai

Thank you for contributing to API Connector AI! 🚀 