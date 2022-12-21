document.addEventListener("DOMContentLoaded", function () {

  tooltipList()

  var elems = document.querySelectorAll(".myModal");
  var instances = M.Modal.init(elems, {});

});



function tooltipList(){
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

}


