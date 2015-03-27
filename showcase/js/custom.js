var bmf = false;
function showBMF(fieldID) {
    var target = document.getElementById(fieldID);
    if (bmf) {
        bmf = false;
        target.classList.add("hidden"); // hide
    }
    else {
        bmf = true;
        target.classList.remove("hidden"); //show
    }
}