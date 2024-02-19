var token = sessionStorage.getItem("accstoken");

if (token === null) {
  window.location.href = "../index.html";
}

const SUPABASE_URL = "https://yspyqlodogzmrqsifbww.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcHlxbG9kb2d6bXJxc2lmYnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwOTMxNTYsImV4cCI6MjAxMzY2OTE1Nn0.YjQ-8W-UKbg5JPOO0q3aWT2eXjXe593IlxhkZVSAqkk";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

getusername();

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
  } else {
    console.log("User not found with ID:", id1);
  }
}

function getusername1(username) {
  var bb = username;
  sessionStorage.setItem("x", bb);
}

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

//////////////////////////////////////show results
let filec;
let name1;

function showv(url, name) {
  const vfile = document.querySelector(".main2");
  const main = document.querySelector(".main");
  const file = document.querySelector(".vfile");

  if (file) {
    filec = document.createElement("embed");
    filec.classList.add("xfile");
    filec.setAttribute("src", url);

    name1 = document.createElement("p");
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
    setTimeout(() => {
      file.removeChild(filec);
      file.removeChild(name1);
    }, 500); // .5s delay time
  }

  main.classList.remove("main-filter");
  vfile.classList.add("hidev");
  vfile.classList.remove("showv");
}

//////////get current month

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

fetchAllData();
fetchAllData1();

///////////////////////////////// BAR GRAPH (patient count) /////////////////////////////////////
// fetch ALL data from consultation records (based on current month)
async function fetchAllData() {
  const { data } = await _supabase.from("cons_rec").select("*").contains("misc", [month]);

  // Filter data where "archived" is false
  const filteredData = data.filter(record => record.archived === false);
  const patients = filteredData.length;

  // Count the number of students, staff, and faculty
  let studentsCount = 0;
  let staffCount = 0;
  let facultyCount = 0;
  addLabel();

  filteredData.forEach(record => {
    if (record.misc.includes("coll") || record.misc.includes("shs")) {
      studentsCount++;
    } else if (record.misc.includes("Staff")) {
      staffCount++;
    } else if (record.misc.includes("Faculty")) {
      facultyCount++;
    }
    
  });

  const allpLabel = document.getElementById("allPlabel");
  allpLabel.innerHTML = `${monthAlpha} ${year} Patient Count`;


  // Add datasets to the chart
  addDataset("Students", studentsCount);
  addDataset("Staff", staffCount);
  addDataset("Faculty", facultyCount);
  
  
}

function addDataset(label, count) {

  // random color generator
  const red = Math.floor(Math.random() * 156);
  const green = Math.floor(Math.random() * 400);
  const blue = Math.floor(Math.random() * 256);

  // Combine them into an rgba string with 0.5 opacity
  const randomColor = `rgba(${red},${green},${blue},0.5)`;

  var newDataset = {

    label: label,
    data: [count], // Initial values set to zero
    backgroundColor: [randomColor],
    borderColor: ['white'],
    borderWidth: 0

  };

  // Add the new dataset to the chart
  initialPatientCountData.datasets.push(newDataset);
  patientCountChart.update();
}
function addLabel(){

  const title1 = ``;

  initialPatientCountData.labels.push(title1);
  patientCountChart.update();
}

let monthAlpha = "";
monthToAlpha(month);

function monthToAlpha (month){
  if(month == "01"){month = "January";} if(month == "02"){month = "February";} if(month == "03"){month = "March";}
  if(month == "04"){month = "April";} if(month == "05"){month = "May";} if(month == "6"){month = "June";}
  if(month == "07"){month = "July";} if(month == "08"){month = "August";} if(month == "9"){month = "September";}
  if(month == "10"){month = "October";} if(month == "11"){month = "November";} if(month == "12"){month = "December";}

  monthAlpha = month;
}

////////////// CHART INITIALIZATION
var ctxPatientCount = document
  .getElementById("PatientCountChart")
  .getContext("2d");

// Define initial data for the bar chart with zero counts
var initialPatientCountData = {
  labels: [],
  datasets: [],
};

