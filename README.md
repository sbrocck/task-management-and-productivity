# 🚀 Task Management and Productivity App

## 📂 Backend Folder Structure
backend/
├── controllers/
│ ├── authController.js
│ └── taskController.js
├── middleware/
│ └── authMiddleware.js
├── models/
│ ├── User.js
│ └── Task.js
├── routes/
│ ├── authRoutes.js
│ └── taskRoutes.js
├── server.js
├── sensorInterface.js
├── sensorSimulator.js
└── package.json

shell
Copy
Edit

## 📂 Frontend Folder Structure
frontend/
├── public/
│ └── index.html
└── src/
├── components/
│ ├── TaskForm.js
│ └── TaskList.js
├── pages/
│ ├── Home.js
│ └── Dashboard.js
├── App.js
└── index.js

yaml
Copy
Edit

---

## ⚙️ Running the Application

### Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start the backend server (with nodemon/dev)
npm run dev
Frontend
bash
Copy
Edit
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the React app
npm start
