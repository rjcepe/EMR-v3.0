function printres() {
    var containerContents = document.querySelector(".results").innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = containerContents;
    window.print();

    document.body.innerHTML = originalContents;
};

//nav functions
function ToMedRec() {
    window.location.href = 'medicalrecords.html';
}
function ToDenRec() {
    window.location.href = 'dentalrecords.html';
}
function ToXray() {
    window.location.href = 'xray.html';
}
function ToAccRec() {
    window.location.href = 'accidentrec.html';
}
function ToConRec() {
    window.location.href = 'consultationrec.html';
}