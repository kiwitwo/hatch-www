<script lang="ts">
  const {
    author,
    downvotes,
    id,
    name,
    upvotes
  }: {
    author: string;
    downvotes: number;
    id: number;
    name: string;
    upvotes: number;
  } = $props();
</script>

<a href="/project/{id}">
  <img src="https://placehold.co/1280x720" alt="Project Thumbnail" />
  <div>
    <p>{name}</p>
    <div class="author">By @{author}</div>
    <div class="stats">
      <i class="fa-solid fa-eye"></i> 2500 |
      <i class="fa-solid fa-up-down"></i>
      {upvotes}/{downvotes}
      {#if upvotes > 0 || downvotes > 0}
        ({Math.round((upvotes / (upvotes + downvotes)) * 100)}%)
      {/if}
    </div>
  </div>
</a>

<style>
  img {
    height: 6rem;
    width: 10.67rem;
    aspect-ratio: 16/9;
    border-radius: 0.5rem;
  }

  a:has(img) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.25rem;
    box-sizing: content-box;
    text-decoration: none;
    width: 10.67rem;
    background-color: var(--block1);
    border-radius: 0.625rem;
    transition: all 0.3s cubic-bezier(0.4, 0.2, 0.2, 1);
    z-index: 2;
  }

  a:has(img) > div {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
  }

  a:has(img):hover {
    background-color: var(--block1);
    box-shadow: 0 0 1rem 0 #ffbd59cc;
  }

  p {
    margin: 0;
    font-size: 1em;
    overflow: hidden;
    text-overflow: ellipsis;
    width: inherit;
    text-wrap: nowrap;
    color: var(--primary);
    transition: all 0.3s cubic-bezier(0.4, 0.2, 0.2, 1);
    white-space: nowrap;
  }

  .author {
    font-size: 0.8em;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
    white-space: nowrap;
    width: inherit;
    color: var(--text);
  }

  .stats {
    font-size: 0.72em;
    color: #888;
  }
</style>
