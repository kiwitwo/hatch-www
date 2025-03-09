if (!localStorage.getItem("token")) {
  window.location.href = "/login/";
} else {
  fetch("https://api.hatch.lol/auth/me", {
    headers: {
      "Token": localStorage.getItem("token")
    }
  }).then(res => {
    if (res.ok) {
      res.json().then(data => {
        document.querySelector("#display").value = data.displayName;
        document.querySelector("#bio").value = data.bio;
        document.querySelector("#banner").value = data.bannerImage;
        document.querySelector("#location").value = data.country;
        document.querySelector("#theme").value = data.theme;
      });
    } else {
      window.location.href = "/login/";
    }
  });
}

document.querySelector("#submit").addEventListener("click", function () {
  const avatar = document.querySelector("#avatar");
  if (avatar.files[0]) {
    const formData = new FormData();
    const thumbBlob = new Blob([avatar.files[0]], { type: "image/png" });
    formData.append("file", thumbBlob);
    fetch("https://api.hatch.lol/uploads/pfp", {
      method: "POST",
      body: formData,
      headers: {
        // "Content-Type": "multipart/form-data",
        Token: localStorage.getItem("token"),
      },
    });
  }
  fetch("https://api.hatch.lol/users", {
    method: "POST",
    headers: {
      Token: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      display_name: document.getElementById("display").value,
      bio: document.getElementById("bio").value,
      country: document.getElementById("location").value,
      banner_image: document.getElementById("banner").value,
      theme: document.getElementById("theme").value
    })
  });
});
