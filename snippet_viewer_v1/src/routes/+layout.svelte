<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index";
  import * as Sidebar from "$lib/components/ui/sidebar/index";
  import Separator from "$lib/components/ui/separator/separator.svelte";

  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import { page } from "$app/stores";

  import "../app.css";
  let { children } = $props();
  function convertToTitleCase(input: any): string {
    if (!input) {
      return "";
    }
    return input.toLowerCase().replace(/\b\w/g, (s: string) => s.toUpperCase());
  }
  function getBreadcrumbName() {
    if ($page.url.pathname === "/") {
      return "Home";
    }
    return convertToTitleCase($page.url.pathname.split("/").pop());
  }
</script>

<Sidebar.Provider>
  <AppSidebar />
  <Sidebar.Inset>
    <header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <Sidebar.Trigger class="-ml-1" />
      <Separator orientation="vertical" class="mr-2 h-4" />
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item class="hidden md:block">
            <Breadcrumb.Link href="/">ByTomorrow</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator class="hidden md:block" />
          <Breadcrumb.Item>
            <Breadcrumb.Link href={$page.url.pathname}>
              {getBreadcrumbName()}
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
    </header>
    <div class="bg-background relative flex min-h-screen flex-col p-4">
      {@render children?.()}
    </div>
  </Sidebar.Inset>
</Sidebar.Provider>
