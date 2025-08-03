# Journal Trading Application - Docker Setup

This project contains a React frontend and Spring Boot backend that can be run with Docker.

## Prerequisites

- Docker Desktop installed and running
- Ports 3000 and 8081 available on your machine

## Quick Start

### Option 1: Run Everything with Docker Compose

```bash
# Start both frontend and backend
./docker-manage.sh start

# View logs
./docker-manage.sh logs

# Stop everything
./docker-manage.sh stop
```

### Option 2: Run Frontend Only in Docker

```bash
# Navigate to frontend directory
cd frontend/my-react-app/harshsirnebanwaya

# Build and run frontend container
docker build -t journal-frontend .
docker run -p 3000:80 journal-frontend
```

### Option 3: Run Individual Services

```bash
# Frontend only
./docker-manage.sh frontend

# Backend only  
./docker-manage.sh backend
```

## Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8081
- **H2 Database Console**: http://localhost:8081/h2-console

## Development Mode (Without Docker)

### Frontend
```bash
cd frontend/my-react-app/harshsirnebanwaya
npm install
npm start  # Runs on http://localhost:3000
```

### Backend
```bash
cd backend
./gradlew bootRun  # Runs on http://localhost:8081
```

## Docker Commands Reference

```bash
# Build all images
./docker-manage.sh build

# Start application
./docker-manage.sh start

# View logs
./docker-manage.sh logs

# Restart application
./docker-manage.sh restart

# Stop application
./docker-manage.sh stop

# Clean up (remove containers and images)
./docker-manage.sh clean
```

## Troubleshooting

1. **Port conflicts**: Make sure ports 3000 and 8081 are not in use
2. **Docker not running**: Start Docker Desktop before running commands
3. **Build issues**: Try `./docker-manage.sh clean` and then `./docker-manage.sh start`

## Database

The backend uses H2 database:
- **Development**: In-memory database
- **Docker**: File-based database with persistent volume
- **Access**: http://localhost:8081/h2-console
  - JDBC URL: `jdbc:h2:file:/data/journaldb` (Docker) or `jdbc:h2:mem:journaldb` (Development)
  - Username: `sa`
  - Password: (leave empty)
