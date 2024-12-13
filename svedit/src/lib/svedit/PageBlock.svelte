<script lang="ts">
  import { getContext } from "svelte";
  import type SveditSession from "./SveditSession.svelte";
  import type { PageBlockData, Path, BlockData, SveditContext } from "./types";
  import Container from "$lib/svedit/Container.svelte";
  import PageBlock from "$lib/svedit/PageBlock.svelte";
  import StoryBlock from "$lib/svedit/StoryBlock.svelte";
  import UnknownBlock from "$lib/svedit/UnknownBlock.svelte";

  // Note that path is necessary even if block data is included
  // TODO: having two potential sources of info is probably not ideal?
  interface Props {
    blockPath: Path;
    blockData?: BlockData;
    blockIndex?: number;
    class?: string;
  }
  let {
    blockPath,
    blockData,
    class: css_class = "",
    blockIndex = -1,
  }: Props = $props();

  const sveditContext: SveditContext = getContext("svedit");
  let sveditSession: SveditSession = $derived(sveditContext.session);

  // TODO: one function to narrow block data types based on "type" key
  function getPageBlockData(
    path: Path,
    blockData?: BlockData,
    session?: SveditSession
  ): PageBlockData | undefined {
    // Narrow the block data type
    if (blockData !== undefined && blockData.type == "page") {
      return blockData as PageBlockData;
    }
    // Or get the block at the end of the path and return it if
    // it contains the needed StoryBlock keys
    else if (path !== undefined) {
      let elem = session?.getElemByPath(path);
      if ("type" in elem && elem.type === "page") {
        return elem as PageBlockData;
      }
    }
    return undefined;
  }

  let pageBlockData: PageBlockData | undefined = $derived.by(() =>
    getPageBlockData(blockPath, blockData, sveditSession)
  );

  // let { block_index, path_in_block } = $props();
  // let block = $derived(svedit.entry_session.body[block_index]);
</script>

<div class="flex flex-col gap-2 p-4 border border-green-950 {css_class}">
  <h1 class="pb-4">{pageBlockData?.title.text}</h1>
  <span class="font-mono text-xs text-rose-400"> (Body:) </span>
  <Container
    blockIterPath={[...blockPath, "body"]}
    class="body flex flex-col p-4 gap-4"
  >
    {#snippet getBlock(block: BlockData, index: number)}
      {#if block.type === "story"}
        <StoryBlock blockPath={["body", index]} blockData={block} />
      {:else if block.type === "page"}
        <PageBlock blockPath={["body", index]} blockData={block} />
      {:else}
        <UnknownBlock {block} />
      {/if}
    {/snippet}
  </Container>
</div>
