document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    if (!loggedInUser) {
      window.location.href = 'login.html';
      return;
    }
  
    // Load user info
    const userInfoContainer = document.getElementById('userInfo');
    userInfoContainer.innerHTML = `
      <div class="info-item">
        <h3>Full Name</h3>
        <p>${loggedInUser.name}</p>
      </div>
      <div class="info-item">
        <h3>Email</h3>
        <p>${loggedInUser.email}</p>
      </div>
      <div class="info-item">
        <h3>Phone Number</h3>
        <p>${loggedInUser.phone || 'Not provided'}</p>
      </div>
      <div class="info-item">
        <h3>Member Since</h3>
        <p>${new Date(loggedInUser.createdAt).toLocaleDateString()}</p>
      </div>
    `;
  
    // Tab switching
    document.querySelectorAll('.profile-nav a').forEach(link => {
      if (link.id !== 'logoutBtn') {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          
          // Update active tab
          document.querySelectorAll('.profile-nav a').forEach(navLink => {
            navLink.classList.remove('active');
          });
          link.classList.add('active');
          
          // Show corresponding section
          const tabId = link.getAttribute('data-tab');
          document.querySelectorAll('.profile-section').forEach(section => {
            section.classList.remove('active');
          });
          document.getElementById(tabId).classList.add('active');
        });
      }
    });
  
    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('loggedInUser');
      window.location.href = 'index.html';
    });
  
    // Edit profile button
    document.getElementById('editProfileBtn').addEventListener('click', () => {
      alert('Edit profile functionality would go here');
      // In a real app, you would implement a form to edit profile info
    });
  });