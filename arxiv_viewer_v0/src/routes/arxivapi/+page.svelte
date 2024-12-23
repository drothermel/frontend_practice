<script lang="ts">
  import convert from "xml-js";
  import { Button } from "$lib/components/ui/button/index";
  import { Input } from "$lib/components/ui/input/index";
  import { Label } from "$lib/components/ui/label/index.js";

  type ArxivQueryParams = {
    max_results: number;
    sortBy?: string;
    sortOrder?: string;
    title?: string;
    author?: string;
    ids?: number[];
  };

  let feedEntries = $state({ value: [] });
  let queryParams: ArxivQueryParams = $state({
    max_results: 20,
    sortBy: "lastUpdatedDate",
    sortOrder: "descending",
    author: "Kyunghyun Cho",
  });

  function buildQuery(query_params: ArxivQueryParams) {
    let query = "http://export.arxiv.org/api/query?";
    if (query_params.title) {
      query += `search_query=ti:'${query_params.title}'&`;
    }
    if (query_params.author) {
      query += `search_query=au:"'${query_params.author}'"&`;
    }
    if (query_params.ids) {
      query += `id_list=${query_params.ids.join(",")}&`;
    }
    if (query_params.sortBy) {
      query += `sortBy=${query_params.sortBy}&`;
    }
    if (query_params.sortOrder) {
      query += `sortOrder=${query_params.sortOrder}&`;
    }
    if (query_params.max_results) {
      query += `max_results=${query_params.max_results}`;
    }
    return query;
  }

  function authorsToString(authors: any[]) {
    return authors
      .map((author_dict) => {
        if (author_dict.name._text === queryParams.author) {
          return `<span class="font-bold">${author_dict.name._text}</span>`;
        } else {
          return author_dict.name._text;
        }
      })
      .join(", ");
  }

  async function loadFeed() {
    let queryStr = buildQuery(queryParams);
    console.log(queryStr);
    const response = await fetch(queryStr);
    const feed_text: string = await response.text();
    const jsonString: string = convert.xml2json(feed_text, {
      compact: true,
      spaces: 2,
    });
    const jsonObject = JSON.parse(jsonString);
    const entries = jsonObject["feed"]["entry"] || {};
    console.log(entries);

    feedEntries.value = entries;
  }

  function slugify(text: string) {
    return text
      .replace(/\s/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase();
  }
</script>

<h1 class="text-3xl font-bold tracking-tight">Arxiv Query Responses</h1>

<div class="flex flex-col gap-4">
  <Label for="query_author">Query Arxiv for Author Papers:</Label>
  <Input
    id="query_author"
    type="text"
    bind:value={queryParams.author}
    placeholder="Author Name"
  />
  <Button onclick={() => loadFeed()}>Query Arxiv API</Button>

  <h3 class="font-normal">Retrieved Arxiv Results:</h3>

  <div class="flex flex-col gap-4">
    {#each feedEntries.value as entry}
      <div class="flex flex-col gap-1">
        <h4 class="font-semibold">{entry.title._text}</h4>
        <p>
          <span class="font-bold">Authors:</span>
          {@html authorsToString(entry.author)}
        </p>
        <p>{entry.summary._text}</p>
      </div>
    {/each}
  </div>
</div>
