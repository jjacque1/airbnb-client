# Airbnb Clone Frontend

This is the frontend for my Airbnb Clone project, built with React and Vite. It is part of a polyrepo full-stack architecture, with the frontend and backend maintained in separate repositories.

## Current Project Status

At this stage, the frontend includes:

- React app initialized with Vite
- production-style folder structure
- React Router setup
- shared layout with Header, Footer, and Outlet
- navigation with active link styling using `NavLink`
- centralized Axios API client
- environment-based backend URL configuration using Vite `.env`
- successful frontend-to-backend API connection
- working user registration form with backend integration

## Tech Stack

- React
- Vite
- React Router DOM
- Axios
- CSS

## Folder Structure

```text
src
├── api
│   └── api.js
├── assets
├── components
│   ├── Footer.jsx
│   ├── Header.jsx
│   └── Layout.jsx
├── pages
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   └── RegisterPage.jsx
├── routes
│   └── AppRoutes.jsx
├── App.jsx
└── main.jsx

## Features Implemented

App Bootstrapping
- Created the frontend with Vite
- Configured React rendering through main.jsx
- Wrapped the application in BrowserRouter

## Routing Architecture
- Moved route definitions into a dedicated AppRoutes.jsx file
- Created separate page components for Home, Login, and Register
- Used Layout.jsx with Outlet to support shared page structure

## Shared Layout
- Built reusable Header, Footer, and Layout components
- Structured the page shell so all routed content renders inside the 

## Navigation UX
- Added organized navigation in the header
- Used NavLink so active routes are visually highlighted
- Styled the header, navigation, layout shell, and footer for cleaner structure

## API Layer Setup
- Created a centralized Axios instance in src/api/api.js
- Configured baseURL from environment variables
- Enabled withCredentials for cookie-based authentication support

## Environment Variable Setup
- Added frontend environment configuration using Vite
- Connected the frontend to the backend using VITE_API_URL

## First Frontend-to-Backend API Test
- Successfully tested communication between frontend and backend using the /health endpoint
- Verified the frontend can make requests and receive JSON responses

## User Registration Flow
- Built a controlled registration form using React state
- Captured full name, email, and password
- Sent a POST request to the backend register endpoint
- Successfully received backend response confirming user creation

## What I Learned So Far
- React Router structure and routing flow
- Difference between Link and NavLink
- Layout component architecture using Outlet
- Separation of concerns in frontend folder structure
- Axios baseURL behavior and request composition
- Backend route mounting and path composition
- Vite environment variable usage
- Controlled form handling in React
- Sending data from frontend to backend using api.post()

## API Relationship Example
- Frontend request uses /auth/register
- Backend mounts routes with app.use("/auth", authRoutes)
- Router defines route with router.post("/register")
- Final endpoint becomes /auth/register

## How to Run the Frontend
- Install dependencies with npm install
- Create a .env file in the project root with VITE_API_URL
- Start the development server using npm run dev

## Important Notes
- .env should not be committed to GitHub
- node_modules should remain ignored
- frontend and backend are separate repositories
- backend must be running locally for API requests to work

## Next Step
-Implement login flow with authentication handling

## Author
- Built by Jackson Jacque