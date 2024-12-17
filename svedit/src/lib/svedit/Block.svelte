<script lang="ts">
  import { Button } from "$lib/components/ui/button/index";
  import BlockData from "$lib/svedit/BlockData.svelte";
  import Block from "$lib/svedit/Block.svelte";
  import { onDestroy } from "svelte";

  interface Props {
    block: BlockData;
  }
  let { block }: Props = $props();
</script>

<div
  class="flex flex-col gap-4 p-4 border border-blue-400 {block.css_class}"
  contenteditable={block.editable}
>
  <!-- Top Button Panel -->
  {#if block.parent !== null}
    <div class="flex flex-row gap-4">
      <Button onclick={() => block.addBlockAbove()}>Add Block Above</Button>
      <Button onclick={() => block.removeSelfFromParent()}>Remove Block</Button>
    </div>
  {/if}

  <!-- Debugging Info -->
  <div class="flex flex-col gap-1 text-xs font-normal text-rose-600">
    <span>({block.repStr})</span>
    <span> Parent: {block.parent?.name}</span>
    <span>Path: {block.path} </span>
  </div>

  <!-- Render Myself -->
  {#if block.title}
    <h3>{block.title.text}</h3>
  {/if}

  {#if block.text}
    <span>{@html block.text.text.replace(/\n/g, "<br>")}</span>
  {/if}

  <!-- Render My Children -->
  {#each block.children as child (child.uuid)}
    <Block block={child} />
  {/each}

  <!-- Botton Button Panel -->
  <div class="flex flex-row gap-4">
    <Button onclick={() => block.addChildBlock()}>Add Block Inside</Button>
    {#if block.parent !== null}
      <Button onclick={() => block.addBlockBelow()}>Add Block Below</Button>
    {/if}
  </div>
</div>
