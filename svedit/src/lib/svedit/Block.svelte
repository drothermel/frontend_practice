<script lang="ts">
  import type { Path } from "./types";
  import { getElemByPath } from "$lib/svedit/context";
  import BlockData from "$lib/svedit/BlockData.svelte";
  import Block from "$lib/svedit/Block.svelte";

  interface Props {
    blockPath: Path;
  }
  let { blockPath }: Props = $props();
  // TODO: is this "state" rune needed?? why or why not?
  let blockData: BlockData = $state(getElemByPath(blockPath));
</script>

<div
  class="flex flex-col gap-4 p-4 border border-blue-400 {blockData.css_class}"
  contenteditable={blockData.editable}
>
  <div class="text-xs font-normal text-rose-600">({blockData.rep_str})</div>
  {#if blockData.title}
    <h3>{blockData.title.text}</h3>
  {/if}
  {#if blockData.text}
    <span>{@html blockData.text.text.replace(/\n/g, "<br>")}</span>
  {/if}
  {#each blockData.elements as elem, index}
    <Block blockPath={[...blockPath, "elements", index]} />
  {/each}
</div>
