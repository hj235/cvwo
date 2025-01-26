
# WebForum Application Setup Guide

Welcome to the **WebForum** application! Follow the steps below to set up and run the application on your local machine.

---

## Prerequisites

Before you begin, ensure that you have the following installed on your system:

1. **Docker Desktop**  
2. **MySQL Server**  
   - Ensure the MySQL server is hosted at `localhost:3306`.

---

## Setup Steps

### 1. Clone the Repository
```bash
git clone https://github.com/hj235/cvwo-assignment.git
cd cvwo-assignment
```

---

### 2. Configure the Server

1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Create a `.env` file in the `server` folder with the following content:
   ```env
   SERVER_PORT=4000
   CLIENT_URL=http://localhost:5173
   MYSQL_ROOT_PASSWORD=password
   MYSQL_PORT=3306
   MYSQL_DATABASE=webforum
   ```

---

### 3. Start the Backend Server

Run the following command from the `server` folder:
```bash
docker-compose up --build
```

---

### 4. Configure the Client

1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client/webforum
   ```
2. Create a `.env` file in the `client/webforum` folder with the following content:
   ```env
   VITE_SERVER_URL=http://localhost:4000
   ```

---

### 5. Install Dependencies and Start the Frontend

Run the following commands in the `client/webforum` folder:
```bash
npm install
npm run dev
```

---

## Application Usage

Once the above steps are complete:

- The **backend server** should be running at: `http://localhost:4000`
- The **frontend application** should be accessible at: `http://localhost:5173`

---

## Troubleshooting

- Ensure Docker Desktop is running before using `docker-compose`.
- Verify that MySQL is accessible at `localhost:3306` with the specified root password in the `.env` file.

---

You’re all set! 🎉 Enjoy using **WebForum**.
