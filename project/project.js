const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://api.hatch.lol/projects/${id}`).then(res => {
    if (res.status === 200) {
        document.querySelector("#project-comment-form").addEventListener("submit", (e) => {
            e.preventDefault();

            fetch(`https://api.hatch.lol/projects/${id}/comments`, {
                method: "POST",
                headers: {
                    "Token": localStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "content": document.querySelector("#project-comment-form-input").value
                })
            }).then(res => {
                if (res.status === 200) {
                    document.querySelector("#project-comment-form-input").value = "";
                    document.querySelector("#project-comment-form-input").placeholder = "Comment posted!";
                }
            });
        });

        res.json().then(data => {
            document.title = `${data.title} on Hatch`;

            document.querySelector("#author-logo").src = `https://api.hatch.lol${data.author.profile_picture}`;
            document.querySelector("#author-username").innerText = data.author.username;
            document.querySelector("#author-username").href = `/user/?u=${data.author.username}`;

            document.querySelector("#project-title").innerText = data.title;
            document.querySelector("#project-version").innerText = "v" + data.version;
            document.querySelector("#project-publish-date").innerText = `${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][new Date(data.upload_ts * 1000).getMonth()]} ${new Date(data.upload_ts * 1000).getDate()}, ${new Date(data.upload_ts * 1000).getFullYear()}`;
            document.querySelector("#project-embed").src = `https://warp.algebrahelp.org/embed.html?project_url=https://api.hatch.lol/projects/${id}/content`;
            document.querySelector("#project-description").innerText = data.description;

            document.querySelector("#project-age-rating").innerText = data.rating;
            
            if (data.rating === "13+") {
                document.querySelector("#project-age-rating").classList.add("teen");
            }

            fetch("https://api.hatch.lol/auth/me", {
                headers: {
                    "Token": localStorage.getItem("token")
                }
            }).then(res => {
                if (res.status !== 200) {
                    if (data.rating === "13+") {
                        document.querySelector("#project-embed").remove();
                        document.querySelector("#project-embed-container").classList.add("teen-block");
                        document.querySelector("#download").classList.add("disabled");
                    }

                    document.querySelectorAll(".interaction-button, .comment-input, #report").forEach(element => {
                        element.classList.add("disabled");
                        element.tabIndex = -1;
                    });

                    document.querySelector("#project-comment-form-input").disabled = true;
                }
            });

            document.querySelector("#download").href = `https://api.hatch.lol/projects/${id}/content`;

            fetch(`https://api.hatch.lol/projects/${id}/comments`).then(res => {
                res.json().then(data => {
                    data.comments.forEach(comment => {
                        document.querySelector("#comments").innerHTML = `
        <div class="comment">
          <div class="comment-top">
            <img src="${`https://api.hatch.lol${comment.author.profile_picture}`}" class="comment-pfp">
            <a href="/user/?u=${comment.author.username}" class="comment-username">${comment.author.display_name}</a>
            <p class="comment-time">${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][new Date(comment.postDate*1000).getMonth()]} ${new Date(comment.postDate*1000).getDate()}, ${new Date(comment.postDate*1000).getFullYear()}</p><a href="#reply" class="comment-reply">↪ Reply</a><a href="#report" class="comment-report"><img src="https://rdr.lol/u/JRHxiZ.png"></a>
          </div>
          <p class="content">${comment.replyTo === null ? "" : `<a href="/user/?u=${comment.replyTo}">@${comment.replyTo}</a> `}${comment.content}</p>
        </div>
        ${document.querySelector("#comments").innerHTML}`
                    });
                });
            });

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

if (localStorage.getItem("token")) {
    fetch("https://api.hatch.lol/auth/me", {
        headers: {
            "Token": localStorage.getItem("token")
        }
    }).then(res => {
        if (res.status === 200) {
            res.json().then(data => {
                const par = document.querySelector("#project-age-rating");
                if (data.hatchTeam) {
                    par.style.cursor = "pointer";
                    par.addEventListener("click", () => {
                        let new_rating = prompt("please enter a new age rating for this project");
                        if (new_rating) {
                            fetch("https://api.hatch.lol/admin/set-rating", {
                                "method": "POST",
                                "headers": {
                                    "Token": localStorage.getItem("token"),
                                    "Content-Type": "application/json"
                                },
                                "body": JSON.stringify({
                                    "project_id": parseInt(id),
                                    "rating": new_rating
                                })
                            });
                        }
                    });
                } else {
                    par.addEventListener("click", () => {
                        alert("This is Hatch's age rating system. Each age rating is determined by moderators manually. See the Wiki for more info.");
                    });
                }
            });
        }
    });
}