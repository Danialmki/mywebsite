# 🚀 Vercel Deployment Guide for Panahi Academy

## ✅ **What's Been Prepared:**

1. **Frontend Configuration Updated**:
   - ✅ Next.js config updated for production
   - ✅ Image domains configured for your local backend
   - ✅ API URL set to your local IP: `http://185.253.121.180:4000/api`
   - ✅ Vercel configuration file created

2. **Backend Server**:
   - ✅ Running on port 4000
   - ✅ MongoDB Atlas connected
   - ✅ Admin portal accessible

## 📋 **Step-by-Step Deployment Instructions:**

### **Step 1: Deploy to Vercel**

1. **Go to [Vercel.com](https://vercel.com)**
2. **Sign in with your GitHub account**
3. **Click "New Project"**
4. **Import your repository**: `Danialmki/Payload-app`
5. **Select the `payload-cms-project` branch**
6. **Configure the project**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next`
   - **Install Command**: `pnpm install`

### **Step 2: Set Environment Variables**

In Vercel project settings, add these environment variables:

```
NEXT_PUBLIC_API_URL=http://185.253.121.180:4000/api
```

### **Step 3: Deploy**

1. **Click "Deploy"**
2. **Wait for build to complete**
3. **Your site will be live at**: `https://your-project-name.vercel.app`

## 🔧 **Important Notes:**

### **Backend Requirements:**
- ✅ Your backend must be running on `185.253.121.180:4000`
- ✅ MongoDB Atlas IP whitelist must include your current IP
- ✅ CORS must allow requests from Vercel domain

### **Current Setup:**
- **Frontend**: Will be deployed to Vercel
- **Backend**: Running locally on your machine
- **Database**: MongoDB Atlas (cloud)
- **API**: `http://185.253.121.180:4000/api`

## 🚨 **Troubleshooting:**

### **If Images Don't Load:**
- Check that your backend is running
- Verify IP address is correct
- Check CORS settings in backend

### **If API Calls Fail:**
- Ensure backend is running on port 4000
- Check MongoDB connection
- Verify environment variables in Vercel

### **If Build Fails:**
- Check package.json dependencies
- Verify Next.js configuration
- Check for TypeScript errors

## 📞 **Support:**

If you encounter issues:
1. Check Vercel deployment logs
2. Verify backend server status
3. Test API endpoints locally first

## 🎉 **Success Indicators:**

- ✅ Frontend loads without errors
- ✅ Blog posts display correctly
- ✅ Images load from backend
- ✅ API calls work properly
- ✅ Admin portal accessible at `http://185.253.121.180:4000/admin`

---

**Your GitHub Repository**: `Danialmki/Payload-app`
**Branch**: `payload-cms-project`
**Backend URL**: `http://185.253.121.180:4000`
**API Endpoint**: `http://185.253.121.180:4000/api`
