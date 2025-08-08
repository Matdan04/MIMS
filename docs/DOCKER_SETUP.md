# Docker Setup for MIMS Laravel Application

This document provides instructions for running the MIMS Laravel + Inertia.js application using Docker.

## 🐳 Quick Start

1. **Build and start the containers:**
   ```bash
   docker-compose up -d
   ```

2. **Initialize the application:**
   
   **Linux/Mac:**
   ```bash
   ./docker/init.sh
   ```
   
   **Windows:**
   ```powershell
   .\docker\init.bat
   ```

3. **Access your application:**
   - Main application: http://localhost:8000
   - Email testing (Mailpit): http://localhost:8025

## 📋 Services Included

- **app**: Laravel application (PHP 8.2 + Nginx)
- **mysql**: MySQL 8.0 database (default)
- **redis**: Redis for caching and sessions
- **mailpit**: Email testing service
- **node**: Node.js for frontend development

## 🔧 Configuration

### Database Options

**MySQL (Default):**
```env
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=mims
DB_USERNAME=mims
DB_PASSWORD=secret
```

**SQLite (Alternative):**
```env
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
```

### MySQL Connection for External Tools

To connect to MySQL from external tools like MySQL Workbench:
- **Host**: `127.0.0.1` or `localhost`
- **Port**: `3307` (externally mapped port)
- **Username**: `mims`
- **Password**: `secret`
- **Database**: `mims`

### Environment Variables

The application uses environment variables defined in `docker-compose.yml`. Key variables include:

```env
APP_URL=http://localhost:8000
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=mims
DB_USERNAME=mims
DB_PASSWORD=secret
REDIS_HOST=redis
MAIL_HOST=mailpit
```

## 🚀 Docker Commands

### Basic Operations
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f app

# Rebuild containers
docker-compose build --no-cache

# Rebuild and restart (after code changes)
docker-compose down && docker-compose build && docker-compose up -d
```

### Application Commands
```bash
# Access application container
docker-compose exec app bash

# Run Artisan commands
docker-compose exec app php artisan migrate
docker-compose exec app php artisan tinker

# Install composer dependencies
docker-compose exec app composer install

# Install npm dependencies
docker-compose exec node npm install

# Build frontend assets
docker-compose exec node npm run build
```

### Development
```bash
# Watch frontend changes
docker-compose exec node npm run dev

# Run tests
docker-compose exec app php artisan test

# Clear caches
docker-compose exec app php artisan optimize:clear
```

## 🔍 Troubleshooting

### Permission Issues
```bash
# Fix storage permissions
docker-compose exec app chown -R www-data:www-data /var/www/html/storage
docker-compose exec app chmod -R 775 /var/www/html/storage
```

### Database Issues
```bash
# Reset database (fresh migrations with seeding)
docker-compose exec app php artisan migrate:fresh --seed

# Check migration status
docker-compose exec app php artisan migrate:status

# Run specific migration
docker-compose exec app php artisan migrate

# Check database connection
docker-compose exec app php artisan tinker
# Then in Tinker: DB::connection()->getPdo();

# Access MySQL directly
mysql -h 127.0.0.1 -P 3307 -u mims -p
# Password: secret
```

### Frontend Issues
```bash
# Rebuild node modules
docker-compose exec node rm -rf node_modules
docker-compose exec node npm install
```

## 📁 Volume Mounts

- Application code: `.:/var/www/html`
- Storage: `./storage:/var/www/html/storage`
- Node modules: `node_modules:/var/www/html/node_modules` (named volume)

## 🌐 Port Mapping

- **8000**: Laravel application
- **3307**: MySQL database (external access)
- **6379**: Redis
- **1025**: Mailpit SMTP
- **8025**: Mailpit Web UI
- **5173**: Vite development server

**Note**: MySQL uses port 3307 externally to avoid conflicts with local MySQL installations. Inside Docker, it still uses port 3306.

## 🔒 Production Notes

For production deployment:
1. Use the production stage: `docker build --target php-base`
2. Set `APP_ENV=production` and `APP_DEBUG=false`
3. Use proper secrets management for database credentials
4. Configure SSL/TLS termination
5. Use a reverse proxy (nginx/Traefik)
6. Set up proper logging and monitoring
7. Use persistent volumes for MySQL data
8. Configure proper backup strategies

## 📊 Database Information

After running the initialization, your MySQL database will contain:
- **users**: User accounts and profiles
- **roles**: System roles (Admin, User, etc.)
- **permissions**: Available permissions
- **role_permissions**: Role-permission relationships
- **cache**: Application cache storage
- **jobs**: Background job queue
- **migrations**: Migration tracking table

## 🛠️ Common Workflows

### First Time Setup
```bash
# 1. Start containers
docker-compose up -d

# 2. Wait for MySQL to initialize (Windows)
.\docker\init.bat

# 3. Access application
# http://localhost:8000
```

### Development Workflow
```bash
# Start development environment
docker-compose up -d

# Watch frontend changes
docker-compose exec node npm run dev

# Run backend commands
docker-compose exec app php artisan migrate
docker-compose exec app php artisan test
```

### Switching Database Type
To switch from MySQL back to SQLite, edit `docker-compose.yml`:
```yaml
environment:
  - DB_CONNECTION=sqlite
  - DB_DATABASE=/var/www/html/database/database.sqlite
  # Comment out MySQL variables
```