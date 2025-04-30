// Firebase import
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAcApbJVSlKtd5Dq__ygyjmtXSmUWmJvmo",
  authDomain: "glowlune-90d65.firebaseapp.com",
  projectId: "glowlune-90d65",
  storageBucket: "glowlune-90d65.firebasestorage.app",
  messagingSenderId: "423558302313",
  appId: "1:423558302313:web:0dc637b30c142efa8d30f8",
  measurementId: "G-E1N4JGV1KK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// UI Elements
const showLoginBtn = document.getElementById("show-login");
const showSignupBtn = document.getElementById("show-signup");
const authForm = document.getElementById("auth-form");
const authActionBtn = document.getElementById("auth-action");
const message = document.getElementById("message");

let isLogin = true;

// Toggle Mode
showLoginBtn.addEventListener("click", () => {
  isLogin = true;
  authActionBtn.textContent = "Login";
  showLoginBtn.classList.add("active");
  showSignupBtn.classList.remove("active");
  message.textContent = "";
});

showSignupBtn.addEventListener("click", () => {
  isLogin = false;
  authActionBtn.textContent = "Signup";
  showSignupBtn.classList.add("active");
  showLoginBtn.classList.remove("active");
  message.textContent = "";
});

// Function to subscribe user to Mailchimp
async function subscribeToMailchimp(email) {
  const API_KEY = "50963f0b1fc9beed1a4633d40e1121a3-us13";  // ⚠️ Replace with your Mailchimp API key
  const LIST_ID = "5a16ea9b0a";  // ⚠️ Replace with your list ID
  const DATACENTER = "us13";        // ⚠️ Replace with your data center (e.g., us21)

  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `apikey ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed"
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Mailchimp error:", error.detail || error.title);
    } else {
      console.log("User subscribed to Mailchimp");
    }
  } catch (err) {
    console.error("Mailchimp request failed", err);
  }
}

// Submit Form
authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = authForm.email.value;
  const password = authForm.password.value;

  if (isLogin) {
    // Login
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        message.style.color = "green";
        message.textContent = "Logged in successfully!";
        alert("Login successful!");
        window.location.href = "index.html";
      })
      .catch((err) => {
        message.style.color = "red";
        message.textContent = err.message;
      });
  } else {
    // Signup
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        message.style.color = "green";
        message.textContent = "Account created!";
        alert("Account created!");

        // 📧 Subscribe to Mailchimp
        subscribeToMailchimp(email);

        window.location.href = "index.html";
      })
      .catch((err) => {
        message.style.color = "red";
        message.textContent = err.message;
      });
  }
});
