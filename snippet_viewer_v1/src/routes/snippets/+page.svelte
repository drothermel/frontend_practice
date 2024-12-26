<script lang="ts">
  import Separator from "$lib/components/ui/separator/separator.svelte";
  import * as Resizable from "$lib/components/ui/resizable/index";
  import { Badge } from "$lib/components/ui/badge";

  type Morsel = {
    title: string;
    tags: string[];
    text: string;
    time: Date;
  };
  let morselInput = $state({
    morselTitle: "",
    morselText: "",
    morselTags: "",
  });
  let morsel: Morsel = $derived({
    title: morselInput.morselTitle,
    text: morselInput.morselText,
    tags: morselInput.morselTags.split(",").map((str) => str.trim()),
    time: new Date(),
  });
</script>

<div class="w-full flex h-full flex-1 flex-col items-center px-4">
  <div class="flex flex-col w-full justify-between space-y-2 gap-4">
    <div class="w-full flex flex-col prose">
      <h1 class="mb-2">Snippet Editor</h1>
    </div>
    <div class="flex flex-row gap-4 w-full">
      <Resizable.PaneGroup direction="horizontal" class="min-w-[300px]">
        <Resizable.Pane defaultSize={50}>
          <div class="p-4 pr-6 min-w-full prose bg-purple-50">
            <h2>New Snippet</h2>
            <form class="w-full">
              <div class="flex flex-col gap-4">
                <div class="flex flex-row w-full gap-2">
                  <label for="snippetName" class="font-bold">Title:</label>
                  <input
                    type="text"
                    id="snippetName"
                    name="snippetName"
                    bind:value={morselInput.morselTitle}
                    placeholder="Title your new thought"
                    class="w-full"
                  />
                </div>
                <div class="flex flex-row w-full gap-2">
                  <label for="snippetDescription" class="font-bold">Tags:</label
                  >
                  <input
                    type="text"
                    id="snippetDescription"
                    name="snippetDescription"
                    bind:value={morselInput.morselTags}
                    placeholder="Add tags here"
                  />
                </div>
                <textarea
                  id="snippetCode"
                  name="snippetCode"
                  bind:value={morselInput.morselText}
                  placeholder="Write your thoughts in atomic units using markdown."
                ></textarea>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </Resizable.Pane>
        <Resizable.Handle withHandle />

        <Resizable.Pane defaultSize={50}>
          <div
            class="min-w-full flex flex-col gap-2 p-2 justify-start prose bg-blue-50"
          >
            {#if morsel.title !== ""}
              <h3>{morsel.title}</h3>
            {/if}
            {#if morsel.tags.length > 0}
              <div class="flex flex-row gap-2">
                {#each morsel.tags as tag}
                  {#if tag !== ""}
                    <Badge class="text-xs">{tag}</Badge>
                  {/if}
                {/each}
              </div>
            {/if}
            {#if morsel.text !== ""}
              <p>{morsel.text}</p>
            {/if}
          </div>
        </Resizable.Pane>
      </Resizable.PaneGroup>
    </div>
  </div>
</div>
