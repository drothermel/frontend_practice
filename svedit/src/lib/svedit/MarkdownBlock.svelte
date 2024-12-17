<script lang="ts">
  // Import markdown conversion library
  import { marked } from "marked";
  import type BlockData from "$lib/svedit/BlockData.svelte";
  import { Textarea } from "$lib/components/ui/textarea/index";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index";
  import { Label } from "$lib/components/ui/label/index";
  import Separator from "$lib/components/ui/separator/separator.svelte";

  interface Props {
    block: BlockData;
  }
  let { block }: Props = $props();
</script>

{#if block.markdown_setting === "both"}
  <div class="flex flex-row py-0" contenteditable="true">
    <div class="flex flex-col gap-1 min-h-max w-1/2 px-4">
      <!-- Declare a textarea where the user can enter markdown, and bind it to the variable `markdown` -->
      <Label for="markdown" class="font-bold">Markdown Editor</Label>
      <Textarea
        id="markdown"
        class="w-full min-h-40 text-xs bg-white bg-opacity-100"
        bind:value={block.markdown}
        placeholder="Add some markdown!"
      ></Textarea>
    </div>
    <Separator orientation="vertical" class="w-[2px]" />

    <!-- Convert the markdown to HTML and display it -->
    <div
      class="w-1/2 min-h-max flex flex-col px-2 gap-2"
      contenteditable="false"
    >
      <Label for="preview" class="font-bold">Preview</Label>
      <ScrollArea
        id="preview"
        class="rounded-md border p-4 text-sm bg-white bg-opacity-100"
        orientation="both"
      >
        {@html block.renderedMarkdown}
      </ScrollArea>
    </div>
  </div>
{:else if block.markdown_setting === "preview"}
  <div class="p-0 w-full flex flex-col gap-2">
    {@html block.renderedMarkdown}
  </div>
{/if}

<!-- Make it look (slightly) nicer ;) -->
<style>
  :global(body) {
    padding: 0;
  }
</style>
