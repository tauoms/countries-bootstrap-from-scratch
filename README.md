# Countries App

This is a React application for browsing country information, searching by name, and viewing details like weather and favourite countries.

## Features

- View all countries with details like population, area, and more.
- Search countries by name.
- Sort countries by name, population, or area (ascending/descending).
- Display detailed country info and real-time weather data for the capital.
- Manage favourites with user authentication (Firebase).

## Screenshot

![Screenshot 2024-10-16 at 13 15 21](https://github.com/user-attachments/assets/11117cfe-215a-4086-a2e1-9bcc8f41b8f8)

## Technologies Used

- React
- Redux and Redux Toolkit​​​​​​
- Firebase
- Bootstrap
- OpenWeather API
- REST Countries API

## Installation

1. Clone the repo:

```bash
git clone https://github.com/tauoms/countries-bootstrap-from-scratch.git
```

2. Navigate to the project folder and install dependencies:

```bash
cd countries-bootstrap-from-scratch
npm install
```

3. Set up environment variables in a .env file (create in project root):

```bash
VITE_WEATHER_API_KEY=your_openweather_api_key
FIREBASE_API_KEY=your_firebase_api_key
```

4. Run the application:

```bash
npm run dev
```
