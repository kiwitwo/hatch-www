let x = document.querySelector("#userdrop");
let y = document.querySelector("#userinfo");

y.addEventListener("click", (e) => {
  e.preventDefault();
  dropToggle();
});

function dropToggle() {
  x.classList.toggle("active");
}

document.onclick = (e) => {
  if (!e.composedPath().includes(y)) {
    x.classList.remove("active")
  }
})



function searchMade(){
    let searchTerm = document.getElementById('searchinp').value.replace(/ /g,"_");
    window.location.href = "https://hatch.lol/search/" + searchTerm
}

const searchInp = document.getElementById("searchinp");
searchInp.onkeydown = (e) => {
    if (e.key === "Enter" && searchInp.value !== "") {
        searchMade()
    }
}
