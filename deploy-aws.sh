#!/bin/bash

# AWS Deployment Script
set -e

echo "🚀 Starting AWS deployment..."

# Variables
STACK_NAME="tdo-socket-app"
REGION="ap-southeast-1"
ECR_REPO="tdo-socket-app-backend"

# Deploy infrastructure
echo "🏗️ Deploying infrastructure..."
aws cloudformation deploy \
  --template-file infrastructure.yml \
  --stack-name $STACK_NAME \
  --capabilities CAPABILITY_IAM \
  --region $REGION

# Get stack outputs
echo "📋 Getting stack outputs..."
S3_BUCKET=$(aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --query 'Stacks[0].Outputs[?OutputKey==`FrontendBucketName`].OutputValue' \
  --output text \
  --region $REGION)

CLOUDFRONT_ID=$(aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontDistributionId`].OutputValue' \
  --output text \
  --region $REGION)

ECS_CLUSTER=$(aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --query 'Stacks[0].Outputs[?OutputKey==`ECSClusterName`].OutputValue' \
  --output text \
  --region $REGION)

ECS_SERVICE=$(aws cloudformation describe-stacks \
  --stack-name $STACK_NAME \
  --query 'Stacks[0].Outputs[?OutputKey==`ECSServiceName`].OutputValue' \
  --output text \
  --region $REGION)

# Create ECR repository if not exists
echo "🐳 Setting up ECR repository..."
aws ecr describe-repositories --repository-names $ECR_REPO --region $REGION || \
aws ecr create-repository --repository-name $ECR_REPO --region $REGION

# Get ECR registry URL
ECR_REGISTRY=$(aws sts get-caller-identity --query Account --output text).dkr.ecr.$REGION.amazonaws.com

# Deploy Frontend
echo "🌐 Deploying frontend to S3/CloudFront..."
cd tdo-fe
npm ci --silent
REACT_APP_BACKEND_URL=https://api.yourdomain.com npm run build
aws s3 sync build/ s3://$S3_BUCKET/ --delete --cache-control max-age=31536000,public
aws s3 cp build/index.html s3://$S3_BUCKET/index.html --cache-control no-cache,no-store,must-revalidate
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"
cd ..

# Deploy Backend
echo "🚀 Deploying backend to ECS..."
cd tdo-be
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ECR_REGISTRY
docker build -t $ECR_REPO:latest --target production .
docker tag $ECR_REPO:latest $ECR_REGISTRY/$ECR_REPO:latest
docker push $ECR_REGISTRY/$ECR_REPO:latest

# Update ECS service
aws ecs update-service \
  --cluster $ECS_CLUSTER \
  --service $ECS_SERVICE \
  --force-new-deployment \
  --region $REGION

# Wait for deployment
echo "⏳ Waiting for ECS deployment to complete..."
aws ecs wait services-stable \
  --cluster $ECS_CLUSTER \
  --services $ECS_SERVICE \
  --region $REGION

cd ..

echo "✅ Deployment completed successfully!"
echo "🌐 Frontend: https://$(aws cloudfront get-distribution --id $CLOUDFRONT_ID --query 'Distribution.DomainName' --output text)"
echo "🚀 Backend: Deployed to ECS cluster $ECS_CLUSTER"
