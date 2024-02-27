var token = sessionStorage.getItem("accstoken");

if (token === null) {
  window.location.href = "../index.html";
}

const SUPABASE_URL = "https://yspyqlodogzmrqsifbww.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcHlxbG9kb2d6bXJxc2lmYnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwOTMxNTYsImV4cCI6MjAxMzY2OTE1Nn0.YjQ-8W-UKbg5JPOO0q3aWT2eXjXe593IlxhkZVSAqkk";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

function clearChart() {
  // Set the datasets array to an empty array
  initialDiseaseCountData.datasets = [];
  initialDiseaseCountData.labels = [];

  // Update the chart to reflect the changes
  diseaseCountChart.update();
}

function updateType() {
  clearChart();

  var patType = document.getElementById("patType").value;

  const diseaseDiv = document.getElementById("printFrame");
  const iframeDoc =
    diseaseDiv.contentDocument || diseaseIframe.contentWindow.document;

  iframeDoc.open();
  iframeDoc.write("");
  iframeDoc.close();

  fetchAllData(patType);
}

const diseaseDiv = document.getElementById("printFrame");
const iframeDoc =
  diseaseDiv.contentDocument || diseaseIframe.contentWindow.document;

function printFrame(type, year, location, month, patientC) {
  if (type == "AllTy") {
    type = "All Patients";
  } else if (patType == "shs") {
    type = "SHS Students";
  } else if (type == "coll") {
    type = "College Students";
  }
  if (location == "AllLoc") {
    location = "every clinic";
  }
  if (year == "AllYr") {
    year = "All";
  }
  if (month == "AllMn") {
    month = "";
  }
  if (month == "01") {
    month = "January";
  }
  if (month == "02") {
    month = "February";
  }
  if (month == "03") {
    month = "March";
  }
  if (month == "04") {
    month = "April";
  }
  if (month == "05") {
    month = "May";
  }
  if (month == "06") {
    month = "June";
  }
  if (month == "07") {
    month = "July";
  }
  if (month == "08") {
    month = "August";
  }
  if (month == "09") {
    month = "September";
  }
  if (month == "10") {
    month = "October";
  }
  if (month == "11") {
    month = "November";
  }
  if (month == "12") {
    month = "December";
  }

  var content = `<h2><strong>${year} ${month} Disease Cases in ${location} | ${type} (${patientC})</strong></h2><hr>`;

  iframeDoc.write(content);
}
async function fetchAllData(type) {
  var location = document.getElementById("location").value;
  var year = document.getElementById("year").value;
  var month = document.getElementById("month").value;

  var xx = [type, location, year, month];

  const { data } = await _supabase
    .from("cons_rec")
    .select("*")
    .contains("misc", [xx]);

  const diseaseCounts = {};
  const stat = {};
  const filteredData = data.filter((record) => record.archived === false);
  const patients = filteredData.length;

  // addLabel(type, year, location, month, patients);
  filteredData.forEach((data1) => {
    data1.diagchex.forEach((disease) => {
      if (stat[disease]) {
        stat[disease]++;
      } else {
        stat[disease] = 1;
      }

      if (!diseaseCounts[disease]) {
        diseaseCounts[disease] = {
          studCount: 0,
          staffCount: 0,
          facultyCount: 0,
        };
      }

      data1.misc.forEach((x) => {
        if (x === "shs" || x === "coll") {
          diseaseCounts[disease].studCount++;
        } else if (x === "Faculty") {
          diseaseCounts[disease].facultyCount++;
        } else if (x === "Staff") {
          diseaseCounts[disease].staffCount++;
        }
      });
    });
  });

  const diseaseCountsArray = Object.values(stat);
  const diseaseNamesArray = Object.keys(stat);
  
  addLabel(diseaseNamesArray);
  addDataset(diseaseCountsArray);

  printFrame(type, year, location, month, patients);

  let content = '<head><link rel="stylesheet" href="/files/styles.css"></head>';

  content +=
    '<body><table class="restab"><tr><th><h2>DISEASE</h2></th><th><h2>STUDENTS</h2></th><th><h2>FACULTY</h2></th><th><h2>STAFF</h2></th><th><h2>TOTAL</h2></th></tr>';
  let totalz = 0;

  for (const [disease, counts] of Object.entries(diseaseCounts)) {
    const subTotal = counts.studCount + counts.facultyCount + counts.staffCount;
    
    content += `<tr><th><b>${disease}</b></th><th>${counts.studCount}</th><th>${counts.facultyCount}</th><th>${counts.staffCount}</th><th>${subTotal}</th></tr>`;

    totalz += subTotal;
  }
  content += `<tr><th><b>TOTAL</b></th><th colspan="3"></th><th>${totalz}</th></tr>`;

  content += "</table></body>";
  iframeDoc.write(content);
}

