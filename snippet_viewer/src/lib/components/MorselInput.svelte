<script lang="ts">
  import { type Morsel, type MorselViewerContext } from "$lib/types/types";
  import { getMorselViewerContext } from "$lib/components/context";
  import MorselCard from "$lib/components/MorselCard.svelte";
  import Button from "./ui/button/button.svelte";

  // TODO: Do we need to set the viewer context too or is the reactivity enough
  let morselViewerContext: MorselViewerContext = getMorselViewerContext();

  const morselDefault = {
    title: "Add title",
    text: "Add content",
    tags: "Add tags, comma sep.",
  };
  let morselInput = $state({
    morselTitle: "",
    morselText: "",
    morselTags: "",
  });
  let morsel: Morsel = $derived({
    title: morselInput.morselTitle,
    text: morselInput.morselText,
    tags: morselInput.morselTags.split(",").map((str) => str.trim()),
    time: new Date(),
  });

  function addMorsel() {
    morselViewerContext.morsels.unshift(morsel);
    morselViewerContext.tags = Array.from(
      new Set([...morselViewerContext.tags, ...morsel.tags])
    );
    morselInput.morselTitle = "";
    morselInput.morselText = "";
    morselInput.morselTags = "";
  }
</script>

<div class="flex flex-col gap-4 p-4 border border-green-950">
  <h3 class="text-xl">Morsel Input</h3>
  <div class="border border-gray-900 p-4">
    <div class="flex flex-row gap-4">
      <label for="title-input">Title:</label>
      <input
        id="title-input"
        type="text"
        bind:value={morselInput.morselTitle}
        placeholder={morselDefault.title}
      />
    </div>
    <div class="flex flex-row gap-4">
      <label for="text-input">Tags:</label>
      <input
        id="tags-input"
        type="text"
        bind:value={morselInput.morselTags}
        placeholder={morselDefault.tags}
      />
    </div>
    <div class="flex flex-row gap-4">
      <label for="text-input">Text:</label>
      <textarea
        rows="5"
        cols="50"
        id="text-input"
        bind:value={morselInput.morselText}
        placeholder={morselDefault.text}
      ></textarea>
    </div>
  </div>
  <MorselCard {morsel} />
  <!-- <div class="border border-red-950 p-4">
    <h2 class="text-xl">Morsel Preview</h2>
    <h3>{morselInput.morselTitle}</h3>
    {#if morselInput.morselTags !== ""}
      <p>Tags: {morselInput.morselTags}</p>
    {/if}
    <p>{morselInput.morselText}</p>
  </div> -->
  <div class="flex flex-row justify-center">
    <Button
      aria-label="Add Morsel"
      onclick={() => {
        console.log("MorselInput: Clicked!");
        console.log($state.snapshot(morselInput));
        addMorsel();
      }}
    >
      Add Morsel
    </Button>
  </div>
</div>
