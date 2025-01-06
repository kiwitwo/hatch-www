document.getElementById('submit').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "" || password === "") {
        alert("Username and password is required.");
        return;
    }

    const resp = await fetch("https://api.hatch.lol/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    });

    const json = await resp.json();

    if (json.message) {
        alert("Error: " + json.message);
        return;
    }

    localStorage.setItem("token", json.token);
    window.location.href = "/"
});