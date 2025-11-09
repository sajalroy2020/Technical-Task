# Device Sandbox Simulator

### Live URL: https://device-sandbox-simulator.vercel.app/


A Device Simulator Web Application that allows users to interact with virtual devices (Light and Fan) inside a sandbox environment. Users can drag-and-drop devices, control settings, and save/load presets.

## Setup Instructions

### Prerequisites

* Node.js >= 18, npm or yarn
* PHP >= 8.0, Composer
* MySQL

### Backend (Laravel)

1. Install dependencies:

composer install
cp .env.example .env
php artisan key:generate


2. Configure `.env` for database and run migrations:

php artisan migrate:fresh --seed


3. Start the server:

php artisan serve


> Runs at `http://127.0.0.1:8000`


### Frontend (React)

1. Install dependencies:

npm install
.env.example .env


3. Set backend API URL in `.env`:

REACT_APP_API_URL=http://127.0.0.1:8000/api/v1


4. Start the app:

npm start

> Runs at `http://localhost:3000`

### Usage

* Drag devices from the sidebar to the canvas.
* Adjust settings (Light: power, brightness, color; Fan: power, speed).
* Save/load presets from the sidebar.
