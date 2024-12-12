<script lang="ts">
  import { type Morsel, type MorselViewerContext } from "$lib/types/types";
  import { setMorselViewerContext } from "$lib/components/context";
  import MorselInput from "$lib/components/MorselInput.svelte";
  import MorselViewer from "$lib/components/MorselViewer.svelte";
  import * as Resizable from "$lib/components/ui/resizable/index";
  import Separator from "$lib/components/ui/separator/separator.svelte";

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

<div class="flex flex-col w-full">
  <div class="flex flex-col gap-4">
    <h1 class="text-3xl font-bold tracking-tight">Snippet Editor</h1>
    <Separator />
  </div>
  <Resizable.PaneGroup
    direction="horizontal"
    class="min-w-[500px] min-h-[500px]"
  >
    <Resizable.Pane defaultSize={30}>
      <div class="h-full p-4 items-center justify-center">
        <MorselInput />
      </div>
    </Resizable.Pane>
    <Resizable.Handle withHandle />
    <Resizable.Pane defaultSize={70}>
      <div class="h-full p-4 items-center justify-center">
        <MorselViewer />
      </div>
    </Resizable.Pane>
  </Resizable.PaneGroup>
</div>
