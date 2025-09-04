// API base URL configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

// Auth API base URL
const AUTH_API_BASE_URL = "http://localhost:4000/api/auth";

// Type definitions
export interface Course {
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

export interface Category {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: unknown; // Rich text content from Lexical editor
  heroImage?: {
    id: string;
    url: string;
    alt?: string;
    filename: string;
  };
  categories?: Category[];
  relatedPosts?: BlogPost[];
  meta?: {
    title?: string;
    description?: string;
    image?: {
      id: string;
      url: string;
      alt?: string;
    };
  };
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  _status?: 'draft' | 'published';
}

export interface BlogPostsResponse {
  docs: BlogPost[];
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage?: number;
  prevPage?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  phone?: string;
  dateOfBirth?: string;
  bio?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'student' | 'instructor' | 'admin';
  phone?: string;
  dateOfBirth?: string;
  bio?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Mock data for fallback
const mockCourses: Course[] = [
  {
    id: 1,
    title: "Complete English Grammar Masterclass",
    description:
      "Master all aspects of English grammar from basic to advanced levels. Perfect for students, professionals, and anyone looking to improve their English skills.",
    price: 49.99,
    originalPrice: 99.99,
    image: "/api/placeholder/400/300",
    duration: "8 weeks",
    level: "Beginner",
    lessons: 24,
    students: 1250,
    rating: 4.8,
    blogId: "grammar-masterclass",
  },
  {
    id: 2,
    title: "Business English Communication",
    description:
      "Learn professional English communication skills for the workplace. Includes email writing, presentations, meetings, and networking.",
    price: 79.99,
    originalPrice: 149.99,
    image: "/api/placeholder/400/300",
    duration: "6 weeks",
    level: "Intermediate",
    lessons: 18,
    students: 890,
    rating: 4.9,
    blogId: "business-english",
  },
  {
    id: 3,
    title: "Advanced English Writing & Composition",
    description:
      "Develop advanced writing skills for academic and professional purposes. Learn essay writing, creative writing, and technical writing.",
    price: 89.99,
    originalPrice: 179.99,
    image: "/api/placeholder/400/300",
    duration: "10 weeks",
    level: "Advanced",
    lessons: 30,
    students: 567,
    rating: 4.7,
    blogId: "advanced-writing",
  },
];

const mockBlogPosts: BlogPost[] = [
  {
    id: "grammar-masterclass",
    title: "Complete English Grammar Masterclass",
    slug: "grammar-masterclass",
    content: "Master all aspects of English grammar from basic to advanced levels. Perfect for students, professionals, and anyone looking to improve their English skills.",
    heroImage: {
      id: "1",
      url: "/api/placeholder/400/300",
      filename: "grammar-hero.jpg",
    },
    categories: [
      {
        id: "grammar",
        title: "Grammar",
        slug: "grammar",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
    ],
    meta: {
      title: "Complete English Grammar Masterclass",
      description: "Learn essential grammar rules, sentence structure, and common mistakes to avoid in this comprehensive guide.",
    },
    publishedAt: "2024-01-15T00:00:00Z",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    _status: "published",
  },
  {
    id: "business-english",
    title: "Business English Communication",
    slug: "business-english",
    content: "Learn professional English communication skills for the workplace. Includes email writing, presentations, meetings, and networking.",
    heroImage: {
      id: "2",
      url: "/api/placeholder/400/300",
      filename: "business-hero.jpg",
    },
    categories: [
      {
        id: "business",
        title: "Business",
        slug: "business",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
    ],
    meta: {
      title: "Business English Communication",
      description: "Essential business English skills for professional success in today's global workplace.",
    },
    publishedAt: "2024-01-10T00:00:00Z",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
    _status: "published",
  },
  {
    id: "advanced-writing",
    title: "Advanced English Writing & Composition",
    slug: "advanced-writing",
    content: "Develop advanced writing skills for academic and professional purposes. Learn essay writing, creative writing, and technical writing.",
    heroImage: {
      id: "3",
      url: "/api/placeholder/400/300",
      filename: "writing-hero.jpg",
    },
    categories: [
      {
        id: "writing",
        title: "Writing",
        slug: "writing",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      },
    ],
    meta: {
      title: "Advanced English Writing & Composition",
      description: "Take your writing skills to the next level with advanced techniques and strategies.",
    },
    publishedAt: "2024-01-05T00:00:00Z",
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
    _status: "published",
  },
];

// Helper function to make API requests with error handling
async function apiRequest<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn(`API request failed for ${endpoint}, using mock data:`, error);
    throw error; // Re-throw to trigger fallback
  }
}

// API functions
export async function fetchCoursesByLevel(
  level: string = "all"
): Promise<Course[]> {
  try {
    const endpoint =
      level === "all"
        ? "/courses"
        : `/courses?level=${encodeURIComponent(level)}`;
    return await apiRequest<Course[]>(endpoint);
  } catch {
    // Fallback to mock data
    if (level === "all") {
      return mockCourses;
    }
    return mockCourses.filter(
      (course) =>
        course.level.toLowerCase() === level.toLowerCase() ||
        level === "All Levels"
    );
  }
}

export async function fetchCourseById(id: string): Promise<Course | null> {
  try {
    const courses = await apiRequest<Course[]>(`/courses/${id}`);
    return courses[0] || null;
  } catch {
    // Fallback to mock data
    const course = mockCourses.find((c) => c.id.toString() === id);
    return course || null;
  }
}

export async function fetchBlogPosts(category?: string): Promise<BlogPost[]> {
  try {
    const endpoint = category
      ? `/blogs?category=${encodeURIComponent(category)}`
      : "/blogs";
    return await apiRequest<BlogPost[]>(endpoint);
  } catch {
    // Fallback to mock data
    if (category && category !== 'all') {
      return mockBlogPosts.filter(
        (blog) => blog.categories?.some(cat => cat.slug.toLowerCase() === category.toLowerCase())
      );
    }
    return mockBlogPosts;
  }
}

export async function fetchBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    const blogs = await apiRequest<BlogPost[]>(`/blogs/${id}`);
    return blogs[0] || null;
  } catch {
    // Fallback to mock data
    const blog = mockBlogPosts.find((b) => b.id === id);
    return blog || null;
  }
}

