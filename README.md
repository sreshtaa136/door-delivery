# 🍲 DoorDel - Food Delivery Application
## 📌 Overview

**DoorDel** is a **food delivery web application** that allows users to:  
✅ **Sign up/Login** and manage their account  
✅ **Browse available food options** and add them to the cart  
✅ **Manage their cart** and modify items before checkout  
✅ **Place food orders** and track their status  
✅ **Securely complete payments** via **Stripe**  
✅ **Enjoy a responsive & user-friendly experience** across all devices

This application was built using the **MERN stack** and is deployed on **Vercel** for seamless performance.

## 🛠️ Tech Stack

- **Frontend:** React.js, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Payment Integration:** Stripe
- **Hosting:** Vercel (Frontend)

## 🔧 Features

- **User Authentication** (Sign up, Login, Logout)
- **Browse Food Options** (Dynamic restaurant menu)
- **Cart Management** (Add and remove items)
- **Order Tracking** (View past & active orders)
- **Secure Payments** with **Stripe**
- **Mobile-Responsive UI** with Material UI

## 🚀 Installation & Setup

1️⃣ Clone the repository:

```bash
git clone https://github.com/yourusername/doordel.git
cd doordel
```

2️⃣ Install dependencies:

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3️⃣ Configure environment variables in **`.env`** file (backend):

```plaintext
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
JWT_SECRET=your_jwt_secret
PORT=your_server_port
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
UI_URLS=your_client_urls (separated by commas)
```

4️⃣ Configure environment variables in **`.env`** file (frontend):

```plaintext
VITE_API_URL=your_api_url
VITE_PORT=your_client_port
```

5️⃣ Start the application:

```bash
# Start backend
cd backend
npm run server

# Start frontend
cd frontend
npm run dev
```

<br>

## 🎯 Future Enhancements

🔹 **Real-time order tracking** with WebSockets  
🔹 **Admin dashboard** for managing food items & orders  
🔹 **User reviews & ratings** for restaurants
