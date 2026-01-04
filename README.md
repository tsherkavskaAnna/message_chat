# 💬 Real-Time Chat Application

A full-stack **real-time chat application** built with **Node.js**, **React**, and **Socket.io**.  
The app provides secure authentication, real-time messaging, contact management, and media sharing.

---

## 🚀 Features

### 🔐 Authentication & User Management

- User registration with **email verification**
- Secure login with **JWT authentication**
- **Forgot password** & **reset password via email**
- Protected routes for authenticated users only

### 👤 User Profile

- Upload and update **user avatar**
- Edit user profile information

### 📇 Contacts Management

- Add new contacts
- Edit contact details
- Delete contacts
- Upload contact photos
- Personal contact list for each user

### 💬 Real-Time Messaging

- Real-time chat using **Socket.io**
- Send and receive messages instantly
- Edit sent messages
- Delete messages
- Each message has its own **context menu** (edit / delete)

### 🖼 Media & Emojis

- Send **images/photos** in chat
- Emoji support in messages

---

## 🛠 Tech Stack

### Frontend

- **React**
- **TypeScript**
- **Vite**
- **Zustand** (state management)
- **React Router**
- **Socket.io-client**
- **Tailwind CSS**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT Authentication**
- **Socket.io**
- **Nodemailer** (email verification & password reset)
- **Cloudinary** (image uploads)

---

## 🔒 Authentication Flow

1. User registers with email and password
2. Verification email is sent
3. User verifies email via link
4. User logs in
5. JWT token is issued and used for protected API routes
6. Password reset is available via email if needed
