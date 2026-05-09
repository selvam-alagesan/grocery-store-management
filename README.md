# 🛒 Grocery Store Management System

A production-grade full-stack web application to streamline grocery store operations through role-based access control — built during my internship at **Techvolt Software Pvt. Ltd.**

![React](https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express_5-404D59?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=JSON%20web%20tokens)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=flat&logo=bootstrap&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)

---

## 📌 Project Purpose

Manual grocery store operations lead to stockouts, expired product losses, payroll errors, and billing inefficiencies. This system centralises all store operations — inventory, sales, employee management, and payroll — into a single role-scoped digital platform.

---

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React Frontend │────▶│  Express Backend │────▶│  MongoDB Database│
│  (Role Dashboards)│     │   (REST API)     │     │  (6 Collections) │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## 👥 User Roles

| Role | Access Level | Key Responsibilities |
|------|-------------|---------------------|
| **Admin** | Full system control | Employee management, salary admin, sales analytics, inventory oversight |
| **Employee** | Operational | Product inventory, customer billing, attendance tracking |
| **Supervisor** | Middle management | Team attendance, inventory supervision, employee oversight |

---

## ✨ Features

### 🔐 Authentication & Security
- JWT-based authentication with httpOnly secure cookies
- Bcrypt password hashing (10 salt rounds)
- Role-based route protection middleware
- CORS configuration for API security

### 📦 Inventory Management
- Barcode-based product identification
- Expiration date tracking with automated alerts
- Real-time low-stock notifications
- Stock level monitoring and reorder points
- Purchase history and movement tracking

### 💰 Billing System
- Customer transaction recording
- Multiple payment methods supported
- Complete sales history and revenue tracking

### 👨‍💼 Employee Management
- Complete employee lifecycle management
- Daily attendance tracking
- Performance monitoring and reporting

### 💼 Payroll System
- Monthly salary calculations with deductions
- Salary distribution and history tracking

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19.2.0, React Router, React Bootstrap, Axios |
| Backend | Node.js, Express 5.2.1, JWT, Bcrypt, CORS |
| Database | MongoDB, Mongoose ODM |
| Dev Tools | Vite, ESLint, Hot Reload |

---

## 🗄️ Database Schema

6 MongoDB collections:
- **Admin** — system administrator data
- **Employee** — employee profiles and credentials
- **Supervisor** — supervisor profiles and credentials
- **Inventory** — products with barcode, stock, and expiry data
- **Billing** — customer transactions and payment records
- **Salary** — monthly payroll records linked to employees

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/selvam-alagesan/grocery-store-management.git

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Environment Variables

Create a `.env` file in the `/server` directory:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### Run the App

```bash
# Run backend (from /server)
npm start

# Run frontend (from /client)
npm run dev
```

---

## 📁 Project Structure

```
grocery-store-management/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Role-scoped dashboard pages
│   │   └── context/      # Auth context (Context API)
├── server/               # Node.js backend
│   ├── controllers/      # Business logic
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API route definitions
│   └── middleware/       # Auth & RBAC middleware
```

---

## 🔗 API Overview

20+ RESTful endpoints across 3 route modules:

| Module | Endpoints |
|--------|-----------|
| Auth | Login, logout, session validation |
| Inventory | CRUD products, stock alerts, barcode lookup |
| Billing | Create bill, payment processing, history |
| Employee | Add, update, attendance, profile |
| Salary | Calculate, distribute, history |

---

## 👨‍💻 Developer

**Selvam A** — MERN Stack Developer Intern @ Techvolt Software Pvt. Ltd.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/selvamalagesan)
[![Email](https://img.shields.io/badge/Email-D14836?style=flat&logo=gmail&logoColor=white)](mailto:selvamalagesan31@gmail.com)

---

> Built with ❤️ as a production-grade internship project — demonstrating enterprise-level architecture, security best practices, and scalable full-stack development.
