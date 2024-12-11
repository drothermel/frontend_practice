<script lang="ts">
  import { type Morsel } from "$lib/types/types";
  let { morsel }: { morsel: Morsel } = $props();
</script>

<div class="flex flex-col border border-green-800 gap-4 p-4">
  <h3>{morsel.title}</h3>
  <p>Created: {morsel.time.toLocaleString()}</p>
  {#if morsel.tags.length > 0}
    <p>Tags: {morsel.tags.join(", ")}</p>
  {:else}
    <p>No Tags</p>
  {/if}
  <p>{morsel.text}</p>
</div>
