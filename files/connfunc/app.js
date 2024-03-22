//nav functions
  // home
    function ToHome(){
      window.location.href = "/webpages/home.html";
    }
  // records
    function ToMedRec() {
      
      if (type == "Admin"){
        window.location.href = "/webpages/medicalrecords-admin.html";
      }
      else{
        window.location.href = "/webpages/medicalrecords.html";
      }
    }
    function ToDenRec() {
      if (type == "Admin"){
        window.location.href = "/webpages/dentalrecords-admin.html";
      }
      else{
        window.location.href = "/webpages/dentalrecords.html";
      }
    }

    function ToConRec() {

      if (type == "Admin"){
        window.location.href = "/webpages/consultationrec-admin.html";
      }
      else{
        window.location.href = "/webpages/consultationrec.html";
      }
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
    
    // Admin
    function ToConsRecArchives() {
      window.location.href = "/webpages/consultationrec-archives.html";
    }
    function ToMedRecArchives() {
      window.location.href = "/webpages/medicalrecords-archives.html";
    }
    function ToDentalRecArchives() {
      window.location.href = "/webpages/dentalrecords-archives.html";
    }
    
    // Mobile
    function NoMobile() {
      window.location.href = "/webpages/non-mobile.html";
    }
    


function logout() {
  sessionStorage.removeItem('accstoken');
  window.location.href = "../index.html";
}



