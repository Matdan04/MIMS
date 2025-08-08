#!/bin/bash

echo "🐳 Starting Docker setup for MIMS Laravel application..."

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📋 Creating .env file from .env.example..."
    cp .env.example .env
else
    echo "✅ .env file already exists"
fi

# Generate application key if not set
if ! grep -q "APP_KEY=base64:" .env; then
    echo "🔑 Generating application key..."
    docker-compose exec app php artisan key:generate
else
    echo "✅ Application key already generated"
fi

# Create database file if using SQLite
echo "🗄️ Setting up SQLite database..."
docker-compose exec app touch /var/www/html/database/database.sqlite
docker-compose exec app chown www-data:www-data /var/www/html/database/database.sqlite

# Run migrations
echo "🔄 Running database migrations..."
docker-compose exec app php artisan migrate --force

# Seed the database
echo "🌱 Seeding the database..."
docker-compose exec app php artisan db:seed --force

# Clear caches
echo "🧹 Clearing application caches..."
docker-compose exec app php artisan config:clear
docker-compose exec app php artisan cache:clear
docker-compose exec app php artisan route:clear
docker-compose exec app php artisan view:clear

# Set proper permissions
echo "🔐 Setting proper permissions..."
docker-compose exec app chown -R www-data:www-data /var/www/html/storage
docker-compose exec app chown -R www-data:www-data /var/www/html/bootstrap/cache
docker-compose exec app chmod -R 775 /var/www/html/storage
docker-compose exec app chmod -R 775 /var/www/html/bootstrap/cache

echo "✨ Docker setup complete!"
echo "🚀 Your application should now be available at http://localhost:8000"
echo "📧 Mailpit (email testing) is available at http://localhost:8025"
echo ""
echo "📝 Useful commands:"
echo "  docker-compose up -d          # Start all services"
echo "  docker-compose down           # Stop all services"
echo "  docker-compose logs app       # View application logs"
echo "  docker-compose exec app bash  # Access application container"
echo "  docker-compose exec app php artisan tinker  # Laravel Tinker"