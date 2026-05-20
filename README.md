# 🌉 CareerBridge

<div align="center">

![CareerBridge Banner](https://img.shields.io/badge/CareerBridge-Connecting_Talent_with_Opportunity-4F46E5?style=for-the-badge&logo=briefcase&logoColor=white)

[![GitHub repo](https://img.shields.io/badge/GitHub-CareerBridge-181717?style=flat-square&logo=github)](https://github.com/shivaa-palaniyappan/CareerBridge)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)]()
[![Contributors](https://img.shields.io/badge/Contributors-2-blue?style=flat-square)]()

**CareerBridge** is a full-stack career platform that bridges the gap between job seekers and employers — enabling seamless job discovery, application management, and professional networking.

</div>

---

## 🚀 About the Project

**CareerBridge** is designed to solve the fragmented experience of job hunting and recruitment. Whether you're a student seeking internships, a professional exploring opportunities, or a recruiter looking for top talent — CareerBridge provides a unified, intuitive platform for all things career-related.

Key goals:
- Simplify the job search and application process
- Help employers post, manage, and review job listings efficiently
- Enable professionals to build a strong public profile and portfolio
- Provide smart filtering and recommendations for better job-candidate matching

---

## ✨ Features

### For Job Seekers
- 📄 **Profile Creation** — Build a professional profile with skills, experience, and resume upload
- 🔍 **Smart Job Search** — Filter by role, location, salary, company, and job type
- 📬 **One-Click Apply** — Apply to jobs directly within the platform
- 📊 **Application Tracker** — Track the status of all submitted applications
- 🔔 **Job Alerts** — Get notified when new roles matching your preferences are posted

### For Employers / Recruiters
- 🏢 **Company Dashboard** — Manage your company profile and branding
- 📝 **Job Posting** — Create, edit, and manage job listings with detailed descriptions
- 👥 **Applicant Management** — Review, shortlist, and message candidates
- 📈 **Analytics** — Insights into job post performance and applicant statistics

### General
- 🔐 **Authentication** — Secure sign-up/login with JWT-based auth
- 🌐 **Responsive Design** — Fully optimized for desktop and mobile
- 🛡️ **Role-Based Access Control** — Separate views and permissions for seekers, recruiters, and admins

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js / Next.js, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB / PostgreSQL |
| **Authentication** | JWT, bcrypt |
| **File Storage** | Cloudinary / AWS S3 (resume/profile images) |
| **Version Control** | Git & GitHub |
| **Deployment** | Vercel (Frontend), Render / Railway (Backend) |

> **Note:** Update this section to match the actual tech stack used in the project.

---

## 📁 Project Structure

```
CareerBridge/
├── client/                  # Frontend (React / Next.js)
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route-based pages
│   │   ├── hooks/           # Custom React hooks
│   │   ├── context/         # Global state (Auth, Theme, etc.)
│   │   ├── services/        # API call functions
│   │   └── utils/           # Helper functions
│   └── package.json
│
├── server/                  # Backend (Node.js / Express)
│   ├── controllers/         # Route logic
│   ├── models/              # Database schemas / models
│   ├── routes/              # API route definitions
│   ├── middleware/          # Auth, error handling, etc.
│   ├── config/              # DB and environment config
│   └── package.json
│
├── .env.example             # Sample environment variables
├── .gitignore
├── README.md
└── package.json             # Root-level scripts (optional monorepo)
```

---

## 🏁 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- A running instance of MongoDB or PostgreSQL (local or cloud)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/shivaa-palaniyappan/CareerBridge.git
cd CareerBridge
```

2. **Install server dependencies**

```bash
cd server
npm install
```

3. **Install client dependencies**

```bash
cd ../client
npm install
```

### Environment Variables

Create a `.env` file in the `server/` directory using the provided example:

```bash
cp .env.example server/.env
```

Fill in the following variables:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=your_mongodb_connection_string
# or
DATABASE_URL=your_postgresql_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# File Storage (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Client URL (for CORS)
CLIENT_URL=http://localhost:3000
```

For the `client/`, create a `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Running the App

**Run the backend server:**

```bash
cd server
npm run dev
```

**Run the frontend (in a new terminal):**

```bash
cd client
npm run dev
```

The app will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

---

## 📖 Usage

1. **Register** as a Job Seeker or Employer on the sign-up page.
2. **Complete your profile** — add skills, experience, or company details.
3. **Job Seekers:** Browse the job board, use filters, and apply to listings.
4. **Employers:** Navigate to the dashboard, create a job posting, and manage applicants.
5. **Track** your applications or hiring pipeline in real-time.

---

## 📡 API Documentation

> All API endpoints are prefixed with `/api/v1`

### Auth Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive a JWT token |
| GET | `/auth/me` | Get current logged-in user |
| POST | `/auth/logout` | Logout user |

### Job Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/jobs` | Get all job listings |
| GET | `/jobs/:id` | Get a specific job |
| POST | `/jobs` | Create a job (Employer only) |
| PUT | `/jobs/:id` | Update a job (Employer only) |
| DELETE | `/jobs/:id` | Delete a job (Employer only) |

### Application Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/jobs/:id/apply` | Apply to a job |
| GET | `/applications` | Get user's applications |
| GET | `/applications/:id` | Get a specific application |
| PUT | `/applications/:id/status` | Update application status (Employer) |

### User Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/:id` | Get a user profile |
| PUT | `/users/:id` | Update profile |
| POST | `/users/upload-resume` | Upload resume |

> For detailed request/response schemas, refer to the Postman collection in `/docs` (if available).

---

## 🤝 Contributing

Contributions are what make open source projects thrive. Any contributions you make are **greatly appreciated**.

1. **Fork** the repository
2. **Create your branch**: `git checkout -b feature/YourFeatureName`
3. **Commit your changes**: `git commit -m "feat: add YourFeatureName"`
4. **Push to the branch**: `git push origin feature/YourFeatureName`
5. **Open a Pull Request**

### Commit Convention

Use the following prefixes for clean commit history:

| Prefix | Usage |
|--------|-------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation update |
| `style:` | Formatting, no logic change |
| `refactor:` | Code restructuring |
| `test:` | Adding or updating tests |
| `chore:` | Maintenance / dependency updates |

---

## 👥 Collaborators

| Name | GitHub | Role |
|------|--------|------|
| Shivaa Palaniyappan | [@shivaa-palaniyappan](https://github.com/shivaa-palaniyappan) | Project Owner / Lead Developer |
| Yathin | [@yathin07](https://github.com/yathin07) | Collaborator / Developer |

---

## 🗺️ Roadmap

- [x] User authentication (JWT)
- [x] Job listing and search
- [x] Application submission
- [ ] Real-time notifications (WebSocket / Socket.io)
- [ ] AI-powered job recommendations
- [ ] Resume parser (upload & auto-fill profile)
- [ ] In-app messaging between candidates and recruiters
- [ ] Admin dashboard
- [ ] Mobile app (React Native)

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

## 📬 Contact

**Shivaa Palaniyappan**
- GitHub: [@shivaa-palaniyappan](https://github.com/shivaa-palaniyappan)

**Yathin**
- GitHub: [@yathin07](https://github.com/yathin07)

**Live Link:** [https://github.com/shivaa-palaniyappan/CareerBridge](https://careerbridge-tau.vercel.app/)

---

<div align="center">
  Made with ❤️ by the CareerBridge Team
</div>
