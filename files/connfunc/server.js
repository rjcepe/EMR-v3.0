var token = sessionStorage.getItem("accstoken");

if (token === null) {
  window.location.href = "../index.html";
}

function json(url) {
    return fetch(url).then(res => res.json());
  }
  
  let apiKey = '43cae56c431079389589877fa6f9713e5addf9e0c1665faee4b97b9c';

  json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
    console.log(data.ip);
    // console.log(data.city);
    // console.log(data.country_code);

    setSession(data.ip);
});



function setSession(ip) {
    const uid = sessionStorage.getItem("uid1");
    if (uid) {
        // Get the current state of ActUsers from localStorage
        let ActUsers = JSON.parse(localStorage.getItem("ActUsers")) || {};

        // Update the ActUsers object
        ActUsers[uid] = ip;

        // Save the updated ActUsers back to localStorage
        localStorage.setItem("ActUsers", JSON.stringify(ActUsers));

        // console.log(ActUsers);
    }
}

function getActiveUsers() {
    // Retrieve the active users from localStorage
    return JSON.parse(localStorage.getItem("ActUsers")) || {};
}

var ActUsers = getActiveUsers();
// console.log(ActUsers);

async function checkStatus() {
    const uid = sessionStorage.getItem("uid1");

    const { data, error } = await _supabase.from('user_accs').select('active').eq('id', uid);

    const stat = Object.values(data[0]);
    const stat1 = stat.toString();

    if (stat1 === "true"){
        // console.log("askda");
    }

}

// Set the interval and store the interval ID
var intervalId = setInterval(checkStatus, 3000);    

// Function to handle user activity
function handleUserActivity() {
    isUserActive = true;

    clearTimeout(activityTimeout);
    activityTimeout = setTimeout(() => {
        isUserActive = false;
        
        window.alert("Logged Out Due To Inactivity");
        // window.location.href = "../index.html";


    }, 120000); // Consider user inactive after 2 minutes of no activity
}

// Event listeners for various user activities
document.addEventListener('mousemove', handleUserActivity);

// Setup a timeout
let activityTimeout = setTimeout(() => {
    isUserActive = false;
}, 10000);


const accounts = {
    renz: "1",
    admin: "2",
    rj: "3",
    sandro: "4",
};
const active_accounts = {
    admin: "8",
};

let similarities = [];

Object.keys(accounts).forEach(acc => {

    Object.keys(active_accounts).forEach(act_acc => {
       if (acc === act_acc) {
            console.log(accounts[acc]);
            console.log(active_accounts[act_acc]);

            accounts[acc] = active_accounts[act_acc];

            console.log(accounts[acc]);
            console.log(active_accounts[act_acc]);
       }
    })
})

