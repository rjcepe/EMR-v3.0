//////////////////////////////////// user display
async function fetchUsername() {
    var id1 = localStorage.getItem("uid1");
  
    const { data, error } = await _supabase
      .from("user_accs")
      .select("username")
      .eq("id", id1);
  
    if (error) {
      console.error("Error fetching username:", error.message);
      return;
    }
  
    // Check if data is not empty
    if (data && data.length > 0) {
      const username = data[0].username;
      console.log(username);
  
      const usertab = document.querySelector(".username");
  
      if (usertab) {
        h4 = document.createElement("h4");
        h4.innerHTML = username;
  
        h6 = document.createElement("h6");
        h6.innerHTML = id1;
  
        usertab.appendChild(h4);
        usertab.appendChild(h6);
      } else {
        console.error("Element with class 'vfile' not found.");
      }
  
      // Now, you can use the 'username' variable as needed.
    } else {
      console.log("User not found with ID:", id);
    }
  }
  
  ////////// display corresponding user pic
  async function fetchUserPic() {
    var id1 = localStorage.getItem("uid1");
    const piclink = id1 + ".png";
    console.log(piclink);
  
    const userpiclink = `${SUPABASE_URL}/storage/v1/object/public/userimages/${piclink}`;
  
    const userTab = document.querySelector(".user");
    const usernameDiv = document.querySelector(".username");
  
    console.log(userpiclink);
  
    const img = document.createElement("img");
    img.setAttribute("src", userpiclink);
  
    userTab.insertBefore(img, usernameDiv);
  }
  
  fetchUserPic();
  fetchUsername();//////////////////////////////////// user display
async function fetchUsername() {
  var id1 = localStorage.getItem("uid1");

  const { data, error } = await _supabase
    .from("user_accs")
    .select("username")
    .eq("id", id1);

  if (error) {
    console.error("Error fetching username:", error.message);
    return;
  }

  // Check if data is not empty
  if (data && data.length > 0) {
    const username = data[0].username;
    console.log(username);

    const usertab = document.querySelector(".username");

    if (usertab) {
      h4 = document.createElement("h4");
      h4.innerHTML = username;

      h6 = document.createElement("h6");
      h6.innerHTML = id1;

      usertab.appendChild(h4);
      usertab.appendChild(h6);
    } else {
      console.error("Element with class 'vfile' not found.");
    }

    // Now, you can use the 'username' variable as needed.
  } else {
    console.log("User not found with ID:", id);
  }
}

////////// display corresponding user pic
async function fetchUserPic() {
  var id1 = localStorage.getItem("uid1");
  const piclink = id1 + ".png";
  console.log(piclink);

  const userpiclink = `${SUPABASE_URL}/storage/v1/object/public/userimages/${piclink}`;

  const userTab = document.querySelector(".user");
  const usernameDiv = document.querySelector(".username");

  console.log(userpiclink);

  const img = document.createElement("img");
  img.setAttribute("src", userpiclink);

  userTab.insertBefore(img, usernameDiv);
}

fetchUserPic();
fetchUsername();