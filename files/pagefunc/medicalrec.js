var token = sessionStorage.getItem("accstoken");

if (token === null) {
  window.location.href = "../index.html";
}

const SUPABASE_URL = "https://yspyqlodogzmrqsifbww.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcHlxbG9kb2d6bXJxc2lmYnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwOTMxNTYsImV4cCI6MjAxMzY2OTE1Nn0.YjQ-8W-UKbg5JPOO0q3aWT2eXjXe593IlxhkZVSAqkk";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//// search and filter states (inactive = 0 | active = 1)
let searchState = 0;
let filterState = 0;
console.log(searchState);
console.log(filterState);

////// initial load
loadTableData();

async function loadTableData() {
  filterState = 0;
  searchState = 0;

  const { data: tableData1, error } = await _supabase
    .from("med_forms")
    .select("*");

  if (error) {
    console.log("Error loading table data:", error.message);
    return;
  }

  const tableBody = document.querySelector("#medform_table tbody");
  tableBody.innerHTML = ""; // Clear the current table

  if (tableData1.length === 0) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<th class="row" colspan="7">No data available</td>`;
    tableBody.appendChild(newRow);
    console.log("No data");
  } else {
    const selectedOption = document.getElementById("sort1").value;
    // Sort the data based on the selected option
    if (selectedOption === "IDasc") {
      tableData1.sort(
        (a, b) => new Number(a.patient_id) - new Number(b.patient_id)
      );
    } else if (selectedOption === "IDdesc") {
      tableData1.sort(
        (a, b) => new Number(b.patient_id) - new Number(a.patient_id)
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
            <button class="viewbutt" onclick="showv('${row.med_file}', '${row.patient_name}')">
              <p class="txt">View</p>
            </button>
          </th>
        `;
      tableBody.appendChild(newRow);
    });
  }
}

document.getElementById("sort1").addEventListener("change", function () {
  if (searchState != 1 && filterState != 1) {
    loadTableData(); // Reload the table data when the sorting option changes
  }
  if (searchState == 1) {
    searchEvent.call(document.getElementById("searchInput"));
  } // Reload the table data when the sorting option changes
  if (filterState == 1) {
    filterEvent.call(document.getElementById("filterz-val"));
  }
});

document.getElementById("searchInput").addEventListener("keyup", searchEvent);

//////// search while typing
async function searchEvent() {
  var results = this.value;

  if (results) {
    searchState = 1;
    displayResults(results);
  } else {
    loadTableData();
  }
}

