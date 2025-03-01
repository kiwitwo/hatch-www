const params = new URLSearchParams(window.location.search);
const username = params.get("u");

let client_username;
fetch("https://api.hatch.lol/auth/me", {
    headers: {
        "Token": localStorage.getItem("token")
    }
}).then(res => res.json().then(data => {
    client_username = data.name;
    
    fetch(`https://api.hatch.lol/users/${username}/followers`).then(followers => {
        followers.json().then(data => {
            let followers = [];
            data.followers.forEach(user => {
                followers.push(user.name);
            });
            document.querySelector("#follow-button-text").innerText = `${followers.includes(client_username) ? "Unf" : "F"}ollow`;
        });
    });

    if (username.toLowerCase() === client_username.toLowerCase()) {
        document.querySelector("#follow-button").remove();
    }
}));

if (document.querySelector("#follow-button")) {
    document.querySelector("#follow-button").addEventListener("click", () => {
        fetch(`https://api.hatch.lol/users/${username}/followers`).then(followers => {
            followers.json().then(data => {
                let followers = [];
                data.followers.forEach(user => {
                    followers.push(user.name);
                });
                fetch(`https://api.hatch.lol/users/${username}/${followers.includes(client_username) ? "un" : ""}follow`, {
                    method: "POST",
                    headers: {
                        "Token": localStorage.getItem("token")
                    }
                }).then(res => {
                    if (res.status === 200) {
                        document.querySelector("#follow-button-text").innerText = `${followers.includes(client_username) ? "F" : "Unf"}ollow`;
                    }
                });
            });
        });
    });
}

fetch(`https://api.hatch.lol/users/${username}`).then(res => {
    if (res.status === 200) {
        res.json().then(data => {
            document.title = `${data.displayName} (@${data.name}) on Hatch`;

            document.querySelector("#banner-image").src = data.bannerImage === null ? "https://rdr.lol/u/GBc7y6.png" : data.bannerImage;
            document.querySelector("#displayname").innerText = data.displayName;
            document.querySelector("#username").innerText = `@${data.name}`;
            document.querySelector("#bio").innerText = data.bio;
            document.querySelector("#bio").innerHTML = document.querySelector("#bio").innerHTML
                .replace(/(https?:\/\/\S+)/g, "<a href='$1'>$1</a>")
                .replace(/@([a-z,A-Z,0-9,-,_]+)\b/g, "<a href='/user/?u=$1'>@$1</a>");
            document.querySelector("#pfp").src = `https://api.hatch.lol${data.profilePicture}`;
            document.querySelector("#followers-count").innerText = data.followerCount;
            document.querySelector("#following-count").innerText = data.followingCount;
            document.querySelector("#posts-count").innerText = data.projectCount;
            document.querySelector("#status").innerHTML = data.hatchTeam ? "<i class=\"fa-solid fa-shield-halved\"></i> Hatch Team" : "Hatchling";
            document.querySelector("#joindate").innerText = `Joined ${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][new Date(data.joinDate).getMonth()]} ${new Date(data.joinDate).getDate()}, ${new Date(data.joinDate).getFullYear()}`;
            document.querySelector("#recent-activity").innerText = "Coming soon...";
            document.querySelector("#connections-list").innerText = "Coming soon...";
            document.body.classList.remove("loading");
        });
    } else if (res.status === 404) {
        window.history.replaceState(null, "", "/404/");
        window.location.assign("/404/");
    }
});

fetch(`https://api.hatch.lol/users/${username}/following`).then(res => {
    if (res.status === 200) {
        res.json().then(data => {
            const currentUsername = document.querySelector("#usernamenav");
            if (localStorage["token"] && currentUsername) {
                if (!data.following.includes(currentUsername.innerText)) {
                    document.querySelector("#followstatus").style.display = "block";
                }
            }
        })
    }
});
