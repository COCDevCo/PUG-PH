document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.getElementById('register-button');
    const loginButton = document.getElementById('login-button');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const profileForm = document.getElementById('profileForm');
    const landingContainer = document.getElementById('landing-container');
    const registerContainer = document.getElementById('register-container');
    const loginContainer = document.getElementById('login-container');
    const profileContainer = document.getElementById('profile-container');
    const welcomeNote = document.getElementById('welcome-note');
    const playerName = document.getElementById('profile-name');
    const playerGender = document.getElementById('profile-gender');
    const playerAge = document.getElementById('profile-age');
    const playerBirthday = document.getElementById('profile-birthday');
    const playerHeight = document.getElementById('profile-height');
    const playerWeight = document.getElementById('profile-weight');
    const playerPositionPlayed = document.getElementById('profile-positionPlayed');
    const playerPhoto = document.getElementById('profile-photo');
    const playerStats = document.getElementById('player-stats');
    const logoutButton = document.getElementById('logout-button');
  
    registerButton.addEventListener('click', () => {
      landingContainer.style.display = 'none';
      registerContainer.style.display = 'block';
    });
  
    loginButton.addEventListener('click', () => {
      landingContainer.style.display = 'none';
      loginContainer.style.display = 'block';
    });
  
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      const newUser = { name, email, password };
  
      try {
        const response = await fetch('http://localhost:5000/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        });
  
        const data = await response.json();
        if (response.ok) {
          alert('User registered successfully');
          registerForm.reset();
          registerContainer.style.display = 'none';
          loginContainer.style.display = 'block';
        } else {
          alert(data.message || 'Error registering user');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error registering user');
      }
    });
  
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
  
      const userCredentials = { email, password };
  
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userCredentials)
        });
  
        const data = await response.json();
        if (response.ok) {
          alert('User logged in successfully');
          localStorage.setItem('token', data.token);
          await displayProfile(); // Ensure profile is fetched and displayed
        } else {
          alert(data.message || 'Error logging in');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error logging in');
      }
    });
  
    profileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', playerName.value);
      formData.append('gender', playerGender.value);
      formData.append('age', playerAge.value);
      formData.append('birthday', playerBirthday.value);
      formData.append('height', playerHeight.value);
      formData.append('weight', playerWeight.value);
      formData.append('positionPlayed', playerPositionPlayed.value);
      if (playerPhoto.files[0]) {
        formData.append('profilePhoto', playerPhoto.files[0]);
      }
  
      try {
        const response = await fetch('http://localhost:5000/api/users/profile', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });
  
        const data = await response.json();
        if (response.ok) {
          alert('Profile updated successfully');
          await displayProfile(); // Ensure profile is fetched and displayed
        } else {
          alert(data.message || 'Error updating profile');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error updating profile');
      }
    });
  
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('token');
      profileContainer.style.display = 'none';
      landingContainer.style.display = 'block';
    });
  
    const displayProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/users/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
  
        const data = await response.json();
        if (response.ok) {
          playerName.value = data.name;
          playerGender.value = data.gender;
          playerAge.value = data.age;
          playerBirthday.value = data.birthday;
          playerHeight.value = data.height;
          playerWeight.value = data.weight;
          playerPositionPlayed.value = data.positionPlayed;
          playerStats.innerText = `Games Played: ${data.stats.gamesPlayed}, Games Missed: ${data.stats.gamesMissed}, League MVP: ${data.stats.leagueMVP}, Mythical Awards: ${data.stats.mythicalAwards}, Reputation: ${data.stats.reputation}`;
          loginContainer.style.display = 'none';
          profileContainer.style.display = 'block';
        } else {
          console.error('Error fetching profile:', data.message || 'Error fetching profile');
          alert(data.message || 'Error fetching profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Error fetching profile');
      }
    };
  
    if (localStorage.getItem('token')) {
      welcomeNote.innerText = 'Welcome back Ballers';
      displayProfile();
    }
  });
  