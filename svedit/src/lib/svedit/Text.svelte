<script lang="ts">
  import type SveditSession from "./SveditSession";
  import type { AnnText, Path, SveditContext, TextFragment } from "./types";
  import { PlainFragment } from "./types";
  import { getContext } from "svelte";

  interface Props {
    content_path: Path;
    class: string;
    editable?: boolean;
  }
  let { content_path, class: css_class, editable = true }: Props = $props();

  // TODO: look at how we should have these getters and setters
  const sveditContext: SveditContext = getContext("svedit");
  let sveditSession: SveditSession = $derived(sveditContext.session);

  function render_annotated_text(ann_text: AnnText): TextFragment[] {
    let fragments: TextFragment[] = [];
    let last_index: number = 0;

    const sorted_annotations = $state
      .snapshot(ann_text.annotations)
      .sort((a, b) => a.start_idx - b.start_idx);

    for (let [index, annotation] of sorted_annotations.entries()) {
      // Add text before the annotation
      if (annotation.start_idx > last_index) {
        fragments.push(
          PlainFragment(ann_text.text.slice(last_index, annotation.start_idx))
        );
      }

      // Add the annotated text
      fragments.push({
        type: annotation.type,
        content: ann_text.text.slice(annotation.start_idx, annotation.end_idx),
        annotation_index: index,
      });
      last_index = annotation.end_idx;
    }

    if (last_index < ann_text.text.length) {
      fragments.push(PlainFragment(ann_text.text.slice(last_index)));
    }
    return fragments;
  }

  // let ann_text: AnnText = $derived(sveditSession.rootBlock?.text);
  // let fragments = $derived(render_annotated_text(ann_text));
  let annText: AnnText = $derived(sveditSession.getElemByPath(content_path));
  let fragments: TextFragment[] = $derived(render_annotated_text(annText));

  function handle_link_click(e: Event) {
    if (editable) {
      e.preventDefault();
    }
  }
</script>

<!-- ATTENTION: The comment blocks are needed to prevent unwanted text nodes with whitespace. -->
<div contenteditable={editable} data-type="text" class={css_class}>
  <!--
--><!-- Zero-width space for empty text --><!--
-->{#each fragments as fragment, index}<!--
  -->{#if fragment.type === "plain"}<!--
    -->{fragment.content}<!--
  -->{:else if fragment.type === "emphasis"}<!--
    --><em
        >{fragment.content}</em
      ><!--
  -->{:else if fragment.type === "strong"}<!--
    --><strong
        >{fragment.content}</strong
      ><!--
  -->{:else}<!--
    -->{fragment.content}<!--
  -->{/if}<!--
-->{/each}<!--
-->
</div>
