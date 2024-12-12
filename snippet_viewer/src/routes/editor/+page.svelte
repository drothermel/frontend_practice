<script lang="ts">
  import MorselInput from "$lib/components/MorselInput.svelte";
  import MorselViewer from "$lib/components/MorselViewer.svelte";
  import * as Resizable from "$lib/components/ui/resizable/index";
  import Separator from "$lib/components/ui/separator/separator.svelte";
</script>

<div class="flex flex-col w-full">
  <div class="pb-4">
    <h1 class="text-3xl font-bold tracking-tight">Snippet Editor</h1>
  </div>
  <Resizable.PaneGroup
    direction="horizontal"
    class="min-w-[500px] min-h-[500px] border"
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
