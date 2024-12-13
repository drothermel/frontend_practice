<script lang="ts">
  import { type BlockData } from "./types";
  interface Props {
    block: BlockData;
  }
  let { block } = $props();
</script>

<div>
  Unknown block type: {block.type}
</div>
