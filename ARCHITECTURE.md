# Project Architecture: SLIS Frontend

This document provides a technical overview of the `slis--frontend` project architecture, designed to help developers and AI agents understand the system's structure and patterns.

## 🚀 Technology Stack
- **Framework**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (using vanilla CSS variables for a custom theme)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **API Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

## 📁 Directory Structure
```text
slis--frontend/
├── src/
│   ├── components/     # Reusable UI components (e.g., Layouts)
│   ├── pages/          # Full-page components (Login, Home, Profile, etc.)
│   ├── utils/          # Utility functions and API configuration
│   ├── App.jsx         # Root component with routing definitions
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles and Tailwind configuration
├── vite.config.js      # Vite configuration (includes API proxying)
└── package.json        # Dependencies and scripts
```

## 🏗️ Core Architecture Patterns

### 1. Routing Strategy
The application uses central routing defined in `src/App.jsx`. 
- **Navigation**: Managed via `react-router-dom`.
- **Pages**: Divided into Auth-related (Login, Register, Forgot Password) and Application-related (Home, Profile).

### 2. API Communication
- **Client**: A customized Axios instance located in `src/utils/api.js`.
- **Interceptors**:
  - **Request**: Automatically attaches the JWT `Authorization` header if a token exists in `localStorage`.
  - **Response**: Handles `401 Unauthorized` errors by clearing local storage and redirecting to `/login` specifically for authentication-related endpoints.
- **Base URL**: Set to `/`, relying on Vite's proxy (configured in `vite.config.js`) to route requests to the backend.

### 3. Authentication & State Management
- **Persistence**: User tokens and basic user data are persisted in `localStorage`.
- **Flow**:
  1. User logs in via `Login.jsx`.
  2. Token is saved.
  3. Subsequent requests use the token via the Axios interceptor.
  4. Failed auth triggers a logout flow.

### 4. UI & Design System
- **Theme**: Defined in `src/index.css` using Tailwind's `@theme` directive and CSS variables.
- **Aesthetics**: Follows a "Glassmorphism" design language with dark backgrounds (`#0F172A`), blurred cards (`glass-card`), and vibrant primary accents (`#6467f2`).
- **Layouts**: Uses an `AuthLayout` wrapper for consistency across all authentication pages.

## 🛠️ Key Files
- `src/App.jsx`: The "Brain" of the frontend routing.
- `src/utils/api.js`: The central point for all backend communication logic.
- `src/pages/Home.jsx`: The main landing page after authentication.
- `src/index.css`: The source of truth for the application's visual identity.

## 🤖 Notes for Agents
- When adding new pages, register them in `src/App.jsx`.
- Use the `api` utility from `src/utils/api.js` for all network requests.
- Follow the existing Tailwind/Glassmorphism patterns in `src/index.css` for UI consistency.
