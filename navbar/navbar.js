document.getElementById("navarea").innerHTML = `<div class="navbg"></div>
        <div class="nav">
          <div id="logo"><a href="/"><img class="logo" src="/navbar/img/logo.png"></a></div>
          <div class="searchnavitem" id="searchdiv">
            <input type="text" id="searchinp" name="search" placeholder=" Search...">
          </div>
          <!--
          <a class="navitem" href="#null>
            Wiki
          </a>
          -->
          <a class="navitem" href="https://forums.hatch.lol/">
            Forums
          </a>
          <a class="navitem" href="/about">
            About
          </a>
          <a class="navitem" href="/explore">
            Explore
          </a>
          <a class="navitem" id="mail" href="/messages">
            <img src="/navbar/img/messages.svg" id="msgsym" /><div id="messagect"><b>1</b></div>
        
          </a>
          <a class="navitem" href="/mystuff">
          <i class="fa-regular fa-folder-open fa-2xl" id="mystuff"></i> 
          </a>
          <div id="userbox">
          <div id="userinfo"><img id="pfpnav" src="https://api.hatch.lol/uploads/pfp/default.png"><div id="usernamenav">...</div><div id="dropdownimgcover"><img id="dropdownarrow" src="/navbar/img/downarrow.png" /></div></div>
            <div id="userdrop" style="display: none" tabindex="0">
              <a class="dropdown-option nav-your-profile" id="highest">
                Your Profile
              </a>
              <a class="dropdown-option" href="/settings">
                Account Settings
              </a>
              <div class="dropdown-option lowest" id="nav-sign-out">
                Sign Out
              </div>
            </div>
          </div>
        </div>`;

let x = document.querySelector("#userdrop");
let y = document.querySelector("#userinfo");

document.querySelector("#nav-sign-out").addEventListener("click", () => {
    localStorage.removeItem("token");
    location.reload();
})

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

if (localStorage.getItem("token") !== null) {
  fetch("https://api.hatch.lol/auth/me", {
    headers: {
      "Token": localStorage.getItem("token")
    }
  }).then(res => {
    res.json().then(json => {
      document.getElementById("pfpnav").src = json.profilePicture.startsWith("data:image") ? json.profilePicture : `https://api.hatch.lol/${json.profilePicture}`;
      document.getElementById("usernamenav").innerText = json.displayName;
      document.getElementsByClassName("nav-your-profile")[0].href = `/user/?u=${json.name}`;
    })
  });
}
