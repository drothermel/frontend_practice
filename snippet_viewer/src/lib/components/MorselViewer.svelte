<script lang="ts">
  import { type Morsel, type MorselViewerContext } from "$lib/types/types";
  import { getMorselViewerContext, setMorselViewerContext } from "./context";
  import * as Card from "./ui/card/index";
  import MorselInput from "./MorselInput.svelte";
  import MorselCard from "./MorselCard.svelte";

  // Build our dummy morsels
  let morsels: Morsel[] = $state([]);
  for (let i = 1; i <= 5; i++) {
    morsels.push({
      title: `Title ${i}`,
      text: `Text ${i}`,
      tags: [`tag${i}`],
      time: new Date(),
    });
  }
  let morselContext: MorselViewerContext = $state({
    uuid: crypto.randomUUID(),
    tags: Array.from(new Set(morsels.flatMap((morsel) => morsel.tags))),
    morsels: morsels,
  });

  setMorselViewerContext(morselContext);
</script>

<Card.Root>
  <Card.Header>
    <Card.Title class="text-xl">Snippet Library</Card.Title>
  </Card.Header>
  <Card.Content>
    <div class="flex flex-col items-center gap-4">
      {#each morsels as morsel (morsel.time)}
        <MorselCard {morsel} />
      {/each}
    </div>
  </Card.Content>
</Card.Root>
