// supabase connection
const SUPABASE_URL = "https://yspyqlodogzmrqsifbww.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcHlxbG9kb2d6bXJxc2lmYnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwOTMxNTYsImV4cCI6MjAxMzY2OTE1Nn0.YjQ-8W-UKbg5JPOO0q3aWT2eXjXe593IlxhkZVSAqkk";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const test = () => {
    console.log(supabase);
    console.log("connection is tagumpay, laro ka na muna ulit :)");
}
test();

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
            return;
        }

        if (data.length === 0) {
            console.log("User ID not found");
            message.innerText = "Invalid credentials";
            return;
        }

        const user = data[0];

        if (user.password === passwordInput) {
            console.log("Login successful");
            // Redirect to the desired webpage upon successful login
            window.location.href = "/webpages/medicalrecords.html";
        } else {
            console.log("Invalid credentials");
            message.classList.add("loginfailed");
            message.innerText = "Login failed. Please check your credentials.";
        }
    });