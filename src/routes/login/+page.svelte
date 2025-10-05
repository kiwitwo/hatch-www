<script lang="ts">
  let error = $state("");

  let username = $state("");
  let password = $state("");

  let thinking = $state(false);
</script>

<h1>Log In</h1>
<p>{error}</p>
<form
  onsubmit={async (event) => {
    event.preventDefault();
    if (username.trim() === "" || password.trim() === "") {
      error = "Please provide a username and password.";
      return;
    }

    const resp = await fetch("https://api.hatch.lol/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    thinking = false;

    if (resp.status === 400 || resp.status === 500) {
      error = await resp.text();
      return;
    }

    localStorage.setItem("token", (await resp.json()).token);
    window.location.href = "/";
  }}
>
  <p>
    <label for="username">Username</label><input
      type="text"
      bind:value={username}
      disabled={thinking}
    />
  </p>
  <p>
    <label for="password">Password</label><input
      type="password"
      bind:value={password}
      disabled={thinking}
    />
  </p>
  <input type="submit" value="Submit" class="pill-btn" />
</form>
