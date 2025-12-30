#!/bin/bash

echo "🚀 Building optimized Docker images..."

# Build backend with multi-stage
echo "📦 Building backend..."
docker build -t tdo-backend:latest ./tdo-be --target production

# Build frontend with multi-stage  
echo "📦 Building frontend..."
docker build -t tdo-frontend:latest ./tdo-fe --target production

# Show image sizes
echo "📊 Image sizes:"
docker images | grep tdo-

echo "✅ Build complete!"
echo "💡 To run: docker-compose up -d"
