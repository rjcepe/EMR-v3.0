
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

  emp.classList.add('hidden');
  emp.classList.remove('shown');

  stud.classList.add('shown');
  stud.classList.remove('hidden');

  empbutt.classList.remove('activeptb');
  studbutt.classList.add('activeptb');
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


// push notif
function shownotif() { 
  const cont = document.getElementById("notif");
  cont.innerHTML = `1 Record added
  <button onclick="hidenotif()"><svg xmlns="http://www.w3.org/2000/svg" height="15" viewBox="0 -960 960 960" width="15" fill="white"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>`;

  cont.classList.add("notif");
  cont.classList.add("bounce-in-right");
  cont.classList.remove("notifinactive");
}
function hidenotif() { 
  const cont = document.getElementById("notif");
  cont.innerHTML = "";
  
  cont.classList.add("notifinactive");
  cont.classList.remove("notif");
  cont.classList.remove("bounce-in-right");
 }