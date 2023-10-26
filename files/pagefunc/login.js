const loginForm = document.getElementById("loginform");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const idInput = document.getElementById("uid").value;
    const passwordInput = document.getElementById("pw").value;

    const { data, error } = await supabase.from('user_accs').select('*').eq('id', idInput);

        if (error) {
            console.error("Error querying the database:", error.message);
            return;
        }

        if (data.length === 0) {
            console.log("User ID not found");
            message.innerText = "Login failed. Please check your credentials.";
            return;
        }

        const user = data[0];

        if (user.password === passwordInput) {
            console.log("Login successful");
            // Redirect to the desired webpage upon successful login
            window.location.href = "/webpages/medicalrecords.html";
        } else {
            console.log("Invalid credentials");
            message.innerText = "Login failed. Please check your credentials.";
        }
    });