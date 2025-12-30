# TDO Socket
## Security Setup

1. **Copy environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Update credentials in .env:**
   - Change all default passwords
   - Set strong JWT secret (min 32 characters)
   - Configure database credentials

3. **Run setup:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

## Security Features

- ✅ No hardcoded credentials
- ✅ Password hashing with bcrypt
- ✅ JWT with secure secret
- ✅ Rate limiting
- ✅ Helmet security headers
- ✅ Docker network isolation
- ✅ Non-root Jenkins user
- ✅ Input validation

## Environment Variables Required

```
MYSQL_PASSWORD=your_secure_password
MYSQL_ROOT_PASSWORD=your_secure_root_password
JWT_SECRET=your_jwt_secret_minimum_32_chars
REDIS_PASSWORD=your_redis_password
```
