// Modify the loadTableData function to sort the table data
async function loadTableData(searchTerm = '', filterOptions = [], sortOption = 'default') {
    const selectedOption = document.getElementById("sort1").value;
  
    let { data: tableData1, error } = await _supabase
      .from("cons_rec")
      .select("*");
  
    if (error) {
      console.log("Error loading table data:", error.message);
      return;
    }
  
  
    if (tableData1.length === 0) {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `<th class="row" colspan="7">No data available</td>`;
      tableBody.appendChild(newRow);
      console.log("No data");
    } else {
  
      if (filterOptions.length > 0) {
        tableData1 = tableData1.filter(row => filterOptions.includes(row.diagchex));
      }
    
        else if (searchTerm) {
        tableData1 = tableData1.filter(row =>
          row.patient_id.includes(searchTerm) ||
          row.patient_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          row.course_section.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      // Sort the data based on the selected option
        else if (selectedOption === "ID") {
        tableData1.sort((a, b) => new Date(a.patient_id) - new Date(b.patient_id)
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
  
      updateTable(tableData1);
    }
  }
  
  function updateTable(data) {
    const tableBody = document.querySelector("#cons_table tbody");
    tableBody.innerHTML = "";
  
    if (data.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="8">No data available</td></tr>`;
    } else {
      data.forEach(row => {
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
  // filterfunction onclick
  document.getElementById("filterbuttz").addEventListener("click", async function (){
  
    const form = document.getElementById("filterz-val");
    const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked:not([name="others"])');
  
    const checkedValues = Array.from(checkboxes).map((checkbox) => checkbox.value);
  
    console.log(checkedValues);
  
    const { data: patientData, error } = await _supabase
        .from("cons_rec")
        .select("*")
        .contains("diagchex", [checkedValues]);
  
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
  
  
  // filter fucntion, onchange
  const form1 = document.getElementById("filterz-val");
  const checkboxes = form1.querySelectorAll('input[type="checkbox"]:not([name="others"])');
  
  checkboxes.forEach(checkbox => {checkbox.addEventListener('change', async function() {
        const checkedCheckboxes = form1.querySelectorAll('input[type="checkbox"]:checked:not([name="others"])');
  
          if (checkedCheckboxes.length === 0) {
              // No checkboxes are selected, load default table data
              loadTableData();
          } else {
                const checkedValues = Array.from(form1.querySelectorAll('input[type="checkbox"]:checked:not([name="others"])')).map(checkbox => checkbox.value);
                
  
                const { data: patientData, error } = await _supabase
                .from("cons_rec")
                .select("*")
                .contains("diagchex", [checkedValues]);
  
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
                } 
                else {
                  // Patient not found
                  const newRow = document.createElement("tr");
                  newRow.innerHTML = `
                    <th class="row" colspan="7">Patient not found</td>
                  `;
                  tableBody.appendChild(newRow);
                }
      }
    });
  });