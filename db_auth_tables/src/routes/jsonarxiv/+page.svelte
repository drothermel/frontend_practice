<script lang="ts">
  import ArxivQueryHandler from "$lib/components/arxiv.svelte";

  import { Button } from "$lib/components/ui/button/index";
  import { Input } from "$lib/components/ui/input/index";
  import { Label } from "$lib/components/ui/label/index.js";

  import { JsonView } from "@zerodevx/svelte-json-view";

  let queryHandler = $state(new ArxivQueryHandler());
</script>

<div class="flex flex-col gap-4 w-3/5 mx-auto">
  <div class="prose text-center w-full pt-2 pb-6 mx-auto">
    <h1>JSON Arxiv Results</h1>
  </div>

  <div class="flex flex-col gap-4">
    <div class="flex flex-row gap-4">
      <Label for="maxRes">Max Results:</Label>
      <Input
        id="maxRes"
        type="number"
        bind:value={queryHandler.currQuery.maxResults}
      />
    </div>
    <Label for="query_author">Query Arxiv for Author Papers:</Label>
    <Input
      id="query_author"
      type="text"
      bind:value={queryHandler.currQuery.author}
      placeholder="Author Name"
    />
    <Button onclick={() => queryHandler.queryArxivLoadFeed()}>
      Query Arxiv API
    </Button>

    <Label for="results">Retrieved Arxiv Results:</Label>
    <div id="results">
      {#if queryHandler.resultFeed.length > 0}
        <div class="flex flex-col gap-4 w-full prose-sm">
          {#each queryHandler.resultFeed as entry}
            <div class="flex flex-col gap-2">
              <JsonView json={entry} />
            </div>
          {/each}
        </div>
      {:else}
        <div class="px-4">
          <p>No Results to Show</p>
        </div>
      {/if}
    </div>
  </div>
</div>
