# PawMart - Premium Pet Supplies Store

PawMart is a modern, high-performance e-commerce platform built for pet owners who want the best for their companions. Built with React 18, Vite, Tailwind CSS, and Framer Motion.

## Features
- **Modern UI/UX**: Premium aesthetic with distinctive typography and smooth animations.
- **Real Authentication**: LocalStorage-backed registration and login system.
- **Cart Management**: Add, remove, and update products in your bag.
- **Product Filtering**: Extensive search and filter capabilities by category, price, and rating.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens.
- **Image Fallbacks**: Robust handling of external assets with graceful failure modes.

---

## 🚀 Running Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- npm or yarn

### Steps
1. **Clone or Download** the project code.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Start Development Server**:
   ```bash
   npm run dev
   ```
4. **Open the browser**: Navigate to `http://localhost:3000` (or the port specified in your terminal).

---

## 🐳 Running with Docker

This application includes a production-ready `Dockerfile` using Nginx to serve the static build.

### Build the Image
```bash
docker build -t pawmart-app .
```

### Run the Container
```bash
docker run -p 8080:80 pawmart-app
```
Then visit `http://localhost:8080`.

---

## ☁️ Deploying to Vercel

PawMart is "Vercel-ready". It includes a `vercel.json` file to handle SPA routing (ensuring deep links work correctly).

### Deployment Steps
1. **Push to GitHub**: Upload your code to a GitHub repository.
2. **Connect to Vercel**:
   - Go to [Vercel](https://vercel.com/) and click **Add New > Project**.
   - Import your GitHub repository.
   - Vercel will automatically detect the Vite framework.
3. **Click Deploy**: Your app will be live in seconds.

**Note on Docker & Vercel**: 
Vercel is a serverless platform for frontends and typically doesn't use your `Dockerfile`. It builds the app directly from your `package.json`. Docker is provided for alternative deployment environments like AWS, GCP, or private servers.

---

## 🛠️ Tech Stack
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion (motion/react)
- **Routing**: React Router DOM v6
- **State**: React Context API
