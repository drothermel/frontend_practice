<script lang="ts">
  import { getContext } from "svelte";
  import type { StoryBlockData, BlockData, Path, SveditContext } from "./types";
  import type SveditSession from "./SveditSession.svelte";

  // Path is required even if blockData is also given
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

  function getStoryBlockData(
    path: Path,
    blockData?: BlockData,
    session?: SveditSession
  ): StoryBlockData | undefined {
    // Narrow the block data type
    if (blockData !== undefined && blockData.type == "story") {
      return blockData as StoryBlockData;
    }
    // Or get the block at the end of the path and return it if
    // it contains the needed StoryBlock keys
    else if (path !== undefined) {
      let elem = session?.getElemByPath(path);
      if ("type" in elem && elem.type === "story") {
        return elem as StoryBlockData;
      }
    }
    return undefined;
  }

  let storyBlockData: StoryBlockData | undefined = $derived.by(() =>
    getStoryBlockData(blockPath, blockData, sveditSession)
  );

  // let { block_index, path_in_block } = $props();
  // let block = $derived(svedit.entry_session.body[block_index]);
</script>

<div class="flex flex-col gap-2 p-4 border border-green-950 {css_class}">
  <h1 class="pb-4">{storyBlockData?.title.text}</h1>
  <span class="font-mono text-xs text-rose-400">
    (If I were to render an image it would be: {storyBlockData?.image} with layout
    {storyBlockData?.layout}.)
  </span>
  <span>{storyBlockData?.description.text}</span>
</div>