async function displayResults(results) {
  // Fetch the patient data based on the search ID
  const { data: patientData, error } = await _supabase
    .from("med_forms")
    .select("*")
    .or(
      `patient_id.ilike.%${results}%, patient_name.ilike.%${results}%, course_section.ilike.%${results}%`
    );

  if (error) {
    console.error("Error fetching patient data:", error.message);
    alert("Invalid Input");
    return;
  }

  const tableBody = document.querySelector("#medform_table tbody");

  // Clear the current table
  tableBody.innerHTML = "";

  if (patientData && patientData.length > 0) {
    const selectedOption = document.getElementById("sort1").value;
    // Sort the data based on the selected option
    if (selectedOption === "IDasc") {
      patientData.sort(
        (a, b) => new Number(a.patient_id) - new Number(b.patient_id)
      );
    } else if (selectedOption === "IDdesc") {
      patientData.sort(
        (a, b) => new Number(b.patient_id) - new Number(a.patient_id)
      );
    } else if (selectedOption === "TimeLate") {
      patientData.sort((a, b) => new Date(b.row_id) - new Date(a.row_id));
    } else if (selectedOption === "TimeOld") {
      patientData.sort((a, b) => new Date(a.row_id) - new Date(b.row_id));
    } else if (selectedOption === "def") {
      patientData.sort((a, b) => new Date(b.row_id) - new Date(a.row_id));
    } else if (selectedOption === "Nameaz") {
      patientData.sort((a, b) =>
        a.patient_name.toString().localeCompare(b.patient_name)
      );
    } else if (selectedOption === "Nameza") {
      patientData.sort((a, b) =>
        b.patient_name.toString().localeCompare(a.patient_name)
      );
    }

    // Patient data found, update the table
    patientData.forEach((row) => {
      if (row.archived === false) {
        const newRow = document.createElement("tr");
        newRow.classList.add("res1");

        newRow.innerHTML = `
          <th class="row idcol">${row.patient_id}</th>
          <th class="row namecol">${row.patient_name}</th>
          <th class="row timecol">${row.created_date}</th>
          <th class="row coursecol">${row.course_section}</th>
          <th class="row timecol">${row.location}</th>
          <th class="row timecol">${row.added_by}</th>
          <th class="buttscol">
            <button class="viewbutt" onclick="showv('${row.med_file}', '${row.patient_name}')">
              <p class="txt">View</p>
            </button>
          </th>
        `;

        tableBody.appendChild(newRow);
      }
    });
  } else {
    // Patient not found
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <th class="row" colspan="7">Patient not found</td>
      `;
    tableBody.appendChild(newRow);
  }
}

// Add an event listener to the checkboxes container
document.getElementById("filterz-val").addEventListener("change", filterEvent);

// Filter function, onchange
async function filterEvent() {
  filterState = 1;

  const form1 = document.getElementById("filterz-val");
  const checkedCheckboxes = form1.querySelectorAll(
    'input[type="checkbox"]:checked:not([name="others"])'
  );

  if (checkedCheckboxes.length === 0) {
    // No checkboxes are selected, load default table data
    loadTableData();
  } else {
    const checkedValues = Array.from(checkedCheckboxes).map(
      (checkbox) => checkbox.value
    );

    const { data: patientData, error } = await _supabase
      .from("med_forms")
      .select("*")
      .contains("allArr", [checkedValues]);

    console.log(patientData);

    const tableBody = document.querySelector("#medform_table tbody");
    tableBody.innerHTML = ""; // Clear the current table

    if (patientData && patientData.length > 0) {
      const selectedOption = document.getElementById("sort1").value;
      // Sort the data based on the selected option
      if (selectedOption === "IDasc") {
        patientData.sort(
          (a, b) => new Number(a.patient_id) - new Number(b.patient_id)
        );
      } else if (selectedOption === "IDdesc") {
        patientData.sort(
          (a, b) => new Number(b.patient_id) - new Number(a.patient_id)
        );
      } else if (selectedOption === "TimeLate") {
        patientData.sort((a, b) => new Date(b.row_id) - new Date(a.row_id));
      } else if (selectedOption === "TimeOld") {
        patientData.sort((a, b) => new Date(a.row_id) - new Date(b.row_id));
      } else if (selectedOption === "def") {
        patientData.sort((a, b) => new Date(b.row_id) - new Date(a.row_id));
      } else if (selectedOption === "Nameaz") {
        patientData.sort((a, b) =>
          a.patient_name.toString().localeCompare(b.patient_name)
        );
      } else if (selectedOption === "Nameza") {
        patientData.sort((a, b) =>
          b.patient_name.toString().localeCompare(a.patient_name)
        );
      }
      // Patient data found, update the table
      patientData.forEach((row) => {
        if (row.archived === false) {
          const newRow = document.createElement("tr");
          newRow.classList.add("res1");

          newRow.innerHTML = `
          <th class="row idcol">${row.patient_id}</th>
          <th class="row namecol">${row.patient_name}</th>
          <th class="row timecol">${row.created_date}</th>
          <th class="row coursecol">${row.course_section}</th>
          <th class="row timecol">${row.location}</th>
          <th class="row timecol">${row.added_by}</th>
          <th class="buttscol">
            <button class="viewbutt" onclick="showv('${row.med_file}', '${row.patient_name}')">
              <p class="txt">View</p>
            </button>
          </th>
        `;

          tableBody.appendChild(newRow);
        }
      });
    } else {
      // Patient not found
      const newRow = document.createElement("tr");
      newRow.innerHTML = '<th class="row" colspan="7">Patient not found</td>';
      tableBody.appendChild(newRow);
    }
  }
}

/////////////////////////////////////////////// insert student info
$("#insertstudmedform").submit(async function (event) {
  event.preventDefault();

  let studmedfilecount = 0;

  // get cys
  const college = $("#college2").val();
  const course = $("#course2").val();
  const section = $("#studcs").val();

  // Get form field values
  const name = $("#studname").val();
  const id = $("#studid").val();
  const cys = course + " " + section;

  if (college == "shs") {
    var ptype = "shs";
  } else {
    var ptype = "coll";
  }

  const loc1 = $("#locsel").val();

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
  const DateArr = [year, month, day];
  var allArr = [year, month, loc1, ptype, "AllTy", "AllLoc", "AllYr", "AllMn"];

  var username = sessionStorage.getItem("x");

  const medformInput = document.getElementById("medform");
  const medformFile = medformInput.files[0];

  var fileName;
  // Increment studmedfilecount
  studmedfilecount++;

  async function uploadStudMedFile() {
    
    // Change the filename to "(name inputted)_medform"
    fileName = `${id}_medform_${year}(${studmedfilecount}).${medformFile.name
      .split(".")
      .pop()}`;

    // Upload the file to Supabase storage with the modified filename
    const { data, error: uploadError } = await _supabase.storage
      .from("medicalrecords")
      .upload(fileName, medformFile);

    if (uploadError) {
      var errorMessage = uploadError.error;

      if (errorMessage === "Duplicate") {
        studmedfilecount++;
        await uploadStudMedFile();
      }
    }
    if (data){
      await uploadStudMedInfo();
    }
  }

  async function uploadStudMedInfo() {
    const medformURL = `${SUPABASE_URL}/storage/v1/object/public/medicalrecords/${fileName}`;

    const medformInfo = {
      patient_id: id,
      patient_name: name,
      created_date: CurrentDate,
      course_section: cys,
      location: loc1,
      added_by: username,
      med_file: medformURL,
      allArr: allArr,
      DateArr: DateArr,
      archived: false,
    };

    // Insert data into the 'med_forms1' table
    const { data: insertData, error: insertError } = await _supabase
      .from("med_forms")
      .insert(medformInfo);

    if (insertError) {
      console.error("Error inserting data:", insertError.message);
      alert("Error inserting data");
    } else {
      console.log("Data inserted successfully:", insertData);
      // location.reload();
      loadTableData();
      hidep1();
      shownotif();

      // blanks the add record container
      document.getElementById("insertstudmedform").reset();
    }
  }

  await uploadStudMedFile();
  
});

$("#insertempmedform").submit(async function (event) {
  event.preventDefault();

  // Retrieve the current empmedfilecount value from local storage
  let empmedfilecount = sessionStorage.getItem("empmedfilecount");

  // If empmedfilecount is not present in local storage, initialize it to 0
  if (empmedfilecount === null) {
    empmedfilecount = 0;
  } else {
    // Convert it to a number
    empmedfilecount = parseInt(empmedfilecount);
  }

  // Get form field values
  const name1 = $("#empname").val();
  const id1 = $("#empid").val();
  const loc1 = $("#locsel1").val();

  var username = sessionStorage.getItem("x");

  const medformInput = document.getElementById("medform2");
  const medformFile = medformInput.files[0];

  // Increment empmedfilecount
  empmedfilecount++;

  // Store the updated empmedfilecount back in local storage
  sessionStorage.setItem("empmedfilecount", empmedfilecount);

  // Initialize the 'user' variable outside the try-catch block
  try {
    // Change the filename to "(name inputted)_medform"
    const fileName = `${id1}_medform${empmedfilecount}.${medformFile.name
      .split(".")
      .pop()}`;

    // Upload the file to Supabase storage with the modified filename
    const { data, error: uploadError } = await _supabase.storage
      .from("medicalrecords")
      .upload(fileName, medformFile);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      alert("Error uploading file:", uploadError);
      return;
    }

    const medformURL = `${SUPABASE_URL}/storage/v1/object/public/medicalrecords/${fileName}`; // Fixed the URL formation

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

    const medformInfo = {
      patient_id: id1,
      patient_name: name1,
      created_date: CurrentDate,
      course_section: "Employee",
      location: loc1,
      added_by: username,
      med_file: medformURL,
    };

    // Insert data into the 'med_forms1' table
    const { data: insertData, error: insertError } = await _supabase
      .from("med_forms")
      .insert(medformInfo);

    if (insertError) {
      console.error("Error inserting data:", insertError.message);
      alert("Error inserting data:", insertError.message);
    } else {
      console.log("Data inserted successfully:", insertData);
      // location.reload();
      loadTableData();
      hidep();
      shownotif();

      $("#empname").val("");
      $("#empid").val("");
      $("#locsel1").val("");
      $("#medform2").val("");
    }
  } catch (error) {
    console.error("Error:", error.message);
    alert("Error:", error.message);
  }
});

getusername();

////////////////////////////// fetch username
async function getusername() {
  var id1 = sessionStorage.getItem("uid1");

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
  } else {
    console.log("User not found with ID:", id1);
  }
}

function getusername1(username) {
  var bb = username;
  sessionStorage.setItem("x", bb);
}

//////////////////////////////////// user display
async function fetchUsername() {
  var id1 = sessionStorage.getItem("uid1");
  var type = sessionStorage.getItem("z");

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

    const usertab = document.querySelector(".username");

    if (usertab) {
      h4 = document.createElement("h4");
      h4.innerHTML = username;

      h6 = document.createElement("h6");
      h6.innerHTML = `${id1} (${type})`;

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
  var id1 = sessionStorage.getItem("uid1");
  const piclink = id1 + ".png";

  const userpiclink = `${SUPABASE_URL}/storage/v1/object/public/userimages/${piclink}`;

  const userTab = document.querySelector(".user");
  const usernameDiv = document.querySelector(".username");

  const img = document.createElement("img");
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

access();

////////////// access initialization
function access() {
  var type = sessionStorage.getItem("y");

  if (type == "Doctor") {
    document.getElementById("addrecbutt").disabled = true;
  }
}
