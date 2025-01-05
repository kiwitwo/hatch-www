document.getElementById('submit').addEventListener('click', function (event) {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const admin = document.getElementById('admin').value;
    const country = document.getElementById('country-select').value;
    const tou = document.getElementById('tou').checked;
    const age = document.getElementById('age').checked;

    if (!tou || !age) {
        alert("You must agree to the terms and confirm your age.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    fetch("https://api.hatch.lol/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Admin-Key": admin
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email,
            country: country
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