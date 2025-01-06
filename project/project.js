const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://api.hatch.lol/projects/${id}`).then(res => {
    if (res.status === 200) {
        res.json().then(data => {
            document.querySelector("#author-logo").src = `https://api.hatch.lol/${data.author.profile_picture}`;
            document.querySelector("#author-username").innerText = data.author.username;
            document.querySelector("#author-username").href = `/user/?u=${data.author.username}`;

            document.querySelector("#project-title").innerText = data.title;
            document.querySelector("#project-publish-date").innerText = `${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][new Date(data.upload_ts * 1000).getMonth()]} ${new Date(data.upload_ts * 1000).getDate()}, ${new Date(data.upload_ts * 1000).getFullYear()}`;
            document.querySelector("#project-embed").src = `https://turbowarp.org/embed?project_url=https://api.hatch.lol/projects/${id}/content`;
            document.querySelector("#project-description").innerText = data.description;

            document.querySelector("#download").href = `https://api.hatch.lol/projects/${id}/content`;

            document.querySelector("#comments").innerText = "Coming soon...";
            document.querySelector("#upvote-count").innerText = "Coming soon...";
            document.querySelector("#downvote-count").innerText = "Coming soon...";
            document.querySelector("#vote-percent").innerText = "Coming soon...";
            document.querySelector("#project-tags").innerText = "Coming soon...";
            document.querySelector("#project-galleries").innerText = "Coming soon...";
            document.body.classList.remove("loading");
        });
    } else if (res.status === 404 || res.status === 422) {
        window.history.replaceState(null, "", "/404/");
        window.location.assign("/404/");
    }
});
