Blog Platform

A modern full-stack blog application built with the MERN stack (MongoDB, Express, React, Node.js). This platform allows users to sign up, log in, and create, read, update, and delete their own blog posts. The frontend features a clean, responsive, and aesthetically pleasing design.
Features

    User Authentication: Secure user registration and login with JSON Web Tokens (JWT).

    CRUD Operations: Full functionality to create, read, update, and delete blog posts.

    Modern UI: Clean, responsive, and aesthetically pleasing frontend designed with a modern, Figma-style aesthetic.

    RESTful API: A robust and scalable backend API to handle all data and business logic.

Technologies Used

Backend:

    Node.js & Express: For building the RESTful API.

    MongoDB & Mongoose: For a flexible, NoSQL database and object data modeling.

    bcrypt.js: Used for hashing user passwords to ensure security.

    jsonwebtoken: For creating and verifying secure access tokens.

Frontend:

    React: For building a dynamic and component-based user interface.

    React Router: For seamless navigation between different pages.

    Tailwind CSS: A utility-first CSS framework for efficient and fast styling.

    React Icons: For a library of customizable icons.

Getting Started

To run this project locally, follow these steps.
1. Backend Setup

    Navigate to the backend folder: cd backend

    Install dependencies: npm install

    Create a .env file in the backend folder and add your sensitive information:

    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=a_very_secret_key

    Run the server: npm run dev

2. Frontend Setup

    Navigate to the frontend folder: cd frontend

    Install dependencies: npm install

    Run the client: npm run dev

The application will be available at http://localhost:5173.
Author

    Rimjhim Srivastava

    GitHub: https://github.com/Rimjhim117
