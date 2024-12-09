let x = document.querySelector("#userdrop");
let y = document.querySelector("#userinfo");

y.addEventListener("click", (e) => {
  e.preventDefault();
  dropToggle();
});

function dropToggle() {
  if (x.classList.contains("active")) {
    x.blur();
  } else {
    x.classList.add("active");
    x.focus();
  }
}

x.addEventListener("blur", function(e) {
  x.classList.remove("active");
});



function searchMade(){
    let searchTerm = document.getElementById('searchinp').value.replace(/ /g,"_");
    window.location.href = "https://hatch.lol/search/" + searchTerm
}
