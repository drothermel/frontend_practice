<script lang="ts">
  import { type BlockData } from "./types";
  interface Props {
    block: BlockData;
  }
  let { block } = $props();
</script>

<div class="p-4 border border-rose-500">
  <h1 class="pb-4">Unknown Block</h1>
  <span class="font-mono text-xs text-rose-400"
    >Unknown block type: {block.type}</span
  >
</div>
