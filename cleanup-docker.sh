#!/bin/bash

echo "🧹 Cleaning up Docker environment..."

# Stop all running containers
echo "Stopping all containers..."
docker stop $(docker ps -aq) 2>/dev/null || echo "No running containers to stop"

# Remove all containers
echo "Removing all containers..."
docker rm $(docker ps -aq) 2>/dev/null || echo "No containers to remove"

# Remove all volumes (THIS WILL DELETE ALL PERSISTENT DATA)
echo "Removing all volumes..."
docker volume rm $(docker volume ls -q) 2>/dev/null || echo "No volumes to remove"

# Remove all images (optional - uncomment if you want to rebuild from scratch)
# echo "Removing all images..."
# docker rmi $(docker images -q) 2>/dev/null || echo "No images to remove"

# Clean up unused networks
echo "Cleaning up networks..."
docker network prune -f

# Clean up build cache
echo "Cleaning up build cache..."
docker builder prune -f

echo "✅ Docker environment cleaned up!"
echo "🔄 Now rebuild and start your containers"
