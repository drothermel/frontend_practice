<script lang="ts">
  import { type Morsel, type MorselViewerContext } from "$lib/types/types";
  import { getMorselViewerContext } from "$lib/components/context";
  import { SquareX } from "lucide-svelte";

  import * as Card from "./ui/card/index";
  import { Badge } from "./ui/badge";
  import { Button } from "./ui/button";
  import * as AlertDialog from "./ui/alert-dialog";

  let { morsel }: { morsel: Morsel } = $props();
  let morselContext: MorselViewerContext = getMorselViewerContext();

  function onDelete() {
    morselContext.morsels = morselContext.morsels.filter((m) => m !== morsel);
    morselContext.tags = Array.from(
      new Set(morselContext.morsels.flatMap((morsel) => morsel.tags))
    );
  }
</script>

<Card.Root class="w-full relative">
  <!-- <Button
    variant="ghost"
    size="icon"
    class="absolute right-2 top-2 h-6 w-6 rounded-full hover:bg-destructive hover:text-destructive-foreground"
    onclick={() => onDelete()}
  > -->
  <Card.Header>
    <div class="flex flex-row">
      <Card.Title tag="h3" class="text-xl font-bold">{morsel.title}</Card.Title>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            variant="ghost"
            size="icon"
            class="absolute right-2 top-2 h-6 w-6 rounded-full hover:bg-destructive hover:text-destructive-foreground"
            ><SquareX /></Button
          >
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
            <AlertDialog.Description>
              This action cannot be undone. This will permanently delete your
              snippet and it cannot be recovered.
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <AlertDialog.Action onclick={() => onDelete()}
              >Continue</AlertDialog.Action
            >
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
    <Card.Description class="flex flex-col gap-1">
      Created: {morsel.time.toLocaleString()}
      {#if morsel.tags.length > 0 && morsel.tags[0] !== ""}
        <div class="flex flex-row gap-2">
          {#each morsel.tags as tag}
            <Badge class="text-xs">{tag}</Badge>
          {/each}
        </div>
      {/if}
    </Card.Description>
  </Card.Header>

  <Card.Content class="grid">
    <p class="text-sm leading-none p-1">{morsel.text}</p>
  </Card.Content>
</Card.Root>
