var token = sessionStorage.getItem('accstoken');

if (token === null){
  window.location.href = "../index.html";
}

const SUPABASE_URL = "https://yspyqlodogzmrqsifbww.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcHlxbG9kb2d6bXJxc2lmYnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwOTMxNTYsImV4cCI6MjAxMzY2OTE1Nn0.YjQ-8W-UKbg5JPOO0q3aWT2eXjXe593IlxhkZVSAqkk";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//////////////////////////////////// user display
async function fetchUsername() {
    var id1 = sessionStorage.getItem("uid1");
    var type = sessionStorage.getItem("y");
  
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
  
  ////////////////////////////// fetch user type
  async function getusertype() {
    var id1 = sessionStorage.getItem("uid1");
  
    const { data, error } = await _supabase
      .from("user_accs")
      .select("access_level")
      .eq("id", id1);
  
    if (error) {
      console.error("Error fetching user type:", error.message);
      return;
    }
  
    // Check if data is not empty
    if (data && data.length > 0) {
      const usertype = data[0].access_level;
  
      
      getusertype1(usertype);
      
    } else {
      console.log("User not found with ID:", id1);
    }
  }
  
  function getusertype1(usertype) {
    var xx = usertype;
    sessionStorage.setItem("y", xx);
  }
  
  getusertype();
  fetchUserPic();
  fetchUsername();

  



function addDataset(label, count) {

  // random color generator
  const red = Math.floor(Math.random() * 26).toString(16).padStart(2, '0');
  const green = Math.floor(Math.random() * 156).toString(16).padStart(2, '0');
  const blue = Math.floor(Math.random() * 26).toString(16).padStart(2, '0');
  
  // Combine them into a single string and return
  const randomColor = `#${red}${green}${blue}`;

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
// Update the chart to display the new dataset

}
function addLabel(type, year, location, month){
  if(type == "AllTy"){
    type = "All Patients";
  }
  if(location == "AllLoc"){
    location = "every clinic";
  }
  if(year == "AllYr"){
    year = "All";
  }
  if(month == "AllMn"){
    month = "";
  }
  if(month == "1"){month = "January";} if(month == "2"){month = "February";} if(month == "3"){month = "March";}
  if(month == "4"){month = "April";} if(month == "5"){month = "May";} if(month == "6"){month = "June";}
  if(month == "7"){month = "July";} if(month == "8"){month = "August";} if(month == "9"){month = "September";}
  if(month == "10"){month = "October";} if(month == "11"){month = "November";} if(month == "12"){month = "December";}
  
  var title = `${year} ${month} Disease Cases in ${location} | ${type}`;

  // diseaseCountChart.options.plugins.title.text.push(title);
  initialDiseaseCountData.labels.push(title);
  diseaseCountChart.update();
  
}
function clearChart() {
  // Set the datasets array to an empty array
  initialDiseaseCountData.datasets = [];
  initialDiseaseCountData.labels = [];

  // Update the chart to reflect the changes
  diseaseCountChart.update();
}


function updateType(){
  clearChart();

  var patType = document.getElementById("patType").value;
  
  fetchAllData(patType);

}

// // fetch ALL
// async function fetchAllData(type){

//     const { data } = await _supabase
//       .from("cons_rec")
//       .select("*")
//       .contains("misc", [type]);

//       const stat = {};
      
//       if (data && data.length > 0){

//         addLabel(type);
//         var location = document.getElementById("location").value;
//         var year = document.getElementById("year").value;
//         var month = document.getElementById("month").value;

//         if (location != "AllLoc"){
//           const xx = [location, type];

//           const { data } = await _supabase
//           .from("cons_rec")
//           .select("*")
//           .contains("misc", [xx]);

//           const stat = {};

//           console.log(data);
//           if (data && data.length > 0){

//             data.forEach(data1 => {
                  
//               data1.diagchex.forEach(dis =>{
              
//                   if(stat[dis]){
//                     stat[dis]++;
//                   }
//                   else {
//                   stat[dis] = 1;
//                   }
//                 })
//               });
//           }
//             for (const [disease, count] of Object.entries(stat)) {
//               addDataset(disease, count);
//           }
//         }
//         if (year != "AllYr"){
//           const xx = [year, type, location];

//           const { data } = await _supabase
//           .from("cons_rec")
//           .select("*")
//           .contains("misc", [xx]);

//           const stat = {};

//           console.log(data);
//           if (data && data.length > 0){

//             data.forEach(data1 => {
                  
//               data1.diagchex.forEach(dis =>{
              
//                   if(stat[dis]){
//                     stat[dis]++;
//                   }
//                   else {
//                   stat[dis] = 1;
//                   }
//                 })
//               });
//           }
//             for (const [disease, count] of Object.entries(stat)) {
//               addDataset(disease, count);
//           }
//         }
//         else{
//           data.forEach(data1 => {
            
//             data1.diagchex.forEach(dis =>{
            
//                 if(stat[dis]){
//                   stat[dis]++;
//                 }
//                 else {
//                 stat[dis] = 1;
//                 }
//               })
//             });
//          }
 
//          for (const [disease, count] of Object.entries(stat)) {
//            addDataset(disease, count);
//        }
//       }
//   }
// fetch ALL
async function fetchAllData(type){
    var location = document.getElementById("location").value;
    var year = document.getElementById("year").value;
    var month = document.getElementById("month").value;

    var xx = [type, location, year, month];

    const { data } = await _supabase
      .from("cons_rec")
      .select("*")
      .contains("misc", [xx]);

      const stat = {};

      console.log(data);
      
      if (data && data.length > 0){

        addLabel(type, year, location, month);
        
        
          data.forEach(data1 => {
            
            data1.diagchex.forEach(dis =>{
            
                if(stat[dis]){
                  stat[dis]++;
                }
                else {
                stat[dis] = 1;
                }
              })
            });
         }
 
         for (const [disease, count] of Object.entries(stat)) {
           addDataset(disease, count);
       
      }
  }



////////////// CHART INITIALIZATION
var ctxDiseaseCount = document.getElementById('diseaseCountChart').getContext('2d');

    // Define initial data for the bar chart with zero counts
var initialDiseaseCountData = {

        labels: [],
        datasets: []

    };

var diseaseCountChart = new Chart(ctxDiseaseCount, {
  type: 'bar',
  data: initialDiseaseCountData,
  options: {
      scales: {
          y: {
              beginAtZero: true,
              ticks: {
                color: 'white' // Y-axis label colors
            }
          },
          x: {
            ticks: {
                color: 'white' // X-axis label colors
            }
        }
      },
      plugins: {
          legend: {
              display: true,
              position: 'right',
              labels: {
                color: 'white', // Legend label colors
            }
          },
          title: {
              display: true,
              text: '',
              color: 'white', // Title text color
              font: {
                  size: 18
              }
              
          }
      }
  }
});

updateType();


