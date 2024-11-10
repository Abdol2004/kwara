document.addEventListener('DOMContentLoaded', async () => {
    try {
        const token = localStorage.getItem('token'); // Retrieve the token
        const response = await fetch('/admin/dashboard', {
            method: 'GET',
            headers: {
                'Authorization': token, // Include the token in the request
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Dashboard Data:', data); // Debugging output

            // Update summary
            document.getElementById('totalUsers').textContent = data.totalUsers;
            document.getElementById('totalLGA').textContent = data.totalLGAs;
            document.getElementById('flaggedDuplicates').textContent = data.flaggedDuplicates;
        } else {
            alert('You need to log in to access this page.');
            window.location.href = '/admin/login'; // Redirect to login if not authorized
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
const logout = () => {
    localStorage.removeItem('token'); // Clear token
    window.location.href = '/admin/login'; // Redirect to login page
};

document.addEventListener('DOMContentLoaded', async () => {
    try {n
        const response = await fetch('/api/counts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Update the HTML with the fetched data
        document.getElementById('totalApplicants').textContent = data.totalApplicants;
        document.getElementById('totalStates').textContent = data.totalStates;
        document.getElementById('totalLGAs').textContent = data.totalLGAs;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
document.getElementById("logoutBtn").addEventListener("click", logout);


document.addEventListener('DOMContentLoaded', () => {
    const userTableBody = document.getElementById('userTableBody');

    userTableBody.addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-btn')) {
            const id = event.target.getAttribute('data-id');
            const confirmed = confirm('Are you sure you want to delete this applicant?');
            if (confirmed) {
                await deleteApplicant(id);
            }
        } else if (event.target.classList.contains('update-btn')) {
            const id = event.target.getAttribute('data-id');
            // Redirect to the update page or show a modal for updating the applicant
            window.location.href = `/admin/update-applicant/${id}`; // Adjust the URL as necessary
        }
    });

    async function deleteApplicant(id) {
        try {
            const response = await fetch(`/admin/delete-applicant/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Remove the row from the table
                const row = document.querySelector(`tr[data-id="${id}"]`);
                if (row) {
                    row.remove();
                }
                alert('Applicant deleted successfully.');
            } else {
                alert('Failed to delete applicant. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting applicant:', error);
            alert('An error occurred while trying to delete the applicant.');
        }
    }
});