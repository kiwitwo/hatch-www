const params = new URLSearchParams(window.location.search);
const username = params.get("u");

fetch(`https://api.hatch.lol/users/${username}`).then(res => {
    if (res.status === 200) {
        res.json().then(data => {
            document.title = `${data.displayName} (@${data.name}) on Hatch`;

            document.querySelector("#displayname").innerText = data.displayName;
            document.querySelector("#userat").innerText = `@${data.name}`;
            document.querySelector("#userbio").innerText = data.bio;
            document.querySelector("#pfp").src = data.profilePicture.startsWith("data:image") ? data.profilePicture : `https://api.hatch.lol/${data.profilePicture}`;
            document.querySelector("#followers").innerText = `Followers (${data.followerCount})`;
            document.querySelector("#following").innerText = `Following (${data.followingCount})`;
            document.querySelector("#userdata").innerText = `${data.country} | Joined ${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][new Date(data.joinDate).getMonth()]} ${new Date(data.joinDate).getDate()}, ${new Date(data.joinDate).getFullYear()}`;

            document.querySelector("#userstatstext").innerText = "Coming soon...";
            document.querySelector("#wibdinfo").innerText = "Coming soon...";
            document.querySelector("#badgecontain").innerText = "Coming soon...";
            document.querySelector("#connectionscontain").innerText = "Coming soon...";
            document.querySelector("#comments").innerText = "Coming soon...";
            document.body.classList.remove("loading");
        });
    } else if (res.status === 404) {
        window.history.replaceState(null, "", "/404/");
        window.location.assign("/404/");
    }
});
