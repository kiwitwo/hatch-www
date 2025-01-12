document.querySelector("#submit").addEventListener("click", function() {
    fetch("https://api.hatch.lol/uploads/pfp", {
        method: "POST",
        body: document.querySelector("#avatar").files[0],
        headers: {
            "Content-Type": "multipart/form-data",
            "Token": localStorage.getItem("token")
        }
    });
})
