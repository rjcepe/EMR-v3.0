// supabase connection
const SUPABASE_URL = "https://yspyqlodogzmrqsifbww.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcHlxbG9kb2d6bXJxc2lmYnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwOTMxNTYsImV4cCI6MjAxMzY2OTE1Nn0.YjQ-8W-UKbg5JPOO0q3aWT2eXjXe593IlxhkZVSAqkk";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//Login
const loginForm = document.getElementById("loginform");
const message = document.getElementById("message");

let AttemptsCount = 5;
initializeLoginAttempts();

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const idInput = document.getElementById("uid").value;
  const passwordInput = document.getElementById("pw").value;

  const { data, error } = await _supabase
    .from("user_accs")
    .select("*")
    .eq("id", idInput);

  if (error) {
    console.error("Error querying the database:", error.message);
    errorMsg();
    return;
  }

  if (data.length === 0) {
    errorMsg();
    return;
  }

  const user = data[0];

  if (user.password === passwordInput) {
    window.alert("Login successful");
    window.location.href = "/webpages/home.html";
    setToken(user.access_level);
  } else {
    errorMsg();
  }
});

AttemptsCount === 1 && errorMsg();

function errorMsg() {
  // Remove the class and re-add it after a brief timeout
  message.classList.remove("loginfailed");
  message.innerText = "";
  const submessage = document.getElementById("loginattmpts");
  submessage.classList.remove("attemptscount");
  submessage.innerText = "";

  if (AttemptsCount === 1) {
    localStorage.setItem('AttemptsCount', AttemptsCount);
    localStorage.setItem('LastAttemptTime', Date.now());

    document.getElementById("loginbutt").disabled = true;
    setTimeout(() => {
      message.classList.add("loginfailed");
      message.innerHTML = `<img src="/files/images/error.png" alt="" srcset="">
      <p>Login attempt limit reached. Please wait for 3 minutes before trying to log in again.</p>`;
    }, 10);

    setTimeout(() => {
      resetLoginAttempts();
    }, 180000); //3 minutes timeout
  } else {
    AttemptsCount--;
    localStorage.setItem('AttemptsCount', AttemptsCount);

    setTimeout(() => {
      message.classList.add("loginfailed");
      message.innerHTML = `<img src="/files/images/warning.png" alt="" srcset="">
      <p>Invalid username or password. Please try again. <br></p>`;

      submessage.classList.add("attemptscount");
      submessage.innerHTML = `${AttemptsCount} Attempts Remaining`;
    }, 10);
  }
}

function initializeLoginAttempts() {
  const savedAttempts = parseInt(localStorage.getItem('AttemptsCount'));
  const savedTimestamp = parseInt(localStorage.getItem('LastAttemptTime'));
  const currentTime = Date.now();

  if (savedAttempts > 0 && savedTimestamp && currentTime - savedTimestamp < 180000) {
    AttemptsCount = savedAttempts;
    const remainingTime = 180000 - (currentTime - savedTimestamp);
    disableLoginForTimeout(remainingTime);
  } else {
    resetLoginAttempts();
  }
}

function disableLoginForTimeout(duration) {
  document.getElementById("loginbutt").disabled = true;
  setTimeout(() => {
    resetLoginAttempts();
  }, duration);
}

function resetLoginAttempts() {
  document.getElementById("loginbutt").disabled = false;
  localStorage.removeItem('AttemptsCount');
  localStorage.removeItem('LastAttemptTime');
  message.classList.remove("loginfailed");
  message.innerText = "";
  AttemptsCount = 5;
}
function setToken(access_level) {
  const token = generateRandomString(64);
  sessionStorage.setItem("accstoken", token);

  var UserId = document.getElementById("uid").value;
  sessionStorage.setItem("uid1", UserId);

  var UserAccess = access_level;
  sessionStorage.setItem("z", UserAccess);
}

function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
