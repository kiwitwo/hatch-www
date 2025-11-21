<script lang="ts">
  import ProjectRating from "$lib/components/ProjectRating.svelte";
  import { parse } from "marked";

  const { data } = $props();
</script>

<section>
  {#if data.rating === "13+"}
    <div class="project">
      <h3>This project is rated 13+</h3>
      <p>Please log in or sign up to view this project.</p>
    </div>
  {:else}
    <iframe
      title={data.title}
      src="https://turbowarp.org/embed?fullscreen-background=%231b1b1b&addons=pause,gamepad,mute-project&project_url=https://api.hatch.lol/projects/{data.id}/content"
      width="482"
      height="412"
      allowtransparency={true}
      frameborder="0"
      scrolling="no"
      allowfullscreen
      style="color-scheme: light;"
    ></iframe>
  {/if}
  <aside>
    <div>
      <div class="author">
        <a class="author" href="/user/{data.author.username}">
          <img
            src="https://api.hatch.lol/users/{data.author.username}/pfp"
            alt={data.author.username}
            class="pfp"
          />
          <div>
            <span class="user">{data.author.displayName}</span><br />
            <sub>@{data.author.username}</sub>
          </div>
        </a>
        <button class="pill-btn">Follow</button>
      </div>
    </div>
    <div>
      <h2>{data.title}</h2>
      <ProjectRating rating={data.rating} />
      {#await parse(data.description)}
        <p>Please wait</p>
      {:then description}
        {@html description}
      {/await}
    </div>
    <div class="action-row">
      <button class="pill-btn"><i class="fa-solid fa-thumbs-up"></i>&nbsp;{data.upvotes}</button>
      <button class="pill-btn"><i class="fa-solid fa-thumbs-down"></i>&nbsp;{data.downvotes}</button>
      <button class="pill-btn" aria-label="Report" title="Report"><i class="fa-solid fa-flag"></i></button>
      <a class="pill-btn" aria-label="Download" title="Download" href="https://api.hatch.lol/projects/{data.id}/content"><i class="fa-solid fa-download"></i></a>
    </div>
  </aside>
</section>
<div class="action-row">
  <a class="pill-btn" href="/project/{data.id}/edit">Edit project</a>
  <a class="pill-btn" href="https://hatch.raynec.dev/#{data.id}">See inside</a>
</div>
<h3>Comments ({data.commentCount})</h3>
<comments>
  {#each data.comments as comment}
    <div id="comment-{comment.id}" class="comment">
      <a class="author" href="/user/{comment.author.username}">
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
        {#await parse(comment.content)}
          <p>Please wait</p>
        {:then content}
          {@html content}
        {/await}
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
                <a class="author" href="/user/{reply.author.username}">
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
                  {#await parse(reply.content)}
                    <p>Please wait</p>
                  {:then content}
                    {@html content}
                  {/await}
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
  section {
    display: flex;
    gap: 2rem;
  }

  section:has(iframe) {
    height: 412px;
  }

  iframe {
    flex-shrink: 0;
  }

  .project {
    border-radius: 0.7rem;
    width: 482px;
    height: 412px;
    background-color: var(--block1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  div:has(> .author) {
    flex-shrink: 0;
  }

  .author {
    display: flex;
    gap: 1rem;
    align-items: center;
    text-decoration: none;
    color: unset;
    flex-grow: 1;
  }

  aside {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  aside > div {
    overflow-y: auto;
    padding: 0 0.1rem;
  }

  comments {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  comments > div {
    background-color: var(--block1);
    border-radius: 0.8rem;
    padding: 0.6rem;
  }

  .reply {
    padding-left: 2rem;
  }
</style>
