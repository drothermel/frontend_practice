<script lang="ts">
  import { PreAnnText } from "$lib/svedit/types";
  import type {
    BlockData,
    PageBlockData,
    StoryBlockData,
  } from "$lib/svedit/types";

  import Text from "$lib/svedit/Text.svelte";
  import Svedit from "$lib/svedit/Svedit.svelte";
  import SveditSession from "$lib/svedit/SveditSession.svelte";
  import Container from "$lib/svedit/Container.svelte";
  import PageBlock from "$lib/svedit/PageBlock.svelte";
  import StoryBlock from "$lib/svedit/StoryBlock.svelte";
  import UnknownBlock from "$lib/svedit/UnknownBlock.svelte";

  const randomBlockData: BlockData = {
    type: "random_type",
    name: "sub_block",
  };
  const subPageBlockData: PageBlockData = {
    type: "page",
    name: "page-0",
    title: PreAnnText("Page Block Title"),
    body: [randomBlockData],
  };
  const storyBlockData: StoryBlockData = {
    type: "story",
    name: "story-0",
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
    title: PreAnnText("Root Page Block Data Title"),
    body: [randomBlockData, storyBlockData, subPageBlockData],
  };
  let sveditSession = new SveditSession(defaultRootData);

  // let entry_session: EntrySession = new EntrySession({
  //   type: "page",
  //   title: PreAnnText("Entry Title"),
  //   subtitle: {
  //     text: "This is a subtitle! Can you see the amazing bolding?",
  //     annotations: [StrongAnn(0, 4), StrongAnn(10, 15)],
  //   },
  //   body: [
  //     {
  //       type: "story",
  //       layout: 1,
  //       image: "none",
  //       title: PreAnnText("Story 1"),
  //       description: PreAnnText("This is the whole story, really!"),
  //     } as StoryBlockData,
  //     {
  //       type: "random_type",
  //       title: PreAnnText("Random Block"),
  //       description: PreAnnText("This is a random block."),
  //     } as BlockData,
  //   ],
  // });
</script>

<h1 class="text-3xl font-bold tracking-tight">Svedit Maybe?</h1>

<Svedit {sveditSession} editable={true} class="flex flex-col gap-4">
  <div class="flex flex-col gap-4 max-w-screen-lg mx-auto w-full">
    <!-- <Text entry_key={"title"} class="text-3xl" /> -->
    <!-- <Text entry_key={"subtitle"} class="text-md" /> -->
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
  <PageBlock blockPath={[]} />
</Svedit>
