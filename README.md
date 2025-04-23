🚀 FARMER-CONSUMER-MARKER
A modern MERN stack platform connecting farmers and buyers in India for seamless trade and transparency.🌐 Live Project Link (Coming Soon)

📌 About the Project
FARMER-CONSUMER-MARKER is a full-stack MERN application designed to empower Indian farmers by connecting them directly with buyers. It tackles key agricultural challenges like market access, price opacity, and communication barriers. Farmers can list crops, manage orders, and access weather updates, while buyers can browse products, place orders, and chat in real-time. An admin panel provides robust user and listing management with analytics.
Developed by Aman Gupta, a 2nd-year B.Tech CSE student at Hi-Tech Institute of Engineering and Technology, Ghaziabad, this project reflects a passion for leveraging technology to support rural communities and transform agriculture.
💡 Key Features

Farmer Dashboard: Create and manage crop listings with images, pricing, and stock details.
Buyer Dashboard: Browse products, place orders, and track purchases.
Real-Time Chat: Socket.io-powered messaging for seamless communication.
Price Transparency: Real-time and historical price data for informed decisions.
Admin Panel: Manage users, listings, and orders with analytics.
Secure Payments: Razorpay integration for safe transactions.
Weather Updates: Real-time weather data via OpenWeatherMap API.
Multilingual Support: i18next for accessibility across regions.

📁 Folder Structure
BACKEND/
│
├── config/
│   └── db.js
├── controllers/
│   ├── adminController.js
│   ├── chatController.js
│   ├── listingController.js
│   ├── orderController.js
│   ├── priceController.js
│   └── userController.js
├── middleware/
│   ├── auth.js
│   └── upload.js
├── models/
│   ├── admin.js
│   ├── adminOtp.js
│   ├── Chat.js
│   ├── ConsumerDetails.js
│   ├── Listing.js
│   ├── Order.js
│   ├── Otp.js
│   ├── Price.js
│   ├── ResetOtp.js
│   ├── User.js
│   └── Withdrawal.js
├── routes/
│   ├── admin.js
│   ├── chats.js
│   ├── listings.js
│   ├── orders.js
│   ├── prices.js
│   └── users.js
├── upload/
├── .env
├── .gitignore
├── cronJob.js
├── initAdmin.js
├── package.json
├── package-lock.json
├── server.js
│
FRONTEND/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AdminLogin.jsx
│   │   ├── AnalyticsCards.jsx
│   │   ├── BuyNowForm.jsx
│   │   ├── Chat.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── FarmerWeather.jsx
│   │   ├── ListingCard.jsx
│   │   ├── ListingForm.jsx
│   │   ├── Navbar.jsx
│   │   ├── OrderSummary.jsx
│   │   ├── PriceTransparency.jsx
│   │   ├── ProductCards.jsx
│   │   ├── ProductPopup.jsx
│   │   ├── ProfileSection.jsx
│   │   ├── RecentListings.jsx
│   │   ├── UserManagement.jsx
│   │   └── WeatherApp.jsx
│   ├── pages/
│   │   ├── AdminDashboard.jsx
│   │   ├── ConsumerDashboard.jsx
│   │   ├── Contact.jsx
│   │   ├── FarmerDashboard.jsx
│   │   ├── Footer.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Products.jsx
│   │   └── Register.jsx
│   ├── utils/
│   │   ├── api.js
│   │   └── i18n.js
│   ├── app.jsx
│   ├── index.css
│   ├── main.jsx
├── .env
├── .gitignore
├── index.html
├── netlify.toml
├── package.json
├── package-lock.json
├── vite.config.js

⚙️ Technologies Used

Frontend: React.js, Vite, Tailwind CSS, React Router, Socket.io-client, Axios, Chart.js, React-Leaflet, i18next, React-Toastify
Backend: Node.js, Express.js, MongoDB, Socket.io, Razorpay, Cloudinary, JWT, Bcrypt.js, Node-cron, Nodemailer
Authentication: JWT-based authentication for farmers, buyers, and admins
Hosting: Frontend (Netlify, planned), Backend (Render, planned)

📦 Frontend Dependencies



Package
Version



react
^19.0.0


react-dom
^19.0.0


react-router-dom
^7.5.0


axios
^1.8.4


tailwindcss
^4.1.4


@tailwindcss/vite
^4.1.4


react-icons
^5.5.0


react-hook-form
^7.55.0


framer-motion
^12.6.3


react-toastify
^11.0.5


chart.js
^4.4.9


react-leaflet
^5.0.0


i18next
^25.0.0


react-i18next
^15.4.1


react-scroll
^1.9.3


socket.io-client
^4.8.1


🛠️ Backend Dependencies



Package
Version



express
^5.1.0


mongoose
^8.13.2


cors
^2.8.5


dotenv
^16.5.0


multer
^1.4.5-lts.2


cloudinary
^2.6.0


uuid
^11.1.0


nodemailer
^6.10.1


nodemon
^3.1.9


bcryptjs
^3.0.2


jsonwebtoken
^9.0.2


node-cron
^3.0.3


node-fetch
^2.7.0


socket.io
^4.8.1


@google/generative-ai
^0.24.0


express-fileupload
^1.5.1


crypto
^1.0.1


🧩 How to Run Locally

Clone the repo:
git clone https://github.com/amangupta9454/FARMER-CONSUMER-MARKER.git
cd FARMER-CONSUMER-MARKER


Install backend dependencies:
cd BACKEND
npm install


Configure backend environment variables in BACKEND/.env:
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_pass
GOOGLE_API_KEY=your_google_key
PORT=5000


Run the backend:
npm run dev


Install frontend dependencies:
cd ../FRONTEND
npm install


Configure frontend environment variables in FRONTEND/.env:
VITE_API_URL=http://localhost:5000/api
VITE_WEATHER_API_KEY=your_weather_api_key


Run the frontend:
npm run dev


Access the app:

Backend: http://localhost:5000
Frontend: http://localhost:5173



👥 Contributors

Aman Gupta - MERN Developer, UI/UX, Project Lead

📫 Contact
Have questions or suggestions? Reach out via email at ag0567688@gmail.com or connect with me on:

GitHub
LinkedIn
Instagram

🌟 Future Enhancements

AI Price Prediction: Implement crop price forecasts using Google Generative AI.
Blockchain Transactions: Add smart contracts for secure payments by July 2025.
Mobile App: Develop a React Native app for wider access.
Advanced Analytics: Enhance admin dashboard with predictive insights.
Offline Mode: Add PWA features for rural connectivity.

🌟 Show Your Support
If you like this project, consider starring the repository ⭐ on GitHub and sharing it with your friends!
