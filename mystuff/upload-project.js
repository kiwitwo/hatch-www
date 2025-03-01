if (!localStorage["token"]) {
    window.history.replaceState(null, "", "/404/");
    window.location.assign("/404/");
}

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
            "Token": token
        },
        body: formData
    })
        .then(async response => {
            const resp = await response.json();
            
            if (!response.ok) {
                alert("Error: " + await response.text());
                return;
            };

            window.location.replace(`/project?id=${resp.id}`);
        })
        .catch(error => {
            submit.disabled = false;
            console.error("Error:", error);
            alert("There was an error uploading the project.");
        });
});