var type = sessionStorage.getItem("z");

//nav functions
  // home
    function ToHome(){
      window.location.href = "/webpages/home";
    }
  // records
    function ToMedRec() {
      
      if (type == "Admin"){
        window.location.href = "/webpages/medicalrecords-admin";
      }
      else{
        window.location.href = "/webpages/medicalrecords";
      }
    }
    function ToDenRec() {
      if (type == "Admin"){
        window.location.href = "/webpages/dentalrecords-admin";
      }
      else{
        window.location.href = "/webpages/dentalrecords";
      }
    }

    function ToConRec() {

      if (type == "Admin"){
        window.location.href = "/webpages/consultationrec-admin";
      }
      else{
        window.location.href = "/webpages/consultationrec";
      }
    }

  // reports
    function ToAccRec() {
      window.location.href = "/webpages/accidentrec";
    }
    function ToMedCert() {
      window.location.href = "/webpages/medcerts";
    }
    function ToPresc() {
      window.location.href = "/webpages/presc";
    }

  // Analytics
    function ToConsOvw() {
      window.location.href = "/webpages/monthlycensus";
    }
    
    // Admin
    function ToConsRecArchives() {
      window.location.href = "/webpages/consultationrec-archives";
    }
    function ToMedRecArchives() {
      window.location.href = "/webpages/medicalrecords-archives";
    }
    function ToDentalRecArchives() {
      window.location.href = "/webpages/dentalrecords-archives";
    }
    
    


function logout() {
  sessionStorage.removeItem('accstoken');
  window.location.href = "../index";
}



