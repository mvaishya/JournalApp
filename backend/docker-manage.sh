#!/bin/bash

# Journal Backend Docker Management Script

set -e

CONTAINER_NAME="journal-backend"
IMAGE_NAME="journal-backend"

show_help() {
    echo "Usage: $0 {build|run|stop|restart|logs|clean}"
    echo ""
    echo "Commands:"
    echo "  build    - Build the Docker image"
    echo "  run      - Run the container"
    echo "  stop     - Stop the container"
    echo "  restart  - Restart the container"
    echo "  logs     - Show container logs"
    echo "  clean    - Remove container and image"
    echo "  test     - Test the API endpoints"
}

build_image() {
    echo "Building Docker image..."
    docker build -t $IMAGE_NAME .
    echo "Image built successfully!"
}

run_container() {
    echo "Starting container..."
    docker run -d \
        --name $CONTAINER_NAME \
        -p 8080:8080 \
        -v journal_data:/data \
        $IMAGE_NAME
    echo "Container started! API available at http://localhost:8080"
}

stop_container() {
    echo "Stopping container..."
    docker stop $CONTAINER_NAME || true
    docker rm $CONTAINER_NAME || true
    echo "Container stopped!"
}

restart_container() {
    stop_container
    run_container
}

show_logs() {
    docker logs -f $CONTAINER_NAME
}

clean_all() {
    echo "Cleaning up..."
    docker stop $CONTAINER_NAME || true
    docker rm $CONTAINER_NAME || true
    docker rmi $IMAGE_NAME || true
    docker volume rm journal_data || true
    echo "Cleanup completed!"
}

test_api() {
    echo "Testing API endpoints..."
    echo "Health check:"
    curl -s http://localhost:8080/api/journal/health || echo "Failed to connect"
    echo -e "\n"
}

case "${1:-}" in
    build)
        build_image
        ;;
    run)
        run_container
        ;;
    stop)
        stop_container
        ;;
    restart)
        restart_container
        ;;
    logs)
        show_logs
        ;;
    clean)
        clean_all
        ;;
    test)
        test_api
        ;;
    *)
        show_help
        ;;
esac
