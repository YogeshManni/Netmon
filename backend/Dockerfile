# Use the official PHP image as a base
FROM php:8.2-fpm

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev git unzip libzip-dev \
    && docker-php-ext-configure zip \
    && docker-php-ext-install pdo pdo_mysql zip gd

# Install Composer globally
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory inside the container
WORKDIR /var/www

# Copy your application files into the container
COPY . .

# Set permissions for Laravel files
RUN chown -R www-data:www-data /var/www

# Install PHP dependencies via Composer
RUN composer install --no-interaction --prefer-dist

# Expose port 9000 for the app
EXPOSE 9000

CMD ["php-fpm"]
