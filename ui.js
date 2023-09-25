
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

  //show results
  function showv() {
    const vfile = document.querySelector('.main2');
    const main = document.querySelector('.main');
    
    main.classList.add('main-filter');
    vfile.classList.add('showv');
    vfile.classList.remove('hidev');

  }
  function hidev() {
    const vfile = document.querySelector('.main2');
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


  