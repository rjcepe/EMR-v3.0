const SUPABASE_URL = "https://yspyqlodogzmrqsifbww.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcHlxbG9kb2d6bXJxc2lmYnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwOTMxNTYsImV4cCI6MjAxMzY2OTE1Nn0.YjQ-8W-UKbg5JPOO0q3aWT2eXjXe593IlxhkZVSAqkk";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

///////////////////////////////////// insert student medform data to table

$('#insertstudmedform').submit(async function (event) {
    event.preventDefault();

    // Get form field values
    const name = $('#studname').val();
    const id = $('#studid').val();
    const cs = $('#studcs').val();
    const loc = $('#locsel').val();

    const medformInput = document.getElementById('medform');
    const medformFile = medformInput.files[0];

    try {
        // Check if the 'name' already exists in the 'med_forms1' table
        const { data: existingData, error } = await _supabase.from('med_forms1').select('*').eq('patient_name', name);

        if (error) {
            console.log("Error checking existing data:", error.message);
            return;
        }

        if (existingData.length > 0) {
            console.log("Data already exists for this name:", existingData);
            return;
        }

        // Change the filename to "(name inputted)_medform"
        const fileName = `${name}_medform.${medformFile.name.split('.').pop()}`;

        // Upload the file to Supabase storage with the modified filename
        const { data: uploadData, error: uploadError } = await _supabase.storage.from('records').upload(fileName, medformFile);

        if (uploadError) {
            console.error('Error uploading file:', uploadError.message);
            return;
        }

        const medformURL = `${SUPABASE_URL}/storage/v1/object/public/medicalrecords/${fileName}`;

        const medformInfo = {
            patient_name: name,
            patient_id: id,
            course_section: cs,
            location: loc,
            added_by: "(depends on login)",
            med_form: medformURL,
        };

        // Insert data into the 'med_forms1' table
        const { data: insertData, error: insertError } = await _supabase.from('med_forms1').insert([medformInfo]);

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
