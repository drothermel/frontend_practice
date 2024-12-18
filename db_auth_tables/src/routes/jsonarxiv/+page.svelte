<script lang="ts">
  import ArxivQueryHandler from "$lib/components/arxiv.svelte";

  import { Button } from "$lib/components/ui/button/index";
  import { Input } from "$lib/components/ui/input/index";
  import { Label } from "$lib/components/ui/label/index.js";

  let queryHandler = $state(new ArxivQueryHandler());
</script>

<h2>Text Arxiv Results</h2>

<div class="flex flex-col gap-4">
  <Label for="query_author">Query Arxiv for Author Papers:</Label>
  <Input
    id="query_author"
    type="text"
    bind:value={queryHandler.currQuery.author}
    placeholder="Author Name"
  />
  <!-- <Button onclick={() => queryHandler.queryArxivLoadFeed()}>
    Query Arxiv API
  </Button> -->

  <h3 class="font-normal">Retrieved Arxiv Results:</h3>

  {#if queryHandler.resultFeed}
    <div class="flex flex-col gap-4">
      {#each queryHandler.resultFeed as entry}
        <div class="flex flex-col gap-1">
          <h4 class="font-semibold">{entry.title._text}</h4>
          <p>
            <span class="font-bold">Authors:</span>
            {@html queryHandler.authorsToString(
              entry.author,
              queryHandler.currQuery
            )}
          </p>
          <p>{entry.summary._text}</p>
        </div>
      {/each}
    </div>
  {/if}
</div>
