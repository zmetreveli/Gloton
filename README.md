# 🍽️ Gloton — Full-Stack Restaurant Finder (Express + MongoDB + React)

Gloton is a full-stack web application that helps users discover nearby real restaurants using **Google Places API**, combined with your own curated database.  
Built with **React + Vite** on the frontend and **Node.js + Express + MongoDB** on the backend.

The project integrates **location autocomplete**, **current-location detection**, and **real-time restaurant search** around any place.

---

## 🚀 Features

- 🔍 **Google Places Autocomplete** for searching cities, streets, or places  
- 📍 **Current-location detection** (Geolocation API)  
- 🍕 **Nearby Restaurants Search** using Google Places API  
- 🔗 **Merging results** from Google Places with your own database restaurants  
- 🗺️ **Map View** with pins  
- 🖼️ **Restaurant photos** served through Google Places `place/photo` API  
- ⚡ Fast SPA built with **React + Vite**  
- 🌐 Backend API with **Express + MongoDB**  
- 🔄 Fully connected Front + Back through REST  
- 📦 Deployment-ready (Netlify + Railway / Render)

---

## 🏗️ Tech Stack

### **Frontend**
- React (Vite)
- React Router
- Framer Motion
- Axios / Fetch
- CSS Modules
- Google Places JS SDK

### **Backend**
- Node.js  
- Express  
- MongoDB (Mongoose ODM)  
- REST API  
- CORS / dotenv

### **External APIs**
- Google Places API  
  - Autocomplete  
  - Place Details  
  - Nearby Search  
  - Place Photos  

---

## 📸 Screenshots

<img width="2863" height="1699" alt="Screenshot from 2025-11-28 16-31-17" src="https://github.com/user-attachments/assets/bc0b8da2-e37c-426f-a2b2-301a7c2078bf" />

<img width="2863" height="1699" alt="Screenshot from 2025-11-28 16-32-36" src="https://github.com/user-attachments/assets/6b772964-9bf4-49f7-8a8b-12913f9d8091" />

<img width="2863" height="1699" alt="Screenshot from 2025-11-28 16-33-21" src="https://github.com/user-attachments/assets/41682b60-6b83-4554-a0ad-3bc5b8bcfde7" />


## 🧩 Project Architecture

Gloton/
├── frontend/ # React + Vite SPA
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── utils/
│ │ ├── contexts/
│ │ └── assets/
│ └── vite.config.js
│
├── backend/ # Express API + MongoDB
│ ├── src/
│ │ ├── models/ # Mongoose schemas
│ │ ├── routes/ # REST endpoints
│ │ ├── controllers/ # Business logic
│ │ └── utils/
│ └── server.js
│
└── README.md


---

## 🌍 How Gloton Works (Flow)

### **1. User types a location**  
Frontend calls Google Places **Autocomplete**.

### **2. User selects a place**  
You receive:
- latitude  
- longitude  
- place_id  

### **3. Backend calls Google Places Nearby Search**  
Using:
- `/place/nearbysearch/json`

### **4. App fetches photo URLs**  
Using:
- `/place/photo?maxwidth=400&photo_reference=...`

### **5. App merges results with your MongoDB restaurants**  
Your DB → name, type, custom categories  
Google → photos, rating, real location  

### **6. Everything is displayed beautifully in the frontend**  
Restaurant grid + map component.

---

## ⚙️ Installation

### **1. Clone the repository**

```bash
git clone https://github.com/zmetreveli/gloton.git
cd gloton

🖥️ Frontend Setup (React + Vite)

cd frontend
npm install

**Environment variables**
Create .env:

VITE_BACKEND_URL=http://localhost:3001

** Run frontend**
npm run dev

🛠️ Backend Setup (Express + MongoDB)

cd backend
npm install

**Environment variables**
Create .env:

PORT=3001
MONGO_URI=mongodb://localhost:27017/gloton
GOOGLE_PLACES_API_KEY=YOUR_GOOGLE_API_KEY

Run the backend
npm run dev


🔗 Backend API Endpoints
GET /api/restaurants/nearby

Search restaurants near coordinates.

Query

?lat=41.3874&lng=2.1686

GET /api/restaurants/search

Search by text (Autocomplete forwarding).

POST /api/restaurants

Insert your own custom restaurants in MongoDB.

GET /api/restaurants/:id

Get restaurant details.

☁️ Deployment
Frontend (Netlify)

Connect your GitHub repo

Build command:

npm run build


Publish directory:

dist

Backend (Railway / Render)

Add environment variables (PORT, MONGO_URI, GOOGLE_PLACES_API_KEY)

Deploy automatically from GitHub

Allow CORS from your Netlify domain


| Variable                | Used In  | Description               |
| ----------------------- | -------- | ------------------------- |
| `VITE_BACKEND_URL`      | Frontend | URL of the Express server |
| `GOOGLE_PLACES_API_KEY` | Backend  | Places API key            |
| `MONGO_URI`             | Backend  | MongoDB connection string |
| `PORT`                  | Backend  | Server port               |





👨‍💻 Author

Zurab Metreveli
Full-Stack Developer (React · Node.js)
42 Barcelona

📜 License

MIT License.


⭐ Support the Project

If you like Gloton, leave a ⭐ on GitHub!










