<script lang="ts">
  import { type BlockData } from "./types";
  interface Props {
    block: BlockData;
  }
  let { block } = $props();
</script>

<div
  class="p-4 border border-rose-500 flex flex-col gap-2 bg-gray-50 opacity-90"
  contenteditable="false"
>
  <h3>Unknown Block</h3>
  <span class="font-mono text-xs text-rose-400"
    >Unknown block type: {block.type}</span
  >
</div>