var patientCountChart = new Chart(ctxPatientCount, {
  type: "bar",
  data: initialPatientCountData,
  options: {
    responsive: true,
    scales: {
      y: {
        grid: {
          display: false,
          color: 'rgba(255,255,255,0.3)' // Color of grid lines for x-axis
        },
        beginAtZero: true,
        ticks: {
          display: false,
          color: "white", // Y-axis label colors
        },
      },
      x: {
        ticks: {
          display: false,
          color: "white", // X-axis label colors
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        labels: {
          color: "white",
        },
      },
      title: {
        display: false,
        text: `${monthAlpha} ${year} Patient Count`,
        color: "white",
        font: {
          size: 18,
        },
      },
    },
  },
});

///////////////////////////////// --------- /////////////////////////////////////



///////////////////////////////// PIE GRAPH (top diseases count) /////////////////////////////////////
// fetch ALL data from consultation records (based on current month)
async function fetchAllData1() {
  const { data } = await _supabase.from("cons_rec").select("*").contains("misc", [month]);

  // Filter data where "archived" is false
  const filteredData = data.filter(record => record.archived === false);
  const patients = filteredData.length;

  // Count the number of students, staff, and faculty
  const stat = {};
  filteredData.forEach(record => {

    record.diagchex.forEach(dis => {
      if(stat[dis]){
        stat[dis]++;
      }
      else {
        stat[dis] = 1;
      }
    })
    
  });

  const dataArray = Object.entries(stat);

  // Sort the array based on the second element (the values) in descending order
  dataArray.sort((a, b) => b[1] - a[1]);

  // Get the top 3 items with the most counts
  const top3 = dataArray.slice(0, 3);

  // Convert the top 3 items back to an object
  const top3Object = Object.fromEntries(top3);
    
  let Top3List = '';
  let disC = [];
  let disC1 = [];
  let counter = 1;
  let total = 0;

  for (const [disease, count] of Object.entries(top3Object)) {
      Top3List += `<li>${disease}: <b>${count}</b></li>`;
      disC.push(disease);  
      disC1.push(count);  
      counter ++;
      // addDataset1(disease, count);
    }

  for (let i = 0; i < disC1.length; i++) {
      total += disC1[i];
    }
  console.log(total);

  addDataset1(disC, disC1);
  addLabel1(month, disC);
    
  const top3listcont = document.getElementById("topC");
  const doughnut = document.getElementById("totaldogs");

  const ul = document.createElement("ul");
  ul.innerHTML = `${Top3List}`;

  const totalC = document.createElement("h5");
  totalC.innerHTML = `${total}`;

  top3listcont.appendChild(ul);
  doughnut.appendChild(totalC);
}

function addDataset1(label, count) {

  var newDataset1 = {
    data: count,
    backgroundColor: ["rgb(97, 183, 156)", "rgb(40, 88, 73)" , "rgb(202, 231, 222)"],
    borderColor: ['rgb(255,255,255,0.4)'],
    borderWidth: 0,
  };

  // Add the new dataset to the chart
  initialPatientCountData1.datasets.push(newDataset1);
  patientCountChart1.update();
}

function addLabel1(month, dis) {
  if (month == "01") { month = "January"; } if (month == "02") { month = "February"; } if (month == "03") { month = "March"; }
  if (month == "04") { month = "April"; } if (month == "05") { month = "May"; } if (month == "6") { month = "June"; }
  if (month == "07") { month = "July"; } if (month == "08") { month = "August"; } if (month == "9") { month = "September"; }
  if (month == "10") { month = "October"; } if (month == "11") { month = "November"; } if (month == "12") { month = "December"; }

  initialPatientCountData1.labels = dis;
  patientCountChart1.update();
}


////////////// CHART INITIALIZATION
var ctxPatientCount1 = document
  .getElementById("TopdCountChart")
  .getContext("2d");

// Define initial data for the bar chart with zero counts
var initialPatientCountData1 = {
  labels: [],
  datasets: [],
};

var patientCountChart1 = new Chart(ctxPatientCount1, {
  type: "doughnut",
  data: initialPatientCountData1,
  options: {
    cutout: "70%",
    responsive: true,
    scales: {
      y: {
        grid: {
          display: false,
          color: 'rgba(255,255,255,1)' // Color of grid lines for x-axis
        },
        beginAtZero: true,
        ticks: {
          display: false,
          color: "white", // Y-axis label colors
        },
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          display: false,
          color: "white", // X-axis label colors
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        labels: {
          color: "white",
        },
      },
      title: {
        display: false,
        color: "white",
        font: {
          size: 18,
        },
      },
    },
  },
});

///////////////////////////////// --------- /////////////////////////////////////



