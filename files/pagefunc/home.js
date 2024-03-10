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

const MonthYear = [month, year];

fetchCurrentMonthPatiens();
fetchTop5diseases();
fetchRecentVisits();

///////////////////////////////// BAR GRAPH (patient count) /////////////////////////////////////
// fetch ALL data from consultation records (based on current month)
async function fetchCurrentMonthPatiens() {
  const { data } = await _supabase
    .from("cons_rec")
    .select("*")
    .contains("misc", MonthYear);

  // Filter data where "archived" is false
  const filteredData = data.filter((record) => record.archived === false);

  // Count the number of students, staff, and faculty
  let studentsCount = 0;
  let staffCount = 0;
  let facultyCount = 0;
  let shsCount = 0;
  let collCount = 0;

  filteredData.forEach((record) => {
    if (record.misc.includes("coll")) {
      collCount++;
      studentsCount++;
    } else if (record.misc.includes("shs")) {
      shsCount++;
      studentsCount++;
    } else if (record.misc.includes("Staff")) {
      staffCount++;
    } else if (record.misc.includes("Faculty")) {
      facultyCount++;
    }
  });

  const totalCount = studentsCount + facultyCount + staffCount;

  brkdwnData(totalCount, shsCount, collCount, facultyCount, staffCount);

  const labels = ["Students", "Staff", "Faculty"];
  const counts = [studentsCount, staffCount, facultyCount];

  // Add datasets to the chart
  addDataset(counts);
  addLabel(labels);
}

function brkdwnData(totalCount, shsCount, collCount, facultyCount, staffCount) {
  const allpLabel = document.getElementById("allPlabel");
  // allpLabel.innerHTML = `${monthAlpha} ${year} Patient Count`;
  allpLabel.innerHTML = `This Month's Visit Count`;

  // for breakdown container
  const brkdwn = document.getElementById("brkdwn");

  const totalC = document.createElement("span");
  totalC.innerHTML = `Total Visits: <br><b>${totalCount}</b>`;

  const studbrk = document.createElement("div");
  studbrk.classList.add("studbrk");

  const studbrktxt1 = document.createElement("div");
  const studbrktxt2 = document.createElement("div");
  studbrktxt1.classList.add("brktxt");
  studbrktxt2.classList.add("brktxt");

  studbrktxt1.innerHTML = `<p>SHS Students:</p><b>${shsCount}</b>`;
  studbrktxt2.innerHTML = `<p>College Students:</p><b>${collCount}</b>`;

  const empbrk = document.createElement("div");
  empbrk.classList.add("empbrk");

  const empbrktxt1 = document.createElement("div");
  const empbrktxt2 = document.createElement("div");
  empbrktxt1.classList.add("brktxt");
  empbrktxt2.classList.add("brktxt");

  empbrktxt1.innerHTML = `<p>Faculty Members:</p><b>${facultyCount}</b>`;
  empbrktxt2.innerHTML = `<p>Staff Members:</p><b>${staffCount}</b>`;

  brkdwn.appendChild(totalC);

  studbrk.appendChild(studbrktxt1);
  studbrk.appendChild(studbrktxt2);
  brkdwn.appendChild(studbrk);

  empbrk.appendChild(empbrktxt1);
  empbrk.appendChild(empbrktxt2);
  brkdwn.appendChild(empbrk);
}

function addDataset(count) {
  const x = { Students: count[0], Staff: count[1], Faculty: count[2] };

  // Define the colors for the bars
  const barColors = [
    "rgb(40, 88, 73)",
    "rgb(72, 158, 131)",
    "rgb(202, 231, 222)",
  ];

  // Create a new dataset with the specified color
  var newDataset = {
    label: [],
    data: x,
    backgroundColor: barColors,
    borderColor: ["white"],
    borderWidth: 0,
  };

  // Add the new dataset to the chart
  initialPatientCountData.datasets.push(newDataset);
  patientCountChart.update();
}

function addLabel(labels) {
  labels.forEach((data) => {
    initialPatientCountData.labels.push(data);
  });
  patientCountChart.update();
}

let monthAlpha = "";
monthToAlpha(month);

