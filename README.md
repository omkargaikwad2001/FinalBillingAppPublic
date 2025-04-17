# 🛒 Retail Billing Application

A full-stack Retail Billing Web Application built with **Java Spring Boot**, **React.js**, **MySQL**, **AWS (S3 & RDS)**, and **Razorpay**. This app supports two roles: **Admin** and **User**. Admins can manage items, categories, and users, while users can browse, order, and pay for products securely.

---

## 🔧 Tech Stack

### 🚀 Frontend:
- React.js
- Bootstrap

### 🛠️ Backend:
- Java Spring Boot
- RESTful APIs

### 💾 Database:
- MySQL (Hosted on AWS RDS)

### ☁️ Cloud Services:
- AWS S3 Bucket for storing product images
- AWS RDS for database hosting

### 💳 Payments:
- Razorpay API Integration

---

## 🔐 Features

### 👥 Role-Based Access:
- **Admin:**
  - Dashboard to view recent orders
  - Manage categories
  - Add, update, delete items
  - Manage users (add/remove)
- **User:**
  - View and browse items
  - Add items to cart
  - Place orders
  - Make payments using Razorpay
  - Receive receipt after successful payment

---

## 📷 Image Storage

Product images are uploaded and stored securely in an AWS S3 bucket. Admins can add or update product images via the admin dashboard.

---

## 🧾 Payment & Receipt

- Integrated **Razorpay** for secure online payments.
- Users receive a receipt after successful payment, which includes order and payment details.
