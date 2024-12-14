<script lang="ts">
  import { PreAnnText } from "$lib/svedit/types";
  import type {
    BlockData,
    PageBlockData,
    StoryBlockData,
    TextBlockData,
  } from "$lib/svedit/types";

  import Svedit from "$lib/svedit/Svedit.svelte";
  import SveditSession from "$lib/svedit/SveditSession.svelte";
  import PageBlock from "$lib/svedit/PageBlock.svelte";

  const randomBlockData: BlockData = {
    type: "random_type",
    name: "sub_block",
    uuid: crypto.randomUUID(),
    editable: false,
  };
  const editableTextBlockData: TextBlockData = {
    type: "text",
    name: "text-0",
    uuid: crypto.randomUUID(),
    editable: true,
    content: PreAnnText(
      "Editable Text Block\n Will this actually render the new lines??"
    ),
  };
  const fixedTextBlockData: TextBlockData = {
    type: "text",
    name: "text-1",
    uuid: crypto.randomUUID(),
    editable: false,
    content: PreAnnText(
      "In this example the title and subtitle above are editable, but this piece of content here is not. Below is a container of Story and List blocks."
    ),
  };
  const subPageBlockData: PageBlockData = {
    type: "page",
    name: "page-0",
    uuid: crypto.randomUUID(),
    editable: true,
    title: PreAnnText("Page Block Title"),
    body: [randomBlockData],
  };
  const storyBlockData: StoryBlockData = {
    type: "story",
    name: "story-0",
    uuid: crypto.randomUUID(),
    editable: true,
    title: PreAnnText("Story Block Title"),
    description: PreAnnText(
      "The description for the story block, how interesting."
    ),
    image: "image_str.jpg",
    layout: 1,
  };

  const defaultRootData: PageBlockData = {
    type: "page",
    name: "root-page",
    uuid: crypto.randomUUID(),
    editable: true,
    title: PreAnnText("Root Page Block Data Title"),
    body: [
      fixedTextBlockData,
      editableTextBlockData,
      randomBlockData,
      storyBlockData,
      subPageBlockData,
    ],
  };
  let sveditSession = new SveditSession(defaultRootData);
</script>

<h1 class="text-3xl font-bold tracking-tight">Svedit Editor</h1>

<Svedit {sveditSession} editable={true} class="flex flex-col gap-4">
  <PageBlock blockPath={[]} />
</Svedit>
