const id = new URLSearchParams(window.location.search).get("id");

document.addEventListener("DOMContentLoaded", () => {
	document.querySelector("iframe").width = window.innerWidth;
	document.querySelector("iframe").height = window.innerHeight;
	
	if (id) {
		document.querySelector("iframe").src = `https://warp.algebrahelp.org/embed.html?project_url=https://api.hatch.lol/projects/${id}/content`;
	}

	document.querySelector("#teen-form").addEventListener("submit", async (e) => {
		e.preventDefault();

		const username = document.querySelector("#username");
		const password = document.querySelector("#password");

		username.disabled = true;
		password.disabled = true;

		if (username.value === "" || password.value === "") {
			username.disabled = false;
			password.disabled = false;
			alert("Username and password is required.");
			return;
		}

		const resp = await fetch("https://api.hatch.lol/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username.value,
				password: password.value
			})
		});

		const json = await resp.json();

		if (json.message) {
			username.disabled = false;
			password.disabled = false;
			alert("Error: " + json.message);
			return;
		}

		username.disabled = false;
		password.disabled = false;

		document.querySelector("iframe").src = `https://warp.algebrahelp.org/embed.html?project_url=https://api.hatch.lol/projects/${id}/content?token=${json.token}`;
		document.body.classList.remove("teen");
	});

});

window.addEventListener("resize", () => {
	document.querySelector("iframe").width = window.innerWidth;
	document.querySelector("iframe").height = window.innerHeight;
});

fetch(`https://api.hatch.lol/projects/${id}/`).then((res) => {
	if (res.ok) {
		res.json().then((data) => {
			if (data.rating === "13+") {
				document.body.classList.add("teen");
				document.querySelector("#teen-new-tab").href = `https://dev.hatch.lol/project/?id=${id}`;
			}
		});
	} else {
		if (res.status === 404) {
			document.body.classList.add("unavailable");
		} else {
			document.querySelector("#error-message").innerText = `${res.status}: ${res.statusText}`;
			document.body.classList.add("error");
		}
	}
});
