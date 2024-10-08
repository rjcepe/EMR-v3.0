consrec_access();

//// search and filter states (inactive = 0 | active = 1)
let searchState = 0;
let filterState = 0;

////// initial load
loadTableData();

///////////////////////////////////// Load data to table
async function loadTableData() {
  filterState = 0;
  searchState = 0;

  const { data: patientData, error } = await _supabase
    .from("cons_rec")
    .select("*");

  if (error) {
    console.log("Error loading table data:", error.message);
    return;
  }
  const filteredData = patientData.filter((record) => record.archived === false);
  const tableBody = document.querySelector("#cons_table tbody");
  tableBody.innerHTML = ""; // Clear the current table

  if (filteredData.length === 0) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<th class="row" colspan="7">No data available</td>`;
    tableBody.appendChild(newRow);
    console.log("No data");
  } else {
    const selectedOption = document.getElementById("sort1").value;
    // Sort the data based on the selected option
    if (selectedOption === "IDasc") {
      filteredData.sort(
        (a, b) => new Number(a.patient_id) - new Number(b.patient_id)
      );
    } else if (selectedOption === "IDdesc") {
      filteredData.sort(
        (a, b) => new Number(b.patient_id) - new Number(a.patient_id)
      );
    } else if (selectedOption === "TimeLate") {
      filteredData.sort((a, b) => new Date(b.row_id) - new Date(a.row_id));
    } else if (selectedOption === "TimeOld") {
      filteredData.sort((a, b) => new Date(a.row_id) - new Date(b.row_id));
    } else if (selectedOption === "def") {
      filteredData.sort((a, b) => new Date(b.row_id) - new Date(a.row_id));
    } else if (selectedOption === "Nameaz") {
      filteredData.sort((a, b) =>
        a.patient_name.toString().localeCompare(b.patient_name)
      );
    } else if (selectedOption === "Nameza") {
      filteredData.sort((a, b) =>
        b.patient_name.toString().localeCompare(a.patient_name)
      );
    }

    let count = 1;
    filteredData.forEach((row) => {
      // check if the row is archived
      if (row.archived === false) {
        const newRow = document.createElement("tr");
        newRow.classList.add("res1");

        const counter = document.createElement("p");
        counter.classList.add("rCounter");

        counter.innerText = `${count}`;

        newRow.innerHTML = `
          <th class="row1 idcol1">${row.patient_id}</th>
          <th class="row1 namecol1">${row.patient_name}</th>
          <th class="row1 timecol1">${row.created_date}</th>
          <th class="row1 coursecol1">${row.course_section}</th>
          <th class="row1 diagcol1">${row.diagnosis}</th>
          <th class="row1 notescol">${row.notes}</th>
          <th class="row1 timecol1">${row.location}</th>
          <th class="row1 timecol1">${row.added_by}</th>

          <th class="buttscol">
            <button class="viewbutt" onclick="archive(${row.row_id}, '${row.archived}')">    
            <p class="txt">Archive</p>
            <img src="/files/images/archive1.png" alt="archive" srcset="">
              </button>

          </th>
          
        `;

        count++;

        tableBody.appendChild(newRow);
        newRow.appendChild(counter);
      }
    });
  }
}

// Add an event listener to the select element to detect changes
document.getElementById("sort1").addEventListener("change", function () {
  if (searchState != 1 && filterState != 1) {
    loadTableData(); // Reload the table data when the sorting option changes
  }
  if (searchState == 1) {
    searchEvent.call(document.getElementById("searchInput"));
  }
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
    .from("cons_rec")
    .select("*")
    .or(
      `patient_id.ilike.%${results}%, patient_name.ilike.%${results}%, course_section.ilike.%${results}%`
    );

  if (error) {
    console.error("Error fetching patient data:", error.message);
    alert("Invalid Input");
    return;
  }
  const filteredData = patientData.filter(
    (record) => record.archived === false
  );
  const tableBody = document.querySelector("#cons_table tbody");

  // Clear the current table
  tableBody.innerHTML = "";

  if (filteredData && filteredData.length > 0) {
    const selectedOption = document.getElementById("sort1").value;
    // Sort the data based on the selected option
    if (selectedOption === "IDasc") {
      filteredData.sort(
        (a, b) => new Number(a.patient_id) - new Number(b.patient_id)
      );
    } else if (selectedOption === "IDdesc") {
      filteredData.sort(
        (a, b) => new Number(b.patient_id) - new Number(a.patient_id)
      );
    } else if (selectedOption === "TimeLate") {
      filteredData.sort((a, b) => new Date(b.row_id) - new Date(a.row_id));
    } else if (selectedOption === "TimeOld") {
      filteredData.sort((a, b) => new Date(a.row_id) - new Date(b.row_id));
    } else if (selectedOption === "def") {
      filteredData.sort((a, b) => new Date(b.row_id) - new Date(a.row_id));
    } else if (selectedOption === "Nameaz") {
      filteredData.sort((a, b) =>
        a.patient_name.toString().localeCompare(b.patient_name)
      );
    } else if (selectedOption === "Nameza") {
      filteredData.sort((a, b) =>
        b.patient_name.toString().localeCompare(a.patient_name)
      );
    }

    // Patient data found, update the table
    let count = 1;

    filteredData.forEach((row) => {
      const newRow = document.createElement("tr");
      newRow.classList.add("res1");

      const counter = document.createElement("p");
      counter.classList.add("rCounter");

      counter.innerText = `${count}`;
      newRow.innerHTML = `
            <th class="row1 idcol1">${row.patient_id}</th>
            <th class="row1 namecol1">${row.patient_name}</th>
            <th class="row1 timecol1">${row.created_date}</th>
            <th class="row1 coursecol1">${row.course_section}</th>
            <th class="row1 diagcol1">${row.diagnosis}</th>
            <th class="row1 notescol">${row.notes}</th>
            <th class="row1 timecol1">${row.location}</th>
            <th class="row1 timecol1">${row.added_by}</th>
  
            <th class="buttscol">
            <button class="viewbutt" onclick="archive(${row.row_id}, '${row.archived}')">    
            <p class="txt">Archive</p>
            <img src="/files/images/archive1.png" alt="archive" srcset="">
              </button>

          </th>
          `;
      count++;
      tableBody.appendChild(newRow);
      newRow.appendChild(counter);
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
      .from("cons_rec")
      .select("*")
      .contains("allArr", [checkedValues]);

    const tableBody = document.querySelector("#cons_table tbody");
    tableBody.innerHTML = ""; // Clear the current table

    const filteredData = patientData.filter(
      (record) => record.archived === false
    );

    if (filteredData && filteredData.length > 0) {
      const selectedOption = document.getElementById("sort1").value;
      // Sort the data based on the selected option
      if (selectedOption === "IDasc") {
        filteredData.sort(
          (a, b) => new Number(a.patient_id) - new Number(b.patient_id)
        );
      } else if (selectedOption === "IDdesc") {
        filteredData.sort(
          (a, b) => new Number(b.patient_id) - new Number(a.patient_id)
        );
      } else if (selectedOption === "TimeLate") {
        filteredData.sort((a, b) => new Date(b.row_id) - new Date(a.row_id));
      } else if (selectedOption === "TimeOld") {
        filteredData.sort((a, b) => new Date(a.row_id) - new Date(b.row_id));
      } else if (selectedOption === "def") {
        filteredData.sort((a, b) => new Date(b.row_id) - new Date(a.row_id));
      } else if (selectedOption === "Nameaz") {
        filteredData.sort((a, b) =>
          a.patient_name.toString().localeCompare(b.patient_name)
        );
      } else if (selectedOption === "Nameza") {
        filteredData.sort((a, b) =>
          b.patient_name.toString().localeCompare(a.patient_name)
        );
      }
      // Patient data found, update the table
      let count = 1;
      filteredData.forEach((row) => {
        const newRow = document.createElement("tr");
        newRow.classList.add("res1");

        const counter = document.createElement("p");
        counter.classList.add("rCounter");

        counter.innerText = `${count}`;

        newRow.innerHTML = `
            <th class="row1 idcol1">${row.patient_id}</th>
            <th class="row1 namecol1">${row.patient_name}</th>
            <th class="row1 timecol1">${row.created_date}</th>
            <th class="row1 coursecol1">${row.course_section}</th>
            <th class="row1 diagcol1">${row.diagnosis}</th>
            <th class="row1 notescol">${row.notes}</th>
            <th class="row1 timecol1">${row.location}</th>
            <th class="row1 timecol1">${row.added_by}</th>
  
            <th class="buttscol">
            <button class="viewbutt" onclick="archive(${row.row_id}, '${row.archived}')">    
            <p class="txt">Archive</p>
            <img src="/files/images/archive1.png" alt="archive" srcset="">
              </button>

          </th>
            
          `;
        count++;
        tableBody.appendChild(newRow);
        newRow.appendChild(counter);
      });
    } else {
      // Patient not found
      const newRow = document.createElement("tr");
      newRow.innerHTML = '<th class="row" colspan="7">Patient not found</td>';
      tableBody.appendChild(newRow);
    }
  }
}

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

    // Now, you can use the 'username' variable as needed.
  } else {
    console.log("User not found with ID:", id);
  }
}

function getusername1(username) {
  var bb = username;
  sessionStorage.setItem("x", bb);
}

getusername();

////////////////////// drop down patient info
let dropsearchState = 0;
let pSelectID = "";
let pSelectName = "";
let pSelectCYS = "";
let pSelectType = "";

function clearSelectCont() {
  const selectCont = document.getElementById("dropcontis");
  selectCont.innerHTML = ``;
}
async function selectDropResult(row_id) {
  const { data, error } = await _supabase
    .from("med_forms")
    .select("*")
    .eq("row_id", row_id);

  const patientData = data[0];
  const selectCont = document.getElementById("dropcontis");
  selectCont.innerHTML = ``;

  const selectedDropCountlabel = document.createElement("div");
  selectedDropCountlabel.setAttribute("class", "selectedDropCount-label");

  selectedDropCountlabel.innerHTML = `
  <p>ID: <b>${patientData.patient_id}</b></p>
  <p>NAME: <b>${patientData.patient_name}</b></p>
  <p>CYS: <b>${patientData.course_section}</b></p>`;

  selectCont.appendChild(selectedDropCountlabel);

  pSelectID = patientData.patient_id;
  pSelectName = patientData.patient_name;
  pSelectCYS = patientData.course_section;

  if (patientData.allArr.includes("shs")) {
    pSelectType = "shs";
  } else if (patientData.allArr.includes("coll")) {
    pSelectType = "coll";
  } else if (patientData.allArr.includes("staff")) {
    pSelectType = "Staff";
  } else if (patientData.allArr.includes("faculty")) {
    pSelectType = "Faculty";
  }
}
const resultsContainer = document.getElementById("dropDownResP");
document
  .getElementById("dropSearchBar")
  .addEventListener("keyup", dropSearchEvent);

async function dropSearchEvent() {
  var results = this.value;
  if (results) {
    dropsearchState = 1;
    loadDropSearchResults(results);
  } else {
    loadDropResults();
  }
}

async function loadDropResults() {
  const { data, error } = await _supabase.from("med_forms").select("*");

  const filteredData = data
    .filter((record) => record.archived === false)
    .sort((a, b) => a.patient_name.toString().localeCompare(b.patient_name));

  document.getElementById("dropDownResP").classList.add("showRes");
  document.getElementById("dropDownResP").innerHTML = "";

  filteredData.forEach((row) => {
    const result = document.createElement("div");
    result.setAttribute("class", "dropdownP-results");
    result.setAttribute("onmousedown", `selectDropResult(${row.row_id})`);

    result.innerHTML = `<p class="dropResID">${row.patient_id}</p><p class="dropResName">${row.patient_name}</p><p>${row.course_section}</p>`;
    resultsContainer.appendChild(result);
  });
}
async function loadDropSearchResults(results) {
  const { data, error } = await _supabase
    .from("med_forms")
    .select("*")
    .or(
      `patient_id.ilike.%${results}%, patient_name.ilike.%${results}%, course_section.ilike.%${results}%`
    );

  const filteredData = data
    .filter((record) => record.archived === false)
    .sort((a, b) => a.patient_name.toString().localeCompare(b.patient_name));

  document.getElementById("dropDownResP").innerHTML = "";
  document.getElementById("dropDownResP").classList.add("showRes");

  filteredData.forEach((row) => {
    const result = document.createElement("div");
    result.setAttribute("class", "dropdownP-results");
    result.setAttribute("onmousedown", `selectDropResult(${row.row_id})`);

    result.innerHTML = `<p class="dropResID">${row.patient_id}</p><p class="dropResName">${row.patient_name}</p><p>${row.course_section}</p>`;
    resultsContainer.appendChild(result);
  });
  if (filteredData.length == 0) {
    const result = document.createElement("div");
    result.setAttribute("class", "dropdownP-results");

    result.innerHTML = `<p>Patient Not Found</p>`;
    resultsContainer.appendChild(result);
  }
}
document
  .getElementById("dropSearchBar")
  .addEventListener("focusin", async function () {
    loadDropResults();
  });

document
  .getElementById("dropSearchBar")
  .addEventListener("focusout", function () {
    document.getElementById("dropDownResP").classList.remove("showRes");
    resultsContainer.innerHTML = "";
  });

/////////////////////////////////// Upload student info
$("#insertstudconsform").submit(async function (event) {
  event.preventDefault();

  // get checkbox values
  const form = document.getElementById("insertstudconsform");

  // get values of all others textbox
  // Initialize an array to hold the values of the filled textboxes
  var filledValues = [];
  var otherArr = [];

  // Function to get the value of a textbox if it is filled
  function getFilledValue(selector) {
    var value = $(selector).val();
    if (value) {
      // Checks if the value is not empty, null, or undefined
      filledValues.push(value);

      var other1 = "Others";
      otherArr.push(other1);
    }
  }
  // Get values of all textboxes if they are filled
  getFilledValue("#othersTextDermatological");
  getFilledValue("#othersTextMusculoskeletal");
  getFilledValue("#othersTextHeadNeck");
  getFilledValue("#othersTextRespiratory");
  getFilledValue("#othersTextCardiovascular");
  getFilledValue("#othersTextGastrointestinal");
  getFilledValue("#othersTextGenitourinary");
  getFilledValue("#othersTextInfectious");
  getFilledValue("#othersTextNeurology");
  getFilledValue("#othersTextTrauma");
  getFilledValue("#othersTextMiscellaneous");

  // get values of the checked boxes
  const checkboxes = form.querySelectorAll(
    'input[type="checkbox"]:checked:not([name="others"])'
  );

  const checkedValues = Array.from(checkboxes).map(
    (checkbox) => checkbox.value
  );

  // Get form field values
  const loc1 = $("#locsel").val();
  const note1 = $("#notes").val();

  var diagchex = [...checkedValues, ...filledValues];

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
  var miscArr = [
    year,
    month,
    loc1,
    pSelectType,
    "AllTy",
    "AllLoc",
    "AllYr",
    "AllMn",
  ];

  if (otherArr != null) {
    var diagchex2 = [...checkedValues, ...filledValues, ...otherArr];
    var allArr = [...checkedValues, ...filledValues, ...otherArr, ...miscArr];
  } else {
    var diagchex2 = [...checkedValues, ...filledValues];
    var allArr = [...checkedValues, ...filledValues, ...miscArr];
  }

  const diag1 = diagchex.join(", ");

  var username = sessionStorage.getItem("x");

  try {
    const formInfo = {
      patient_id: pSelectID,
      patient_name: pSelectName,
      created_date: CurrentDate,
      course_section: pSelectCYS,
      location: loc1,
      added_by: username,
      diagnosis: diag1,
      diagchex: diagchex2,
      notes: note1,
      DateArr: DateArr,
      misc: miscArr,
      allArr: allArr,
      archived: false,
    };

    const { data: insertData, error: insertError } = await _supabase
      .from("cons_rec")
      .insert(formInfo);

    if (insertError) {
      console.error("Error inserting data:", insertError.message);
      alert("Missing Input Field");
    } else {
      console.log("Data inserted successfully.");
      // location.reload();
      loadTableData();
      hidep1();
      clearSelectCont();

      shownotif();

      // remove input after submission
      document.getElementById("insertstudconsform").reset();
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
});

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
