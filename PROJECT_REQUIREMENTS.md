Top News — Functional & Non-Functional Requirements

Last updated: 2025-10-04

Overview
--------
This document captures functional and non-functional requirements for the Top News project (a web application with backend API and frontend UI). It is based on the repository structure and controllers/services found in the codebase (`BACKEND/` and `FRONTEND/`). It makes a few small assumptions (listed below) and maps requirements to key files.

Assumptions
-----------
- The project is a news publishing platform with two primary roles: Admin and User.
- Admins can manage news content, users, and view analytics. Users can register, login, read news, and post comments (if implemented). Images are stored using Cloudinary (see `src/config/cloudinary.js`).
- There is an AI service endpoint (see `ai.controller.js` / `ai.services.js`) for features like summarization or generating article excerpts.
- Authentication uses JWTs and blacklisting (see `blacklistToken.model.js`).

Stakeholders
------------
- End users (readers)
- Admins / content editors
- Developers / DevOps
- Product owner

Functional Requirements (FR)
----------------------------
Each requirement includes a short acceptance criteria (AC) and a pointer to likely implementation files.

FR-1: User registration
- Description: Allow new users to create an account with email, username, and password.
- AC: POST /api/users/register returns 201 and a user id on success; rejects duplicate email with 409.
- Files: `BACKEND/src/controller/user.controller.js`, `BACKEND/src/services/user.services.js`, `FRONTEND/src/screens/Register.jsx`
- Data shape (payload): {"name": "string", "email": "string", "password": "string"}

FR-2: User login and JWT authentication
- Description: Users can log in to receive a JWT. JWT used to protect routes.
- AC: POST /api/users/login returns 200 and {token, user}. Protected endpoints require Authorization: Bearer <token> and return 401 for missing/invalid tokens.
- Files: `BACKEND/src/controller/user.controller.js`, `user.middlewear.js`, `blacklistToken.model.js`, `FRONTEND/src/context/UserContext.jsx`, `FRONTEND/src/auth/UserProtectedWrapper.jsx`
- Error modes: invalid credentials (401), account locked (403)

FR-3: Admin login & role separation
- Description: Admins must authenticate and have access to admin-only routes.
- AC: Admin login returns an admin JWT; admin-protected routes return 403 to non-admins.
- Files: `BACKEND/src/controller/admin.controller.js`, `admin.middlewear.js`, `FRONTEND/src/auth/AdminProtectedWrapper.jsx`

FR-4: Create news article (Admin)
- Description: Admins can create news items with title, body, category, tags, cover image, and publish status.
- AC: POST /api/news returns 201 and created article. Image upload uses multipart/form-data and Cloudinary; server returns image URL.
- Files: `BACKEND/src/controller/news.controller.js`, `news.service.js`, `multer.js`, `src/config/cloudinary.js`, `FRONTEND/src/screens/Admin.jsx`, components like `Card.jsx` for display
- Data shape: {"title":"string","body":"string","summary":"string","category":"string","tags":["string"],"imageUrl":"string","published":true}

FR-5: Read news (public)
- Description: Serve lists of published articles with pagination, sorting (by date, popularity), and filters by category/tag.
- AC: GET /api/news?page=1&limit=10&category=... returns paginated results with total count and items array.
- Files: `news.controller.js`, `news.service.js`, `FRONTEND/src/screens/Home.jsx`, `FRONTEND/src/context/NewsContext.jsx`
- Response shape: {"page":1,"limit":10,"total":100,"items":[{news object},...]}

FR-6: Read single article
- Description: Retrieve a single article by id or slug, including related metadata and optionally comments.
- AC: GET /api/news/:id returns 200 and article JSON; returns 404 if not found.

FR-7: Update and delete news (Admin)
- Description: Admins can update or delete articles.
- AC: PUT /api/news/:id returns 200 with updated object; DELETE /api/news/:id returns 204 on success.
- Files: same as create

FR-8: Search and quick-filter
- Description: Full-text search across title and body and filters for date/category/tag.
- AC: GET /api/news/search?q=... returns relevant ranked results; search supports partial matches.
- Files: `news.controller.js`, `news.service.js`, `FRONTEND` search UI (e.g., `Header.jsx` or `Headermain.jsx`)

FR-9: AI-powered summary (optional)
- Description: Provide short automatic summaries/excerpts for long articles or generate suggested titles/excerpts.
- AC: POST /api/ai/summarize with article text returns {summary}. Works within acceptable latency (e.g., <3s) for small articles.
- Files: `BACKEND/src/controller/ai.controller.js`, `ai.services.js`, `FRONTEND` admin UI to call AI
- Inputs/outputs contract: {text: string} -> {summary: string}

FR-10: User profile & logs
- Description: Users can view/update profile and view their activity logs.
- AC: GET/PUT /api/users/:id profile endpoints protected by token; return 403 if attempting to modify another user's profile without admin role.
- Files: `user.controller.js`, `user.services.js`, `FRONTEND/src/screens/UserLogs.jsx`

FR-11: Notifications and updates subscription
- Description: Users can subscribe to newsletters or push notifications for categories.
- AC: POST /api/subscribe returns 200; email opt-in stores subscription record; server can schedule sends (out of scope: scheduling implementation).
- Files: `user.services.js`, `FRONTEND/src/screens/SendUpdates.jsx`

FR-12: Rate limiting and abuse prevention
- Description: Apply rate limits (per IP and per user) on critical endpoints (login, ai, register) to prevent abuse.
- AC: Excess requests return 429 with appropriate Retry-After header.
- Files: middleware to be added or configured (not present in current repo)

