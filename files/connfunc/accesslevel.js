////////////// access initialization 
const type = sessionStorage.getItem("z");

function medcert_access(){
    var type = sessionStorage.getItem("z");
  
    if (type == "Doctor"){
      document.getElementById("vcert07").disabled = true;
      document.getElementById("vcert10").disabled = true;
  
      document.getElementById("gcert07").disabled = true;
      document.getElementById("gcert10").disabled = true;
    }
    if (type == "Nurse" || type == "Clerk"){
      document.getElementById("vcert02").disabled = true;
      document.getElementById("vcert03").disabled = true;
      document.getElementById("vcert04").disabled = true;
      document.getElementById("vcert08").disabled = true;
      document.getElementById("vcert09").disabled = true;
  
      document.getElementById("gcert02").disabled = true;
      document.getElementById("gcert03").disabled = true;
      document.getElementById("gcert04").disabled = true;
      document.getElementById("gcert08").disabled = true;
      document.getElementById("gcert09").disabled = true;
  
      document.getElementById("formview").setAttribute('src', "https://docs.google.com/spreadsheets/d/e/2PACX-1vQt-xM01oDkB3Gss480mAO8nBP03-CxSC_V_NsjD6OCyz4F9MAUVxrRnRt4pb6WXLb_hlYfVKttG7i3/pubhtml?widget=true&amp;headers=false");
  
      document.getElementById('vcert02').classList.remove('activebuttform');
      document.getElementById('vcert02').classList.add('formbutt');
  
      document.getElementById('vcert05').classList.add('activebuttform');
      document.getElementById('vcert05').classList.remove('formbutt');
  
      document.getElementById('manageform').setAttribute('href', 'https://docs.google.com/spreadsheets/d/1IJb6Xl4GwP-Xmym8FBdpJTWr50-f83nli4laaxnNpFY/edit?usp=sharing');
    }
  }

  function consrec_access(){
    if (type == "Clerk"){
      document.getElementById("consrecaddbutt").disabled = true;
    }
  }