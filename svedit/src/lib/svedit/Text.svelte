<script lang="ts">
  import {
    type Annotation,
    type FragmentOrString,
    type EntrySessionData,
  } from "./types";
  import { getContext } from "svelte";
  const svedit: EntrySessionData = getContext("svedit");

  let { path, class: css_class, editable = true } = $props();
  function render_annotated_text(text: string, annotations?: Annotation[]) {
    let fragments: FragmentOrString[] = [];
    let last_index: number = 0;

    // Skipping annotations for now!

    if (last_index < text.length) {
      fragments.push(text.slice(last_index));
    }
    return fragments;
  }

  let fragments: FragmentOrString[] = $derived(
    render_annotated_text(
      svedit.entry_session.get(path)[0],
      svedit.entry_session.get(path)[1]
    )
  );
  let plain_text = $derived(svedit.entry_session.get(path)[0]);

  function handle_link_click(e: Event) {
    if (editable) {
      e.preventDefault();
    }
  }
</script>

<!-- ATTENTION: The comment blocks are needed to prevent unwanted text nodes with whitespace. -->
<div
  contenteditable={editable}
  data-type="text"
  data-path={path.join(".")}
  style="anchor-name: --{path.join('-')};"
  class={css_class}
>
  <!--
--><!-- Zero-width space for empty text --><!--
-->{#if plain_text.length === 0}&#8203;{/if}<!--
-->{#each fragments as fragment, index}<!--
  -->{#if typeof fragment === "string"}<!--
    -->{fragment}<!--
  -->{:else if fragment.type === "emphasis"}<!--
    --><em
        >{fragment.content}</em
      ><!--
  -->{:else if fragment.type === "strong"}<!--
    --><strong
        >{fragment.content}</strong
      ><!--
  -->{:else if fragment.type === "link"}<!--
    --><a
        onclick={handle_link_click}
        style="anchor-name: --{path.join('-') +
          '-' +
          fragment.annotation_index};"
        href={fragment.href}
        target={fragment.target || "_self"}>{fragment.content}</a
      ><!--
  -->{:else}<!--
    -->{fragment.content}<!--
  -->{/if}<!--
-->{/each}<!--
-->
</div>

<style>
  div {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    box-sizing: content-box;
    &.heading1 {
      text-wrap: var(--text-wrap);
    }
    [contenteditable="true"] {
      a {
        cursor: text;
      }
    }
  }
</style>
