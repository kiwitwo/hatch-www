document.getElementById("navarea").innerHTML = `<div class="navbg"></div>
        <div class="nav">
          <div id="logo"><img class="logo" src="/navbar/img/logo.png" height:30px onclick="location.href='index.html'" /></div>
          <div class="searchimgnav" onclick="searchMade()">
            <img src="/navbar/img/search.png" id="searchimghard"/>
          </div>
          <div class="searchnavitem" id="searchdiv">
            <input type="text" id="searchinp" name="search" placeholder=" Search...">
          </div>
          <!--
          <a class="navitem" href="#null>
            Wiki
          </a>
          <a class="navitem" href="#null">
            Discuss
          </a>
          -->
          <a class="navitem" href="/about">
            About
          </a>
          <a class="navitem" href="/explore">
            Explore
          </a>
          <a class="navitem" id="mail" href="/messages">
            <img src="/navbar/img/messages.svg" id="msgsym" /><div id="messagect"><b>1</b></div>
        
          </a>
          <div id="userbox">
          <div id="userinfo"><img id="pfpnav" src="https://uploads.scratch.mit.edu/get_image/user/41022482_96x96.png"><div id="usernamenav">han614698</div><div id="dropdownimgcover"><img id="dropdownarrow" src="/navbar/img/downarrow.png" /></div></div>
            <div id="userdrop" style="display: none" tabindex="0">
              <a class="dropdown-option" id="highest" href="/user?u=yourUsername">
                Your Profile
              </a>
              <a class="dropdown-option" href="/settings">
                Account Settings
              </a>
              <div onclick="alert('this will probably do something eventually')" class="dropdown-option" id="lowest">
                Sign Out
              </div>
            </div>
          </div>
        </div>`;

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
}



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


 
