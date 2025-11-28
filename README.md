# Pro_U Fullstack_task

This repository contains a  fullstack Employee & Task tracker.

- Backend: Node.js + Express + Mongoose (MongoDB)
- Frontend: React (Vite)

---

## Quick Overview

- `backend/` — Express API, Mongoose models, authentication (JWT), SSE updates.
- `frontend/` — React app with AuthContext, Dashboard, Employees management, admin-only task editing.

---

## Tech stack and architecture overview

- Backend: Node.js (ESM) + Express, Mongoose for MongoDB, JWT for auth, EventEmitter + Server-Sent Events (SSE) for live updates.
- Frontend: React + Vite, React Router, Context-based AuthProvider, simple component-based UI (Dashboard, Employees, Tasks).
- Architecture: Single-page React frontend communicates with RESTful Express API. Auth uses JWT stored in localStorage; SSE endpoint provides cross-client real-time notifications.

---

## Admin test credentials (These can be changes after Assignment Evaluation)

- Username: `admin`
- Password: `admin124`
---

## Prerequisites

- Node.js (v16+ recommended)
- npm (or yarn)
- MongoDB instance (local or cloud)

---

## Environment

Create a `.env` file in `backend/` with at least:

```
MONGODB_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=replace_with_a_strong_secret
PORT=5000
```

If the frontend needs environment variables, create `frontend/.env` as needed.

---

## Install & Run (development)

Backend:

```powershell
cd backend
npm install
npm run dev     # or `node server.js` for production
```

Frontend:

```powershell
cd frontend
npm install
npm run dev
```

Open the frontend URL printed by Vite (typically `http://localhost:5173`) and the backend on port specified in `.env` (default `5000`).

---

## API endpoint documentation

All endpoints are under the `/api` namespace.

- `POST /api/auth/register` — register a user. Body: `{ username, password, role }`.
- `POST /api/auth/login` — login. Body: `{ username, password }`. Returns `{ token, user }`.
- `GET /api/auth/me` — get current user (requires Authorization: Bearer <token>).

- `GET /api/employees` — list employees (authenticated).
- `POST /api/employees` — create employee (admin only).
- `PUT /api/employees/:id` — update employee (admin only).
- `DELETE /api/employees/:id` — delete employee (admin only) — cascade-deletes tasks assigned to that employee.

- `GET /api/tasks` — list tasks. Supports query params: `status`, `assignedTo`.
- `GET /api/tasks/:id` — get single task.
- `POST /api/tasks` — create task (admin only). Body must include valid `assignedTo` employee id.
- `PUT /api/tasks/:id` — update task (admin only).
- `DELETE /api/tasks/:id` — delete task (admin only).

- `GET /api/dashboard` — optional summary endpoint (authenticated).
- `GET /api/updates` — Server-Sent Events endpoint (authenticated). Clients open as `EventSource('/api/updates?token=<JWT>')`.

---

## Creating the admin user

If you don't have an admin user yet you can register via the API (or use the app's Register page if available). Example with PowerShell (replace URL and creds):

```powershell
Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/register' -Method Post -ContentType 'application/json' -Body (ConvertTo-Json @{ username='admin'; password='admin124'; role='admin' })
```

Or use Postman / Insomnia to POST to `/api/auth/register` with a JSON body.

---

## SSE (Live updates)

The backend exposes a server-sent events endpoint at:

```
GET /api/updates
```

This endpoint is authenticated. The frontend's AuthProvider opens an EventSource to `/api/updates?token=<JWT>` so logged-in clients receive update events (tasks/employees changes) in real time.

---

## Live Links

- LIVE LINK: https://pro-u-technology-full-stack-fronten-three.vercel.app/dashboard


---

## Assumptions & Limitations

- Users and Employees are separate models. There is no automatic mapping between a logged-in `User` and an `Employee` record unless you add an `employeeId` to the `User` model. If you want regular users to only see tasks assigned to them, add that mapping and update the backend filters.
- Admin-only permissions are enforced server-side for create/update/delete on employees and tasks.
- SSE uses a query-token (`/api/updates?token=<JWT>`) for simplicity. For production, consider using WebSockets or a more secure SSE auth mechanism.
- This project is intended as a demo / assignment project — not production hardened. Hardening (rate limiting, input sanitization, stronger auth/session handling, HTTPS, secrets management) should be added for real deployments.

---



