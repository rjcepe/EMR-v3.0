var type = sessionStorage.getItem("z");

//nav functions
  // home
    function ToHome(){
      window.location.href = "/Home";
    }
  // records
    function ToMedRec() {
      
      if (type == "Admin"){
        window.location.href = "/Medical-Records-Admin";
      }
      else{
        window.location.href = "/Medical-Records";
      }
    }
    function ToDenRec() {
      if (type == "Admin"){
        window.location.href = "/Dental-Records-Admin";
      }
      else{
        window.location.href = "/Dental-Records";
      }
    }

    function ToConRec() {

      if (type == "Admin"){
        window.location.href = "/Consultation-Records-Admin";
      }
      else{
        window.location.href = "/Consultation-Records";
      }
    }

  // reports
    function ToAccRec() {
      window.location.href = "/Accident-Records";
    }
    function ToMedCert() {
      window.location.href = "/Medical-Certificates";
    }
    function ToPresc() {
      window.location.href = "/Prescriptions";
    }

  // Analytics
    function ToConsOvw() {
      window.location.href = "/Monthly-Census";
    }
    
    // Admin
    function ToConsRecArchives() {
      window.location.href = "/Consultation-Records-Archives";
    }
    function ToMedRecArchives() {
      window.location.href = "/Medical-Records-Archives";
    }
    function ToDentalRecArchives() {
      window.location.href = "/Dental-Records-Archives";
    }
    
    


function logout() {
  sessionStorage.removeItem('accstoken');
  window.location.href = "/Login";
}



