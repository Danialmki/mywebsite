#!/bin/bash

echo "🚀 Starting Panahi Academy - Full Stack Application"
echo "=================================================="

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ Error: pnpm is not installed. Please install pnpm first."
    exit 1
fi

# Check if we're in the correct directory
if [ ! -f "package.json" ] || [ ! -d "acd-payload" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the project root directory."
    exit 1
fi

echo "📦 Installing dependencies..."
pnpm install:all

echo "🔧 Setting up environment variables..."

# Create backend environment file if it doesn't exist
if [ ! -f "acd-payload/.env.local" ]; then
    echo "PAYLOAD_SECRET=your-secret-key-here" > acd-payload/.env.local
    echo "DATABASE_URI=mongodb://localhost:27017/panahi-academy" >> acd-payload/.env.local
    echo "✅ Created backend environment file"
fi

# Create frontend environment file if it doesn't exist
if [ ! -f "frontend/.env.local" ]; then
    echo "NEXT_PUBLIC_API_URL=http://localhost:3000" > frontend/.env.local
    echo "✅ Created frontend environment file"
fi

echo ""
echo "🌐 Starting services..."
echo "   Backend (Payload CMS): http://localhost:4000"
echo "   Frontend (Next.js):    http://localhost:3000"
echo "   Admin Panel:           http://localhost:4000/admin"
echo ""

# Start both services
pnpm dev
