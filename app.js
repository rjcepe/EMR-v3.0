

//nav functions
function ToMedRec() {
  window.location.href = "medicalrecords.html";
}
function ToDenRec() {
  window.location.href = "dentalrecords.html";
}
function ToXray() {
  window.location.href = "xray.html";
}
function ToAccRec() {
  window.location.href = "accidentrec.html";
}
function ToConRec() {
  window.location.href = "consultationrec.html";
}
function ToMedCert() {
  window.location.href = "medcerts.html";
}
function ToAccCen() {
  window.location.href = "accidentcensus.html";
}
function logout() {
  window.location.href = "index.html";
}
function ToPresc() {
  window.location.href = "presc.html";
}

// supabase connection
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = "https://yspyqlodogzmrqsifbww.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcHlxbG9kb2d6bXJxc2lmYnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwOTMxNTYsImV4cCI6MjAxMzY2OTE1Nn0.YjQ-8W-UKbg5JPOO0q3aWT2eXjXe593IlxhkZVSAqkk";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const test = () => {
    console.log(supabase);
    console.log("connection is tagumpay, laro ka na muna ulit :)");
}
test();

// Load data to table
async function loadTableData() {
  const { data: tableData, error } = await _supabase
    .from("med_forms")
    .select("*");

  if (error) {
    console.log("Error loading table data:", error.message);
    return;
  }
  console.log("hello");
  const tableBody = document.getElementById("medform_table");
  // Call the table

  if (tableData.length === 0) {
    // If no data in Supabase
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
             <td colspan="7" style="text-align: center;">No data available</td>
         `;
    tableBody.appendChild(newRow);
  } else {
    tableData.forEach((row) => {
      const newRow = document.createElement("tr");
      newRow.classList.add("res");

      newRow.innerHTML = `
                 <th class="row idcol">${row.patient_id}</th>
                 <th class="row namecol">${row.patient_name}</th>
                 <th class="row timecol">${row.date_created}</th>
                 <th class="row coursecol">${row.course_section}</th>
                 <th class="row timecol">${row.location}</th>
                 <th class="row timecol">${row.added_by}</th>
                 <th class="buttscol"><button class="viewbutt" onclick="showv()"><p class="txt">View</p></button></th>
                 `;
      tableBody.appendChild(newRow);
    });
  }
}

loadTableData();
