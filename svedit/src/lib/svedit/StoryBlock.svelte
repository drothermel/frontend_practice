<script>
  import { getContext } from "svelte";
  import Text from "./Text.svelte";
  const svedit = getContext("svedit");

  let { block_index, path_in_block } = $props();
  let block = $derived(svedit.entry_session.body[block_index]);
</script>

<div></div>
