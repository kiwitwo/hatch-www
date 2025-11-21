<script lang="ts">
    import Project from "$lib/components/Project.svelte";
  import { parse } from "marked";

  const { data } = $props();
</script>

<main>
  <img id="banner" src={data.bannerImage} alt="{data.displayName}'s banner">
  <info>
    <img class="pfp" src="https://api.hatch.lol/users/{data.name}/pfp" alt={data.displayName}>
    <div style:flex-grow=1>
      <h2>{data.displayName}</h2>
      <sub>@{data.name} • {#if data.hatchTeam}Hatch Team{:else}Hatchling{/if}</sub>
    </div>
    <div class="stats">
      <h3>{data.followerCount}</h3>
      <span><a href="/user/{data.name}/followers">Followers</a></span>
    </div>
    <div class="stats">
      <h3>{data.followingCount}</h3>
      <span><a href="/user/{data.name}/following">Following</a></span>
    </div>
    <div class="stats">
      <h3>{data.projectCount}</h3>
      <span><a href="/user/{data.name}/projects">Projects</a></span>
    </div>
  </info>
  <div>
    {#await parse(data.bio)}
      <p>Please wait</p>
    {:then content}
      {@html content}
    {/await}
  </div>
</main>

<div class="title-box">
  <h2>Shared Projects</h2>
  <a class="see-all" href="/user/{data.name}/projects">See All&ensp;<i class="fa-solid fa-square-up-right"></i></a>
</div>
<div class="project-row">
  {#each data.projects as project}
    <Project
      author={project.author.username}
      downvotes={project.downvotes}
      id={project.id}
      name={project.title}
      upvotes={project.upvotes}
    />
  {/each}
</div>

<style>
  #banner {
    width: 100%;
    aspect-ratio: 9 / 2;
    border-radius: 0.8rem;
    display: block;
    object-fit: cover;
  }

  main info {
    display: block;
    padding: 1rem 0;
    display: flex;
    gap: 1rem;
  }

  main info h2 {
    margin: 0;
  }

  .stats {
    text-align: center;
  }

  .stats h3 {
    margin: 0.2rem 0;
  }
</style>
