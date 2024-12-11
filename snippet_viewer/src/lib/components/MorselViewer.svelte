<script lang="ts">
  import { type Morsel, type MorselViewerContext } from "$lib/types/types";
  import {
    getMorselViewerContext,
    setMorselViewerContext,
  } from "$lib/components/context";
  import MorselInput from "$lib/components/MorselInput.svelte";

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

<div class="flex flex-col gap-4 p-4">
  <MorselInput />
  <h3>Morsel Data:</h3>
  <pre>{JSON.stringify(getMorselViewerContext(), null, 2)}</pre>
</div>
