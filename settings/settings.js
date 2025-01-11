document.querySelector("#submit").addEventListener("click", function() {
    fetch("https://api.hatch.lol/uploads/pfp", {
        method: "POST",
        body: document.querySelector("#avatar"),
        headers: {
            "Token": localStorage.getItem("token")
        }
    });
})
