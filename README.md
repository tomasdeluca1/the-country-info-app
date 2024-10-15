# Country Info App

This project consists of a backend API built with Node.js and Express, and a frontend application built using the following technologies:

- Next.js
- React.js
- Tailwind CSS
- DaisyUI
- Framer Motion
- Chart.js
- React Chart.js 2

## Prerequisites

- Node.js (v20 or later)
- npm (v10 or later)

## Setup

1. Clone the repository:

   ```
   git clone https://github.com/tomasdeluca1/the-country-info-app.git
   cd the-country-info-app
   ```

2. Install dependencies for both frontend and backend:

   ```
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Set up environment variables:

   For the backend:
   Create a `.env` file in the `backend` directory with the following content:

   ```
   PORT=3001
   ```

   For the frontend:
   Create a `.env.local` file in the `frontend` directory with the following content:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

## Running the Application

1. Start the backend server:

   ```
   cd backend
   npm start
   ```

   The backend server will start running on `http://localhost:3001`.

2. In a new terminal window, start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```
   The frontend application will be available at `http://localhost:3000`.

## Usage

- Open your web browser and navigate to `http://localhost:3000` to use the Country Info App.
- The application allows you to view a list of countries and get detailed information about each country, including population data and bordering countries.

## Notes

- Ensure that both the backend and frontend servers are running simultaneously for the application to function correctly.
- If you change the backend port in the `.env` file, make sure to update the `NEXT_PUBLIC_API_URL` in the frontend's `.env.local` file accordingly.

## Troubleshooting

- If you encounter any issues with dependencies, try deleting the `node_modules` folder and `package-lock.json` file in both the frontend and backend directories, then run `npm install` again.
- Make sure your Node.js version is compatible with the project requirements.
