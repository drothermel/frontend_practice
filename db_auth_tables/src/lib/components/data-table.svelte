<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import * as Table from "$lib/components/ui/table/index";
  import { Button } from "$lib/components/ui/button/index";
  import { Checkbox } from "$lib/components/ui/checkbox/index";
  import { Label } from "$lib/components/ui/label/index";
  import { SquareX } from "lucide-svelte";

  interface Props {
    headers: string[];
    data: string[][];
    onRowsSelected: (selectedIds: string[]) => void;
  }
  let { headers, data, onRowsSelected }: Props = $props();

  type Data = {
    id: string;
    data: string[];
  };

  const dummyData = {
    headers: ["Name", "Age", "City"],
    data: [
      ["John Doe", "25", "New York"],
      ["Jane Doe", "30", "Los Angeles"],
      ["John Smith", "35", "Chicago"],
      ["Jane Smith", "40", "Houston"],
      ["John Johnson", "45", "Phoenix"],
      ["Jane Johnson", "50", "Philadelphia"],
      ["John Williams", "55", "San Antonio"],
      ["Jane Williams", "60", "San Diego"],
      ["John Brown", "65", "Dallas"],
      ["Jane Brown", "70", "San Jose"],
      ["John Miller", "75", "Austin"],
    ],
  };
  let nextDummyDataIndex = $state(0);
  let removeDisabled: boolean = $state(true);

  let visibleHeaders: string[] = $derived(headers);
  let allRows: Data[] = $derived(
    data.map((row) => ({
      id: row[headers.length - 1] ?? crypto.randomUUID(),
      data: row,
    }))
  );
  let selectedRows: string[] = $state([]);

  function isSelected(id: string): boolean {
    return selectedRows.includes(id);
  }
  function isAllSelected(): boolean {
    return selectedRows.length === allRows.length;
  }

  function toggleRowSelected(id: string): void {
    console.log("Selected toggle: ", id);
    if (isSelected(id)) {
      selectedRows = selectedRows.filter((rowId) => rowId !== id);
    } else {
      selectedRows = [...selectedRows, id];
    }
    onRowsSelected(selectedRows);
  }
  function toggleAllSelection(): void {
    if (isAllSelected()) {
      selectedRows = [];
    } else {
      selectedRows = allRows.map((row) => row.id);
    }
    onRowsSelected(selectedRows);
  }
  //   function addDataToTable(): void {
  //     const data: Data = {
  //       id: crypto.randomUUID(),
  //       data: dummyData.data[nextDummyDataIndex % dummyData.data.length],
  //     };
  //     allRows = [...allRows, data];
  //     nextDummyDataIndex += 1;
  //   }
  //   function removeDataFromTable(id: string): void {
  //     allRows = allRows.filter((row) => row.id !== id);
  //   }

  //   function removeSelected(): void {
  //     allRows = allRows.filter((row) => !selectedRows.includes(row.id));
  //     selectedRows = [];
  //   }

  $effect(() => {
    console.log("Selected:", $state.snapshot(selectedRows));
  });
</script>

<div class="w-full flex flex-col">
  <!-- <div class="grid grid-cols-2 gap-x-2 gap-y-4">
    <Label class="text-md text-center" for="add">
      Add dummy data to see how the table functions:
    </Label>
    <Button id="add" onclick={addDataToTable}>Add Data</Button>
    <Label class="text-md text-center" for="remove"
      >Remove all selected rows:</Label
    >
    <Button id="remove" onclick={removeSelected}>Remove Selected</Button>
  </div> -->

  <Table.Root>
    <Table.Header>
      <Table.Row class="bg-slate-50">
        <Table.Head>
          <Checkbox
            checked={isAllSelected()}
            onCheckedChange={(checked) => {
              toggleAllSelection();
            }}
          />
        </Table.Head>
        {#each visibleHeaders as header}
          <Table.Head class="text-lg tracking-tight text-balance">
            {header}
          </Table.Head>
        {/each}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each allRows as row}
        <Table.Row>
          <Table.Cell>
            <Checkbox
              checked={isSelected(row.id)}
              onCheckedChange={(checked) => {
                toggleRowSelected(row.id);
              }}
            />
          </Table.Cell>
          {#each row.data as cell}
            <Table.Cell>{cell}</Table.Cell>
          {/each}
          <!-- <Table.Cell>
            <Button
              disabled={removeDisabled}
              id="remove"
              variant="ghost"
              onclick={() => {
                removeDataFromTable(row.id);
              }}
              size="icon"
            >
              <SquareX />
            </Button>
          </Table.Cell> -->
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
