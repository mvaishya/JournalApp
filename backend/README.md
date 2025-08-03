# Journal Backend API

A Spring Boot REST API for managing trading journal entries.

## Features

- CRUD operations for journal entries
- User-based entry filtering
- Date range and symbol filtering
- Statistics endpoints
- H2 database for data persistence
- Docker support
- CORS enabled for frontend integration

## API Endpoints

### Journal Entries

- `GET /api/journal/user/{userId}` - Get all entries for a user
- `GET /api/journal/{id}` - Get entry by ID
- `POST /api/journal` - Create new entry
- `PUT /api/journal/{id}` - Update entry
- `DELETE /api/journal/{id}` - Delete entry

### Filtering

- `GET /api/journal/user/{userId}/symbol/{symbol}` - Get entries by symbol
- `GET /api/journal/user/{userId}/date-range?startDate=...&endDate=...` - Get entries by date range

### Statistics

- `GET /api/journal/user/{userId}/stats` - Get user statistics (entry count, total P&L)

### Health Check

- `GET /api/journal/health` - Service health check

## Running the Application

### Local Development

```bash
# Build and run
./gradlew bootRun

# The API will be available at http://localhost:8080
```

### Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build Docker image manually
docker build -t journal-backend .
docker run -p 8080:8080 journal-backend
```

### Testing

```bash
# Run tests
./gradlew test
```

## Database

- Development: H2 in-memory database
- Docker: H2 file-based database with persistent volume
- H2 Console available at http://localhost:8080/h2-console (development only)

## Configuration

- `application.properties` - Development configuration
- `application-docker.properties` - Docker configuration

## Data Model

```json
{
  "id": 1,
  "userId": "google-user-id",
  "entryTime": "2025-07-26T10:30:00",
  "symbol": "AAPL",
  "entry": 150.50,
  "stopLoss": 145.00,
  "positionSize": 100,
  "target": 160.00,
  "trailingStop": 148.00,
  "exitTime": "2025-07-26T15:30:00",
  "exit": 155.00,
  "pnl": 450.00,
  "setup": "Bullish breakout pattern",
  "createdAt": "2025-07-26T10:30:00",
  "updatedAt": "2025-07-26T15:30:00"
}
```
