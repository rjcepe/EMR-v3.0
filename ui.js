
// Add patient (type)
function emp() {
    const stud = document.querySelector('.uploadmedform1');
    const emp = document.querySelector('.uploadmedform2');

    stud.classList.add('hidden');
    stud.classList.remove('shown');

    emp.classList.add('shown');
    emp.classList.remove('hidden');
  }
  function stud() {
    const stud = document.querySelector('.uploadmedform1');
    const emp = document.querySelector('.uploadmedform2');

    emp.classList.add('hidden');
    emp.classList.remove('shown');

    stud.classList.add('shown');
    stud.classList.remove('hidden');
  }
  // add patients (button)
  function showp() {
    const vfile = document.querySelector('.addp');
    const main = document.querySelector('.main');
    
    main.classList.add('main-filter');
    vfile.classList.add('showv');
    vfile.classList.remove('hidev');

  }
  function hidep() {
    const vfile = document.querySelector('.addp');
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