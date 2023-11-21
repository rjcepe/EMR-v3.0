

//nav functions

  // records
    function ToMedRec() {
      window.location.href = "/webpages/medicalrecords.html";
    }
    function ToDenRec() {
      window.location.href = "/webpages/dentalrecords.html";
    }
    function ToConRec() {
      window.location.href = "/webpages/consultationrec.html";
    }

  // reports
    function ToAccRec() {
      window.location.href = "/webpages/accidentrec.html";
    }
    function ToMedCert() {
      window.location.href = "/webpages/medcerts.html";
    }
    function ToPresc() {
      window.location.href = "/webpages/presc.html";
    }

  // Analytics
    function ToConsOvw() {
      window.location.href = "/webpages/monthlycensus.html";
    }
    


function logout() {
  localStorage.removeItem('accstoken');
  window.location.href = "../index.html";
}



