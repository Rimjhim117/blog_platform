import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Post from "./models/Post.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    await Post.deleteMany({});
    console.log("🗑️️ Cleared existing posts");

    const users = await User.find();
    if (users.length === 0) {
      console.log("⚠️ No users found. Please seed users first.");
      mongoose.connection.close();
      return;
    }

    const posts = [];

    // --- Expanded pool of realistic content snippets for more variety ---
    const titleSnippets = [
        "Mastering", "The Ultimate Guide to", "Best Practices for", "Building Scalable",
        "A Deep Dive into", "Exploring Modern", "From Beginner to Pro:", "Understanding"
    ];

    const subjectSnippets = [
        "React State Management", "Node.js Authentication", "Modern CSS Layouts",
        "API Design with Express", "Database Optimization", "Frontend Performance",
        "Asynchronous JavaScript", "DevOps with Docker", "Serverless Architecture"
    ];
    
    const introSnippets = [
      "In this comprehensive guide, we'll dive deep into the core concepts.",
      "Today, we're exploring the cutting-edge trends that are shaping the future of web development.",
      "Ever wondered how a simple idea can evolve into a robust, production-ready application? Let's find out.",
      "Performance optimization is no longer a luxury; it's a necessity. Here's how you can achieve it.",
      "Let's break down the fundamentals of modern web development, starting with the basics."
    ];

    const bodySnippets = [
      "The key to a maintainable codebase lies in a modular and component-based architecture. This approach not only simplifies debugging but also accelerates the development process.",
      "Asynchronous programming in JavaScript can be daunting, but with a solid grasp of Promises and async/await, it becomes manageable. We'll walk through practical examples to demystify these concepts.",
      "Adopting a test-driven development (TDD) approach can significantly reduce bugs and improve code quality over time, ensuring your application is robust and reliable.",
      "Choosing the right state management solution, whether it's Redux, Context API, or Zustand, depends on your application's complexity. We'll compare them to help you make an informed decision.",
      "Serverless architecture, powered by services like AWS Lambda or Google Cloud Functions, allows you to focus on code rather than infrastructure. This can drastically reduce operational costs.",
      "Modern CSS frameworks like Tailwind CSS have streamlined the styling process, making it faster to build beautiful, responsive UIs without writing custom CSS from scratch.",
      "A strong understanding of RESTful API design principles is crucial for building a scalable backend that can support a growing user base and multiple frontend applications.",
      "The open-source community is a treasure trove of resources. Contributing to or learning from it is one of the best ways to grow as a developer and stay on top of new technologies."
    ];
    
    // Handcrafted posts for a solid foundation
    const samplePosts = [
      {
        title: "Mastering React State: From useState to Reducers",
        content: `This article provides a detailed look into managing state in React, from the basics of useState to the power of useReducer. We'll cover everything from simple counter applications to complex state logic for a multi-step form.
        
${faker.helpers.arrayElement(bodySnippets)}
        
${faker.helpers.arrayElement(bodySnippets)}
        
${faker.helpers.arrayElement(bodySnippets)}`,
        tags: ["react", "state", "hooks", "frontend"],
      },
      {
        title: "Node.js Best Practices for High-Performance APIs",
        content: `In this guide, we explore how to build robust, high-performance APIs using Node.js and Express.js. We'll discuss middleware, routing, and database interactions with Mongoose.
        
${faker.helpers.arrayElement(bodySnippets)}
        
${faker.helpers.arrayElement(bodySnippets)}
        
${faker.helpers.arrayElement(bodySnippets)}`,
        tags: ["nodejs", "api", "backend", "express"],
      },
    ];

    // Add handcrafted posts
    samplePosts.forEach((postData) => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      posts.push({ ...postData, author: randomUser._id });
    });

    // Generate 100+ additional posts with dynamic content
    for (let i = 0; i < 100; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];

      const dynamicTitle = `${faker.helpers.arrayElement(titleSnippets)} ${faker.helpers.arrayElement(subjectSnippets)}`;
      
      const paragraphs = faker.helpers.shuffle(bodySnippets).slice(0, faker.number.int({ min: 2, max: 4 }));
      const content = `${faker.helpers.arrayElement(introSnippets)}\n\n${paragraphs.join("\n\n")}`;

      posts.push({
        title: dynamicTitle,
        content,
        author: randomUser._id,
        tags: faker.helpers.arrayElements(["react", "nodejs", "css", "mongodb", "api", "security", "cloud", "javascript", "python"], { min: 2, max: 4 }),
      });
    }

    await Post.insertMany(posts);
    console.log(`🎉 Inserted ${posts.length} realistic posts`);
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));
