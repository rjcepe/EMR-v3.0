const SUPABASE_URL = "https://yspyqlodogzmrqsifbww.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcHlxbG9kb2d6bXJxc2lmYnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwOTMxNTYsImV4cCI6MjAxMzY2OTE1Nn0.YjQ-8W-UKbg5JPOO0q3aWT2eXjXe593IlxhkZVSAqkk";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

///////////////////////////////////// Load data to table
async function loadTableData() {
  const { data: tableData1, error } = await _supabase
    .from("med_forms")
    .select("*");

  if (error) {
    console.log("Error loading table data:", error.message);
    return;
  }
  console.log("hello");

  const tableBody = document.querySelector("#medform_table tbody");
  // Call the table

  if (tableData1.length === 0) {
    // If no data in Supabase
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
             <th class="row" colspan="7" ">No zata available</td>
         `;
    tableBody.appendChild(newRow);
    console.log("no zata");
  } else {
    // Sort the data by the created_date in descending order (latest first)
    tableData1.sort(
      (a, b) => new Date(b.created_date) - new Date(a.created_date)
    );

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
                 <th class="buttscol"><button class="viewbutt" onclick="showv('${row.med_file}', '${row.patient_name}')"><p class="txt">View</p></button></th>
                 `;
      tableBody.appendChild(newRow);
      console.log("yes zata");
    });
  }
}

loadTableData();

///////////////////////////////////// insert student medform data to table
$("#insertstudmedform").submit(async function (event) {
    event.preventDefault();
    // Get form field values
    const name = $("#studname").val();
    const id = $("#studid").val();
    const cs = $("#studcs").val();
    const loc1 = $("#locsel").val();
    var id1 = localStorage.getItem('uid1');

    const medformInput = document.getElementById('medform');
    const medformFile = medformInput.files[0];

    // Perform the insert operation with both name and medform
    try {
        // Change the filename to "(name inputted)_medform"
        const fileName = `${id}_medform.${medformFile.name.split('.').pop()}`;
                
        // Upload the file to Supabase storage with the modified filename
        const { data, error: uploadError } = await _supabase.storage.from('medicalrecords').upload(fileName, medformFile);

        if (uploadError) {
            console.error('Error uploading file:', uploadError);
            return;
        }
                
        const medformURL = SUPABASE_URL + "/storage/v1/object/public/medicalrecords/" + fileName;  // Fix this line

        console.log("sssss");
        
        const { data: username1, error } = await _supabase.from('user_accs').select('username').eq('id', id1);


        const medformInfo = {
            patient_id: id,
            patient_name: name,
            course_section: cs,
            location: loc1,
            added_by: username1,
            med_file: medformURL,
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



// Define an async function to fetch the username
async function fetchUsername() {
    var id1 = localStorage.getItem('uid1');

    const { data, error } = await _supabase.from('user_accs').select('username').eq('id', id1);

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
            h4 = document.createElement('h4');
            h4.innerHTML = username;

            h6 = document.createElement('h6');
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

// Call the async function to fetch the username
fetchUsername();


//show results
// Define filec and name1 in a broader scope
let filec;
let name1;

function showv(url, name) {
    const vfile = document.querySelector(".main2");
    const main = document.querySelector(".main");
    const file = document.querySelector(".vfile");

    if (file) {
        filec = document.createElement('embed');
        filec.classList.add('xfile');
        filec.setAttribute('src', url);

        name1 = document.createElement('p');
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
        file.removeChild(filec);
        file.removeChild(name1);
    }

    main.classList.remove("main-filter");
    vfile.classList.add("hidev");
    vfile.classList.remove("showv");
}

