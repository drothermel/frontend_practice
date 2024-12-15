<script lang="ts">
  import type { SveditContext } from "./types";
  import { getContext } from "svelte";
  import type SveditSession from "$lib/svedit/SveditSession.svelte";
  import type { Path } from "./types";
  import BlockData from "$lib/svedit/BlockData.svelte";
  import Block from "$lib/svedit/Block.svelte";

  interface Props {
    blockPath: Path;
  }
  let { blockPath }: Props = $props();

  const sveditContext: SveditContext = getContext("svedit");
  let sveditSession: SveditSession = $derived(sveditContext.session);
  let blockData: BlockData = $derived(sveditSession?.getElemByPath(blockPath));
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
