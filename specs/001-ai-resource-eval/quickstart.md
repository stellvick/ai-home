# Quickstart: AI Resource Evaluation

**Date**: 2025-11-04
**Feature**: AI Resource Evaluation

## Prerequisites

- Node.js 20+
- PostgreSQL 15+
- Git

## Setup

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd ai-home
   git checkout 001-ai-resource-eval
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Setup database:
   ```bash
   createdb ai_resource_eval
   # Run migrations (assuming migration script exists)
   cd ../backend
   npm run migrate
   ```

5. Configure environment:
   - Copy `.env.example` to `.env`
   - Set database URL, JWT secret, etc.

## Running the Application

1. Start backend:
   ```bash
   cd backend
   npm run dev
   ```

2. Start frontend:
   ```bash
   cd frontend
   npm start
   ```

3. Open http://localhost:3000 in browser

## First Steps

1. Register/Login with JWT
2. Create your first AI resource
3. Evaluate a resource
4. Try the AI chat feature
5. Switch themes in configuration

## Development

- Backend API docs: http://localhost:3000/api/docs
- Frontend dev server: http://localhost:3000
- Database: localhost:5432/ai_resource_eval