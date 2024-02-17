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

// Define an array of student types
const studentTypes = ["coll", ];

// Combine student types with the current month
const studentTypesWithMonth = [...studentTypes, month];

fetchStudData()

// fetch ALL data from consultation records (based on current month)
async function fetchStudData() {
  const { data } = await _supabase.from("cons_rec").select("*").contains("misc", [month]);

  console.log(data);
  console.log(studentTypesWithMonth);

  const xx = { "coll": 0, "shs": 0, "Staff": 0, "Faculty": 0 };

  if (data && data.length > 0) {
    data.forEach(data1 => {

      if (data1.archived === false){
        console.log(data1);
        data1.misc.forEach(dis => {
          if (xx[dis]) {
            xx[dis]++;
          }
        });
      }
    });

    addDataset("Students", xx["coll"] + xx["shs"]);
    addDataset("Staff", xx["Staff"]);
    addDataset("Faculty", xx["Faculty"]);
  }
}

function addDataset(label, count) {

  // random color generator
  const red = Math.floor(Math.random() * 156);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 156);

  // Combine them into an rgba string with 0.5 opacity
  const randomColor = `rgba(${red},${green},${blue},0.5)`;

  var newDataset = {

    label: label,
    data: [count], // Initial values set to zero
    backgroundColor: [randomColor],
    borderColor: ['white'],
    borderWidth: 1

  };

  // Add the new dataset to the chart
  initialDiseaseCountData.datasets.push(newDataset);
  diseaseCountChart.update();
}

////////////// CHART INITIALIZATION
var ctxDiseaseCount = document
  .getElementById("diseaseCountChart")
  .getContext("2d");

// Define initial data for the bar chart with zero counts
var initialDiseaseCountData = {
  labels: ["Students", "Staff", "Faculty"],
  datasets: [],
};

var diseaseCountChart = new Chart(ctxDiseaseCount, {
  type: "bar",
  data: initialDiseaseCountData,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "white", // Y-axis label colors
        },
      },
      x: {
        ticks: {
          color: "white", // X-axis label colors
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: "Consultation Records by Category",
        color: "white",
        font: {
          size: 18,
        },
      },
    },
  },
});

