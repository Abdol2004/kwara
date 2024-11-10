// Assuming you have an HTML form with the ID 'admin-login-form'
document.getElementById('admin-login-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    const username = document.getElementById('username').value; // Get the username/email from the input
    const password = document.getElementById('password').value; // Get the password from the input
  
    const response = await fetch('/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminEmail: username, adminPassword: password }), // Send login credentials
    });
  
    const data = await response.json(); // Parse the JSON response
  
    if (response.ok) {
        localStorage.setItem('token', data.token); // Store token in local storage
        window.location.href = '/admin/dashboard'; // Redirect to dashboard
    }
});
  