<script lang="ts">
  import MorselInput from "$lib/components/MorselInput.svelte";
  import MorselViewer from "$lib/components/MorselViewer.svelte";
</script>

<div class="flex flex-col gap-6 w-full">
  <h1 class="text-3xl font-bold tracking-tight">Morsel Editor</h1>
  <div class="flex flex-row gap-4 w-full">
    <div class="w-1/3">
      <MorselInput />
    </div>
    <div class="w-2/3">
      <MorselViewer />
    </div>
  </div>
</div>
