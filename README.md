# Task Management and Productivity App
## Description
This is a Task Management and Productivity Web Application. It allows users to create, assign, track, and manage tasks efficiently. Built for teams working remotely, it aims to streamline task coordination, improve accountability, and boost productivity through real-time updates and clear interfaces.
## Features
- Task Creation
- Task Assignment
- Setting Priority
- Task Status Tracking
- Real-time Notifications
## Tech Stack
- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB
- Real-time Communication: Socket.io
- Authentication: JWT
## Installation
Clone the repository:  
`git clone [your-repo-link]`  
`cd task-management-and-productivity`  
Install dependencies:  
`cd backend`  
`npm install`  
`cd ../frontend`  
`npm install`  
Start the backend server:  
`cd backend`  
`node server.js`  
Start the frontend:  
`cd frontend`  
`npm start`
## File Structure
### backend
- controllers  
  - authController.js  
  - taskController.js  
- middleware  
  - authMiddleware.js  
- models  
  - User.js  
  - Task.js  
- routes  
  - authRoutes.js  
  - taskRoutes.js  
- server.js  
- sensorInterface.js  
- sensorSimulator.js  
- package.json  
### frontend
- public  
  - index.html  
- src  
  - components  
    - TaskForm.js  
    - TaskList.js  
  - pages  
    - Home.js  
    - Dashboard.js  
  - App.js  
  - index.js
## 🍓 Raspberry Pi Integration (Simulated)
This project includes the foundation for integrating Raspberry Pi sensor input with the web application to expand into IoT-driven task management features.  
### How It Works
- `sensorInterface.js` – Intended to run on a real Raspberry Pi device. It listens to GPIO pin input using the `onoff` library and sends data to the backend through HTTP using `axios`.  
- `sensorSimulator.js` – A simulation script for developers without Raspberry Pi hardware. It mimics sensor activity by periodically posting sample data to the backend endpoint.  
### Running the Sensor Simulator
Make sure your backend server is running locally (port 3000), then run the following command from the backend directory:  
`node sensorSimulator.js`
### Backend Endpoint to Receive Data
A new POST endpoint was added to handle incoming sensor data:
```js
app.post('/api/sensor-data', (req, res) => {
  const { value, timestamp } = req.body;
  console.log('Received sensor data:', value, timestamp);
  res.send('Sensor data received');
});
```
##  Citation
This project has benefited from the assistance of AI tools, specifically ChatGPT by OpenAI. The AI helped piece together sections of the code when I faced difficulties, provided suggestions for refining the code, and ensured that it followed best practices. Additionally, the AI supported me in organizing and structuring the README file to maintain clarity and coherence. You can learn more about this tool at OpenAI's website.
