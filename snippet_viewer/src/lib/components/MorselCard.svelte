<script lang="ts">
  import { type Morsel } from "$lib/types/types";

  import * as Card from "./ui/card/index";
  import { Badge } from "./ui/badge";

  let { morsel }: { morsel: Morsel } = $props();
</script>

<Card.Root class="max-w-[800px] min-w-[500px]">
  <Card.Header>
    <Card.Title tag="h3" class="text-xl font-bold">{morsel.title}</Card.Title>
    <Card.Description class="flex flex-col gap-1">
      Created: {morsel.time.toLocaleString()}
      {#if morsel.tags.length > 0 && morsel.tags[0] !== ""}
        <div class="flex flex-row gap-2">
          {#each morsel.tags as tag}
            <Badge class="text-xs">{tag}</Badge>
          {/each}
        </div>
      {/if}
    </Card.Description>
  </Card.Header>

  <Card.Content class="grid">
    <p class="text-sm leading-none p-1">{morsel.text}</p>
  </Card.Content>
</Card.Root>
