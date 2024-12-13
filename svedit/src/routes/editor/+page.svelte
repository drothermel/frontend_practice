<script lang="ts">
  import {
    PreAnnText,
    StrongAnn,
    type BlockData,
    type StoryBlockData,
  } from "$lib/svedit/types";

  import Text from "$lib/svedit/Text.svelte";
  import Svedit from "$lib/svedit/Svedit.svelte";
  import EntrySession from "$lib/svedit/EntrySession.svelte";
  import Container from "$lib/svedit/Container.svelte";
  import StoryBlock from "$lib/svedit/StoryBlock.svelte";
  import UnknownBlock from "$lib/svedit/UnknownBlock.svelte";

  let entry_session: EntrySession = new EntrySession({
    type: "page",
    title: PreAnnText("Entry Title"),
    subtitle: {
      text: "This is a subtitle! Can you see the amazing bolding?",
      annotations: [StrongAnn(0, 4), StrongAnn(10, 15)],
    },
    body: [
      {
        type: "story",
        layout: 1,
        image: "none",
        title: PreAnnText("Story 1"),
        description: PreAnnText("This is the whole story, really!"),
      } as StoryBlockData,
      {
        type: "random_type",
        title: PreAnnText("Random Block"),
        description: PreAnnText("This is a random block."),
      } as BlockData,
    ],
  });
</script>

<h1 class="text-3xl font-bold tracking-tight">Svedit Maybe?</h1>

<Svedit {entry_session} editable={true} class="flex flex-col gap-4">
  <div class="flex flex-col gap-4 max-w-screen-lg mx-auto w-full">
    <Text entry_key={"title"} class="text-3xl" />
    <Text entry_key={"subtitle"} class="text-md" />
  </div>
  <!-- NOTE: non-editable island must have contenteditable="false" and contain some text content, otherwise invalid selections occur. -->
  <div
    contenteditable="false"
    style="background: #eee; opacity: 0.5;"
    class="p-10 max-w-screen-lg mx-auto"
  >
    In this example the title and subtitle above are editable, but this piece of
    content here is not. Below is a container of Story and List blocks:
  </div>
  <Container class="body flex flex-col gap-y-10">
    {#snippet block(block: BlockData)}
      {#if block.type === "story"}
        <StoryBlock {block} />
      {:else}
        <UnknownBlock {block} />
      {/if}
    {/snippet}
  </Container>
</Svedit>
