<script lang="ts">
  import { Button } from "$lib/components/ui/button/index";
  import BlockData from "$lib/svedit/BlockData.svelte";
  import Block from "$lib/svedit/Block.svelte";
  import {
    SquareX,
    SquarePen,
    BetweenHorizontalStart,
    PanelTopOpen,
    PanelBottomOpen,
  } from "lucide-svelte";
  import { text } from "@sveltejs/kit";

  interface Props {
    block: BlockData;
  }
  let { block }: Props = $props();

  let buttonCols = block.children.length > 0 ? "grid-cols-1" : "grid-cols-2";
  let buttonGridH = block.children.length > 0 ? "h-15" : "h-10";
  let buttonGridW = block.children.length > 0 ? "w-5" : "w-10";

  let tPadding = block.parent === null ? "pt-0" : "pt-2";
  let bPadding = block.parent === null ? "pb-2" : "pb-2";
</script>

<div
  class="w-full flex flex-row gap-1 px-2 min-h-16 {tPadding} {bPadding} border border-blue-400 {block.css_class}"
  contenteditable={block.editable}
>
  <div class="w-full flex flex-col gap-1 px-1 justify-center">
    <!-- Render Myself -->
    <div class="w-11/12">
      {#if block.title}
        <h3>{block.title.text}</h3>
      {/if}

      {#if block.text}
        <span>{@html block.text.text.replace(/\n/g, "<br>")}</span>
      {/if}
    </div>

    <!-- Add Text Button -->
    {#if block.text === undefined && block.title === undefined && block.parent !== null && block.children.length === 0}
      <Button
        id="add-text"
        variant="ghost"
        size="icon"
        class="h-6 w-6 rounded-sm hover:bg-green-100 hover:text-accent-foreground bg-orange-200"
      >
        <SquarePen strokeWidth="1.5" color="grey" />
      </Button>
    {/if}
    <!-- Render My Children -->
    {#each block.children as child (child.uuid)}
      <Block block={child} />
    {/each}
  </div>

  <div>
    {#if block.parent !== null}
      <div
        id="buttons"
        class="{buttonGridH} {buttonGridW} grid {buttonCols} gap-0 bg-slate-300 justify-center items-center mx-auto"
      >
        <div class="h-5 w-5 bg-green-200">
          {#if block.parent !== null}
            <Button
              id="add-block-above"
              variant="ghost"
              size="icon"
              onclick={() => block.addBlockAbove()}
              class="h-5 w-5 rounded-sm hover:bg-green-100 hover:text-accent-foreground bg-green-50"
            >
              <PanelBottomOpen strokeWidth="1.5" color="grey" />
            </Button>
          {/if}
        </div>
        <div class="h-5 w-5 bg-rose-200">
          {#if block.parent !== null}
            <Button
              id="remove-block"
              variant="ghost"
              size="icon"
              class="h-5 w-5 rounded-sm hover:bg-destructive hover:text-destructive-foreground bg-rose-50"
              onclick={() => block.removeSelfFromParent()}
            >
              <SquareX strokeWidth="1.5" color="grey" />
            </Button>
          {/if}
        </div>
        <div class="h-5 w-5 bg-blue-200">
          {#if block.parent !== null}
            <Button
              id="add-block-below"
              variant="ghost"
              size="icon"
              onclick={() => block.addBlockBelow()}
              class="h-5 w-5 rounded-sm hover:bg-green-100 hover:text-accent-foreground bg-blue-50"
            >
              <PanelTopOpen strokeWidth="1.5" color="grey" />
            </Button>
          {/if}
        </div>
        <div class="h-5 w-5 bg-purple-200">
          {#if block.children.length == 0}
            <Button
              id="insert-new"
              variant="ghost"
              size="icon"
              onclick={() => block.addChildBlock()}
              class="h-5 w-5 rounded-sm hover:bg-green-100 hover:text-accent-foreground bg-purple-50"
            >
              <BetweenHorizontalStart strokeWidth="1.5" color="grey" />
            </Button>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</div>
