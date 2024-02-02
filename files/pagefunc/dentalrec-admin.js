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
    .from("dental_forms")
    .select("*");

  if (error) {
    console.log("Error loading table data:", error.message);
    return;
  }

  const tableBody = document.querySelector("#dental_table tbody");
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
        <button class="viewbutt" onclick="archive(${row.row_id}, '${row.archived}')">    
        <p class="txt">Archive</p>
        <img src="/files/images/archive1.png" alt="archive" srcset="">
          </button>

      </th>
      <th class="buttscol">
        <button class="viewbutt" onclick="showv('${row.dental_file}', '${row.patient_name}')">
          <p class="txt">View</p>
          <img src="/files/images/view.png" alt="archive" srcset="">
        </button>
      </th>
      `;

        tableBody.appendChild(newRow);
      }
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
    .from("dental_forms")
    .select("*")
    .or(
      `patient_id.ilike.%${results}%, patient_name.ilike.%${results}%, course_section.ilike.%${results}%`
    );

  if (error) {
    console.error("Error fetching patient data:", error.message);
    alert("Invalid Input");
    return;
  }

  const tableBody = document.querySelector("#dental_table tbody");

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
          <button class="viewbutt" onclick="archive(${row.row_id}, '${row.archived}')">    
          <p class="txt">Archive</p>
          <img src="/files/images/archive1.png" alt="archive" srcset="">
            </button>
  
        </th>
        <th class="buttscol">
          <button class="viewbutt" onclick="showv('${row.dental_file}', '${row.patient_name}')">
            <p class="txt">View</p>
            <img src="/files/images/view.png" alt="archive" srcset="">
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
      .from("dental_forms")
      .select("*")
      .contains("allArr", [checkedValues]);

    console.log(patientData);

    const tableBody = document.querySelector("#dental_table tbody");
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
          <button class="viewbutt" onclick="archive(${row.row_id}, '${row.archived}')">    
          <p class="txt">Archive</p>
          <img src="/files/images/archive1.png" alt="archive" srcset="">
            </button>
  
        </th>
        <th class="buttscol">
          <button class="viewbutt" onclick="showv('${row.dental_file}', '${row.patient_name}')">
            <p class="txt">View</p>
            <img src="/files/images/view.png" alt="archive" srcset="">
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

//add to archives
async function archive(id, stat) {
  try {   

          if (stat == "false"){
            var newStatus = "true";
          }
          else{
            var newStatus = "false"; 
          }

          // archive the data from the table
          const { data: archiveData, error: archiveDataError } = await _supabase.from('dental_forms').update({archived: newStatus}).eq('row_id', id);

          if (archiveDataError) {
              console.log('Error archiving data:', archiveDataError.message);
          } else {
              console.log('Data archived successfully:', archiveData);
              
          }

          if (searchState != 1 && filterState != 1) {
            loadTableData(); // Reload the table data when the sorting option changes
          }
          if (searchState == 1) {
            searchEvent.call(document.getElementById("searchInput"));
          } // Reload the table data when the sorting option changes
          if (filterState == 1) {
            filterEvent.call(document.getElementById("filterz-val"));
          }

  } catch (error) {
      console.error('Error archiving data:', error.message);
  }
}

/////////////////////////////////////////////// insert student info
$("#insertstuddentalform").submit(async function (event) {
  event.preventDefault();

  let studdentalfilecount = 0;

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

  const dentalformInput = document.getElementById("dentalform");
  const dentalformFile = dentalformInput.files[0];

  var fileName;
  // Increment studmedfilecount
  studdentalfilecount++;

  async function uploadStudDentalFile() {
    
    // Change the filename to "(name inputted)_dentalform"
    fileName = `${id}_dentalform_${year}(${studdentalfilecount}).${dentalformFile.name
      .split(".")
      .pop()}`;

    // Upload the file to Supabase storage with the modified filename
    const { data, error: uploadError } = await _supabase.storage
      .from("dentalrecords")
      .upload(fileName, dentalformFile);

    if (uploadError) {
      var errorMessage = uploadError.error;

      if (errorMessage === "Duplicate") {
        studdentalfilecount++;
        await uploadStudDentalFile();
      }
    }
    if (data){
      await uploadStudDentalInfo();
    }
  }

  async function uploadStudDentalInfo() {
    const dentalformURL = `${SUPABASE_URL}/storage/v1/object/public/dentalrecords/${fileName}`;

    const dentalformInfo = {
      patient_id: id,
      patient_name: name,
      created_date: CurrentDate,
      course_section: cys,
      location: loc1,
      added_by: username,
      dental_file: dentalformURL,
      allArr: allArr,
      DateArr: DateArr,
      archived: false,
    };

    // Insert data into the 'dental_forms1' table
    const { data: insertData, error: insertError } = await _supabase
      .from("dental_forms")
      .insert(dentalformInfo);

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
      document.getElementById("insertstuddentalform").reset();
    }
  }

  await uploadStudDentalFile();
  
});

$("#insertempdentalform").submit(async function (event) {
  event.preventDefault();

  let empdentalfilecount = 0;

  // get cys
  const course = $("#course3").val();

  // Get form field values
  const name1 = $("#empname").val();
  const id1 = $("#empid").val();
  const loc1 = $("#locsel1").val();

  var ptype = "faculty";
  

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

  const dentalformInput = document.getElementById("dentalform2");
  const dentalformFile = dentalformInput.files[0];

  var fileName;

  // Increment empdentalfilecount
  empdentalfilecount++;

  async function uploadEmpDentalFile() {
    
    // Change the filename to "(name inputted)_dentalform"
    fileName = `${id1}_dentalform_${year}(${empdentalfilecount}).${dentalformFile.name
      .split(".")
      .pop()}`;

    // Upload the file to Supabase storage with the modified filename
    const { data, error: uploadError } = await _supabase.storage
      .from("dentalrecords")
      .upload(fileName, dentalformFile);

    if (uploadError) {
      var errorMessage = uploadError.error;

      if (errorMessage === "Duplicate") {
        empdentalfilecount++;
        await uploadEmpDentalFile();
      }
    }
    if (data){
      await uploadEmpMedInfo();
    }
  }

  async function uploadEmpMedInfo() {
    const dentalformURL = `${SUPABASE_URL}/storage/v1/object/public/dentalrecords/${fileName}`;

    const dentalformInfo = {
      patient_id: id1,
      patient_name: name1,
      created_date: CurrentDate,
      course_section: "Faculty - " + course,
      location: loc1,
      added_by: username,
      dental_file: dentalformURL,
      allArr: allArr,
      DateArr: DateArr,
      archived: false,
    };

    // Insert data into the 'dental_forms1' table
    const { data: insertData, error: insertError } = await _supabase
      .from("dental_forms")
      .insert(dentalformInfo);

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
      document.getElementById("insertempdentalform").reset();
    }
  }

  await uploadEmpDentalFile();
  
});

$("#insertstaffdentalform").submit(async function (event) {
  event.preventDefault();

  let staffdentalfilecount = 0;

  // Get form field values
  const name1 = $("#staffname").val();
  const id1 = $("#staffid").val();
  const loc1 = $("#locsel2").val();

  var ptype = "staff";
  

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

  const dentalformInput = document.getElementById("dentalform3");
  const dentalformFile = dentalformInput.files[0];

  var fileName;

  // Increment staffdentalfilecount
  staffdentalfilecount++;

  async function uploadStaffDentalFile() {
    
    // Change the filename to "(name inputted)_dentalform"
    fileName = `${id1}_dentalform_${year}(${staffdentalfilecount}).${dentalformFile.name
      .split(".")
      .pop()}`;

    // Upload the file to Supabase storage with the modified filename
    const { data, error: uploadError } = await _supabase.storage
      .from("dentalrecords")
      .upload(fileName, dentalformFile);

    if (uploadError) {
      var errorMessage = uploadError.error;

      if (errorMessage === "Duplicate") {
        staffdentalfilecount++;
        await uploadStaffDentalFile();
      }
    }
    if (data){
      await uploadStaffMedInfo();
    }
  }

  async function uploadStaffMedInfo() {
    const dentalformURL = `${SUPABASE_URL}/storage/v1/object/public/dentalrecords/${fileName}`;

    const dentalformInfo = {
      patient_id: id1,
      patient_name: name1,
      created_date: CurrentDate,
      course_section: "Staff",
      location: loc1,
      added_by: username,
      dental_file: dentalformURL,
      allArr: allArr,
      DateArr: DateArr,
      archived: false,
    };

    // Insert data into the 'dental_forms1' table
    const { data: insertData, error: insertError } = await _supabase
      .from("dental_forms")
      .insert(dentalformInfo);

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
      document.getElementById("insertstaffdentalform").reset();
    }
  }

  await uploadStaffDentalFile();
  
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
