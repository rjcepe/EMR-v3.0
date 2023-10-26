const SUPABASE_URL = "https://yspyqlodogzmrqsifbww.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcHlxbG9kb2d6bXJxc2lmYnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwOTMxNTYsImV4cCI6MjAxMzY2OTE1Nn0.YjQ-8W-UKbg5JPOO0q3aWT2eXjXe593IlxhkZVSAqkk";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

///////////////////////////////////// Load data to table
// Define a variable to store the current sort column and order
let currentSortColumn = 'ID'; // Default sorting by ID
let currentSortOrder = 1; // 1 for ascending, -1 for descending
let tableData = []; // Initialize an empty array to hold the table data

// Function to update the table with sorted data
function updateTableWithSortedData(sortColumn, sortOrder) {
    const tableBody = document.querySelector("#medform_table tbody");

    // Clear the table
    tableBody.innerHTML = '';

    // Sort the data based on the selected column and order
    tableData.sort((a, b) => {
        const valueA = a[currentSortColumn];
        const valueB = b[currentSortColumn];
        return currentSortOrder * valueA.localeCompare(valueB);
    });
    

    // Rebuild the table with the sorted data
    tableData.forEach((row) => {
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
}

function disp(){
    currentSortColumn = document.querySelector("#sort1").value;

    if (currentSortColumn == "def") {
        // If nothing is selected, display unsorted data
        loadTableData(); // Call your initial data loading function
    } else {
        // Toggle the sort order if the same column is selected again
        currentSortOrder = currentSortOrder * -1;
        // Sort and update the table with sorted data
        updateTableWithSortedData(currentSortColumn, currentSortOrder);
    }
}


// // Event listener for the sorting select element
// document.querySelector("#sort1").addEventListener("change", function () {
//     currentSortColumn = this.value;
//     // Reload the table with sorted data
//     if (currentSortColumn === "1") {
//         // If nothing is selected, display unsorted data
//         loadTableData(); // Call your initial data loading function
//     } else {
//         // Toggle the sort order if the same column is selected again
//         currentSortOrder = currentSortOrder * -1;
//         // Sort and update the table with sorted data
//         updateTableWithSortedData(currentSortColumn, currentSortOrder);
//     }
// });

// Load the initial table data
async function loadTableData() {
    const { data, error } = await _supabase.from('med_forms').select("*");

    if (error) {
        console.log("Error loading table data:", error.message);
        return;
    }

    tableData = data; // Store the data in the global variable

    // Call the table
    const tableBody = document.querySelector("#medform_table tbody");

    if (tableData.length === 0) {
        // If no data in Supabase
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <th class="row" colspan="7">No data available</td>
        `;
        tableBody.appendChild(newRow);
    } else {
        // Display the initial data
        updateTableWithSortedData(currentSortColumn, currentSortOrder);
    }
}

disp();

  


///////////////////////////////////// insert student medform data to table
$('#insertstudmedform').submit(async function (event) {
    event.preventDefault();
    // Get form field values
    const name = $('#studname').val();
    const id = $('#studid').val();
    const cs = $('#studcs').val();
    const loc1 = $('#locsel').val();
    const mf = $('#medform').val();
    
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
        const { data: insertData, error: insertError } = await _supabase.from('med_forms').insert(medformInfo);

        if (insertError) {
            console.error('Error inserting data:', insertError.message);
        } else {
            console.log('Data inserted successfully:', insertData);
            location.reload();
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});

console.log("ssss2343asdadas");
