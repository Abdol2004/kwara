// Hamburger and Dropdown Menu Toggle
const hamburger = document.getElementById('hamburger');
const dropdownMenu = document.getElementById('dropdown-menu');

hamburger.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show');
});


// Navbar Scroll Change
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    hamburger.style.color = '#333'
  } else {
    navbar.classList.remove('scrolled');
    hamburger.style.color = '#333'
  }
});


document.getElementById('registration-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const birthday = document.getElementById('birthday').value;
    const gender = document.getElementById('gender').value;
    const localGovt = document.getElementById('local-government').value;
    const ward = document.getElementById('ward').value;
    const community = document.getElementById('community').value;
    const bvn = document.getElementById('bvn').value;
    const nin = document.getElementById('nin').value;
    const bank = document.getElementById('bank').value;
    const accountNumber = document.getElementById('account-number').value;
    const vin = document.getElementById('vin').value
  
    // Basic Validation
    if (!name || !phone || !birthday || !gender || !localGovt || !ward || !community || !vin || !bvn || !nin || !bank || !accountNumber) {
      document.getElementById('error-popup').classList.remove('hidden');
    } else {
      document.getElementById('confirmation-popup').classList.remove('hidden');
    }
  });
  
  // Close Confirmation Pop-up
  document.getElementById('close-confirmation').addEventListener('click', function () {
    document.getElementById('confirmation-popup').classList.add('hidden');
    document.getElementById('registration-form').reset();
  });
  
  // Close Error Pop-up
  document.getElementById('close-error').addEventListener('click', function () {
    document.getElementById('error-popup').classList.add('hidden');
  });

  document.addEventListener('DOMContentLoaded', () => {
    const userTableBody = document.getElementById('userTableBody');
    const searchInput = document.getElementById('searchInput');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const currentPageSpan = document.getElementById('currentPage');

    let currentPage = 1;
    const limit = 10;

    // Function to fetch users
    const fetchUsers = async (page = 1, search = '') => {
        try {
            const response = await fetch(`/api/users?page=${page}&limit=${limit}&search=${search}`);
            const data = await response.json();
            displayUsers(data.users);
            updatePagination(data.totalPages, data.currentPage);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Function to display users in the table
    const displayUsers = (users) => {
        userTableBody.innerHTML = ''; // Clear existing rows
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.phone}</td>
                <td>${user.LGA}</td>
                <td>${user.ward}</td>
                <td>${user.nin}</td>
                <td>${user.bvn}</td>
                <td>${user.bankDetails.accountNumber}</td>
            `;
            userTableBody.appendChild(row);
        });
    };

    // Function to update pagination controls
    const updatePagination = (totalPages, currentPage) => {
        currentPageSpan.textContent = currentPage;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    };

    // Event listeners for pagination buttons
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchUsers(currentPage, searchInput.value);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        currentPage++;
        fetchUsers(currentPage, searchInput.value);
    });

    // Event listener for search input
    searchInput.addEventListener('input', () => {
        currentPage = 1; // Reset to the first page on search
        fetchUsers(currentPage, searchInput.value);
    });

    // Initial fetch of users
    fetchUsers(currentPage);
});