# README.md

## 🚀 Employee Management System (EMS) Frontend

Welcome to the frontend repository for the Employee Management System, a robust single-page application (SPA) built with React and Vite. This application provides secure user management, employee record keeping, and administrative lookup tools.

### 🌐 Live Demo

The application is deployed on GitHub Pages:

**[Live Application Link](https://www.google.com/search?q=https://anshul2807.github.io/Employee-Management-System-Frontend/%23/login)**

*(Note: Due to GitHub Pages limitations, navigation uses HashRouter (`#`)).*

-----

## 🛠️ Tech Stack & Architecture

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | **React** (Functional Components) | Modern library for building user interfaces. |
| **Tooling** | **Vite** | Next-generation frontend tooling for fast development. |
| **Styling** | **Tailwind CSS** | Utility-first framework for rapid and responsive styling. |
| **Routing** | **React Router DOM** (`HashRouter`) | Client-side routing for seamless navigation. |
| **State Management** | **Context API** | Used for global state, primarily authentication (`AuthContext`). |
| **API Client** | **Axios** | HTTP client for interacting with the Spring Boot REST API. |
| **Backend** | **Java Spring Boot** | Full-featured REST API serving the data. |

### 🔗 Backend Repository

The full source code for the backend is available here:
[**employee-Management-System Backend**](https://github.com/anshul2807/employee-Management-System)

-----

## 💡 Key Features

  * **Authentication & Authorization:** Secure login using JWTs managed by the Context API.
  * **Role-Based Access Control (RBAC):** Routes are protected using a `<RoleGuard />` component, ensuring access based on user roles (e.g., `ADMIN` access to employee lists and registration).
  * **Employee Management (Admin):** Functionality to view employee lists and register new employees.
  * **Lookup Management (Admin):** Dedicated section for creating and managing core system data (Departments and Job Titles).
  * **Responsive Design:** Styled using Tailwind CSS for a modern, mobile-friendly interface.

-----

## 📂 Project Structure

The source code (`src/`) is organized into logical domains for scalability and maintainability:

| Directory | Purpose | Key Files/Components |
| :--- | :--- | :--- |
| `src/api` | Centralized API access and configuration. | `axiosInstance.js` (Interceptor setup), `authService.js`, `employeeService.js` |
| `src/components` | Reusable UI elements, separated into: | `<Header>`, `<Sidebar>`, `<Table>`, `<LoadingSpinner>` |
| `src/context` | Global state logic (State Hooks + Providers). | `AuthContext.jsx` (Crucial for JWT handling), `RoleGuard.jsx` |
| `src/pages` | Application views, separated by access: | `private/` (`Dashboard`, `Lookups`, `RegisterEmployee`), `public/` (`Login`) |
| `src/routes` | React Router configuration. | `AppRouter.jsx` (Defines all routes and guards) |
| `src/main.jsx` | Entry point, initializes the app with router and context providers. | |

-----

## 💻 Getting Started (Local Development)

### Prerequisites

  * Node.js (LTS recommended)
  * npm or yarn
  * The **Employee Management System Backend** running locally (usually on `http://localhost:8080`).

### Installation and Run

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/anshul2807/Employee-Management-System-Frontend.git
    cd Employee-Management-System-Frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The application will typically be available at `http://localhost:5173`.

-----

## 📦 Deployment

This project uses **Vite** and **`gh-pages`** for deployment to GitHub Pages.

**Key Configuration:**

1.  **Vite Configuration:** The `vite.config.js` is configured with a **relative base path** (`base: './'`) to ensure assets load correctly on GitHub Pages.
2.  **Routing:** The application uses **`HashRouter`** (instead of `BrowserRouter`) to handle client-side routing, avoiding 404 errors on direct path access after deployment.

**Deployment Command:**

```bash
npm run deploy
```

