document.addEventListener("DOMContentLoaded", () => {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    let query = params.get("q");

    const queryDisplay = document.getElementById("searchterm");
    queryDisplay.innerText = decodeURIComponent(query);

    let allowedchars = /^[a-zA-Z0-9-_]+$/;
    let usernamebutton = document.getElementById("userresultbutton");
    if (!allowedchars.test(query) || query.length > 20) {
        usernamebutton.style.display = "none";
    } else {
        usernamebutton.style.display = "block";
        usernamebutton.textContent = `User (@${query})`;
        usernamebutton.href = `/user/?u=${query}`;
    }
});
