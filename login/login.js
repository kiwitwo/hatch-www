document.getElementById('submit').addEventListener('click', function (event) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "" || password === "") {
        alert("Username and password is required.");
        return;
    }

    fetch("https://api.hatch.lol/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    })
        .then(response => response.json())
        .then(async (data) => {
            if (data.success) {
                const resp = fetch("https://api.hatch.lol/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    })
                })
                localStorage.setItem("token", (await resp.json())["token"]);
                window.location.href = "/"
            } else {
                alert('Failed to register: ' + data.message);
            }
        })
        .catch((error) => {
            alert('Failed to register: ' + error.message);
        });
});