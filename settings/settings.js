document.querySelector("#submit").addEventListener("click", function() {
    fetch("https://api.hatch.lol/uploads/pfp", {
        method: "POST",
        body: document.querySelector("#avatar").files[0],
        headers: {
            "Token": localStorage.getItem("token")
        }
    });
})
