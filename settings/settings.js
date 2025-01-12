const fileBlob = new Blob([document.querySelector("#avatar").files[0]], { type: 'image/png' });
const formData = new FormData();

document.querySelector("#submit").addEventListener("click", function() {
    fetch("https://api.hatch.lol/uploads/pfp", {
        method: "POST",
        body: formData,
        headers: {
            "Content-Type": "multipart/form-data",
            "Token": localStorage.getItem("token")
        }
    });
})
