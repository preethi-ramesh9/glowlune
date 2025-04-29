document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const authModal = document.getElementById('authModal');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const loginTab = document.getElementById('loginTab');
  const signupTab = document.getElementById('signupTab');
  const showLogin = document.getElementById('showLogin');
  const showSignup = document.getElementById('showSignup');
  const closeBtn = document.getElementById('closeBtn');

  // Show modal on page load
  if (!localStorage.getItem('loggedInUser')) {
    authModal.style.display = 'flex';
  }

  // Tab switching
  function switchTab(formToShow) {
    document.querySelectorAll('.auth-form').forEach(form => {
      form.classList.remove('active');
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    if (formToShow === 'login') {
      loginForm.classList.add('active');
      loginTab.classList.add('active');
    } else {
      signupForm.classList.add('active');
      signupTab.classList.add('active');
    }
  }

  loginTab.addEventListener('click', () => switchTab('login'));
  signupTab.addEventListener('click', () => switchTab('signup'));
  showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('login');
  });
  showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab('signup');
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
    authModal.style.display = 'none';
  });

  // Signup functionality
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const phone = document.getElementById('signupPhone').value;

    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if user already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
      showNotification('User already exists with this email', 'error');
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // Note: In a real app, you would hash the password
      phone,
      createdAt: new Date().toISOString()
    };

    // Save user
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Log the user in
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    showNotification('Account created successfully!');
    
    // Redirect to profile page after delay
    setTimeout(() => {
      window.location.href = 'profile.html';
    }, 1500);
  });

  // Login functionality
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find user
    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
      // Login successful
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      showNotification('Login successful!');
      
      // Redirect to profile page after delay
      setTimeout(() => {
        window.location.href = 'profile.html';
      }, 1500);
    } else {
      showNotification('Invalid email or password', 'error');
    }
  });

  // Notification function
  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
      <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
});