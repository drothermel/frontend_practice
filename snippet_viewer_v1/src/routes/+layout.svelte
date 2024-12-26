<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index";
  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import "../app.css";
  let { children } = $props();
</script>

<Sidebar.Provider>
  <AppSidebar />
  <main>
    <Sidebar.Trigger />
    <div class="bg-background relative flex flex-col min-h-screen p-4">
      {@render children?.()}
    </div>
  </main>
</Sidebar.Provider>
