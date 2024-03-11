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
  } else if (type == "shs") {
    type = "SHS Students";
  } else if (type == "coll") {
    type = "College Students";
  }
  if (location == "AllLoc") {
    location = "All Clinics";
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

  const allpLabel = document.getElementById("allPlabel1");
  allpLabel.innerHTML = `${year} ${month} | DATA OVERVIEW | ${location}`;

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

  let totalP = 0;
  let shsP = 0;
  let collP = 0;
  let facP = 0;
  let stffP = 0;

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
          shsCount: 0,
          collCount: 0,
          staffCount: 0,
          facultyCount: 0,
        };
      }

      data1.misc.forEach((x) => {
        if (x === "shs") {
          diseaseCounts[disease].studCount++;
          diseaseCounts[disease].shsCount++;
        } else if (x === "coll") {
          diseaseCounts[disease].studCount++;
          diseaseCounts[disease].collCount++;
        } else if (x === "Faculty") {
          diseaseCounts[disease].facultyCount++;
        } else if (x === "Staff") {
          diseaseCounts[disease].staffCount++;
        }
      });
    });

    data1.misc.forEach((x) => {
      if (x === "shs") {
        shsP++;
        totalP++;
      } else if (x === "coll") {
        collP++;
        totalP++;
      } else if (x === "Faculty") {
        facP++;
        totalP++;
      } else if (x === "Staff") {
        stffP++;
        totalP++;
      }
    });
  });

  // brkdwnData(totalP, shsP, collP, facP, stffP, stat);

  const diseaseCountsArray = Object.values(stat);
  const diseaseNamesArray = Object.keys(stat);

  addLabel(diseaseNamesArray);
  addDataset(diseaseCountsArray);

  const brkdwn = document.getElementById("brkdwn1");
  brkdwn.innerHTML = "";
  const label = document.createElement("label");
  label.setAttribute("id", "allPlabel1");

  const brkcont = document.createElement("div");
  brkcont.setAttribute("id", "brktxtcont");
  brkcont.classList.add("brkdwn1-txt-cont");

  brkdwn.appendChild(label);
  brkdwn.appendChild(brkcont);

  printFrame(type, year, location, month, patients);

  let content = '<head><link rel="stylesheet" href="/files/styles.css"></head>';

  content +=
    '<body><table class="restab"><tr><th><h2>DISEASE</h2></th><th><h2>STUDENTS</h2></th><th><h2>FACULTY</h2></th><th><h2>STAFF</h2></th><th><h2>TOTAL</h2></th></tr>';
  let totalz = 0;
  let totalStud = 0;
  let totalFac = 0;
  let totalStaff = 0;

  for (const [disease, counts] of Object.entries(diseaseCounts)) {
    const subTotal = counts.studCount + counts.facultyCount + counts.staffCount;

    content += `<tr><th><b>${disease}</b></th><th>${counts.studCount}</th><th>${counts.facultyCount}</th><th>${counts.staffCount}</th><th>${subTotal}</th></tr>`;

    brkdwnData1(
      disease,
      counts.shsCount,
      counts.collCount,
      counts.facultyCount,
      counts.staffCount,
      type
    );

    totalz += subTotal;
    totalStud += counts.shsCount + counts.collCount;
    totalFac += counts.facultyCount;
    totalStaff += counts.staffCount;
  }
  content += `<tr><th><b>TOTAL</b></th><th>${totalStud}</th><th>${totalFac}</th><th>${totalStaff}</th><th>${totalz}</th></tr>`;

  content += "</table></body>";
  iframeDoc.write(content);
}

function brkdwnData1(
  disease,
  shsCount,
  collCount,
  facultyCount,
  staffCount,
  type
) {
  const totalC = shsCount + collCount + facultyCount + staffCount;

  // for breakdown container
  const brkdwn = document.getElementById("brktxtcont");

  const disLabel = document.createElement("span");
  disLabel.classList.add("brkdwn1-txt-label");
  disLabel.innerText = `${disease}`;

  const shsC = document.createElement("span");
  shsC.classList.add("brkdwn1-txt-sub-label");
  shsC.innerHTML = `SHS Students: <b>${shsCount}</b>`;

  const collC = document.createElement("span");
  collC.classList.add("brkdwn1-txt-sub-label");
  collC.innerHTML = `College Students: <b>${collCount}</b>`;

  const facP = document.createElement("span");
  facP.classList.add("brkdwn1-txt-sub-label");
  facP.innerHTML = `Faculty Members: <b>${facultyCount}</b>`;

  const staffC = document.createElement("span");
  staffC.classList.add("brkdwn1-txt-sub-label");
  staffC.innerHTML = `Staff Members: <b>${staffCount}</b>`;

  if (type === "AllTy") {
    brkdwn.appendChild(disLabel);
    brkdwn.appendChild(shsC);
    brkdwn.appendChild(collC);
    brkdwn.appendChild(facP);
    brkdwn.appendChild(staffC);
  } else if (type === "shs") {
    brkdwn.appendChild(disLabel);
    brkdwn.appendChild(shsC);
  } else if (type === "coll") {
    brkdwn.appendChild(disLabel);
    brkdwn.appendChild(collC);
  } else if (type === "Faculty") {
    brkdwn.appendChild(disLabel);
    brkdwn.appendChild(facP);
  } else if (type === "Staff") {
    brkdwn.appendChild(disLabel);
    brkdwn.appendChild(staffC);
  }
}
function generateGradientColors(startColor, endColor, steps) {
  let start = {
    Red: parseInt(startColor.slice(1, 3), 16),
    Green: parseInt(startColor.slice(3, 5), 16),
    Blue: parseInt(startColor.slice(5, 7), 16),
  };
  let end = {
    Red: parseInt(endColor.slice(1, 3), 16),
    Green: parseInt(endColor.slice(3, 5), 16),
    Blue: parseInt(endColor.slice(5, 7), 16),
  };
  let diff = {
    Red: end["Red"] - start["Red"],
    Green: end["Green"] - start["Green"],
    Blue: end["Blue"] - start["Blue"],
  };

  let gradient = [];

  for (let i = 0; i < steps; i++) {
    let color = "rgba(";
    color += Math.round(start["Red"] + (diff["Red"] * i) / (steps - 1)) + ", ";
    color +=
      Math.round(start["Green"] + (diff["Green"] * i) / (steps - 1)) + ", ";
    color +=
      Math.round(start["Blue"] + (diff["Blue"] * i) / (steps - 1)) + ", ";
    color += "0.8)"; // Set the alpha value to 0.5
    gradient.push(color);
  }

  return gradient;
}

function addDataset(stat) {
  const startColor = "#19d89f80";
  const endColor = "#28584980";
  const numberOfColors = stat.length;

  const barColors = generateGradientColors(
    startColor,
    endColor,
    numberOfColors
  );

  var newDataset = {
    label: [],
    data: stat, // Initial values set to zero
    backgroundColor: barColors,
    borderColor: ["white"],
    borderWidth: 0,
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
