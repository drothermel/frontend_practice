<script lang="ts">
  let dummySnippetData = $state({
    uuid: "1234",
    tags: ["tag1", "tag2"],
    snippets: [
      {
        title: "Title 1",
        text: "Text 1",
        tags: ["tag1"],
        time: "2021-01-01T00:00:00.000Z",
      },
      {
        title: "Title 2",
        text: "Text 2",
        tags: ["tag2"],
        time: "2021-01-02T00:00:00.000Z",
      },
    ],
  });
</script>

<pre>{JSON.stringify(dummySnippetData, null, 2)}</pre>
