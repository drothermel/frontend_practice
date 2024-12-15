<script lang="ts">
  import { PreAnnText } from "$lib/svedit/types";
  import BlockData from "$lib/svedit/BlockData.svelte";
  import Svedit from "$lib/svedit/Svedit.svelte";
  import SveditSession from "$lib/svedit/SveditSession.svelte";

  let rootBlock = new BlockData({
    type: "list",
    title: PreAnnText("Sveditor"),
    text: PreAnnText(
      "Below is a nested list of blocks and one day they will be editable!"
    ),
    elements: [
      new BlockData({
        type: "text",
        editable: false,
        text: PreAnnText(
          "In this example the title and subtitle above are editable, but this piece of content here is not. Below is a container of Story and List blocks."
        ),
      }),
      new BlockData({
        type: "text",
        editable: true,
        text: PreAnnText(
          "This is an editable text block! And there are multiple lines that I want to render separately.\n Will this actually render the new lines??"
        ),
      }),
      new BlockData({
        type: "story",
        editable: true,
        title: PreAnnText("Story Block Title"),
        text: PreAnnText(
          "The description for the story block, how interesting."
        ),
        image: "image_str.jpg",
        layout: "right",
      }),
    ],
  });
  let sveditSession = new SveditSession(rootBlock);
</script>

<h1 class="text-3xl font-bold tracking-tight">Svedit Editor</h1>

<Svedit {sveditSession} editable={true} class="flex flex-col gap-4" />