function monthToAlpha(month) {
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
  if (month == "6") {
    month = "June";
  }
  if (month == "07") {
    month = "July";
  }
  if (month == "08") {
    month = "August";
  }
  if (month == "9") {
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

  monthAlpha = month;
}
const dbhl = document.getElementById("dashb-hl");
dbhl.innerText = `${monthAlpha} ${year} | Dashboard`;

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
    maintainAspectRatio: false, // Add this line to prevent aspect ratio adjustment
    aspectRatio: 1,
    scales: {
      y: {
        grid: {
          display: true,
          color: "rgba(255,255,255,0.1)", // Color of grid lines for x-axis
        },
        beginAtZero: true,
        ticks: {
          display: true,
          color: "white", // Y-axis label colors
        },
      },
      x: {
        ticks: {
          display: true,
          color: "white", // X-axis label colors
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "right",
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
async function fetchTop5diseases() {
  const { data } = await _supabase
    .from("cons_rec")
    .select("*")
    .contains("misc", MonthYear);

  // Filter data where "archived" is false
  const filteredData = data.filter((record) => record.archived === false);

  // Count the number of students, staff, and faculty
  const stat = {};
  filteredData.forEach((record) => {
    record.diagchex.forEach((dis) => {
      if (stat[dis]) {
        stat[dis]++;
      } else {
        stat[dis] = 1;
      }
    });
  });

  const dataArray = Object.entries(stat);

  // Sort the array based on the second element (the values) in descending order
  dataArray.sort((a, b) => b[1] - a[1]);

  // Get the top 3 items with the most counts
  const top3 = dataArray.slice(0, 5);

  // Convert the top 3 items back to an object
  const top3Object = Object.fromEntries(top3);

  let Top3List = "";
  let disC = [];
  let disC1 = [];
  let counter = 1;
  let total = 0;

  for (const [disease, count] of Object.entries(top3Object)) {
    Top3List += `<li>${disease}: <b>${count}</b></li>`;
    disC.push(disease);
    disC1.push(count);
    counter++;
    // addDataset1(disease, count);
  }

  for (let i = 0; i < disC1.length; i++) {
    total += disC1[i];
  }
  // console.log(total);

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
    backgroundColor: [
      "rgb(97, 183, 156)",
      "rgb(40, 88, 73)",
      "rgb(72, 158, 131)",
      "rgb(202, 231, 222)",
      "rgb(24, 53, 44)",
    ],
    borderColor: ["rgb(255,255,255,0.4)"],
    borderWidth: 0,
  };

  // Add the new dataset to the chart
  initialPatientCountData1.datasets.push(newDataset1);
  patientCountChart1.update();
}

function addLabel1(month, dis) {
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
  if (month == "6") {
    month = "June";
  }
  if (month == "07") {
    month = "July";
  }
  if (month == "08") {
    month = "August";
  }
  if (month == "9") {
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
    maintainAspectRatio: false, // Add this line to prevent aspect ratio adjustment
    aspectRatio: 1,
    scales: {
      y: {
        grid: {
          display: false,
          color: "rgba(255,255,255,1)", // Color of grid lines for x-axis
        },
        beginAtZero: true,
        ticks: {
          display: false,
          color: "white", // Y-axis label colors
        },
      },
      x: {
        grid: {
          display: false,
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

///////////////////////////////// RECENT VISITS /////////////////////////////

async function fetchRecentVisits() {
  const { data } = await _supabase
    .from("cons_rec")
    .select("*")
    .contains("misc", MonthYear);

  data.sort((a, b) => new Number(b.row_id) - new Number(a.row_id));

  // Filter data where "archived" is false
  const filteredData = data.filter((record) => record.archived === false);

  const tableBody = document.getElementById("rb-db");
  tableBody.innerHTML = "";

  for (let i = 0; i < 10 && i < filteredData.length; i++) {
    const row = filteredData[i];
    const newRow = document.createElement("tr");
    newRow.classList.add("rt-db1");

    newRow.innerHTML = `
        <th class="rcol-db1 rcol-id">${row.patient_id}</th>
        <th class="rcol-db1 rcol-name">${row.patient_name}</th>
        <th class="rcol-db1 rcol-cys">${row.course_section}</th>
        <th class="rcol-db1">${row.created_date}</th>
        <th class="rcol-db1">${row.added_by}</th>
      `;
    tableBody.appendChild(newRow);
  }
}
