# Panahi Academy - Full Stack Application

This is a full-stack application consisting of:
- **Backend**: Payload CMS (Node.js/TypeScript) running on port 3000
- **Frontend**: Next.js application running on port 3001

## 🚀 Quick Start

### Prerequisites

- Node.js (^18.20.2 || >=20.9.0)
- pnpm (^9 || ^10)
- MongoDB (for Payload CMS backend)

### Installation

1. **Install all dependencies:**
   ```bash
   pnpm install:all
   ```

2. **Set up environment variables:**
   
   Create `.env.local` in the `acd-payload` directory:
   ```bash
   cd acd-payload
   cp .env.example .env.local
   # Edit .env.local with your MongoDB connection string and other settings
   ```

   Create `.env.local` in the `frontend` directory:
   ```bash
   cd frontend
   echo "NEXT_PUBLIC_API_URL=http://localhost:3000" > .env.local
   ```

### Running the Application

#### Option 1: Quick Start (Recommended)
```bash
./start.sh
```

This script will:
- Install all dependencies
- Set up environment variables
- Start both services

#### Option 2: Manual Start
```bash
pnpm dev
```

This will start:
- Backend (Payload CMS) on http://localhost:4000
- Frontend (Next.js) on http://localhost:3000

#### Option 3: Run Services Individually

**Backend only:**
```bash
pnpm dev:backend
```

**Frontend only:**
```bash
pnpm dev:frontend
```

## 📁 Project Structure

```
panahi/
├── acd-payload/          # Backend - Payload CMS
│   ├── src/
│   │   ├── app/          # Next.js app directory
│   │   ├── collections/  # Payload collections
│   │   ├── blocks/       # Payload blocks
│   │   └── ...
│   ├── payload.config.ts # Payload configuration
│   └── package.json
├── frontend/             # Frontend - Next.js
│   ├── src/
│   │   ├── app/          # Next.js app directory
│   │   ├── components/   # React components
│   │   └── lib/          # Utilities and API
│   └── package.json
└── package.json          # Root package.json for managing both services
```

## 🔧 Configuration

### Backend (Payload CMS)
- **Port**: 4000
- **Admin Panel**: http://localhost:4000/admin
- **API**: http://localhost:4000/api
- **GraphQL**: http://localhost:4000/api/graphql

### Frontend (Next.js)
- **Port**: 3000
- **URL**: http://localhost:3000
- **API Endpoint**: http://localhost:4000/api (connects to backend)

## 🌐 Service URLs

When both services are running, you can access:

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:4000/api
- **Payload Admin Panel**: http://localhost:4000/admin
- **GraphQL Playground**: http://localhost:4000/api/graphql-playground

## 🛠️ Development

### Available Scripts

**Root level:**
- `pnpm dev` - Run both backend and frontend in development mode
- `pnpm build` - Build both applications for production
- `pnpm start` - Start both applications in production mode
- `pnpm lint` - Run linting for both applications

**Backend (acd-payload):**
- `pnpm dev:backend` - Start backend in development mode
- `pnpm build:backend` - Build backend for production
- `pnpm start:backend` - Start backend in production mode

**Frontend (frontend):**
- `pnpm dev:frontend` - Start frontend in development mode
- `pnpm build:frontend` - Build frontend for production
- `pnpm start:frontend` - Start frontend in production mode

### Environment Variables

**Backend (.env.local in acd-payload/):**
```bash
PAYLOAD_SECRET=your-secret-key
DATABASE_URI=your-mongodb-connection-string
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
```

**Frontend (.env.local in frontend/):**
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## 🚀 Deployment

### Production Build
```bash
pnpm build
```

### Production Start
```bash
pnpm start
```

### Deployment Considerations

1. **Backend Deployment**: Payload CMS can be deployed on Vercel, Netlify, or any Node.js hosting platform
2. **Frontend Deployment**: Next.js frontend can be deployed on Vercel, Netlify, or any static hosting platform
3. **Database**: Ensure MongoDB is properly configured for production
4. **Environment Variables**: Set all required environment variables in your hosting platform

## 📚 Documentation

- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Frontend API Setup](./frontend/API_SETUP.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both backend and frontend
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
