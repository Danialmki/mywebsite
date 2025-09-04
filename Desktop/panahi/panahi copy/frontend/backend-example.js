// Example Backend API (Node.js/Express)
// This is an example of how your backend API should be structured
// You can use this as a reference to build your actual backend

const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sample course data
const courses = [
  {
    id: 1,
    title: "English Grammar Fundamentals",
    description:
      "Master the basics of English grammar with comprehensive lessons covering parts of speech, sentence structure, and common grammar rules.",
    price: 49.99,
    originalPrice: 79.99,
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
    duration: "8 weeks",
    level: "Beginner",
    lessons: 24,
    students: 1250,
    rating: 4.8,
    blogId: "english-grammar-fundamentals",
  },
  {
    id: 2,
    title: "Business English Communication",
    description:
      "Develop professional English skills for the workplace, including business writing, presentations, and cross-cultural communication.",
    price: 89.99,
    originalPrice: 129.99,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
    duration: "10 weeks",
    level: "Intermediate",
    lessons: 32,
    students: 890,
    rating: 4.9,
    blogId: "business-english-communication",
  },
  {
    id: 3,
    title: "Advanced English Writing",
    description:
      "Enhance your writing skills with advanced techniques for essays, reports, creative writing, and academic papers.",
    price: 69.99,
    originalPrice: 99.99,
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop",
    duration: "12 weeks",
    level: "Advanced",
    lessons: 28,
    students: 650,
    rating: 4.7,
    blogId: "advanced-english-writing",
  },
];

// Sample blog posts data
const blogPosts = [
  {
    id: "english-grammar-fundamentals",
    title: "English Grammar Fundamentals",
    description:
      "Master the basics of English grammar with comprehensive lessons covering parts of speech, sentence structure, and common grammar rules.",
    excerpt:
      "Build a strong foundation in English grammar with our comprehensive course designed for beginners. Learn essential concepts through interactive lessons and practical exercises.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
    price: 49.99,
    originalPrice: 79.99,
    duration: "8 weeks",
    level: "Beginner",
    lessons: 24,
    students: 1250,
    rating: 4.8,
    instructor: "Dr. Sarah Johnson",
    publishDate: "December 15, 2024",
    readTime: "8 weeks",
    category: "Grammar",
    tags: ["Grammar", "Beginner", "Fundamentals", "Writing"],
  },
  {
    id: "business-english-communication",
    title: "Business English Communication",
    description:
      "Develop professional English skills for the workplace, including business writing, presentations, and cross-cultural communication.",
    excerpt:
      "Excel in professional settings with essential business English skills. Master workplace communication, presentations, and cross-cultural interactions.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop",
    price: 89.99,
    originalPrice: 129.99,
    duration: "10 weeks",
    level: "Intermediate",
    lessons: 32,
    students: 890,
    rating: 4.9,
    instructor: "Prof. Michael Chen",
    publishDate: "December 10, 2024",
    readTime: "10 weeks",
    category: "Business",
    tags: ["Business", "Communication", "Professional", "Workplace"],
  },
  {
    id: "advanced-english-writing",
    title: "Advanced English Writing",
    description:
      "Enhance your writing skills with advanced techniques for essays, reports, creative writing, and academic papers.",
    excerpt:
      "Take your writing to the next level with advanced techniques for essays, reports, and creative writing. Perfect for academic and professional contexts.",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop",
    price: 69.99,
    originalPrice: 99.99,
    duration: "12 weeks",
    level: "Advanced",
    lessons: 28,
    students: 650,
    rating: 4.7,
    instructor: "Dr. Emily Rodriguez",
    publishDate: "December 8, 2024",
    readTime: "12 weeks",
    category: "Writing",
    tags: ["Writing", "Advanced", "Academic", "Creative"],
  },
];

// API Routes

// GET /api/courses - Get all courses
app.get("/api/courses", (req, res) => {
  const { level } = req.query;

  if (level && level !== "all") {
    const filteredCourses = courses.filter((course) => course.level === level);
    res.json(filteredCourses);
  } else {
    res.json(courses);
  }
});

// GET /api/courses/:id - Get a specific course
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.json(course);
});

// GET /api/blogs - Get all blog posts
app.get("/api/blogs", (req, res) => {
  const { category } = req.query;

  if (category && category !== "all") {
    const filteredPosts = blogPosts.filter(
      (post) => post.category === category
    );
    res.json(filteredPosts);
  } else {
    res.json(blogPosts);
  }
});

// GET /api/blogs/:id - Get a specific blog post
app.get("/api/blogs/:id", (req, res) => {
  const post = blogPosts.find((p) => p.id === req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Blog post not found" });
  }

  res.json(post);
});

// POST /api/courses - Create a new course
app.post("/api/courses", (req, res) => {
  const newCourse = {
    id: courses.length + 1,
    ...req.body,
  };

  courses.push(newCourse);
  res.status(201).json(newCourse);
});

// PUT /api/courses/:id - Update a course
app.put("/api/courses/:id", (req, res) => {
  const courseIndex = courses.findIndex(
    (c) => c.id === parseInt(req.params.id)
  );

  if (courseIndex === -1) {
    return res.status(404).json({ message: "Course not found" });
  }

  courses[courseIndex] = { ...courses[courseIndex], ...req.body };
  res.json(courses[courseIndex]);
});

// DELETE /api/courses/:id - Delete a course
app.delete("/api/courses/:id", (req, res) => {
  const courseIndex = courses.findIndex(
    (c) => c.id === parseInt(req.params.id)
  );

  if (courseIndex === -1) {
    return res.status(404).json({ message: "Course not found" });
  }

  courses.splice(courseIndex, 1);
  res.status(204).send();
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});

module.exports = app;

