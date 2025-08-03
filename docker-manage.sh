#!/bin/bash

# Journal Application Docker Management Script

set -e

show_help() {
    echo "Usage: $0 {start|stop|restart|logs|clean|frontend|backend}"
    echo ""
    echo "Commands:"
    echo "  start     - Start both frontend and backend containers"
    echo "  stop      - Stop all containers"
    echo "  restart   - Restart all containers"
    echo "  logs      - Show logs for all containers"
    echo "  clean     - Remove all containers and images"
    echo "  frontend  - Build and run only frontend container"
    echo "  backend   - Build and run only backend container"
    echo "  build     - Build all images without starting"
}

start_all() {
    echo "🚀 Starting Journal Application..."
    docker-compose up --build -d
    echo ""
    echo "✅ Application started successfully!"
    echo ""
    echo "📱 Frontend: http://localhost:3000"
    echo "🔧 Backend API: http://localhost:8081"
    echo "🗄️  H2 Console: http://localhost:8081/h2-console"
    echo ""
    echo "📊 View logs: ./docker-manage.sh logs"
}

stop_all() {
    echo "🛑 Stopping Journal Application..."
    docker-compose down
    echo "✅ Application stopped successfully!"
}

restart_all() {
    echo "🔄 Restarting Journal Application..."
    docker-compose down
    docker-compose up --build -d
    echo "✅ Application restarted successfully!"
}

show_logs() {
    echo "📊 Showing application logs..."
    docker-compose logs -f
}

clean_all() {
    echo "🧹 Cleaning up Journal Application..."
    docker-compose down --rmi all --volumes --remove-orphans
    echo "✅ Cleanup completed!"
}

frontend_only() {
    echo "📱 Starting Frontend only..."
    docker-compose up --build frontend -d
    echo "✅ Frontend started at http://localhost:3000"
}

backend_only() {
    echo "🔧 Starting Backend only..."
    docker-compose up --build backend -d
    echo "✅ Backend started at http://localhost:8081"
}

build_only() {
    echo "🔨 Building all images..."
    docker-compose build
    echo "✅ All images built successfully!"
}

case "${1:-}" in
    start)
        start_all
        ;;
    stop)
        stop_all
        ;;
    restart)
        restart_all
        ;;
    logs)
        show_logs
        ;;
    clean)
        clean_all
        ;;
    frontend)
        frontend_only
        ;;
    backend)
        backend_only
        ;;
    build)
        build_only
        ;;
    *)
        show_help
        ;;
esac
