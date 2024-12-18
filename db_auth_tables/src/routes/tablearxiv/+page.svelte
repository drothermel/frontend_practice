<script lang="ts">
  import type { ArxivMetadata } from "$lib/components/types";
  import { Button } from "$lib/components/ui/button/index";
  import { Input } from "$lib/components/ui/input/index";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Separator } from "$lib/components/ui/separator/index";

  import DataTable from "$lib/components/data-table.svelte";
  import ArxivQueryHandler from "$lib/components/arxiv.svelte";

  let queryHandler = $state(new ArxivQueryHandler());
  const headers = [
    "Title", // title
    "Authors", // authors
    "Published", // published
    "Updated", // updated
    "Category", //primaryCategory
    "In Library",
    "Link", //id TODO: separate out the id!
  ];
  let inLibrary: string[] = $state([]);
  let library: string[][] = $state([]);

  let data = $derived(
    queryHandler.resultFeed.map((entry: ArxivMetadata) => [
      entry.title ?? "",
      entry.authors?.join(", ") ?? "",
      entry.published ?? "",
      entry.updated ?? "",
      entry.primaryCategory ?? "",
      // forcing entry.id always exists
      inLibrary.includes(entry.id as string) ? "Yes" : "No",
      entry.id ?? "",
    ])
  );
  let selected: string[] = $state([]);
  function onRowsSelected(selectedIds: string[]) {
    selected = selectedIds;
  }
  function onLibrarySelected(selectedIds: string[]) {
    console.log("Library selected", selectedIds);
  }
  function addSelectedToLibrary() {
    console.log("Add selected to library", $state.snapshot(selected));
    inLibrary = Array.from(new Set([...inLibrary, ...selected]));
    console.log("In Library", $state.snapshot(inLibrary));
    let dataToLibrary = queryHandler.resultFeed.filter((entry: ArxivMetadata) =>
      inLibrary.includes(entry.id as string)
    );
    library = [
      ...library,
      ...dataToLibrary.map((entry: ArxivMetadata) => [
        entry.title ?? "",
        entry.authors?.join(", ") ?? "",
        entry.published ?? "",
        entry.updated ?? "",
        entry.primaryCategory ?? "",
        "Yes", // in library
        entry.id ?? "",
      ]),
    ];
    console.log("Library", $state.snapshot(library));
  }
</script>

<div class="prose flex flex-col gap-4 w-full mx-auto">
  <div class="prose text-center w-full pt-2 pb-6 mx-auto">
    <h1>Table Arxiv Results</h1>
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
    <div class="mx-auto items-center justify-center">
      <Button
        onclick={() => {
          queryHandler.queryArxivLoadFeed();
        }}
      >
        Query Arxiv API
      </Button>
    </div>
  </div>
</div>

<div class="py-6">
  <Separator class="h-[3px]" />
</div>

<div class="flex flex-row justify-between w-full">
  <Label for="results">Retrieved Arxiv Results:</Label>
  <Button
    onclick={() => {
      addSelectedToLibrary();
    }}>Add Selected to Library</Button
  >
</div>

<div id="results">
  <DataTable {headers} {data} {onRowsSelected} />
</div>

<div class="py-6">
  <Separator class="h-[3px]" />
</div>

<div>
  <h1>Library:</h1>
  <DataTable {headers} data={library} onRowsSelected={onLibrarySelected} />
</div>
