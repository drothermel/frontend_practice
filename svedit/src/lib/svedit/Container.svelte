<script lang="ts">
  import type { BlockData, PageBlockData, Path, SveditContext } from "./types";
  import { getContext, type Snippet } from "svelte";

  // When you use a Container you have to define a
  // snippet named block
  interface Props {
    blockIterPath: Path;
    class: string;
    getBlock: (block: BlockData, index: number) => any;
  }
  let { blockIterPath, class: css_class, getBlock }: Props = $props();

  // Get the iterable full of blocks to render from the provided path
  const sveditContext: SveditContext = getContext("svedit");
  let blockIterable: Iterable<BlockData> = $derived(
    sveditContext.session?.getElemByPath(blockIterPath)
  );
</script>

<div data-type="container" class="{css_class} border border-purple-500">
  <h1 class="text-xs font-normal text-blue-600">(Container)</h1>
  {#each blockIterable as _block, index}
    {@render getBlock(_block, index)}
  {/each}
</div>
