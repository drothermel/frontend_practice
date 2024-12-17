<script lang="ts">
  import { PreAnnText } from "$lib/svedit/types";
  import BlockData from "$lib/svedit/BlockData.svelte";
  import MarkdocBlock from "$lib/svedit/MarkdocBlock.svelte";
  import Svedit from "$lib/svedit/Svedit.svelte";
  import SveditSession from "$lib/svedit/SveditSession.svelte";
  import Separator from "$lib/components/ui/separator/separator.svelte";

  let rootBlock = $state(
    new BlockData({
      type: "list",
      children: [
        new BlockData({
          type: "markdown",
          markdown:
            "## Sveditor\n\nBelow is a nested list of blocks that are editable!",
        }),
        new BlockData({
          type: "markdown",
          markdown:
            "Below we have a block in editor mode and then a list of nested blocks",
        }),
        new BlockData({ type: "markdown" }),
        new BlockData({
          type: "markdown",
          markdown: "This is the first sub-list that we get to see:",
          children: [
            new BlockData({
              type: "markdown",
              markdown: "The first super sub block, what a cool nest!",
            }),
            new BlockData({
              type: "markdown",
              markdown: "The second super sub block, what a cool nest!",
            }),
          ],
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
    })
  );
  let sveditSession = new SveditSession(rootBlock);
</script>

<h1 class="text-3xl font-bold tracking-tight">Svedit Editor</h1>
<Svedit {sveditSession} class="flex flex-col gap-4" />
<Separator class="h-[4px]" />
<MarkdocBlock />
