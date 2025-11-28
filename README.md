README – Gloton (Full Stack Food Delivery App)
4
🍔 Gloton – Full-Stack Restaurant Discovery & Food Ordering App

Gloton is a full-stack web application inspired by modern food-delivery platforms.
Users can search restaurants, auto-complete addresses, view real restaurants from Google Places, and order food from a local database.

The project integrates React + Node.js + MongoDB with Google Maps Platform APIs and is fully deployed on:

🌐 Frontend (Netlify):

➡️ https://gloton.netlify.app
(example — replace with your real domain)

⚙️ Backend (Render):

➡️ https://gloton-backend.onrender.com
(example — replace with your real backend domain)

🚀 Features
🔎 Restaurant Discovery

Search restaurants near the user location

Google Places Nearby Search

Google Places Photos

Local restaurant database mixed with real data

📍 Smart Geolocation

Detect current coordinates

Autocomplete addresses

Convert any address → precise lat/lng

🗺️ Interactive Maps

Google Maps React SDK

Restaurant markers

Smooth animations & UX

🧺 Basket & Orders

Add/remove products

Confirm orders

Store orders in MongoDB

🛠️ Modern Stack

Frontend: React + Vite + Framer Motion

Backend: Node.js + Express

Database: MongoDB Atlas

APIs: Google Places, Geocoding, Maps

Deploy: Netlify (FE) + Render (BE)

🧱 Architecture
Gloton
│
├── Frontend (React + Vite)
│ ├── Restaurant search UI
│ ├── Google autocomplete
│ ├── Map component
│ ├── Basket & order flow
│ └── Fetches data from backend
│
├── Backend (Node.js + Express)
│ ├── /api/autocomplete
│ ├── /api/geocode
│ ├── /api/restaurants
│ ├── /api/orders
│ └── Communicates with Google APIs
│
└── MongoDB (Atlas)
├── Restaurants
├── Orders
└── Users (optional)

⚙️ Tech Stack
Frontend

React

Vite

React Router

Framer Motion

@vis.gl/react-google-maps

CSS Modules

Backend

Node.js

Express

Mongoose

Axios (Google API calls)

Database

MongoDB Atlas

APIs

Google Places

Google Geocoding

Google Maps JavaScript SDK

🔧 Environment Variables
🟦 Frontend (.env)
VITE_BACKEND_URL=https://YOUR_BACKEND_URL
VITE_GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY

🟧 Backend (.env)
MONGO_URL=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/?retryWrites=true&w=majority
GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
PORT=3001

▶️ Run Locally
1️⃣ Clone the repo
git clone https://github.com/zmetreveli/Gloton
cd Gloton

2️⃣ Install Frontend
cd frontend
npm install
npm run dev

3️⃣ Install Backend
cd backend
npm install
npm run dev

🧪 API Documentation
GET /api/autocomplete
/api/autocomplete?input=barcelona

Returns Google Places predictions.

GET /api/geocode
/api/geocode?text=Barcelona

GET /api/restaurants/nearby
/api/restaurants/nearby?lat=41.4&lng=2.16

POST /api/orders
{
"items": [...],
"total": 25.50
}

📸 Screenshots
🏁 Deployment
Frontend (Netlify)

Runs npm run build

Publishes /dist

Backend (Render)

Docker-based deployment

Auto-deploys on push

Exposes /api/ endpoints

MongoDB Atlas

Cluster configured with IP 0.0.0.0/0

User + password auth

👨‍💻 Author

Zurab Metreveli
Full Stack Developer — React · Node.js · C · Google APIs
GitHub: https://github.com/zmetreveli

Portfolio: https://zmetreveli.com

Location: Barcelona 🇪🇸

⭐ Like the project?

Give it a star ⭐ on GitHub — it helps visibility a lot!
