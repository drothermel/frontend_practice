<script lang="ts">
  import { getContext } from "svelte";
  import type SveditSession from "./SveditSession.svelte";
  import type { TextBlockData, Path, BlockData, SveditContext } from "./types";

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
  function getTextBlockData(
    path: Path,
    blockData?: BlockData,
    session?: SveditSession
  ): TextBlockData | undefined {
    // Narrow the block data type
    if (blockData !== undefined && blockData.type == "text") {
      return blockData as TextBlockData;
    }
    // Or get the block at the end of the path and return it if
    // it contains the needed StoryBlock keys
    else if (path !== undefined) {
      let elem = session?.getElemByPath(path);
      if ("type" in elem && elem.type === "text") {
        return elem as TextBlockData;
      }
    }
    return undefined;
  }

  let textBlockData: TextBlockData | undefined = $derived.by(() =>
    getTextBlockData(blockPath, blockData, sveditSession)
  );

  const editable_css: string = $derived(
    textBlockData?.editable ? "" : "bg-gray-50 opacity-90"
  );
  const block_type: string = $derived(
    textBlockData?.editable ? "EditableTextBlock" : "FixedTextBlock"
  );
</script>

<div
  class="flex flex-col gap-2 p-4 border border-green-950 {css_class} {editable_css}"
  contenteditable={blockData?.editable}
>
  <span class="font-mono text-xs text-rose-400"> ({block_type}) </span>
  <span>{textBlockData?.content.text}</span>
</div>
