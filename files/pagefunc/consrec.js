const SUPABASE_URL = "https://yspyqlodogzmrqsifbww.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcHlxbG9kb2d6bXJxc2lmYnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwOTMxNTYsImV4cCI6MjAxMzY2OTE1Nn0.YjQ-8W-UKbg5JPOO0q3aWT2eXjXe593IlxhkZVSAqkk";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

///////////////////////////////////// Load data to table
//////////////////////////////// sort function
// Add an event listener to the select element to detect changes
loadTableData();

document.getElementById("sort1").addEventListener("change", function () {
  loadTableData(); // Reload the table data when the sorting option changes
});

// Modify the loadTableData function to sort the table data
async function loadTableData() {
  const selectedOption = document.getElementById("sort1").value;

  const { data: tableData1, error } = await _supabase
    .from("cons_rec")
    .select("*");

  if (error) {
    console.log("Error loading table data:", error.message);
    return;
  }

  const tableBody = document.querySelector("#cons_table tbody");
  tableBody.innerHTML = ""; // Clear the current table

  if (tableData1.length === 0) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<th class="row" colspan="7">No data available</td>`;
    tableBody.appendChild(newRow);
    console.log("No data");
  } else {
    // Sort the data based on the selected option
    if (selectedOption === "ID") {
      tableData1.sort(
        (a, b) => new Date(a.patient_id) - new Date(b.patient_id)
      );
    } else if (selectedOption === "TimeLate") {
      tableData1.sort((a, b) => new Date(b.row_id) - new Date(a.row_id));
    } else if (selectedOption === "TimeOld") {
      tableData1.sort((a, b) => new Date(a.row_id) - new Date(b.row_id));
    } else if (selectedOption === "def") {
      tableData1.sort((a, b) => new Date(b.row_id) - new Date(a.row_id));
    } else if (selectedOption === "Nameaz") {
      tableData1.sort((a, b) =>
        a.patient_name.toString().localeCompare(b.patient_name)
      );
    } else if (selectedOption === "Nameza") {
      tableData1.sort((a, b) =>
        b.patient_name.toString().localeCompare(a.patient_name)
      );
    } else if (selectedOption === "CS") {
      tableData1.sort((a, b) =>
        a.course_section.toString().localeCompare(b.course_section)
      );
    } else if (selectedOption === "EMP") {
      tableData1.sort((a, b) =>
        b.course_section.toString().localeCompare(a.course_section)
      );
    }

    tableData1.forEach((row) => {
      const newRow = document.createElement("tr");
      newRow.classList.add("res1");
      newRow.innerHTML = `
          <th class="row1 idcol1">${row.patient_id}</th>
          <th class="row1 namecol1">${row.patient_name}</th>
          <th class="row1 timecol1">${row.created_date}</th>
          <th class="row1 coursecol1">${row.course_section}</th>
          <th class="row1 diagcol1">${row.diagnosis}</th>
          <th class="row1 notescol">${row.notes}</th>
          <th class="row1 timecol1">${row.location}</th>
          <th class="row1 timecol1">${row.added_by}</th>
          
        `;
      tableBody.appendChild(newRow);
    });
  }
}

////////////////////////////// fetch username
async function getusername() {
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

    getusername1(username);

    // Now, you can use the 'username' variable as needed.
  } else {
    console.log("User not found with ID:", id);
  }
}

function getusername1(username) {
  var bb = username;
  localStorage.setItem("x", bb);
}

getusername();

/////////////////////////////////// Upload student info
$("#insertstudconsform").submit(async function (event) {
  event.preventDefault();

  // Get form field values
  const name = $("#studname").val();
  const id = $("#studid").val();
  const cs = $("#studcs").val();
  const loc1 = $("#locsel").val();
  const diag1 = $("#diagnosis1").val();
  const note1 = $("#notes1").val();

  var username = localStorage.getItem("x");


  try {
    ///get current date
    // Specify the target timezone as "Asia/Manila"
    const targetTimezone = "Asia/Manila";

    // Get the current date and time in the target timezone
    const today = new Date();

    const year = today.toLocaleString("en-US", {
      timeZone: targetTimezone,
      year: "numeric",
    });
    const month = today.toLocaleString("en-US", {
      timeZone: targetTimezone,
      month: "2-digit",
    });
    const day = today.toLocaleString("en-US", {
      timeZone: targetTimezone,
      day: "2-digit",
    });

    const CurrentDate = `${year}-${month}-${day}`;
    console.log(CurrentDate);

    const formInfo = {
      patient_id: id,
      patient_name: name,
      created_date: CurrentDate,
      course_section: cs,
      location: loc1,
      added_by: username,
      diagnosis: diag1,
      notes: note1,
      
    };

    
    const { data: insertData, error: insertError } = await _supabase
      .from("cons_rec")
      .insert(formInfo);

    if (insertError) {
      console.error("Error inserting data:", insertError.message);
    } else {
      console.log("Data inserted successfully:", insertData);
      location.reload();
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
});

/////////////////////////////////////////// Upload employee info
$("#insertempconsform").submit(async function (event) {
  event.preventDefault();
  // Get form field values
  const name1 = $("#empname").val();
  const id1 = $("#empid").val();
  const loc1 = $("#locsel1").val();
  const diag2 = $("#diag2").val();
  const notes2 = $("#notes2").val();

  var username = localStorage.getItem("x");

  try {
    ///get current date
    // Specify the target timezone as "Asia/Manila"
    const targetTimezone = "Asia/Manila";

    // Get the current date and time in the target timezone
    const today = new Date();

    const year = today.toLocaleString("en-US", {
      timeZone: targetTimezone,
      year: "numeric",
    });
    const month = today.toLocaleString("en-US", {
      timeZone: targetTimezone,
      month: "2-digit",
    });
    const day = today.toLocaleString("en-US", {
      timeZone: targetTimezone,
      day: "2-digit",
    });

    const CurrentDate = `${year}-${month}-${day}`;
    console.log(CurrentDate);

    const formInfo = {
      patient_id: id1,
      patient_name: name1,
      created_date: CurrentDate,
      course_section: "Employee",
      location: loc1,
      added_by: username,
      diagnosis: diag2,
      notes: notes2,
      
    };

    const { data: insertData, error: insertError } = await _supabase.from("cons_rec").insert(formInfo);

    if (insertError) {
      console.error("Error inserting data:", insertError.message);
    } else {
      console.log("Data inserted successfully:", insertData);
      location.reload();
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
});

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
fetchUsername();


//////////////////////////////////search function
document
  .getElementById("searchpatient")
  .addEventListener("click", async function () {
    // Get the patient ID entered in the input field
    const searchID = document.getElementById("searchInput").value;

    // Fetch the patient data based on the search ID
    const { data: patientData, error } = await _supabase
      .from("cons_rec")
      .select("*")
      .eq("patient_id", searchID);

    if (error) {
      console.error("Error fetching patient data:", error.message);
      return;
    }

    const tableBody = document.querySelector("#cons_table tbody");

    // Clear the current table
    tableBody.innerHTML = "";

    if (patientData && patientData.length > 0) {
      // Patient data found, update the table
      patientData.forEach((row) => {
        const newRow = document.createElement("tr");
        newRow.classList.add("res1");

        newRow.innerHTML = `
            <th class="row1 idcol1">${row.patient_id}</th>
            <th class="row1 namecol1">${row.patient_name}</th>
            <th class="row1 timecol1">${row.created_date}</th>
            <th class="row1 coursecol1">${row.course_section}</th>
            <th class="row1 diagcol1">${row.diagnosis}</th>
            <th class="row1 notescol">${row.notes}</th>
            <th class="row1 timecol1">${row.location}</th>
            <th class="row1 timecol1">${row.added_by}</th>
        `;

        tableBody.appendChild(newRow);
      });
    } else {
      // Patient not found
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <th class="row" colspan="7">Patient not found</td>
      `;
      tableBody.appendChild(newRow);
    }
  });
