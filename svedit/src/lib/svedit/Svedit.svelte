<script lang="ts">
  import SveditSession from "$lib/svedit/SveditSession.svelte";
  import { setContext } from "svelte";

  interface Props {
    sveditSession: SveditSession;
    children: () => any;
    editable?: boolean;
    ref?: any;
    class?: string;
  }

  let {
    sveditSession,
    children, // this is a special prop: the contents of the component tag
    editable = false,
    ref = $bindable(),
    class: css_class,
  } = $props();

  // add accessor to the passed in entry_session to the context
  // context['svedit'] is of type SveditContext
  setContext("svedit", {
    get session(): SveditSession {
      return sveditSession;
    },
  });

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
  <div
    class="svedit-canvas {css_class}"
    bind:this={ref}
    {onbeforeinput}
    contenteditable={editable ? "true" : "false"}
  >
    {@render children()}
  </div>
</div>
