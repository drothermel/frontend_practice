<script lang="ts">
  import SveditSession from "$lib/svedit/SveditSession.svelte";
  import { setSveditSession } from "$lib/svedit/context";
  import Block from "$lib/svedit/Block.svelte";

  let {
    sveditSession,
    ref = $bindable(),
    class: css_class,
  }: {
    sveditSession: SveditSession;
    ref?: any;
    class?: string;
  } = $props();
  setSveditSession(sveditSession);

  function onbeforeinput(event: any) {
    const inserted_char = event.data;

    event.preventDefault();
    if (inserted_char) {
      console.log("tried to insert text: ", inserted_char);
      // entry_session.insert_text(inserted_char);
    }
  }
</script>

<div class="svedit">
  <div class="svedit-canvas {css_class}" bind:this={ref} {onbeforeinput}>
    <Block blockPath={[]} />
  </div>
</div>
