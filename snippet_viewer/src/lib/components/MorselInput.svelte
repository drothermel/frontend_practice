<script lang="ts">
  import { type Morsel, type MorselViewerContext } from "$lib/types/types";
  import {
    getMorselViewerContext,
    setMorselViewerContext,
  } from "$lib/components/context";
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
</script>

<div class="flex flex-col gap-4 py-4 border border-green-950">
  <h3>Add a Morsel:</h3>
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
  <div class="border border-red-950 p-4">
    <h3>{morselInput.morselTitle}</h3>
    <p>Tags: {morselInput.morselTags}</p>
    <p>{morselInput.morselText}</p>
  </div>
</div>
