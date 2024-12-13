<script>
  import { getContext } from "svelte";
  const svedit = getContext("svedit");

  // When you use a Container you have to define a
  // snippet named block
  let { class: css_class, block } = $props();
</script>

<div data-type="container" class={css_class}>
  {#each svedit.entry_session.body as _block, index}
    {@render block(_block, index)}
  {/each}
</div>
