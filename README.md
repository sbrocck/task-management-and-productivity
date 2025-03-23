# Task Management and Productivity App

## Description
This is a Task Management and Productivity Web Application. It allows users to create, assign, track, and manage tasks efficiently.

## Features
- Task Creation
- Task Assignment
- Setting Priority
- Task Status Tracking
- Real-time Notifications

## Tech Stack
- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Real-time Communication:** Socket.io
- **Authentication:** JWT

## Installation
1. Clone the repository:
    ```sh
    git clone [your-repo-link]
    cd task-management-and-productivity
    ```

2. Install dependencies:
    ```sh
    cd backend
    npm install
    cd ../frontend
    npm install
    ```

3. Start the backend server:
    ```sh
    cd backend
    node server.js
    ```

4. Start the frontend:
    ```sh
    cd frontend
    npm start
    ```

## File Structure
```plaintext
backend
├── controllers
│   ├── authController.js
│   ├── taskController.js
├── middleware
│   ├── authMiddleware.js
├── models
├── routes
│   ├── authRoutes.js
│   ├── taskRoutes.js
├── server.js

frontend
├── public
│   ├── index.html
├── src
│   ├── components
│   │   ├── TaskForm.js
│   │   ├── TaskList.js
│   ├── pages
│   │   ├── Home.js
│   │   ├── Dashboard.js
│   ├── App.js
│   ├── index.js
```
##  Citation
This project has benefited from the assistance of AI tools, specifically ChatGPT by OpenAI. The AI helped piece together sections of the code when I faced difficulties, provided suggestions for refining the code, and ensured that it followed best practices. Additionally, the AI supported me in organizing and structuring the README file to maintain clarity and coherence. You can learn more about this tool at OpenAI's website.