// Blog API functions
export async function getAllPosts(
  page: number = 1,
  limit: number = 12,
  category?: string
): Promise<BlogPostsResponse> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      depth: '1',
    });

    if (category && category !== 'all') {
      params.append('where[categories.slug][equals]', category);
    }

    // Only get published posts
    params.append('where[_status][equals]', 'published');

    const response = await fetch(`${API_BASE_URL}/posts?${params}`);

    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }

    const data = await response.json();
    return {
      docs: data.docs || [],
      totalDocs: data.totalDocs || 0,
      limit: data.limit || limit,
      totalPages: data.totalPages || 1,
      page: data.page || page,
      hasPrevPage: data.hasPrevPage || false,
      hasNextPage: data.hasNextPage || false,
      prevPage: data.prevPage || undefined,
      nextPage: data.nextPage || undefined,
    };
  } catch {
    console.error('Error fetching posts');
    return {
      docs: [],
      totalDocs: 0,
      limit,
      totalPages: 1,
      page,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: undefined,
      nextPage: undefined,
    };
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const response = await fetch(
    `${API_BASE_URL}/posts?where[slug][equals]=${slug}&depth=2&limit=1`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }

  const data = await response.json();
  return data.docs[0] || null;
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories?limit=100&depth=0`);

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data = await response.json();
    return data.docs || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function getRelatedPosts(postId: string, limit: number = 3): Promise<BlogPost[]> {
  const response = await fetch(
    `${API_BASE_URL}/posts?where[id][not_equals]=${postId}&limit=${limit}&depth=1`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch related posts');
  }

  const data = await response.json();
  return data.docs;
}

// Utility function to check if API is available
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Authentication functions
export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  // First, create the user using Payload's built-in endpoint
  const createResponse = await fetch(`${API_BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
    }),
  });

  if (!createResponse.ok) {
    const error = await createResponse.json();
    throw new Error(error.errors?.[0]?.message || "Registration failed");
  }

  const createResult = await createResponse.json();

  // Then, login to get the token
  const loginResponse = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });

  if (!loginResponse.ok) {
    const error = await loginResponse.json();
    throw new Error(error.errors?.[0]?.message || "Login failed after registration");
  }

  const loginResult = await loginResponse.json();

  return {
    message: "User registered successfully",
    user: createResult.doc,
    token: loginResult.token,
  };
}

export async function loginUser(data: LoginData): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Login failed");
  }

  const result = await response.json();

  return {
    message: "Login successful",
    user: result.user,
    token: result.token,
  };
}

export async function logoutUser(token: string): Promise<void> {
  const response = await fetch(`${AUTH_API_BASE_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Logout failed");
  }
}

export async function getCurrentUser(token: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors?.[0]?.message || "Failed to get user");
  }

  const data = await response.json();
  return data.user;
}
