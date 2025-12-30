#!/bin/bash

# Security setup script
echo "Setting up TDO Socket Docker with security improvements..."

# Check if .env files exist
if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "Please update .env file with your secure credentials!"
fi

# Stop and clean up
docker-compose stop || true
docker-compose down || true

# Build with no cache for security
docker-compose build --no-cache

# Start services
docker-compose up -d

# Clean up unused images
docker system prune -f

echo "Setup complete! Please ensure you have updated all passwords in .env files."