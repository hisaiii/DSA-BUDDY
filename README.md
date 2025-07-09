# 🧠 DSA Buddy

**DSA Buddy** is a personal DSA question tracker web app designed to help you track, review, and improve your problem-solving skills. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), this app enables users to log their questions, categorize them by topics/platforms, mark for revision, and analyze mistakes/lessons learned.

> 📍 Live Demo: [https://dsa-buddy-1je4.onrender.com](https://dsa-buddy-1je4.onrender.com)

---

## 🚀 Features

- ✅ **User Authentication**: Secure register/login with JWT tokens.
- 📝 **Add/Edit/Delete Questions**: Track problem links, platforms, topics, mistakes, and lessons.
- ⭐ **Mark for Review**: Mark questions for future revision.
- 🧠 **Filters**: Filter by tags, platform, and review status.
- 🎯 **Clean UI**: Minimal and focused UI using TailwindCSS.
- 📊 **Review Tracking**: Visual aid to help revisit marked questions.
- 🔐 **Private Data**: Each user's question data is private and isolated.

---

## 🛠️ Tech Stack

**Frontend:** React, TailwindCSS, Axios, Vite  
**Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT  
**Deployment:** Render

---


## 📁 Folder Structure

```
root/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── App.jsx
│   └── index.html
│
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/dsa-buddy.git
cd dsa-buddy
```

### 2. Setup Environment Variables

Create a `.env` file in the `backend/` directory:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
```

### 3. Install dependencies and run

```bash
# Install backend deps
npm install

# Install frontend deps and build it
npm run build

# Start the server (nodemon)
npm run dev
```

The frontend will be served from Express (after build) at `http://localhost:8000`.

---

## 🙌 Acknowledgements

Inspired by common patterns from LeetCode, Codeforces, and other DSA trackers. Built with ❤️ by Sai.

---

## 📫 Contact

If you have feedback or want to contribute, feel free to reach out!

[Sai Hiware](https://www.linkedin.com/in/sai-hiware-23b053286/)