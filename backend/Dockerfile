FROM php:8.4-apache

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libzip-dev \
    unzip \
    git \
    && docker-php-ext-install pdo_mysql gd zip exif

# Disable conflicting Apache MPMs and enable prefork and rewrite
RUN a2dismod mpm_event mpm_worker || true
RUN a2enmod mpm_prefork rewrite || true

# Change Apache document root to Laravel public directory
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Set working directory
WORKDIR /var/www/html

# Copy project files
COPY . .

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Setup permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Start script to run migrations, fix permissions, enforce single MPM, and start apache
CMD php artisan migrate --force ; php artisan db:seed --force ; chown -R www-data:www-data storage bootstrap/cache ; a2dismod mpm_event mpm_worker || true ; a2enmod mpm_prefork || true ; apache2-foreground
