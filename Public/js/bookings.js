fetchBookings();

function fetchBookings() {
    fetch('/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(bookings => {
        const bookingsList = document.getElementById('bookings-list');
        bookingsList.innerHTML = '';  // Clear the previous list
        
        if (bookings.length === 0) {
            bookingsList.innerHTML = '<p>No bookings found.</p>';
            return;
        }

        // Loop through each booking and display it
        bookings.forEach(booking => {
            const bookingSection = document.createElement('section');
            bookingSection.className = 'booking-item';
            bookingSection.innerHTML = `
                <h2>${booking.bikeName}</h2>
                <p>Price: ₹${booking.price} per day</p>
                <p>Start Date: ${new Date(booking.startDate).toLocaleDateString()}</p>
                <p>End Date: ${new Date(booking.endDate).toLocaleDateString()}</p>
                <button class="btn cancel-booking" data-id="${booking._id}">Cancel Booking</button>
            `;
            bookingsList.appendChild(bookingSection);
        });

        // Add event listener to cancel booking buttons
        document.querySelectorAll('.cancel-booking').forEach(button => {
            button.addEventListener('click', function() {
                const bookingId = this.getAttribute('data-id');
                cancelBooking(bookingId);
            });
        });
    })
    .catch(error => {
        console.error('Error fetching bookings:', error);
    });
}

function cancelBooking(bookingId) {
    fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        location.reload();  // Reload the page to refresh the bookings list
    })
    .catch(error => {
        console.error('Error cancelling booking:', error);
    });
}
