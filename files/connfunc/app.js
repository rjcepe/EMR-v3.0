

//nav functions
function ToMedRec() {
  window.location.href = "/webpages/medicalrecords.html";
}
function ToDenRec() {
  window.location.href = "/webpages/dentalrecords.html";
}
function ToXray() {
  window.location.href = "/webpages/xray.html";
}
function ToAccRec() {
  window.location.href = "/webpages/accidentrec.html";
}
function ToConRec() {
  window.location.href = "/webpages/consultationrec.html";
}
function ToMedCert() {
  window.location.href = "/webpages/medcerts.html";
}
function ToAccCen() {
  window.location.href = "/webpages/accidentcensus.html";
}
function logout() {
  localStorage.removeItem('accstoken');
  window.location.href = "../index.html";
}



