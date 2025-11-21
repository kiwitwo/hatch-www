<script lang="ts">
  import type { ProjectRating } from "$lib";

  const { rating }: { rating: ProjectRating } = $props();
</script>

<span class="rating-{rating}"
  >{{
    "N/A": "N/A",
    E: "Safe",
    "7+": "Light",
    "9+": "Moderate",
    "13+": "Restricted"
  }[rating]}</span
>

<style>
  span {
    background-image: linear-gradient(#000000c4);
    border-radius: 2rem;
    padding: 0.1rem 0.5rem;
    text-wrap: nowrap;
    color: var(--project-rating-color);
    background-color: var(--project-rating-color);
    outline: 0.0625rem solid var(--project-rating-color);
  }

  .rating-N\/A {
    --project-rating-color: #d8d8d8;
  }

  .rating-E {
    --project-rating-color: #8ef58a;
  }

  .rating-7\+ {
    --project-rating-color: #f1e683;
  }

  .rating-9\+ {
    --project-rating-color: #f39c74;
  }

  .rating-13\+ {
    --project-rating-color: #fa7a7a;
  }
</style>
