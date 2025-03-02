document.querySelector("#upload-project").addEventListener("click", () => {
  document.querySelector("#create-row").classList.toggle("upload-project");
  document.querySelector("#create-row").classList.remove("create-gallery");
});
document.querySelector("#create-gallery").addEventListener("click", () => {
  document.querySelector("#create-row").classList.toggle("create-gallery");
  document.querySelector("#create-row").classList.remove("upload-project");
});

const submit = document.getElementById("submit");

// this is template code someone pls fix :agony: (i know zero js i just need something here for testing, but this code probably sucks)
submit.addEventListener("click", function () {
  const title = document.getElementById("upload-title").value;
  const description = document.getElementById("upload-description").value;
  const fileInput = document.getElementById("file");
  const file = fileInput.files[0];

  const touChecked = document.getElementById("tou").checked;
  if (!touChecked) {
    alert("You must agree to the terms of use.");
    return;
  }

  const token = localStorage.getItem("token");

  const fileBlob = new Blob([file], { type: "application/zip" });

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("file", fileBlob, file.name);

  submit.disabled = true;
  fetch("https://api.hatch.lol/projects", {
    method: "POST",
    headers: {
      Token: token,
    },
    body: formData,
  })
    .then(async (response) => {
      const resp = await response.json();

      if (!response.ok) {
        alert("Error: " + (await response.text()));
        return;
      }

      window.location.replace(`/project?id=${resp.id}`);
    })
    .catch((error) => {
      submit.disabled = false;
      console.error("Error:", error);
      alert("There was an error uploading the project.");
    });
});

fetch("https://api.hatch.lol/auth/me", {
  headers: {
    Token: localStorage.getItem("token"),
  },
}).then((res) => {
  if (res.status === 200) {
    res.json().then((data) => {
      document.querySelector("#follower-count").innerText = data.followerCount;
      document.querySelector("#following-count").innerText =
        data.followingCount;
      document.querySelector("#project-count").innerText = data.projectCount;
    });
  } else {
    window.location.href = "/login/";
  }
});
