
// Add patient (type)
function emp() {
    const stud = document.querySelector('.uploadmedform1');
    const emp = document.querySelector('.uploadmedform2');
    const empbutt = document.getElementById("empupbutt");
    const studbutt = document.getElementById("studupbutt");

    stud.classList.add('hidden');
    stud.classList.remove('shown');

    emp.classList.add('shown');
    emp.classList.remove('hidden');

    empbutt.classList.add('activeptb');
    studbutt.classList.remove('activeptb');
  }
  function stud() {
    const stud = document.querySelector('.uploadmedform1');
    const emp = document.querySelector('.uploadmedform2');
    const empbutt = document.getElementById("empupbutt");
    const studbutt = document.getElementById("studupbutt");

    emp.classList.add('hidden');
    emp.classList.remove('shown');

    stud.classList.add('shown');
    stud.classList.remove('hidden');

    empbutt.classList.remove('activeptb');
    studbutt.classList.add('activeptb');
  }

  // add patients (button)
  function showp() {
    const vfile = document.querySelector('.addp-cont');
    const main = document.querySelector('.main');
    
    main.classList.add('main-filter');
    vfile.classList.add('showv');
    vfile.classList.remove('hidev');

  }
  function hidep() {
    const vfile = document.querySelector('.addp-cont');
    const main = document.querySelector('.main');
    
    main.classList.remove('main-filter');
    vfile.classList.add('hidev');
    vfile.classList.remove('showv');
  }


//show sidebar
  function sideshow(){
    const sidebar = document.querySelector('.sidecont');
    const main = document.querySelector('.main');
    const sideback = document.querySelector('.behindsn');

    main.classList.toggle('main-filter');
    sidebar.classList.toggle('sideshow');
    sideback.classList.toggle('bsn');
  }

// Add consform (type)
function emp1() {
  const stud = document.querySelector('.uploadconsform1');
  const emp = document.querySelector('.uploadconsform2');
  const empbutt = document.getElementById("empupbutt");
  const studbutt = document.getElementById("studupbutt");
  const stff = document.querySelector('.uploadconsform3');
  const stffbutt = document.getElementById("stffupbutt");

  stff.classList.add('hidden');
  stff.classList.remove('shown');
  stffbutt.classList.remove('activeptb');
  

  stud.classList.add('hidden');
  stud.classList.remove('shown');

  emp.classList.add('shown');
  emp.classList.remove('hidden');

  empbutt.classList.add('activeptb');
  studbutt.classList.remove('activeptb');
}
function stud1() {
  const stud = document.querySelector('.uploadconsform1');
  const emp = document.querySelector('.uploadconsform2');
  const empbutt = document.getElementById("empupbutt");
  const studbutt = document.getElementById("studupbutt");
  const stff = document.querySelector('.uploadconsform3');
  const stffbutt = document.getElementById("stffupbutt");

  stff.classList.add('hidden');
  stff.classList.remove('shown');
  stffbutt.classList.remove('activeptb');

  emp.classList.add('hidden');
  emp.classList.remove('shown');

  stud.classList.add('shown');
  stud.classList.remove('hidden');

  empbutt.classList.remove('activeptb');
  studbutt.classList.add('activeptb');
}
function staff1() {
  const stud = document.querySelector('.uploadconsform1');
  const emp = document.querySelector('.uploadconsform2');
  
  const empbutt = document.getElementById("empupbutt");
  const studbutt = document.getElementById("studupbutt");

  const stff = document.querySelector('.uploadconsform3');
  const stffbutt = document.getElementById("stffupbutt");

  stff.classList.add('shown');
  stff.classList.remove('hidden');
  stffbutt.classList.add('activeptb');

  emp.classList.add('hidden');
  emp.classList.remove('shown');

  stud.classList.add('hidden');
  stud.classList.remove('shown');

  empbutt.classList.remove('activeptb');
  studbutt.classList.remove('activeptb');
}

