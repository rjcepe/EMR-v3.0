// fetch ALL
// async function fetchAllData(type){
//     var location = document.getElementById("location").value;
//     var year = document.getElementById("year").value;
//     var month = document.getElementById("month").value;

//     var xx = [type, location, year, month];

//     const { data } = await _supabase
//       .from("cons_rec")
//       .select("*")
//       .contains("misc", [xx]);

//       const stat = {};

//       let studC = 0;
//       let shsC = 0;
//       let collC = 0;
//       let staffC = 0;
//       let facC = 0;

//       // Filter the data array to count only the records where "archived" is false
//       const filteredData = data.filter(record => record.archived === false);

//       // Count the number of records where "archived" is false
//       const patients = filteredData.length;

//       if (data && data.length > 0){
//         addLabel(type, year, location, month, patients);
//           data.forEach(data1 => {
//             if (data1.archived === false){
//               data1.diagchex.forEach(dis =>{

//                 if(stat[dis]){
//                   stat[dis]++;
//                 }
//                 else {
//                   stat[dis] = 1;
//                 }
//               })

//               data1.misc.forEach(x => {
//                 if (x === "shs"){
//                   shsC++;
//                   studC++;
//                 }
//                 else if (x === "coll"){
//                   collC++;
//                   studC++;
//                 }
//                 else if (x === "Faculty"){
//                   facC++;
//                 }
//                 else if (x === "Staff"){
//                   staffC++;
//                 }
//               })
//             }
//           });
//         }

//         const allP = studC + facC + staffC;
//         const diseaseDiv = document.getElementById('printFrame');
//         const iframeDoc = diseaseDiv.contentDocument || diseaseIframe.contentWindow.document;

//         let content = '<head><link rel="stylesheet" href="/files/styles.css"></head>';
//         content += '<body><table class="restab"><tr><th><h2>DISEASE</h2></th><th><h2>COUNT</h2></th></tr>';

//         for (const [disease, count] of Object.entries(stat)) {
//             addDataset(disease, count);
//             console.log(disease, count);
//             content += `<tr><th><b>${disease}</b></th><th>${count}</th></tr>`;
//         }

//         content += '</table>';
//         content += `
//                     <p>Total Patients: ${allP}</p>
//                     <p>College Patients: ${collC}</p>
//                     <p>SHS Patients: ${shsC}</p>
//                     <p>Staff Patients: ${staffC}</p>
//                     <p>Faculty Patients: ${facC}</p>
//                     </body>
//         `;
//         iframeDoc.write(content);
//   }
