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
  
    const { data: tableData1, error } = await _supabase.from("dental_forms").select("*");
  
    if (error) {
      console.log("Error loading table data:", error.message);
      return;
    }
  
    const tableBody = document.querySelector("#dental_table tbody");
  
    if (tableData1.length === 0) {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `<th class="row" colspan="7">No data available</td>`;
      tableBody.appendChild(newRow);
      console.log("No data");
    } else {
      // Sort the data based on the selected option
      if (selectedOption === "ID") {
        tableData1.sort((a, b) => new Date(a.patient_id) - new Date(b.patient_id));
      } else if (selectedOption === "TimeLate") {
        tableData1.sort((a, b) => new Date(b.row_id) - new Date(a.row_id));
      } else if (selectedOption === "TimeOld") {
        tableData1.sort((a, b) => new Date(a.row_id) - new Date(b.row_id));
      } else if (selectedOption === "def") {
        tableData1.sort((a, b) => new Date(a.row_id) - new Date(b.row_id));
      } else if (selectedOption === "Nameaz") {
        tableData1.sort((a, b) => a.patient_name.toString().localeCompare(b.patient_name));
      } else if (selectedOption === "Nameza") {
        tableData1.sort((a, b) => b.patient_name.toString().localeCompare(a.patient_name));
      } else if (selectedOption === "CS") {
        tableData1.sort((a, b) => a.course_section.toString().localeCompare(b.course_section));
      }
      
  
      tableData1.forEach((row) => {
        const newRow = document.createElement("tr");
        newRow.classList.add("res");
        newRow.innerHTML = `
          <th class="row idcol">${row.patient_id}</th>
          <th class="row namecol">${row.patient_name}</th>
          <th class="row timecol">${row.created_date}</th>
          <th class="row coursecol">${row.course_section}</th>
          <th class="row timecol">${row.location}</th>
          <th class="row timecol">${row.added_by}</th>
          <th class="buttscol">
            <button class="viewbutt" onclick="showv('${row.dental_file}', '${row.patient_name}')">
              <p class="txt">View</p>
            </button>
          </th>
        `;
        tableBody.appendChild(newRow);
      });
    }
  }


