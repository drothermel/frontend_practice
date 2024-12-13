<script lang="ts">
  import { setContext } from "svelte";
  import type { EntrySessionData } from "./types";

  let {
    entry_session,
    children, // this is a special prop: the contents of the component tag
    editable = false,
    ref = $bindable(),
    class: css_class,
  } = $props();

  console.log("Inside svedit: ", entry_session);

  // add accessor to the passed in entry_session to the context
  setContext("svedit", {
    get entry_session() {
      return entry_session;
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
    class:hide-selection={entry_session.selection?.type === "container"}
    bind:this={ref}
    {onbeforeinput}
    contenteditable={editable ? "true" : "false"}
  >
    {@render children()}
  </div>
</div>
