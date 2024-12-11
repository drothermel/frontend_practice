<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
  import { type Morsel } from "$lib/types/types";
  let { morsel }: { morsel: Morsel } = $props();
</script>

<div class="flex flex-col border border-green-800 gap-4 p-4">
  <h3>{morsel.title}</h3>
  <p>Created: {morsel.time.toLocaleString()}</p>
  {#if morsel.tags.length > 0 && morsel.tags[0] !== ""}
    <div class="flex flex-row py-4 gap-2">
      {#each morsel.tags as tag}
        <Badge>{tag}</Badge>
      {/each}
    </div>
    <!-- <p>Tags: {morsel.tags.join(", ")}</p> -->
  {/if}
  <p>{morsel.text}</p>
</div>
