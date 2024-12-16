<script lang="ts">
  import type { Path } from "./types";
  import { getElemByPath } from "$lib/svedit/context";
  import BlockData from "$lib/svedit/BlockData.svelte";
  import Block from "$lib/svedit/Block.svelte";
  import { Button } from "$lib/components/ui/button/index";

  interface Props {
    blockPath: Path;
  }
  let { blockPath }: Props = $props();
  // TODO: is this "state" rune needed?? why or why not?
  let blockData: BlockData = $state(getElemByPath(blockPath));
  $effect(() => {
    console.log(blockData.type, "BlockData has changed", blockData);
  });
</script>

<div
  class="flex flex-col gap-4 p-4 border border-blue-400 {blockData.css_class}"
  contenteditable={blockData.editable}
>
  {#if blockData.path?.length > 0}
    <!-- The Root Node Can't Have Blocks Added Before or After (or be removed) -->
    <div class="flex flex-row gap-4">
      <Button
        onclick={() => {
          console.log("Add block above:", blockData.name, blockData.repStr);
          blockData.addBlockAbove();
        }}>Add Block Above</Button
      >
      <Button onclick={() => blockData.removeSelfFromParent()}
        >Remove Block</Button
      >
    </div>
  {/if}
  <div class="flex flex-col gap-1 text-xs font-normal text-rose-600">
    <span>({blockData.repStr})</span>
    <span class="text-xs font-normal text-rose-600"
      >Parent: {blockData.parent?.name}</span
    >
    <span class="text-xs font-normal text-rose-600">Path: {blockData.path}</span
    >
  </div>

  {#if blockData.title}
    <h3>{blockData.title.text}</h3>
  {/if}
  {#if blockData.text}
    <span>{@html blockData.text.text.replace(/\n/g, "<br>")}</span>
  {/if}
  {#each blockData.children as elem, index (elem.uuid)}
    <Block blockPath={[...blockPath, "children", index]} />
  {/each}

  <div class="flex flex-row gap-4">
    <!-- Root can have blocks added inside -->
    <Button onclick={() => blockData.addChildBlock()}>Add Block Inside</Button>
    <!-- The Root Node Can't Have Blocks Added Before or After (or be removed) -->
    {#if blockData.path?.length > 0}
      <Button onclick={() => blockData.addBlockBelow()}>Add Block Below</Button>
    {/if}
  </div>
</div>
