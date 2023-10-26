const SUPABASE_URL = "https://yspyqlodogzmrqsifbww.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcHlxbG9kb2d6bXJxc2lmYnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwOTMxNTYsImV4cCI6MjAxMzY2OTE1Nn0.YjQ-8W-UKbg5JPOO0q3aWT2eXjXe593IlxhkZVSAqkk";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

///////////////////////////////////// Load data to table
let tableData1 = []; // Initialize as an empty array to store the table data

// Function to load table data
async function loadTableData(data) {
  const tableBody = document.querySelector("#medform_table tbody");

  // Clear the table before populating it with data
  tableBody.innerHTML = '';

  if (data.length === 0) {
    // If no data in Supabase
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <th class="row" colspan="7" ">No data available</td>
    `;
    tableBody.appendChild(newRow);
    console.log("No data available");
  } else {
    data.forEach((row) => {
      const newRow = document.createElement("tr");
      newRow.classList.add("res");

      newRow.innerHTML = `
        <th class="row idcol">${row.patient_id}</th>
        <th class="row namecol">${row.patient_name}</th>
        <th class="row timecol">${row.created_date}</th>
        <th class="row coursecol">${row.course_section}</th>
        <th class="row timecol">${row.location}</th>
        <th class="row timecol">${row.added_by}</th>
        <th class="buttscol"><button class="viewbutt" onclick="showv()"><p class="txt">View</p></button></th>
      `;
      tableBody.appendChild(newRow);
    });
    console.log("Data loaded");
  }
}

// Function to sort the table data
function sortTable(selectedOption) {
  const sortedData = [...tableData1]; // Clone the table data to prevent modifying the original array

  if (selectedOption === "ID") {
    sortedData.sort((a, b) => a.patient_id - b.patient_id);
  } else if (selectedOption === "TimeLate") {
    sortedData.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
  } else if (selectedOption === "TimeOld") {
    sortedData.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
  } else if (selectedOption === "Name") {
    sortedData.sort((a, b) => a.patient_name.localeCompare(b.patient_name));
  } else if (selectedOption === "CS") {
    sortedData.sort((a, b) => a.course_section.localeCompare(b.course_section));
  }

  // Call the loadTableData function with the sorted data
  loadTableData(sortedData);
}

// Add event listener for sorting
const sortSelect = document.getElementById("sort1");
sortSelect.addEventListener("change", () => {
  const selectedOption = sortSelect.value;
  sortTable(selectedOption);
});

// Initially load the table data
loadTableData();


///////////////////////////////////// insert student medform data to table
$("#insertstudmedform").submit(async function (event) {
  event.preventDefault();
  // Get form field values
  const name = $("#studname").val();
  const id = $("#studid").val();
  const cs = $("#studcs").val();
  const loc1 = $("#locsel").val();
  const mf = $("#medform").val();

  // const medformInput = document.getElementById('medform');
  // const medformFile = medformInput.files[0];

  try {
    console.log("sssss");
    // // Check if the 'name' already exists in the 'med_forms1' table
    // const { data: existingData, error } = await _supabase.from('med_forms1').select('*').eq('patient_name', name);

    // if (error) {
    //     console.log("Error checking existing data:", error.message);
    //     return;
    // }

    // if (existingData.length > 0) {
    //     console.log("Data already exists for this name:", existingData);
    //     return;
    // }

    // Change the filename to "(name inputted)_medform"
    // const fileName = `${name}_medform.${medformFile.name.split('.').pop()}`;

    // Upload the file to Supabase storage with the modified filename
    // const { data, error: uploadError } = await _supabase.storage.from('medicalrecords').upload(fileName, medformFile);

    // if (uploadError) {
    //     console.error('Error uploading file:', uploadError.message);
    //     return;
    // }

    // const medformURL = `${SUPABASE_URL}/storage/v1/object/public/medicalrecords/${fileName}`;

    const medformInfo = {
      patient_id: id,
      patient_name: name,
      course_section: cs,
      location: loc1,
      added_by: "(depends on login)",
      med_file: mf,
    };

    // Insert data into the 'med_forms1' table
    const { data: insertData, error: insertError } = await _supabase
      .from("med_forms")
      .insert(medformInfo);

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

console.log("ssss2343asdadas");
