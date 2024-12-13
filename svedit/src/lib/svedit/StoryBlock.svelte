<script>
  import { getContext } from "svelte";
  import Text from "./Text.svelte";
  const svedit = getContext("svedit");

  let { path } = $props();
  let block = $derived(svedit.entry_session.get(path));
</script>
