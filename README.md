# 🛍️ ShopX — Full-Stack E-Commerce Platform

ShopX is a full-stack e-commerce web application built using the MERN stack. It provides an online shopping experience with product browsing, authentication, category management, shopping cart functionality, and role-based dashboards for customers, admins, and super admins.

## 🌐 Live Demo

- **Frontend:** https://frontend-six-theta-wxqktydw9a.vercel.app
- **Backend API:** https://shopx-5t9h.onrender.com

> Note: Some features may require further configuration or testing in the deployed environment.

## ✨ Features

### 🛒 Customer
- User registration and login
- Product browsing and product details
- Product search and category filtering
- Shopping cart management
- User profile and order management
- Forgot password and email OTP functionality

### 🛠️ Admin
- Admin dashboard
- Product creation, editing, and deletion
- Category management
- Product image uploads
- Order management

### 👑 Super Admin
- Super admin dashboard
- Platform-wide management
- User and admin management
- Centralized product and category oversight

### 🔐 Security
- JWT-based authentication
- Password hashing
- Role-based access control
- Environment-based configuration
- Protected routes

*Feature availability depends on implementation and deployment configuration.*

## 🧰 Tech Stack

**Frontend**
- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs

**Services & Deployment**
- MongoDB Atlas — Database
- Cloudinary — Image storage
- Gmail SMTP — Email delivery
- Vercel — Frontend hosting
- Render — Backend hosting
- Git & GitHub — Version control

## 📁 Project Structure

```text
ShopX/
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

*Your actual folder structure may differ depending on your implementation.*

## ⚙️ Getting Started

### Prerequisites

Install the following:
- Node.js and npm
- Git
- A MongoDB Atlas account
- A Cloudinary account, if using image uploads
- SMTP credentials, if using email features

### 1. Clone the Repository

```bash
git clone https://github.com/Pankaj12222674/ShopX.git
cd ShopX
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
MONGO_URI=your_mongodb_connection_string
MONGO_DB=web_dev
JWT_SECRET=your_strong_random_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_email_app_password
MAIL_FROM=ShopX <your_email@gmail.com>

FRONTEND_URL=http://localhost:5173
```

Replace the placeholders with your own credentials.

Start the backend:

```bash
npm start
```

If your `package.json` does not define a `start` script, use:

```bash
node server.js
```

### 3. Set Up the Frontend

Open a second terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env` if your frontend uses the `VITE_API_URL` variable:

```env
VITE_API_URL=http://localhost:4000/api
```

Use the actual local backend port and API prefix configured in your application.

Start the frontend:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## 🔑 Environment Variables

| Variable | Purpose |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `MONGO_DB` | Database name |
| `JWT_SECRET` | JWT signing secret |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_PORT` | SMTP port |
| `SMTP_SECURE` | SMTP TLS configuration |
| `SMTP_USER` | Email account |
| `SMTP_PASSWORD` | Email app password |
| `MAIL_FROM` | Sender identity |
| `FRONTEND_URL` | Allowed frontend origin |
| `VITE_API_URL` | Frontend API base URL |

Never commit real `.env` files, database credentials, API secrets, or email passwords to GitHub.

## 🚀 Deployment

### Backend — Render
1. Connect the GitHub repository to Render.
2. Set the root directory to `backend`.
3. Set the build command to `npm install`.
4. Set the start command to `node server.js`.
5. Configure the production environment variables.
6. Deploy the service.

### Frontend — Vercel
1. Import the GitHub repository into Vercel.
2. Set the root directory to `frontend`.
3. Set the build command to `npm run build`.
4. Set the output directory to `dist`.
5. Configure `VITE_API_URL` to point to the deployed backend API.
6. Deploy the frontend and configure backend CORS to allow the production frontend URL.

## 🔮 Future Improvements

- Online payments integration
- Product reviews and ratings
- Wishlist functionality
- Advanced product filtering and sorting
- Inventory management
- Order tracking and shipment management
- Sales analytics and reporting
- Responsive UI improvements

## 👨‍💻 Author

**Pankaj Kumar**

- GitHub: [@Pankaj12222674](https://github.com/Pankaj12222674)

## 📄 License

This project is currently available for educational and portfolio purposes. Add a license file if you intend to grant others specific rights to use, modify, or distribute the code.

<img width="1904" height="859" alt="image" src="https://github.com/user-attachments/assets/f7acb11a-ce62-4fd3-8e63-f42999226b40" />
<img width="1908" height="871" alt="image" src="https://github.com/user-attachments/assets/990bb1f5-7dfa-41e6-a04d-61e6b5e74121" />
<img width="1919" height="860" alt="image" src="https://github.com/user-attachments/assets/f4b764bf-02a5-4f6a-aa4b-325d12f0f090" />
<img width="1899" height="874" alt="image" src="https://github.com/user-attachments/assets/9e405e39-a52f-4a98-925c-912000457cc9" />
<img width="1899" height="860" alt="image" src="https://github.com/user-attachments/assets/dae5f4db-d42a-4bd2-99ad-1df6bee6a4d8" />
<img width="1904" height="870" alt="image" src="https://github.com/user-attachments/assets/19b5a957-6fb2-4110-8b3e-8c87a49c7ca0" />


https://shopx-5t9h.onrender.com/   |||| 
https://frontend-six-theta-wxqktydw9a.vercel.app
