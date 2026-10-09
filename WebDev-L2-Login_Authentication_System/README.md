# AuthFlow — Login Authentication System

A web-based login authentication system built using HTML, CSS, JavaScript, Node.js, and Express.js. AuthFlow allows users to register, securely log in, access a protected dashboard, and log out using session-based authentication.

## Features

- **User Registration:** Register with a username, email, password, and password confirmation.
- **Input Validation:** Validates required fields, email format, password length, and password requirements.
- **Duplicate Account Prevention:** Prevents registration with an existing username or email.
- **Secure Password Storage:** Hashes passwords using bcrypt instead of storing plaintext passwords.
- **Login Authentication:** Supports logging in with either a username or an email address.
- **Session Management:** Uses Express sessions to maintain authenticated user sessions.
- **Protected Dashboard:** Restricts dashboard access to authenticated users.
- **Dynamic Profile:** Displays the logged-in user's username and email.
- **Logout:** Destroys the user's session and redirects to the login page.
- **Responsive Interface:** Provides a clean interface for registration, login, and dashboard pages.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling and responsive layouts |
| JavaScript | Client-side interactions and validation |
| Node.js | Backend runtime |
| Express.js | Server and API routes |
| express-session | Session-based authentication |
| bcrypt | Password hashing |
| JSON | Local user data storage |

## Project Structure

```text
WebDev-L2-Login_Authentication_System/
├── data/
│   └── users.json
├── public/
│   ├── register.html
│   ├── register.js
│   ├── login.html
│   ├── login.js
│   ├── dashboard.html
│   ├── dashboard.js
│   ├── dashboard.css
│   └── style.css
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

*Note: The `public` folder may contain additional CSS, JavaScript, font, or image files used by the interface.*

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- A modern web browser

## Installation and Setup

### 1. Clone the repository

```bash
git clone "https://github.com/Sumith-17/OIBSIP"
```

Replace the placeholder with your GitHub repository URL.

### 2. Navigate to the project directory

```bash
cd WebDev-L2-Login_Authentication_System
```

### 3. Install dependencies

```bash
npm install
```

### 4. Prepare the user data file

Ensure that `data/users.json` exists and contains an empty JSON array:

```json
[]
```

Do not reset this file if you want to preserve existing registered accounts.

### 5. Start the server

```bash
npm start
```

### 6. Open the application

Visit the following URL in your browser:

**http://localhost:3000/register.html**

Register an account, log in, and access your dashboard.

## Application Workflow

1. **Registration:** The user enters their details. The server validates the input, checks for duplicate accounts, hashes the password with bcrypt, and stores the account in `data/users.json`.
2. **Login:** The user enters their username or email and password. The server verifies the password hash and creates an authenticated session.
3. **Dashboard:** The server checks the session before allowing access. The dashboard retrieves and displays the logged-in user's profile.
4. **Logout:** The server destroys the session, clears the session cookie, and redirects the user to the login page.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Checks server availability |
| POST | `/api/register` | Registers a new user |
| POST | `/api/login` | Authenticates a user |
| GET | `/api/me` | Returns the authenticated user's profile |
| POST | `/api/logout` | Ends the user's session |
| GET | `/dashboard.html` | Serves the protected dashboard |

## Security Measures

- Passwords are hashed using bcrypt before being stored.
- Passwords are never returned through the profile API.
- Server-side validation checks registration and login inputs.
- Duplicate usernames and email addresses are rejected.
- Authenticated sessions protect dashboard access.
- Session cookies use `HttpOnly` and `SameSite` settings.
- Login errors use a generic message to avoid revealing whether a username or email exists.

**Security note:** This project is intended for learning and demonstration. Before production deployment, configure a strong secret through the `SESSION_SECRET` environment variable, use HTTPS, configure secure cookie settings, use a persistent production-ready session store, and replace JSON file storage with a database. The default Express session MemoryStore is not suitable for production.

## Future Improvements

- Integrate a database such as MySQL or PostgreSQL.
- Add password reset functionality.
- Implement email verification.
- Add rate limiting and stronger session security.
- Add automated tests for authentication and validation.
- Improve accessibility and responsive design.

## Learning Outcomes

This project demonstrates practical knowledge of:

- Frontend and backend integration
- REST API development
- Asynchronous JavaScript and Fetch API
- User authentication and session management
- Password hashing with bcrypt
- Server-side validation and error handling
- Express middleware and protected routes
- Git and GitHub project management

## Internship Project

**Organization:** OASIS INFOBYTE  
**Project:** Task 4 — Login Authentication System  
**Project Name:** AuthFlow

