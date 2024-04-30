# Assessment Project

This project consists of a React frontend (assessment-frontend) and a Laravel backend (assessment-backend).

## Prerequisites

- Node.js and npm installed on your machine. You can download and install Node.js from [here](https://nodejs.org/).
- Composer installed on your machine. You can download and install Composer from [here](https://getcomposer.org/).
- PHP installed on your machine. You can download and install PHP from [here](https://www.php.net/).

## Frontend Setup (assessment-frontend)

1. Navigate to the `assessment-frontend` directory:

   ```bash
   cd assessment-frontend
2. Install dependencies:
   ```bash
    npm install
3. Start the development server:
   ```bash
    npm start
4. Open your browser and navigate to http://localhost:3000 to view the React frontend.

## Backend Setup (assessment-backend)

1. Navigate to the assessment-backend directory:
   ```bash
    cd assessment-backend
2. Install dependencies:
   ```bash
    composer install
3. Create a copy of the .env.example file and rename it to .env:
   ```bash
    cp .env.example .env
4. Update the .env file with your database credentials and other necessary configurations.
    Generate the application key:
    ```bash
    php artisan key:generate
5. Set up the database by editing the .env file to match your database configuration:
    
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_database_name
    DB_USERNAME=your_database_username
    DB_PASSWORD=your_database_password
    Run migrations to set up the database:

   ```bash
    php artisan migrate

6. Start the Laravel development server:
   ```bash
    php artisan serve
  By default, the server will start at http://localhost:8000.
## Additional Information
Make sure to update the .env file in the assessment-backend directory with your database credentials and other necessary configurations.
You may need to configure CORS settings in your Laravel backend if you encounter CORS-related issues when making requests from the React frontend.
