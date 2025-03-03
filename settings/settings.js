if (!localStorage.getItem("token")) {
  window.location.href = "/login/";
}

document.querySelector("#submit").addEventListener("click", function () {
  const avatar = document.querySelector("#avatar");
  if (avatar.files[0]) {
    const formData = new FormData();
    formData.append("file", avatar.files[0]);
    fetch("https://api.hatch.lol/uploads/pfp", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
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