function generateGradientColors(startColor, endColor, steps) {
  let start = {
    'Red': parseInt(startColor.slice(1, 3), 16),
    'Green': parseInt(startColor.slice(3, 5), 16),
    'Blue': parseInt(startColor.slice(5, 7), 16)
  };
  let end = {
    'Red': parseInt(endColor.slice(1, 3), 16),
    'Green': parseInt(endColor.slice(3, 5), 16),
    'Blue': parseInt(endColor.slice(5, 7), 16)
  };
  let diff = {
    'Red': end['Red'] - start['Red'],
    'Green': end['Green'] - start['Green'],
    'Blue': end['Blue'] - start['Blue']
  };

  let gradient = [];

  for (let i = 0; i < steps; i++) {
    let color = 'rgba(';
    color += Math.round(start['Red'] + (diff['Red'] * i / (steps - 1))) + ', ';
    color += Math.round(start['Green'] + (diff['Green'] * i / (steps - 1))) + ', ';
    color += Math.round(start['Blue'] + (diff['Blue'] * i / (steps - 1))) + ', ';
    color += '0.5)'; // Set the alpha value to 0.5
    gradient.push(color);
  }

  return gradient;
}

function addDataset(stat) {

  const startColor = '#0EBC4B'; 
  const endColor = '#356DC1'; 
  const numberOfColors = stat.length;

  const barColors = generateGradientColors(startColor, endColor, numberOfColors);

  var newDataset = {
    label: [],
    data: stat, // Initial values set to zero
    backgroundColor: barColors,
    borderColor: ["white"],
    borderWidth: 1,
  };

  // Add the new dataset to the chart
  initialDiseaseCountData.datasets.push(newDataset);
  diseaseCountChart.update();
  // Update the chart to display the new dataset
}

function addLabel(dis) {
  dis.forEach((data) => {
    initialDiseaseCountData.labels.push(data);
  });
  diseaseCountChart.update();
}

////////////// CHART INITIALIZATION
var ctxDiseaseCount = document
  .getElementById("diseaseCountChart")
  .getContext("2d");

// Define initial data for the bar chart with zero counts
var initialDiseaseCountData = {
  labels: [],
  datasets: [],
};

var diseaseCountChart = new Chart(ctxDiseaseCount, {
  type: "bar", // Keep type as 'bar' for horizontal bar chart
  data: initialDiseaseCountData,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    indexAxis: "y", 
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          display: true,
          color: "rgba(255,255,255,0.1)", // Color of grid lines for x-axis
        },
      },
      y: {
        grid: {
          display: false,
          color: "rgba(255,255,255,0.1)", // Color of grid lines for x-axis
        },
        beginAtZero: true,
        ticks: {
          color: "white",
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
        text: "",
        color: "white",
        font: {
          size: 18,
        },
      },
    },
  },
});

updateType();

function printStat() {
  var printFrame = document.getElementById("printFrame");

  printFrame.contentWindow.print();
}
