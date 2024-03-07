// supabase connection
const SUPABASE_URL = "https://yspyqlodogzmrqsifbww.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcHlxbG9kb2d6bXJxc2lmYnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwOTMxNTYsImV4cCI6MjAxMzY2OTE1Nn0.YjQ-8W-UKbg5JPOO0q3aWT2eXjXe593IlxhkZVSAqkk";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//Login
const loginForm = document.getElementById("loginform");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const idInput = document.getElementById("uid").value;
  const passwordInput = document.getElementById("pw").value;

  const { data, error } = await _supabase.from('user_accs').select('*').eq('id', idInput);

  if (error) {
    console.error("Error querying the database:", error.message);
    message.classList.add("loginfailed");
    message.innerText = "!! User ID not found !!";
    return;
  }

  if (data.length === 0) {
    console.log("User ID not found");
    message.classList.add("loginfailed");
    message.innerText = "!! User ID not found !!";
    return;
  }

  const user = data[0];

  if (user.password === passwordInput) {
    
      window.alert("Login successful");

      window.location.href = "/webpages/home.html";

      const token = generateRandomString(64);
      sessionStorage.setItem('accstoken', token);

      var gg = document.getElementById('uid').value;
      sessionStorage.setItem('uid1', gg);

      var zz = user.access_level;
      sessionStorage.setItem('z', zz);
    
   
  } else {
    console.log("Password Incorrect");
    message.classList.add("loginfailed");
    message.innerText = "!! Password Incorrect !!";
  }
});

async function setToken(){

  const uid = sessionStorage.getItem("uid1");
  const token = generateRandomString(64);
     
  const { data, error } = await _supabase.from('user_accs').update({ token: token }).eq('id', uid);

  
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