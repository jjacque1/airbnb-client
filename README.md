# Airbnb Clone Frontend

This is the frontend for my Airbnb Clone project, built with React and Vite. It is part of a polyrepo full-stack architecture, where the frontend and backend are maintained in separate repositories and communicate via RESTful APIs.

---

## Current Project Status

At this stage, the frontend includes:

* React application initialized with Vite
* Production-style folder structure with separation of concerns
* React Router configuration with nested routing
* Shared layout using Header, Footer, and Outlet
* Navigation with active route styling using `NavLink`
* Centralized Axios API client with credential support
* Environment-based backend URL configuration using Vite `.env`
* Successful frontend-to-backend API communication
* Fully functional user registration flow
* Fully functional user login flow with cookie-based authentication

---

## Tech Stack

* React
* Vite
* React Router DOM
* Axios
* CSS

---

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
```

---

## Features Implemented

### App Bootstrapping

* Initialized frontend using Vite
* Configured React rendering via `main.jsx`
* Wrapped application with `BrowserRouter`

---

### Routing Architecture

* Extracted route definitions into `AppRoutes.jsx`
* Implemented page-based routing (Home, Login, Register)
* Used `Layout.jsx` with `Outlet` for shared UI structure

---

### Shared Layout

* Built reusable `Header`, `Footer`, and `Layout` components
* Structured consistent UI across all routes

---

### Navigation UX

* Implemented navigation using `NavLink`
* Added active route highlighting
* Styled header and layout for clean user experience

---

### API Layer Setup

* Created centralized Axios instance (`src/api/api.js`)
* Configured dynamic `baseURL` via environment variables
* Enabled `withCredentials` for cookie-based authentication

---

### Environment Configuration

* Configured environment variables using Vite
* Connected frontend to backend via `VITE_API_URL`

---

### Frontend ↔ Backend Communication

* Successfully tested API communication using `/health` endpoint
* Verified JSON request/response cycle

---

### User Registration Flow

* Built controlled form using React state
* Captured full name, email, and password
* Sent POST request to `/auth/register`
* Successfully handled backend response

---

### User Login Flow

* Built controlled login form using React state
* Sent POST request to `/auth/login`
* Backend returns JWT stored in HTTP-only cookies
* Enabled session persistence using `withCredentials`
* Verified authentication cookie is stored and persists across refresh

---

## What I Learned

* React Router architecture and nested routing patterns
* Differences between `Link` and `NavLink`
* Layout composition using `Outlet`
* Frontend folder structuring for scalability
* Axios configuration and credential handling
* Backend route composition and mounting
* Environment variable management in Vite
* Controlled components and form state management
* End-to-end frontend-to-backend data flow

---

## API Relationship Example

* Frontend request → `/auth/login`
* Backend mount → `app.use("/auth", authRoutes)`
* Route definition → `router.post("/login")`
* Final endpoint → `/auth/login`

---

## How to Run the Frontend

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:5000
```

3. Start development server:

```bash
npm run dev
```

---

## Important Notes

* `.env` is excluded from version control
* `node_modules` is ignored
* Frontend and backend are separate repositories
* Backend must be running for API requests to succeed

---

## Next Steps

* Implement protected routes (authentication-based routing)
* Build user session handling (persisted auth state)
* Add logout functionality (clear auth cookie)
* Begin Places feature (Airbnb listings)

---

## Author

* Built by Jackson Jacque
