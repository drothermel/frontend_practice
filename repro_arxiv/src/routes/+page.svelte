<script lang="ts">
  let inputText = $state("");
</script>

<div class="prose p-4 flex flex-col">
  <h1>Arxiv Query Viewer</h1>
  <input
    id="query_author"
    type="text"
    placeholder="Author Name"
    bind:value={inputText}
    class="border border-green-900"
  />
  <button class="border border-green-900 bg-slate-400">Query Arxiv API</button>
  <h4>Results for query: "{inputText}"</h4>
  <span>TBD</span>
</div>
