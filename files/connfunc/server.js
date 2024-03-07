var token = sessionStorage.getItem("accstoken");

if (token === null) {
  window.location.href = "../index.html";
}

// Function to handle user activity
function handleUserActivity() {
    isUserActive = true;

    clearTimeout(activityTimeout);
    activityTimeout = setTimeout(() => {
        isUserActive = false;
        
        window.alert("Logged Out Due To Inactivity");
        sessionStorage.removeItem('accstoken');

        window.location.href = "../index.html";


    }, 600000); // Consider user inactive after 10 minutes of no activity
}

// Event listeners for various user activities
document.addEventListener('mousemove', handleUserActivity);

// Setup a timeout
let activityTimeout = setTimeout(() => {
    isUserActive = false;
}, 10000);


