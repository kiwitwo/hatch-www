<script lang="ts">
  import Project from "$lib/components/Project.svelte";
  import { parse } from "marked";

  const { data } = $props();
</script>

<main>
  <img id="banner" src={data.bannerImage} alt="{data.displayName}'s banner" />
  <info>
    <img class="pfp" src="https://api.hatch.lol/users/{data.name}/pfp" alt={data.displayName} />
    <div style:flex-grow="1">
      <h2>{data.displayName}</h2>
      <sub
        >@{data.name} • {#if data.hatchTeam}Hatch Team{:else}Hatchling{/if}</sub
      >
    </div>
    <div class="stats">
      <h3>{data.followerCount}</h3>
      <span><a href="/users/{data.name}/followers">Followers</a></span>
    </div>
    <div class="stats">
      <h3>{data.followingCount}</h3>
      <span><a href="/users/{data.name}/following">Following</a></span>
    </div>
    <div class="stats">
      <h3>{data.projectCount}</h3>
      <span><a href="/users/{data.name}/projects">Projects</a></span>
    </div>
  </info>
  <div>
    {@html parse(data.bio ?? "")}
  </div>
</main>

<div class="title-box">
  <h2>Shared Projects</h2>
  <a class="see-all" href="/users/{data.name}/projects"
    >See All&ensp;<i class="fa-solid fa-square-up-right"></i></a
  >
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

<h2>Comments ({data.comments.length})</h2>
<comments>
  {#each data.comments as comment}
    <div id="comment-{comment.id}" class="comment">
      <a class="author" href="/users/{comment.author.username}">
        <img
          src="https://api.hatch.lol/users/{comment.author.username}/pfp"
          alt={comment.author.username}
          class="pfp"
        />
        <div>
          <span class="user">{comment.author.displayName}</span><br />
          <sub>@{comment.author.username}</sub>
        </div>
      </a>
      <div>
        {@html parse(comment.content ?? "")}
      </div>
      {#if comment.hasReplies}
        {#await fetch(`https://api.hatch.lol/projects/${data.id}/comments/${comment.id}/replies`)}
          <p>Loading replies</p>
        {:then response}
          {#await response.json()}
            <p>Loading replies</p>
          {:then replies}
            {#each replies as reply}
              <div id="comment-{reply.id}" class="comment reply">
                <a class="author" href="/users/{reply.author.username}">
                  <img
                    src="https://api.hatch.lol/users/{reply.author.username}/pfp"
                    alt={reply.author.username}
                    class="pfp"
                  />
                  <div>
                    <span class="user">{reply.author.displayName}</span><br />
                    <sub>@{reply.author.username}</sub>
                  </div>
                </a>
                <div>
                  {@html parse(reply.content ?? "")}
                </div>
              </div>
            {/each}
          {/await}
        {/await}
      {/if}
    </div>
  {/each}
</comments>

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
