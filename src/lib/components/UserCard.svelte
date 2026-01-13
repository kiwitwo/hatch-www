<script lang="ts">
  export let name;
  export let displayName;
</script>

<a class="user-card" href="/users/{name}">
  <img src="https://api.hatch.lol/users/{name}/pfp" alt="{name}'s profile picture" class="avatar" />
  <div class="user-names">
    <p class="user-displayname">{displayName}</p>
    <p class="user-name">@{name}</p>
  </div>
</a>

<style>
  .user-card {
    border: 1px solid var(--primary);
    text-decoration: none !important;
    width: 6rem;
    height: 8rem;
    box-sizing: border-box;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    background-color: var(--block1);
    border-radius: 0.5rem;
  }
  .avatar {
    width: 5rem;
    height: 5rem;
    border-radius: 0.5rem;
  }
  .user-names {
    width: 100%;
  }
  .user-names p {
    margin: 0;
    font-size: 0.75rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .user-displayname {
    color: var(--primary);
  }
  .user-name {
    color: var(--bodyText);
  }
</style>
