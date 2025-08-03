# Contributing to Trading Journal App

Thank you for your interest in contributing to the Trading Journal App! We welcome contributions from everyone.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/trading-journal-app.git
   cd trading-journal-app
   ```
3. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Setup

### Prerequisites
- Docker & Docker Compose
- Node.js 16+ (for local development)
- Java 11+ (for local development)
- Git

### Running the Application
```bash
# Start with Docker (recommended)
docker-compose up --build

# Or run locally
# Backend
cd backend && ./gradlew bootRun

# Frontend (in another terminal)
cd frontend/my-react-app/harshsirnebanwaya && npm install && npm start
```

## Making Changes

### Code Style
- **Backend**: Follow standard Java conventions
- **Frontend**: Use ESLint and Prettier for formatting
- **Commits**: Use clear, descriptive commit messages

### Testing
- Test your changes locally before submitting
- Ensure both authentication methods work (Google OAuth & email/password)
- Test page refresh functionality
- Verify journal entries can be created, edited, and deleted

## Submitting Changes

1. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add: brief description of changes"
   ```

2. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Create a Pull Request** on GitHub with:
   - Clear title and description
   - Screenshots if UI changes
   - List of changes made

## Reporting Issues

When reporting bugs, please include:
- Steps to reproduce
- Expected vs actual behavior
- Browser/environment details
- Console errors (if any)

## Feature Requests

We welcome feature suggestions! Please:
- Check existing issues first
- Describe the use case
- Explain why it would be valuable

## Questions?

Feel free to open an issue for any questions about contributing!
