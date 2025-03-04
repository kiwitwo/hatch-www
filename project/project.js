const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const rate_dialog = document.querySelector("#rate-dialog");

document.querySelector("#share").addEventListener("click", () => {
  document.querySelector("#share-dialog").open = !document.querySelector("#share-dialog").open;
});

document.querySelector("#share-url").innerText = window.location.href;
document.querySelector("#share-embed").innerText = `<iframe src="https://dev.hatch.lol/embed/?id=${id}" width="482" height="412" allowtransparency="true" frameborder="0" scrolling="no" allowfullscreen></iframe>`;

fetch(`https://api.hatch.lol/projects/${id}`).then((res) => {
  if (res.status === 200) {
    document
      .querySelector("#project-comment-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();

        fetch(`https://api.hatch.lol/projects/${id}/comments`, {
          method: "POST",
          headers: {
            Token: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: document.querySelector("#project-comment-form-input")
              .value,
          }),
        }).then((res) => {
          if (res.status === 200) {
            document.querySelector("#project-comment-form-input").value = "";
            document.querySelector("#project-comment-form-input").placeholder =
              "Comment posted!";
          }
        });
      });

    res.json().then((data) => {
      document.title = `${data.title} on Hatch`;

      document.querySelector("#author-logo").src =
        `https://api.hatch.lol${data.author.profile_picture}`;
      document.querySelector("#author-username").innerText =
        data.author.username;
      document.querySelector("#author-username").href =
        `/user/?u=${data.author.username}`;

      document.querySelector("#project-title").innerText = data.title;
      document.querySelector("#project-version").innerText = "v" + data.version;
      document.querySelector("#project-publish-date").innerText =
        `${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][new Date(data.upload_ts * 1000).getMonth()]} ${new Date(data.upload_ts * 1000).getDate()}, ${new Date(data.upload_ts * 1000).getFullYear()}`;
      document.querySelector("#project-embed").src =
        `https://warp.algebrahelp.org/embed.html?project_url=https://api.hatch.lol/projects/${id}/content${localStorage.getItem("token") && data.rating === "13+" ? `?token=${localStorage.getItem("token")}` : ""}`;
      document.querySelector("#project-description").innerText =
        data.description;

      document.querySelector("#project-age-rating").innerText = data.rating;

      if (data.rating === "13+") {
        document.querySelector("#project-age-rating").classList.add("teen");
      }

      fetch("https://api.hatch.lol/auth/me", {
        headers: {
          Token: localStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.status === 200) {
          res.json().then((user) => {
            if (user.name === data.author.username) {
              document.querySelector("#project-edit-button").href =
                `/project/edit/?id=${id}`;
            } else {
              document.querySelector("#project-edit-button").remove();
            }
          });
        } else {
          document.querySelector("#project-edit-button").remove();
          
          if (data.rating === "13+") {
            document.querySelector("#project-embed").remove();
            document
              .querySelector("#project-embed-container")
              .classList.add("teen-block");
            document.querySelector("#download").classList.add("disabled");
          }

          document
            .querySelectorAll(".interaction-button, .comment-input, #report")
            .forEach((element) => {
              element.classList.add("disabled");
              element.tabIndex = -1;
            });

          document.querySelector("#project-comment-form-input").disabled = true;
        }
      });

      document.querySelector("#download").href =
        `https://api.hatch.lol/projects/${id}/content${localStorage.getItem("token") && data.rating === "13+" ? `?token=${localStorage.getItem("token")}` : ""}`;

      fetch(`https://api.hatch.lol/projects/${id}/comments`).then((res) => {
        res.json().then((data) => {
          data.comments.forEach((comment) => {
            document.querySelector("#comments").innerHTML = `
        <div class="comment">
          <div class="comment-top">
            <img src="${`https://api.hatch.lol${comment.author.profile_picture}`}" class="comment-pfp" alt="Profile picture">
            <a href="/user/?u=${comment.author.username}" class="comment-username">${comment.author.display_name}</a>
            <p class="comment-time">${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][new Date(comment.postDate * 1000).getMonth()]} ${new Date(comment.postDate * 1000).getDate()}, ${new Date(comment.postDate * 1000).getFullYear()}</p><a href="#reply" class="comment-reply">↪ Reply</a><a href="#report" class="comment-report"><img src="https://rdr.lol/u/JRHxiZ.png" alt="Report"></a>
          </div>
          <p class="content">${comment.replyTo === null ? "" : `<a href="/user/?u=${comment.replyTo}">@${comment.replyTo}</a> `}${comment.content}</p>
        </div>
        ${document.querySelector("#comments").innerHTML}`;
          });
        });
      });

      document.querySelector("#upvote-count").innerText = "Coming soon...";
      document.querySelector("#downvote-count").innerText = "Coming soon...";
      document.querySelector("#vote-percent").innerText = "Coming soon...";
      document.querySelector("#project-tags").innerText = "Coming soon...";
      document.querySelector("#project-galleries").innerText = "Coming soon...";
      document.body.classList.remove("loading");

      let hatchTeam;
      if (localStorage.getItem("token")) {
        fetch("https://api.hatch.lol/auth/me", {
          headers: {
            Token: localStorage.getItem("token"),
          },
        }).then((res) => {
          if (res.status === 200) {
            res.json().then((data) => {
              const par = document.querySelector("#project-age-rating");
              hatchTeam = data.hatchTeam;
              if (data.hatchTeam) {
                par.style.cursor = "pointer";
                let new_rating;
                let rating_picker = rate_dialog.querySelector("select");
                rating_picker.onchange = (e) => {
                  new_rating = rating_picker.value;
                }
                rate_dialog.querySelector("button").onclick = () => {
                  if (new_rating) {
                    fetch("https://api.hatch.lol/admin/set-rating", {
                      method: "POST",
                      headers: {
                        Token: localStorage.getItem("token"),
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        project_id: parseInt(id),
                        rating: new_rating,
                      }),
                    }).then((e) => {
                      if (e.ok) {
                        par.innerHTML = new_rating;
                      } else {
                        alert("Failed to change rating: " + e.text);
                      }
                    });
                    rate_dialog.toggleAttribute("open");
                  }
                }
              }
            });
          }
        });
      }
      if (!hatchTeam) {
        if (data.rating === "N/A") {
          rate_dialog.innerHTML = "<h3>About this rating</h3><p>Projects with the age rating of N/A have not been rated by a Hatch Team member yet. This means the project content could contain anything, even if not appropriate for the site. Report projects that does not follow the Hatch Guidelines.</p>";
        } else if (data.rating === "E") {
          rate_dialog.innerHTML = "<h3>About this rating</h3><p>Projects with the age rating of E are suitable for all ages. This project contains little to no violence and/or language.</p>";
        } else if (data.rating === "7+") {
          rate_dialog.innerHTML = "<h3>About this rating</h3><p>Projects with the age rating of 7+ are suitable for most users. This project contains little to no violence and/or language, and may recieve an NFE rating on Scratch.</p>";
        } else if (data.rating === "9+") {
          rate_dialog.innerHTML = "<h3>About this rating</h3><p>Projects with the age rating of 9+ are suitable for some users. This project may contain some violence, cartoonish blood, light profanity, and scares, and would most likely recieve an NFE rating on Scratch.</p>";
        } else if (data.rating === "13+") {
          rate_dialog.innerHTML = "<h3>About this rating</h3><p>Projects with the age rating of 13+ are only suitable for teenagers. This project may contain intense violence, blood, profanity, scares, and suggestive content, and would be taken down on Scratch.</p>";
        } else {
          rate_dialog.innerHTML = "<h3>About this rating</h3><p>This rating is not recognized.</p>";
        }
      }
    });
  } else if (res.status === 404 || res.status === 422) {
    window.history.replaceState(null, "", "/404/");
    window.location.assign("/404/");
  }
});

const par = document.querySelector("#project-age-rating");
par.addEventListener("click", () => {
  rate_dialog.toggleAttribute("open");
});
