#  Blog Platform – Full-Stack MERN Application

A modern full-stack blog platform built using the **MERN** stack (MongoDB, Express, React, Node.js). It supports user authentication and CRUD functionality for posts, delivering a sleek, responsive frontend styled with a modern, Figma-inspired aesthetic.

---

##  Key Features

-  User Authentication
  Secure user registration and login powered by **JSON Web Tokens (JWT)**.

-  CRUD Operations  
  Create, read, update, and delete blog posts via a RESTful API.

-  RESTful Design  
  Clean, modular backend logic using **Node.js** and **Express**.

-  MongoDB + Mongoose 
  Flexible NoSQL database structure with powerful schema modeling.

- Password Security 
  Password hashing and salting using **bcrypt.js**.

- Token-Based Security  
  Secure access and authorization flow with **jsonwebtoken**.

- ** Modern UI (React)**  
  Responsive interface styled using **Tailwind CSS**, complete with reusable components and **React Icons**.

-  Draft Auto-save 
  Persist drafts automatically in local storage, with an interactive recovery banner on return.

-  Cover Image Selector 
  Add Unsplash-based cover image presets or custom URL inputs for blog posts.

- Likes & Bookmarks 
  Full backend integration for liking and bookmarking posts.

- Dynamic Search & Tag Filter  
  Floating search bar with backend-integrated dynamic tag filtering pills.

- Saved Stories Profile Tab  
  Tabbed navigation in user profiles for managing my posts and bookmarked stories.

---

##   Technologies Used

| Backend | Frontend |
|---------|----------|
| Node.js & Express | React |
| MongoDB & Mongoose | React Router |
| bcrypt.js | Tailwind CSS |
| jsonwebtoken | React Icons |

---

##  Getting Started

###  Backend

```bash
cd backend
npm install
```
Create a `.env` file with the following contents:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key

---

##  Running the Backend

- **Start the server in development mode**  
  ```bash
  npm run dev
  ```
##  Running the Frontend

- **Install dependencies and start the React app**  
  ```bash
  cd frontend
  npm install
  npm run dev
  ```

## Future Enhancements

- ** Image Upload Support**  
  Allow users to upload images for their blog posts using services like Cloudinary.

- ** Rich Text Editor**  
  Enhance the blog writing experience with a full-featured editor.

---

##  Contributing

- **Fork the repository**  
- **Submit issues or feature requests**  
- **Open pull requests** with improvements or bug fixes  

---

##  License

- Distributed under the **MIT License**  
##  Author

- **Rimjhim Srivastava**  
  GitHub: [rimjhim117](https://github.com/rimjhim117)