// add cons rec (button)
function showp1() {
  const vfile = document.querySelector('.addp-cont1');
  const main = document.querySelector('.main');
  
  main.classList.add('main-filter');
  vfile.classList.add('showv');
  vfile.classList.remove('hidev');

}
function hidep1() {
  const vfile = document.querySelector('.addp-cont1');
  const main = document.querySelector('.main');
  
  main.classList.remove('main-filter');
  vfile.classList.add('hidev');
  vfile.classList.remove('showv');
}



//preview med temp
function prevy2(){
  const previmg = document.querySelector('.form-prev-img2');
  previmg.classList.toggle("shownprev");
}
function prevy3(){
  const previmg = document.querySelector('.form-prev-img3');
  previmg.classList.toggle("shownprev");
}
function prevy4(){
  const previmg = document.querySelector('.form-prev-img4');
  previmg.classList.toggle("shownprev");
}
function prevy5(){
  const previmg = document.querySelector('.form-prev-img5');
  previmg.classList.toggle("shownprev");
}
function prevy6(){
  const previmg = document.querySelector('.form-prev-img6');
  previmg.classList.toggle("shownprev");
}
function prevy7(){
  const previmg = document.querySelector('.form-prev-img7');
  previmg.classList.toggle("shownprev");
}
function prevy8(){
  const previmg = document.querySelector('.form-prev-img8');
  previmg.classList.toggle("shownprev");
}
function prevy9(){
  const previmg = document.querySelector('.form-prev-img9');
  previmg.classList.toggle("shownprev");
}
function prevy10(){
  const previmg = document.querySelector('.form-prev-img10');
  previmg.classList.toggle("shownprev");
}

let notifcount = 0;
// push notif
function shownotif() { 

  notifcount ++;

  const cont = document.getElementById("notif");
  cont.innerHTML = `${notifcount} Record(s) added
  <button onclick="hidenotif()"><svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15" fill="white"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>`;

  cont.classList.add("notif");
  cont.classList.add("bounce-in-right");
  cont.classList.remove("notifinactive");
}
function hidenotif() { 

  notifcount = 0;

  const cont = document.getElementById("notif");
  cont.innerHTML = "";
  
  cont.classList.add("notifinactive");
  cont.classList.remove("notif");
  cont.classList.remove("bounce-in-right");
 }

 ///// nextpage (for medrec)
var pages = document.querySelectorAll('.page');
var currentIndex = 0; // Start at the first div

function showCurrentPage() {
    // Hide all pages
    pages.forEach(function(page, index) {
        page.style.display = 'none';
    });

    // Show the current page
    pages[currentIndex].style.display = 'block';
}

// document.getElementById('nextpagebutt').addEventListener('click', function() {
//     currentIndex = (currentIndex + 1) % pages.length; // Loop around
//     showCurrentPage();
// });

// document.getElementById('prevpagebutt').addEventListener('click', function() {
//     currentIndex = (currentIndex - 1 + pages.length) % pages.length; // Loop around
//     showCurrentPage();
// });

// showCurrentPage(); // Initialize the view

//search, filter, sort
function showsearch(){
  const a = document.querySelector(".searchz");
  const b = document.querySelector(".sortz");
  const c = document.querySelector(".filterz1");

  a.classList.toggle("filters");
  b.classList.remove("filters");
  c.classList.remove("filters");

  const form1 = document.getElementById("filterz-val");
  const checkedCheckboxes = form1.querySelectorAll('input[type="checkbox"]:checked:not([name="others"])');
  checkedCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
  
  const searrchIn = $("#searchInput").val();
  if(!searrchIn){
    loadTableData();
  }
}
function showsort(){
  const a = document.querySelector(".sortz");
  const b = document.querySelector(".searchz");
  const c = document.querySelector(".filterz1");

  a.classList.toggle("filters");
  b.classList.remove("filters");
  c.classList.remove("filters");
}
function showfiltz(){
  const a = document.querySelector(".filterz1");
  const b = document.querySelector(".searchz");
  const c = document.querySelector(".sortz");

  a.classList.toggle("filters");
  b.classList.remove("filters");
  c.classList.remove("filters");

  $("#searchInput").val("");

}