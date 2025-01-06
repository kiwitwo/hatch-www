document.getElementById('submit').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "" || password === "") {
        alert("Username and password is required.");
        return;
    }

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
});