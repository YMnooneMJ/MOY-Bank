# 💰 MOY-Bank

**MOY-Bank** stands for **MY Bank, OUR Bank, YOUR Bank** — a modern digital banking application designed to make secure and simple financial services available to everyone.

## ✨ Description

MOY-Bank is a full-stack web application that allows users to register, manage accounts, view balances, and perform secure transactions like deposits, withdrawals, and transfers. It features real-time support through chat integration and provides a clean user interface with light and dark mode support.

> Whether you're managing your own funds, part of a shared family account, or growing a business, MOY-Bank is **your financial companion** — personalized for **YOU**, owned by **US**, and built to feel like it's **YOURS**.

---

## 🚀 Features

### ✅ Core Banking

- User registration and login (JWT authentication)
- View profile and account balance
- Deposit, withdraw, and transfer funds
- Transaction history

### 💬 Chat Support

- Real-time messaging support system
- Google OAuth integration (optional)
- Emojis, typing indicators, and more

### 🌗 UI Experience

- Light and dark mode toggle
- Responsive design using TailwindCSS
- Optimized for desktop and mobile

---

## 🧱 Tech Stack

### Frontend

- [React.js](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/) for API requests

### Backend

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/) for authentication
- [bcrypt.js](https://github.com/dcodeIO/bcrypt.js) for password hashing

---

## 📦 Installation

### Clone the project

```bash
git clone https://github.com/YMnooneMJ/moy-bank.git
cd moy-bank
```

### Setup Backend

```bash
cd Backend
npm install
touch .env
```

Fill your `.env`:

```env
PORT=3000
ATLAS_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key
```

Start the server:

```bash
npm run dev
```

### Setup Frontend (if applicable)

```bash
cd ../Frontend
npm install
npm start
```

---

## 📂 Folder Structure (Simplified)

``` Folder Structure
MOY-Bank/
├── Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── Frontend/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
```

---

## 🛡️ Security

- All passwords are hashed using `bcrypt`
- User sessions are secured with `JWT`
- Sensitive routes are protected via middleware
- Input validations are enforced on the backend

---

## 🤝 Contributing

Contributions, suggestions, or feature requests are welcome!

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Credits

Built with ❤️ by Ademola Yusuf Adeyemo  
Inspiration: Empowering people to bank on their own terms — **My Bank, Our Bank, Your Bank.**
