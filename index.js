const token = localStorage["token"];

if (token) {
  fetch("https://api.hatch.lol/auth/me", {
    headers: {
      Token: token,
    },
  }).then((res) => {
    res.json().then((data) => {
      document.querySelector("#welcomename").innerHTML =
        `Welcome back, ${data.displayName}!`;
      document
        .querySelector("#welcomepfp")
        .setAttribute("src", `https://api.hatch.lol${data.profilePicture}`);
      document.body.classList.remove("loading");
    });
  });
} else {
  document.querySelector("#welcome").style.display = "none";
}
