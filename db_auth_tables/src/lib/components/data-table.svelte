<script lang="ts">
  import * as Table from "$lib/components/ui/table/index";
  import { Button } from "$lib/components/ui/button/index";
  import { Checkbox } from "$lib/components/ui/checkbox/index";
  import { Label } from "$lib/components/ui/label/index";
  import { SquareX } from "lucide-svelte";

  type Data = {
    name: string;
    age: number;
    city: string;
  };
  type Row = {
    id: string;
    name: string;
    age: number;
    city: string;
  };
  const dummyData = {
    headers: ["Name", "Age", "City"],
    data: [
      { name: "John Doe", age: 25, city: "New York" },
      { name: "Jane Doe", age: 30, city: "Los Angeles" },
      { name: "John Smith", age: 35, city: "Chicago" },
      { name: "Jane Smith", age: 40, city: "Houston" },
      { name: "John Johnson", age: 45, city: "Phoenix" },
      { name: "Jane Johnson", age: 50, city: "Philadelphia" },
      { name: "John Williams", age: 55, city: "San Antonio" },
      { name: "Jane Williams", age: 60, city: "San Diego" },
      { name: "John Brown", age: 65, city: "Dallas" },
      { name: "Jane Brown", age: 70, city: "San Jose" },
      { name: "John Miller", age: 75, city: "Austin" },
    ],
  };
  let nextDummyDataIndex = $state(0);

  let allRows: Row[] = $state([]);
  let selectedRows: string[] = $state([]);
  function isSelected(id: string): boolean {
    return selectedRows.includes(id);
  }
  function toggleRowSelected(id: string): void {
    if (isSelected(id)) {
      selectedRows = selectedRows.filter((rowId) => rowId !== id);
    } else {
      selectedRows = [...selectedRows, id];
    }
  }
  function isAllSelected(): boolean {
    return selectedRows.length === allRows.length;
  }
  function toggleAllSelection(): void {
    if (isAllSelected()) {
      selectedRows = [];
    } else {
      selectedRows = allRows.map((row) => row.id);
    }
  }
  function addDataToTable(): void {
    const data: Data =
      dummyData.data[nextDummyDataIndex % dummyData.data.length];
    allRows = [...allRows, { ...data, id: crypto.randomUUID() }];
    nextDummyDataIndex += 1;
  }
  function removeDataFromTable(id: string): void {
    allRows = allRows.filter((row) => row.id !== id);
  }

  function removeSelected(): void {
    allRows = allRows.filter((row) => !selectedRows.includes(row.id));
    selectedRows = [];
  }

  $effect(() => {
    console.log("Selected:", $state.snapshot(selectedRows));
  });
</script>

<div class="w-full flex flex-col">
  <div class="grid grid-cols-2 gap-x-2 gap-y-4">
    <Label class="text-md text-center" for="add">
      Add dummy data to see how the table functions:
    </Label>
    <Button id="add" onclick={addDataToTable}>Add Data</Button>
    <Label class="text-md text-center" for="remove"
      >Remove all selected rows:</Label
    >
    <Button id="remove" onclick={removeSelected}>Remove Selected</Button>
  </div>

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
        {#each [...dummyData.headers, "x"] as header}
          <Table.Head class="text-lg tracking-tight  text-balance">
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
          <Table.Cell>{row.name}</Table.Cell>
          <Table.Cell>{row.age}</Table.Cell>
          <Table.Cell>{row.city}</Table.Cell>
          <Table.Cell>
            <Button
              id="remove"
              variant="ghost"
              onclick={() => {
                removeDataFromTable(row.id);
              }}
              size="icon"
            >
              <SquareX />
            </Button>
          </Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
