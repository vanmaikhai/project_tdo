# Jenkins Credentials Setup for AWS Deployment

## Required Credentials in Jenkins

### 1. ECR Registry
- **ID**: `ecr-registry`
- **Type**: Secret text
- **Secret**: Your ECR registry URL (e.g., `123456789.dkr.ecr.ap-southeast-1.amazonaws.com`)

### 2. S3 Bucket Name
- **ID**: `s3-bucket-name`
- **Type**: Secret text
- **Secret**: Your S3 bucket name for frontend (e.g., `tdo-frontend-bucket`)

### 3. CloudFront Distribution ID
- **ID**: `cloudfront-distribution-id`
- **Type**: Secret text
- **Secret**: Your CloudFront distribution ID (e.g., `E1234567890ABC`)

### 4. ECS Cluster Name
- **ID**: `ecs-cluster-name`
- **Type**: Secret text
- **Secret**: Your ECS cluster name (e.g., `tdo-socket-app-cluster`)

### 5. ECS Service Name
- **ID**: `ecs-service-name`
- **Type**: Secret text
- **Secret**: Your ECS service name (e.g., `tdo-socket-app-backend-service`)

### 6. AWS Credentials
- **ID**: `aws-credentials`
- **Type**: AWS Credentials
- **Access Key ID**: Your AWS access key
- **Secret Access Key**: Your AWS secret key

## Required Jenkins Plugins

1. **AWS Steps Plugin**
2. **Pipeline: AWS Steps**
3. **Docker Pipeline Plugin**
4. **CloudBees AWS Credentials Plugin**

## AWS Infrastructure Setup

### 1. Deploy Infrastructure
```bash
aws cloudformation deploy \
  --template-file infrastructure.yml \
  --stack-name tdo-socket-app \
  --capabilities CAPABILITY_IAM \
  --region ap-southeast-1
```

### 2. Create ECR Repository
```bash
aws ecr create-repository \
  --repository-name tdo-socket-app-backend \
  --region ap-southeast-1
```

### 3. Store Secrets in AWS Systems Manager
```bash
aws ssm put-parameter \
  --name "/tdo/jwt-secret" \
  --value "your-jwt-secret-here" \
  --type "SecureString"

aws ssm put-parameter \
  --name "/tdo/mysql-password" \
  --value "your-mysql-password" \
  --type "SecureString"

aws ssm put-parameter \
  --name "/tdo/mysql-root-password" \
  --value "your-mysql-root-password" \
  --type "SecureString"
```

## Manual Deployment Commands

### Frontend to S3/CloudFront
```bash
cd tdo-fe
npm ci
npm run build
aws s3 sync build/ s3://your-bucket-name/ --delete
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### Backend to ECS
```bash
cd tdo-be
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin YOUR_ECR_REGISTRY
docker build -t tdo-socket-app-backend:latest --target production .
docker tag tdo-socket-app-backend:latest YOUR_ECR_REGISTRY/tdo-socket-app-backend:latest
docker push YOUR_ECR_REGISTRY/tdo-socket-app-backend:latest
aws ecs update-service --cluster YOUR_CLUSTER --service YOUR_SERVICE --force-new-deployment
```
