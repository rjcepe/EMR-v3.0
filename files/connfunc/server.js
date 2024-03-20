const SUPABASE_URL = "https://yspyqlodogzmrqsifbww.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcHlxbG9kb2d6bXJxc2lmYnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwOTMxNTYsImV4cCI6MjAxMzY2OTE1Nn0.YjQ-8W-UKbg5JPOO0q3aWT2eXjXe593IlxhkZVSAqkk";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

var token = sessionStorage.getItem("accstoken");

if (token === null) {
    window.location.href = "../Login";
}

function AdminOnly() {
    const access_level = sessionStorage.getItem("z");
    if (access_level != "Admin") {
        window.location.href = "/Home";
    }
}

// Function to handle user activity
function handleUserActivity() {
    isUserActive = true;

    clearTimeout(activityTimeout);
    activityTimeout = setTimeout(() => {
        isUserActive = false;
        
        window.alert("Logged Out Due To Inactivity");
        sessionStorage.removeItem('accstoken');

        window.location.href = "../Login";


    }, 600000); // Consider user inactive after 10 minutes of no activity
}

// Event listeners for various user activities
document.addEventListener('mousemove', handleUserActivity);

// Setup a timeout
let activityTimeout = setTimeout(() => {
    isUserActive = false;
}, 10000);

//////////////////////////////////////////////////////////////////////////////

// Specify the target timezone as "Asia/Manila"
const targetTimezone = "Asia/Manila";

// Get the current date and time in the target timezone
const today = new Date();
const month = today.toLocaleString("en-US", {
  timeZone: targetTimezone,
  month: "2-digit",
});
const year = today.toLocaleString("en-US", {
  timeZone: targetTimezone,
  year: "numeric",
});

let yearsPassed = 5;

const db_records = ["med_forms", "dental_forms", "cons_rec"];

async function checkRecords(db_records){

    const {data: records} = await _supabase.from(db_records).select("*");

    const filteredData = records.filter((record) => record.archived === false);

    filteredData.forEach((record) => {
        
        const recordYr = parseInt(record.DateArr[0]);

        if (year >= recordYr + yearsPassed){
            archive(record.row_id)
        }
    });

}

async function archive(id) {
    try {   
            // archive the data from the table
            const { data: archiveData, error: archiveDataError } = await _supabase.from('med_forms').update({archived: true}).eq('row_id', id);
  
            if (archiveDataError) {
                console.log('Error archiving data:', archiveDataError.message);
            } else {
                console.log('Data archived successfully:', archiveData);
                
            }
  
    } catch (error) {
        console.error('Error archiving data:', error.message);
    }
  }

db_records.forEach((list) =>{
    checkRecords(list);
});

