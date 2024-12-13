<script lang="ts">
  import {
    type AnnText,
    type EntryData,
    PreAnnText,
    StrongAnn,
    type StoryBlockData,
  } from "$lib/svedit/types";

  import Text from "$lib/svedit/Text.svelte";
  import Svedit from "$lib/svedit/Svedit.svelte";
  import EntrySession from "$lib/svedit/EntrySession.svelte";
  import Container from "$lib/svedit/Container.svelte";

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
    ],
  });
</script>

<h1 class="text-3xl font-bold tracking-tight">Svedit Maybe?</h1>

<Svedit {entry_session} editable={true} class="flex-column">
  <p>What a child!</p>
</Svedit>
