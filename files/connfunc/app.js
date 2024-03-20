var type = sessionStorage.getItem("z");

//nav functions
  // home
    function ToHome(){
      window.location.href = "/home";
    }
  // records
    function ToMedRec() {
      
      if (type == "Admin"){
        window.location.href = "/medicalrecords-admin";
      }
      else{
        window.location.href = "/Medical-Records";
      }
    }
    function ToDenRec() {
      if (type == "Admin"){
        window.location.href = "/dentalrecords-admin";
      }
      else{
        window.location.href = "/dentalrecords";
      }
    }

    function ToConRec() {

      if (type == "Admin"){
        window.location.href = "/consultationrec-admin";
      }
      else{
        window.location.href = "/consultationrec";
      }
    }

  // reports
    function ToAccRec() {
      window.location.href = "/accidentrec";
    }
    function ToMedCert() {
      window.location.href = "/medcerts";
    }
    function ToPresc() {
      window.location.href = "/presc";
    }

  // Analytics
    function ToConsOvw() {
      window.location.href = "/monthlycensus";
    }
    
    // Admin
    function ToConsRecArchives() {
      window.location.href = "/consultationrec-archives";
    }
    function ToMedRecArchives() {
      window.location.href = "/medicalrecords-archives";
    }
    function ToDentalRecArchives() {
      window.location.href = "/dentalrecords-archives";
    }
    
    


function logout() {
  sessionStorage.removeItem('accstoken');
  window.location.href = "../index";
}