////////////////////////////// fetch username
 async function getusername(){
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

function getusername1(username){

  var bb = username;
  localStorage.setItem("x", bb);
}

getusername();



/////////////////////////////////// Upload student info
$("#insertstuddentalform").submit(async function (event) {
  event.preventDefault();
  // Get form field values
  const name = $("#studname").val();
  const id = $("#studid").val();
  const cs = $("#studcs").val();
  const loc1 = $("#locsel").val();

  var username = localStorage.getItem("x")

  const dentalformInput = document.getElementById("dentalform");
  const dentalformFile = dentalformInput.files[0];

  // Initialize the 'user' variable outside the try-catch block

  try {
    const fileName = `${id}_dentalform.${dentalformFile.name.split(".").pop()}`;

    // Upload the file to Supabase storage with the modified filename
    const { data, error: uploadError } = await _supabase.storage
      .from("dentalrecords")
      .upload(fileName, dentalformFile);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      return;
    }

    const dentalformURL = `${SUPABASE_URL}/storage/v1/object/public/dentalrecords/${fileName}`; // Fixed the URL formation

    console.log("sssss");

    const dentalformInfo = {
      patient_id: id,
      patient_name: name,
      course_section: cs,
      location: loc1,
      added_by: username,
      med_file: dentalformURL,
    };

    // Insert data into the 'med_forms1' table
    const { data: insertData, error: insertError } = await _supabase
      .from("med_forms")
      .insert(dentalformInfo);

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
$("#insertempdentalform").submit(async function (event) {
    event.preventDefault();
    // Get form field values
    const name1 = $("#empname").val();
    const id1 = $("#empid").val();
    const loc1 = $("#locsel1").val();

    var username = localStorage.getItem("x")

    const dentalformInput = document.getElementById("dentalform2");
  const dentalformFile = dentalformInput.files[0];
  
    // Initialize the 'user' variable outside the try-catch block
  
    try {
      // Change the filename to "(name inputted)_medform"
      const fileName = `${id}_dentalform.${dentalformFile.name.split(".").pop()}`;

    // Upload the file to Supabase storage with the modified filename
    const { data, error: uploadError } = await _supabase.storage
      .from("dentalrecords")
      .upload(fileName, dentalformFile);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      return;
    }

    const dentalformURL = `${SUPABASE_URL}/storage/v1/object/public/dentalrecords/${fileName}`; // Fixed the URL formation
  
      console.log("sssss");
  
      const dentalformInfo = {
        patient_id: id1,
        patient_name: name1,
        course_section: "Employee",
        location: loc1,
        added_by: username,
        med_file: dentalformURL,
      };
  
      // Insert data into the 'med_forms1' table
      const { data: insertData, error: insertError } = await _supabase
        .from("med_forms")
        .insert(dentalformInfo);
  
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

  const { data, error } = await _supabase.from("user_accs").select("username").eq("id", id1);

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
  const piclink = id1 + '.png';
  console.log(piclink);

  const userpiclink = `${SUPABASE_URL}/storage/v1/object/public/userimages/${piclink}`;

  const userTab = document.querySelector(".user");
    const usernameDiv = document.querySelector(".username");

    console.log(userpiclink);

    const img = document.createElement('img');
    img.setAttribute("src", userpiclink);

    userTab.insertBefore(img, usernameDiv);

}

fetchUserPic();
fetchUsername();

//////////////////////////////////////show results
let filec;
let name1;

function showv(url, name) {
  const vfile = document.querySelector(".main2");
  const main = document.querySelector(".main");
  const file = document.querySelector(".vfile");

  if (file) {
    filec = document.createElement("embed");
    filec.classList.add("xfile");
    filec.setAttribute("src", url);

    name1 = document.createElement("p");
    name1.id = "dispname";
    name1.innerHTML = name;

    file.appendChild(filec);
    file.appendChild(name1);
  } else {
    console.error("Element with class 'vfile' not found.");
  }

  main.classList.add("main-filter");
  vfile.classList.add("showv");
  vfile.classList.remove("hidev");
}

function hidev() {
  const vfile = document.querySelector(".main2");
  const main = document.querySelector(".main");
  const file = document.querySelector(".vfile");

  // Check if filec and name1 are defined before removing them
  if (filec && name1) {
    setTimeout(() => {
        file.removeChild(filec);
        file.removeChild(name1);
      }, 500); // .5s delay time 
    }

  main.classList.remove("main-filter");
  vfile.classList.add("hidev");
  vfile.classList.remove("showv");
}


//////////////////////////////////search function
document.getElementById("searchpatient").addEventListener("click", async function() {
    // Get the patient ID entered in the input field
    const searchID = document.getElementById("searchInput").value;
  
    // Fetch the patient data based on the search ID
    const { data: patientData, error } = await _supabase.from("dental_forms").select("*").eq("patient_id", searchID);
  
    if (error) {
      console.error("Error fetching patient data:", error.message);
      return;
    }
  
    const tableBody = document.querySelector("#dentalform_table tbody");
  
    // Clear the current table
    tableBody.innerHTML = "";
  
    if (patientData && patientData.length > 0) {
      // Patient data found, update the table
      patientData.forEach((row) => {
        const newRow = document.createElement("tr");
        newRow.classList.add("res");
  
        newRow.innerHTML = `
          <th class="row idcol">${row.patient_id}</th>
          <th class="row namecol">${row.patient_name}</th>
          <th class="row timecol">${row.created_date}</th>
          <th class="row coursecol">${row.course_section}</th>
          <th class="row timecol">${row.location}</th>
          <th class="row timecol">${row.added_by}</th>
          <th class="buttscol">
            <button class="viewbutt" onclick="showv('${row.dental_file}', '${row.patient_name}')">
              <p class="txt">View</p>
            </button>
          </th>
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




  