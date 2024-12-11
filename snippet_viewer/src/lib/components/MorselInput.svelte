<script lang="ts">
  import { type Morsel, type MorselViewerContext } from "$lib/types/types";
  import { getMorselViewerContext } from "$lib/components/context";
  import MorselCard from "$lib/components/MorselCard.svelte";
  import Button from "./ui/button/button.svelte";
  import Input from "./ui/input/input.svelte";
  import Label from "./ui/label/label.svelte";
  import Textarea from "./ui/textarea/textarea.svelte";
  import Separator from "./ui/separator/separator.svelte";
  import * as Card from "./ui/card/index";

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

<Card.Root>
  <Card.Header>
    <Card.Title class="text-xl">Create Morsel</Card.Title>
  </Card.Header>
  <Card.Content class="flex flex-col gap-4">
    <div class="grid gap-2">
      <Label for="title-input">Title:</Label>
      <Input
        type="text"
        id="title-input"
        bind:value={morselInput.morselTitle}
        placeholder={morselDefault.title}
        class="-translate-y-1"
      />
      <Label for="text-input">Tags:</Label>
      <Input
        id="tags-input"
        type="text"
        bind:value={morselInput.morselTags}
        placeholder={morselDefault.tags}
        class="-translate-y-1"
      />
      <Label for="text-input">Text:</Label>
      <Textarea
        rows="5"
        cols="50"
        id="text-input"
        bind:value={morselInput.morselText}
        placeholder={morselDefault.text}
        class="-translate-y-1"
      ></Textarea>
    </div>
    <Separator />
    <h3 class="text-xl">Preview</h3>
    <MorselCard {morsel} />
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
  </Card.Content>
</Card.Root>
