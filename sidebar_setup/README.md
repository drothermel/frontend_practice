# SvelteKit Project with Shadcn-Svelte Sidebar Block

**Main Focus:** Understand how shadcn-svelte sidebar works & hook up a data-model to create an easily modifiable personal full app template based on the sidebar.

Using the [Sidebar component](https://next.shadcn-svelte.com/docs/components/sidebar#sidebargroup) and the [Sidebar Block](https://next.shadcn-svelte.com/blocks#sidebar-08) ([github](https://github.com/huntabyte/shadcn-svelte/tree/next/sites/docs/src/lib/registry/new-york/block/sidebar-09)) to setup a project using:
- SvelteKit
- Svelte 5
- tailwindcss
- shadcn-svelte

**<In Progress>**

---

## Icons from Lucide

Lucide is an open-source icon library: [lucide.dev](https://lucide.dev/icons/)
- Svelte Package: [lucide-svelte
](https://lucide.dev/guide/packages/lucide-svelte), `pnpm install lucide-svelte`

```javascript
<script>
  import { Skull } from 'lucide-svelte';
</script>

<Skull color="#ff3e98" size=24 strokeWidth=2 absoluteStrokeWidth=false/>
```

There are type definitions for all icons (which is used in the shadcn-svlete sidbar usage).
```typescript
<script lang="ts">
  import Home from 'lucide-svelte/icons/home';
  import Library from 'lucide-svelte/icons/library';
  import Cog from 'lucide-svelte/icons/cog';
  import type { ComponentType } from 'svelte';
  import type { Icon } from 'lucide-svelte';

  type MenuItem = {
    name: string;
    href: string;
    icon: ComponentType<Icon>;
  }

  const menuItems: MenuItem[] = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
    },
    {
      name: 'Blog',
      href: '/blog',
      icon: Library,
    },
    {
      name: 'Projects',
      href: '/projects',
      icon: Cog,
    }
  ];
</script>

{#each menuItems as item}
  <a href={item.href}>
   <svelte:component this={item.icon} />
    <span>{item.name}</span>
  </a>
{/each}
```

You can also use lucide lab icons:
```typescript
<script>
import { Icon } from 'lucide-svelte';
import { burger, sausage } from '@lucide/lab';
</script>

<Icon iconNode={burger} />
<Icon iconNode={sausage} color="red"/>
```


# Details

## Basic Setup
```shell
pnpx sv create
# chose just tailwindcss

pnpm dlx shadcn-svlete@next init
# works with svelte 5, local install

pnpx add svelte-radix
# needed to make shadcn work, unclear why its not installing as a dep
```

## Try 1: Just add the components and try manually

Add just the sidebar components
```shell
pnpm dlx shadcn-svelte@next add sidebar
```

Then I tried to manually add and stylize sidebars based on [component docs](https://next.shadcn-svelte.com/docs/components/sidebar#sidebargroup) to visualize what was going on:
```html
# src/routes/+layout.svelte
<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/components/app-sidebar.svelte";
 
  let { children } = $props();
</script>
 
<Sidebar.Provider>
  <AppSidebar />
  <main>
    <Sidebar.Trigger />
    {@render children?.()}
  </main>
</Sidebar.Provider>

# src/lib/components/app-sidebar.svelte
<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
</script>
 
<Sidebar.Root>
  <Sidebar.Header />
  <Sidebar.Content>
    <Sidebar.Group />
    <Sidebar.Group />
  </Sidebar.Content>
  <Sidebar.Footer />
</Sidebar.Root>

# My changes to app-sidebar.svelte
<Sidebar.Root>
  <Sidebar.Header class="bg-slate-400">
    <span>Sidebar Header</span>
  </Sidebar.Header>
  <Sidebar.Content class="bg-slate-300">
    <Sidebar.Group>
      <Sidebar.GroupLabel>Content: Group</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <div class="flex flex-1 flex-col gap-4 p-4">
          {#each Array.from({ length: 24 }) as _, index (index)}
            <div class="bg-muted/50 aspect-video h-12 w-full rounded-lg"></div>
          {/each}
        </div>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
  <Sidebar.Footer class="bg-amber-50">
    <span>Sidebar Footer</span>
  </Sidebar.Footer>
</Sidebar.Root>
``` 

However, at some point this broke things, causing nothing to render correctly even when I checked out a previous version that looked good.  I tried a few different attempts to clear caches or whatever, but eventually gave up.

## Try 2: Install a Block and Add as a base page to build on

Installed the sidebar: `pnpm dlx shadcn-svelte@next add sidebar-09`

Then copied the sidebar-page.svelte to +page.svelte and it rendered fine.