FR-13: Logout & token blacklisting
- Description: Users can logout and the server blacklists tokens so they cannot be reused.
- AC: POST /api/users/logout invalidates the token (store in `blacklistToken.model.js`) and returns 200.

FR-14: Admin analytics (basic)
- Description: Admins can see counts: total users, total articles, articles by category, recent activity.
- AC: GET /api/admin/analytics returns basic stats, accessible to admin only.
- Files: `admin.controller.js`, `admin.services.js`

Data Models (summary)
---------------------
- User: {id, name, email (unique), passwordHash, role: ['user'|'admin'], createdAt, updatedAt, profileFields...}
- News: {id, title, body, summary, slug, category, tags:[], imageUrl, authorId, published:Boolean, publishedAt, views, createdAt, updatedAt}
- BlacklistToken: {token, userId, blacklistedAt, expiresAt}
- Subscription: {id, email, categories:[], confirmed:Boolean, createdAt}

API Contract (short)
---------------------
- Inputs: JSON for most endpoints; multipart/form-data for image uploads.
- Outputs: JSON (200/201/204/4xx/5xx). Error object shape: {"error": "message", "code": "string", "details": {...}}
- Authentication: JWT in Authorization header as Bearer token.

Non-Functional Requirements (NFR)
--------------------------------
These are measurable, where possible.

NFR-1: Performance
- Target: 95th percentile response time for GET /api/news (list) < 200ms under typical load (small dataset). AI endpoints may be slower (<3s).
- Acceptable: 99th percentile < 1s for simple reads.

NFR-2: Availability
- Target: 99.5% uptime for the API during production hours.

NFR-3: Scalability
- The system must scale horizontally: stateless API servers, externalize sessions via JWT, media stored in Cloudinary. DB should support read replicas.

NFR-4: Security
- Use HTTPS in production. Store passwords hashed with bcrypt (or Argon2) and never log secrets.
- JWT secret and Cloudinary credentials must be in environment variables (see `BACKEND/src/config/config.js`).
- Implement input validation and sanitize HTML in article body to prevent XSS.
- Enforce role-based access control: admin vs user.

NFR-5: Data retention & backups
- Backups: DB backups daily and retained for 30 days (implementation/ops requirement).

NFR-6: Fault tolerance & error handling
- Return meaningful HTTP error codes with JSON error payload. Implement retries on transient external failures (e.g., Cloudinary upload), with exponential backoff in services.

NFR-7: Observability
- Structured logs (JSON) with correlation IDs. Expose basic metrics (request count, errors, latency) and hooks for Prometheus/Grafana.

NFR-8: Maintainability
- Code should have unit tests for services and controllers. Keep code modular: controllers thin, services contain business logic.
- Follow linting rules (frontend already has `eslint.config.js`).

NFR-9: Usability & Accessibility
- Frontend accessible to WCAG 2.1 AA where feasible. Responsive design for mobile.

NFR-10: Privacy & Compliance
- Comply with applicable laws (store user consent for newsletters; provide an endpoint to delete user data on request).

Quality Gates & Tests
---------------------
- Unit tests: controllers and services. At minimum: user registration/login, news CRUD happy path + 1 negative case.
- Integration tests: protected endpoints with JWTs.
- Lint: run ESLint for frontend and lint rules for backend (add if missing).
- Smoke test: run the backend server and ensure GET /api/news returns 200.

Edge Cases and Risks
--------------------
- Large article uploads or huge images — impose size limits at client and server (e.g., 5MB image limit).
- Concurrent edits — implement optimistic locking/versioning if simultaneous admin edits are likely.
- Token leak — ensure tokens expire reasonably (e.g., 1h access tokens, refresh tokens if implemented) and blacklist on logout.
- AI feature cost and latency — if using third-party LLM APIs, monitor cost and add rate-limiter/quota.

Mapping requirements to repo files (quick)
-----------------------------------------
- Auth / users: `BACKEND/src/controller/user.controller.js`, `BACKEND/src/models/user.model.js`, `BACKEND/src/middlewear/user.middlewear.js`
- Admin: `BACKEND/src/controller/admin.controller.js`, `BACKEND/src/middlewear/admin.middlewear.js`
- News: `BACKEND/src/controller/news.controller.js`, `BACKEND/src/services/news.service.js`
- AI: `BACKEND/src/controller/ai.controller.js`, `BACKEND/src/services/ai.services.js`
- Cloudinary image uploads: `BACKEND/src/config/cloudinary.js`, `BACKEND/src/middlewear/multer.js`
- Frontend contexts/wrappers: `FRONTEND/src/context/NewsContext.jsx`, `FRONTEND/src/auth/*ProtectedWrapper.jsx`

Acceptance Criteria (example set for release)
---------------------------------------------
- AC-1: Users can register and login; login returns a JWT and protected user endpoints return 401 without it.
- AC-2: Admins can create/update/delete articles and published articles are visible on the public homepage.
- AC-3: Image uploads store to Cloudinary and the frontend displays images by URL.
- AC-4: Search returns relevant results and supports pagination.

Next Steps (suggested)
----------------------
1. Review and confirm scope and priorities (which FRs are MVP vs later).
2. Create a minimal API tests suite (start with user and news happy paths).
3. Add rate limiting middleware and input validation (e.g., Joi/Zod).
4. Implement monitoring/logging configuration.

If you'd like, I can:
- Convert this file into a prioritized backlog (MVP vs v1 vs v2).
- Create simple unit tests for `user.services` and `news.service`.
- Add an issue template or GitHub project board entries derived from these requirements.

Requirements coverage: This document aims to cover core functional scenarios (auth, CRUD, search, AI) and primary non-functional concerns (performance, security, observability). Any specific missing features (e.g., comments, social auth, payments) should be listed and prioritized.


