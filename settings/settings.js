document.querySelector("#submit").addEventListener("click", function() {
    const avatar = document.querySelector("#avatar");
    if (avatar.files[0]) {
        const formData = new FormData();
        formData.append("file", avatar.files[0]);
        fetch("https://api.hatch.lol/uploads/pfp", {
            method: "POST",
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                "Token": localStorage.getItem("token")
            }
        });
    }
})
