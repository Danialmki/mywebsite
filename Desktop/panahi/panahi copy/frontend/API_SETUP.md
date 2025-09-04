# API Setup Guide

This guide explains how to set up the backend API to work with the Panah Academy frontend.

## 🚀 Quick Start

### 1. Backend Setup

The frontend is now configured to fetch data from a backend API. You have two options:

#### Option A: Use the Example Backend (Recommended for testing)

1. **Install dependencies:**

   ```bash
   npm install express cors
   ```

2. **Run the example backend:**

   ```bash
   node backend-example.js
   ```

3. **The API will be available at:** `http://localhost:3001/api`

#### Option B: Build Your Own Backend

Create your own backend that implements these endpoints:

- `GET /api/courses` - Get all courses
- `GET /api/courses?level=Beginner` - Get courses by level
- `GET /api/courses/:id` - Get a specific course
- `GET /api/blogs` - Get all blog posts
- `GET /api/blogs?category=Grammar` - Get blog posts by category
- `GET /api/blogs/:id` - Get a specific blog post

### 2. Frontend Configuration

The frontend is already configured to work with the API. The API base URL is set in `src/lib/api.ts`:

```typescript
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
```

To use a different API URL, set the environment variable:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://your-api-url.com/api
```

## 📋 API Endpoints

### Courses API

| Method | Endpoint                      | Description           |
| ------ | ----------------------------- | --------------------- |
| GET    | `/api/courses`                | Get all courses       |
| GET    | `/api/courses?level=Beginner` | Get courses by level  |
| GET    | `/api/courses/:id`            | Get a specific course |
| POST   | `/api/courses`                | Create a new course   |
| PUT    | `/api/courses/:id`            | Update a course       |
| DELETE | `/api/courses/:id`            | Delete a course       |

### Blog Posts API

| Method | Endpoint                      | Description                |
| ------ | ----------------------------- | -------------------------- |
| GET    | `/api/blogs`                  | Get all blog posts         |
| GET    | `/api/blogs?category=Grammar` | Get blog posts by category |
| GET    | `/api/blogs/:id`              | Get a specific blog post   |

## 📊 Data Structure

### Course Object

```typescript
interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  duration: string;
  level: string;
  lessons: number;
  students: number;
  rating: number;
  blogId: string;
}
```

### Blog Post Object

```typescript
interface BlogPost {
  id: string;
  title: string;
  description: string;
  excerpt: string;
  image: string;
  price: number;
  originalPrice?: number;
  duration: string;
  level: string;
  lessons: number;
  students: number;
  rating: number;
  instructor: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
}
```

## 🔧 Features

### ✅ Implemented Features

1. **API Integration**: Frontend now fetches data from backend API
2. **Error Handling**: Graceful fallback to mock data if API fails
3. **Loading States**: Shows loading spinner while fetching data
4. **Error States**: Displays error messages with retry functionality
5. **Filtering**: Supports filtering by level and category
6. **Type Safety**: Full TypeScript support with interfaces

### 🎯 Current Implementation

- **Courses Page**: Fetches 3 example courses from API
- **Blogs Page**: Ready to fetch blog posts from API
- **Blog Detail Page**: Ready to fetch individual blog posts
- **Fallback Data**: Mock data available if API is unavailable

## 🚀 Testing the API

1. **Start the backend:**

   ```bash
   node backend-example.js
   ```

2. **Start the frontend:**

   ```bash
   npm run dev
   ```

3. **Test the endpoints:**

   ```bash
   # Get all courses
   curl http://localhost:3001/api/courses

   # Get courses by level
   curl http://localhost:3001/api/courses?level=Beginner

   # Get all blog posts
   curl http://localhost:3001/api/blogs
   ```

## 🔄 Adding More Courses

To add more courses, you can either:

1. **Modify the backend data** in `backend-example.js`
2. **Use the POST endpoint** to create new courses
3. **Connect to a real database** (MySQL, PostgreSQL, MongoDB, etc.)

## 🛠️ Customization

### Environment Variables

Create a `.env.local` file in your project root:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Other configurations
NEXT_PUBLIC_APP_NAME=Panah Academy
```

### Database Integration

To connect to a real database, modify the backend to use:

- **MySQL**: Use `mysql2` package
- **PostgreSQL**: Use `pg` package
- **MongoDB**: Use `mongoose` package
- **SQLite**: Use `sqlite3` package

## 📝 Notes

- The frontend will automatically fall back to mock data if the API is unavailable
- All API calls include proper error handling
- The interface is fully typed with TypeScript
- Loading and error states provide good user experience
- The API supports filtering and pagination (can be extended)

## 🎉 Next Steps

1. **Set up your backend** using the example or build your own
2. **Add more courses** to the database
3. **Implement authentication** if needed
4. **Add more API endpoints** for additional features
5. **Deploy both frontend and backend** to production

