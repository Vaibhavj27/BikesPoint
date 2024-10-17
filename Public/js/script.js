document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value; // Get the password

    // Create an object to hold the data
    const userData = {
        name: name,
        email: email,
        phone: phone,
        password: password // Include the password in the object
    };

    // Send the data to your server
    fetch('/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        if (response.ok) {
            alert('Sign Up successful!');
            // Optionally redirect to another page
            window.location.href = 'sign-in.html';
        } else {
            alert('Sign Up failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});
