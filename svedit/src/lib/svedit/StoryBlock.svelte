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

  const editable_css: string = $derived(
    storyBlockData?.editable ? "" : "bg-gray-50 opacity-90"
  );
  const block_type: string = $derived(
    storyBlockData?.editable ? "EditableStoryBlock" : "FixedStoryBlock"
  );
</script>

<div
  class="flex flex-col gap-2 p-4 border border-green-950 {css_class} {editable_css}"
  contenteditable={blockData?.editable}
>
  <h3>{storyBlockData?.title.text}</h3>
  <span class="font-mono text-xs text-rose-400">
    ({block_type}) If I were to render an image it would be: {storyBlockData?.image}
    with layout
    {storyBlockData?.layout}.
  </span>
  <span>{storyBlockData?.description.text}</span>
</div>
