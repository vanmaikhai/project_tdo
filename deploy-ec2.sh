#!/bin/bash

# EC2 Deployment Script
set -e

echo "🚀 Starting EC2 deployment..."

# Variables
APP_NAME="tdo-socket-app"
DEPLOY_DIR="/home/ubuntu/tdo-app"
BACKUP_DIR="/home/ubuntu/backups"

# Create directories
mkdir -p $DEPLOY_DIR
mkdir -p $BACKUP_DIR

# Backup current deployment
if [ -d "$DEPLOY_DIR" ]; then
    echo "📦 Creating backup..."
    tar -czf "$BACKUP_DIR/backup-$(date +%Y%m%d-%H%M%S).tar.gz" -C $DEPLOY_DIR . || true
fi

# Navigate to deployment directory
cd $DEPLOY_DIR

# Update system packages
echo "🔄 Updating system..."
sudo apt-get update -qq

# Install Docker if not present
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker ubuntu
    rm get-docker.sh
fi

# Install Docker Compose if not present
if ! command -v docker-compose &> /dev/null; then
    echo "🐳 Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Pull latest images
echo "📥 Pulling latest images..."
docker-compose -f docker-compose.prod.yml pull

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down || true

# Start new containers
echo "🚀 Starting new containers..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 60

# Health checks
echo "🏥 Running health checks..."
curl -f http://localhost:8088/health || {
    echo "❌ Health check failed!"
    docker-compose -f docker-compose.prod.yml logs
    exit 1
}

# Clean up old images
echo "🧹 Cleaning up old images..."
docker image prune -f

# Show running containers
echo "📊 Running containers:"
docker-compose -f docker-compose.prod.yml ps

echo "✅ Deployment completed successfully!"
echo "🌐 Application is available at: http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):8088"
