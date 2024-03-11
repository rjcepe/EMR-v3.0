AdminOnly();

//// search and filter states (inactive = 0 | active = 1)
let searchState = 0;
let filterState = 0;

////// initial load
loadTableData();

///////////////////////////////////// Load data to table
async function loadTableData() {
  filterState = 0;
  searchState = 0;

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
  } 
  
  else {

    const selectedOption = document.getElementById("sort1").value;
    // Sort the data based on the selected option
    if (selectedOption === "IDasc") {
      tableData1.sort(
        (a, b) => new Number(a.patient_id) - new Number(b.patient_id)
      );
    }
    else if (selectedOption === "IDdesc") {
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

    let count = 1; 
    tableData1.forEach((row) => {

      // check if the row is archived
      if (row.archived === true) {
      
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
            <p class="txt">Restore</p>
            <img src="/files/images/unarchive1.png" alt="archive" srcset="">
              </button>

          </th>
          
        `;
        count ++;

      tableBody.appendChild(newRow);
      newRow.appendChild(counter);
      }
    });
  }
}

//edit data in row
async function deleteData(id) {
  try {
          // Delete the data from the table
          const { data: deletedData, error: deleteError } = await _supabase.from('cons_rec').delete().eq('row_id', id);

          if (deleteError) {
              console.log('Error deleting data:', deleteError.message);
          } else {
              console.log('Data deleted successfully:', deletedData);
              location.reload();
          }


          loadTableData();
  } catch (error) {
      console.error('Error deleting data:', error.message);
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
          const { data: archiveData, error: archiveDataError } = await _supabase.from('cons_rec').update({archived: newStatus}).eq('row_id', id);

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


// Add an event listener to the select element to detect changes
document.getElementById("sort1").addEventListener("change", function () {
  if (searchState != 1 && filterState !=1){
    loadTableData(); // Reload the table data when the sorting option changes
  }
  if (searchState == 1){
    searchEvent.call(document.getElementById('searchInput'));
  }
  if (filterState == 1){
    filterEvent.call(document.getElementById('filterz-val'));
  }

});

document.getElementById('searchInput').addEventListener('keyup', searchEvent);


//////// search while typing
async function searchEvent() {
      var results = this.value;
      
      if(results){
        searchState = 1;
        displayResults(results);
      }

      else{
        loadTableData();
      }
      
    };

async function displayResults(results) {
    
    // Fetch the patient data based on the search ID
    const { data: patientData, error } = await _supabase
      .from("cons_rec")
      .select("*")
      .or(`patient_id.ilike.%${results}%, patient_name.ilike.%${results}%, course_section.ilike.%${results}%`);

    if (error) {
      console.error("Error fetching patient data:", error.message);
      alert("Invalid Input")
      return;
    }

    const tableBody = document.querySelector("#cons_table tbody");

    // Clear the current table
    tableBody.innerHTML = "";

    if (patientData && patientData.length > 0) {

      const selectedOption = document.getElementById("sort1").value;
    // Sort the data based on the selected option
    if (selectedOption === "IDasc") {
      patientData.sort(
        (a, b) => new Number(a.patient_id) - new Number(b.patient_id)
      );
    }
    else if (selectedOption === "IDdesc") {
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
      let count = 1; 
      patientData.forEach((row) => {

        if (row.archived === true) {
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
            <p class="txt">Restore</p>
            <img src="/files/images/unarchive1.png" alt="archive" srcset="">
              </button>

          </th>
        `;
        count ++;
        tableBody.appendChild(newRow);
        newRow.appendChild(counter);
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

    
  };

// Add an event listener to the checkboxes container
document.getElementById('filterz-val').addEventListener('change', filterEvent);

// Filter function, onchange
async function filterEvent() {
  filterState = 1;

  const form1 = document.getElementById("filterz-val");
  const checkedCheckboxes = form1.querySelectorAll('input[type="checkbox"]:checked:not([name="others"])');

  if (checkedCheckboxes.length === 0) {
      // No checkboxes are selected, load default table data
      loadTableData();
  } else {
    const checkedValues = Array.from(checkedCheckboxes).map(checkbox => checkbox.value);
    

    const { data: patientData, error } = await _supabase
      .from("cons_rec")
      .select("*")
      .contains("allArr", [checkedValues]);

    console.log(patientData);

    const tableBody = document.querySelector("#cons_table tbody");
    tableBody.innerHTML = ""; // Clear the current table

    if (patientData && patientData.length > 0) {

      const selectedOption = document.getElementById("sort1").value;
        // Sort the data based on the selected option
        if (selectedOption === "IDasc") {
          patientData.sort(
            (a, b) => new Number(a.patient_id) - new Number(b.patient_id)
          );
        }
        else if (selectedOption === "IDdesc") {
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
      let count = 1; 
      patientData.forEach((row) => {

        if (row.archived === true) {

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
            <p class="txt">Restore</p>
            <img src="/files/images/unarchive1.png" alt="archive" srcset="">
              </button>

          </th>
        `;
        count ++;

        tableBody.appendChild(newRow);
        newRow.appendChild(counter);
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

