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
                 <th class="buttscol"><button class="viewbutt" onclick="showv()"><p class="txt">View</p></button></th>
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

  generateAndUploadPDF();

  try {
    console.log("sssss");

    const medformInfo = {
      patient_id: id,
      patient_name: name,
      course_section: cs,
      location: loc1,
      added_by: "(depends on login)",
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

// Function to generate PDF from an uploaded file

async function generateAndUploadPDF() {
    const medformFileInput = document.getElementById("medform");
    const medformFile = medformFileInput.files[0]; // Assuming you're dealing with a single file
  
    if (!medformFile) {
      console.error("No file selected.");
      return;
    }
  
    try {
      // Generate a new PDF instance
      const pdf = new jsPDF();
  
      // You would need to adjust this part based on how you want to convert the uploaded file to PDF.
      // For example, if it's an image, you might use a library like "html2canvas" or "pdf-lib" to add the image to the PDF.
      // Below is a simple example assuming it's an image.
      const image = new Image();
      image.src = URL.createObjectURL(medformFile);
      await image.decode();
  
      pdf.addImage(image, "JPEG", 10, 10, 100, 100); // Adjust position and size as needed
  
      // Save the generated PDF to a data URL
      const pdfDataUri = pdf.output("datauristring");
  
      // Upload the PDF to Supabase storage
      const { data, error: uploadError } = await _supabase.storage.from("medicalrecords").upload("generated.pdf", pdfDataUri);
  
      if (uploadError) {
        console.error("Error uploading PDF to Supabase:", uploadError);
        return;
      }
  
      console.log("PDF uploaded successfully to Supabase.");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  }


console.log("ssss2343asdadas");

//show results
function showv() {
  const vfile = document.querySelector(".main2");
  const main = document.querySelector(".main");

  main.classList.add("main-filter");
  vfile.classList.add("showv");
  vfile.classList.remove("hidev");
}
function hidev() {
  const vfile = document.querySelector(".main2");
  const main = document.querySelector(".main");

  main.classList.remove("main-filter");
  vfile.classList.add("hidev");
  vfile.classList.remove("showv");
}
