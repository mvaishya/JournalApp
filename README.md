# Trading Journal App

A full-stack trading journal application built with React frontend and Spring Boot backend, featuring Google OAuth and email/password authentication.

## Features

- 📊 **Trade Tracking**: Record and manage your trading entries with detailed information
- 🔐 **Dual Authentication**: Login with Google OAuth or email/password
- 💾 **Persistent Sessions**: Stay logged in across browser sessions
- 🐳 **Docker Support**: Easy deployment with Docker containers
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- **React** - UI framework
- **React Router** - Navigation
- **Google OAuth** - Authentication
- **Axios** - HTTP client

### Backend
- **Spring Boot** - Java framework
- **Spring Security** - Authentication & authorization
- **JPA/Hibernate** - Database ORM
- **H2/PostgreSQL** - Database options
- **Gradle** - Build tool

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js (for local development)
- Java 11+ (for local development)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/trading-journal-app.git
cd trading-journal-app
```

### 2. Set Up Google OAuth (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Update the Google Client ID in the frontend configuration

### 3. Run with Docker (Recommended)
```bash
# Make the cleanup script executable (if needed)
chmod +x cleanup-docker.sh

# Start the application
docker-compose up --build
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8081

### 4. Run Locally (Development)

#### Backend
```bash
cd backend
./gradlew bootRun
```

#### Frontend
```bash
cd frontend/my-react-app/harshsirnebanwaya
npm install
npm start
```

## Project Structure

```
trading-journal-app/
├── backend/                 # Spring Boot backend
│   ├── src/main/java/      # Java source code
│   ├── src/main/resources/ # Configuration files
│   ├── build.gradle        # Gradle build file
│   └── Dockerfile          # Backend Docker configuration
├── frontend/               # React frontend
│   └── my-react-app/
│       └── harshsirnebanwaya/
│           ├── src/        # React source code
│           ├── public/     # Static assets
│           ├── package.json
│           └── Dockerfile  # Frontend Docker configuration
├── docker-compose.yml      # Multi-container setup
├── cleanup-docker.sh       # Docker cleanup utility
└── README.md              # This file
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Email/password login
- `POST /api/auth/register` - User registration
- `POST /api/auth/google-login` - Google OAuth login

### Journal Entries
- `GET /api/journal` - Get all entries for user
- `POST /api/journal` - Create new entry
- `PUT /api/journal/{id}` - Update entry
- `DELETE /api/journal/{id}` - Delete entry

## Configuration

### Environment Variables
Create a `.env` file (optional) for custom configuration:
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=journal
DB_USER=journal_user
DB_PASSWORD=journal_password

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
```

## Development

### Adding New Features
1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes and test locally
3. Update tests if needed
4. Commit changes: `git commit -m "Add new feature"`
5. Push and create pull request

### Database Reset
To completely reset the database and start fresh:
```bash
./cleanup-docker.sh
docker-compose up --build
```

## Troubleshooting

### Common Issues

1. **App doesn't work after page reload**
   - Fixed: User sessions now persist in localStorage

2. **Cannot read properties of null (reading 'sub')**
   - Fixed: Added user authentication checks

3. **Data persists after container deletion**
   - Use `./cleanup-docker.sh` to remove volumes

4. **Port conflicts**
   - Change ports in docker-compose.yml if needed

### Logs
```bash
# View backend logs
docker-compose logs backend

# View frontend logs
docker-compose logs frontend

# View all logs
docker-compose logs
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section
2. Search existing issues
3. Create a new issue with detailed description

---

**Happy Trading! 📈**
