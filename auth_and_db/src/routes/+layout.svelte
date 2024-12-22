<script lang="ts">
  import { enhance } from "$app/forms";
  import "../app.css";
  import { page } from "$app/stores";
  let { children } = $props();
</script>

<svelte:head>
  <title>SvelteKit Auth</title>
</svelte:head>

<nav class="px-6 py-2 flex flex-row gap-4">
  <a href="/">Home</a>
  {#if !$page.data.user}
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  {/if}

  {#if $page.data.user}
    <a href="/admin">Admin</a>

    <form action="/logout" method="POST" use:enhance>
      <button type="submit">Log out</button>
    </form>
  {/if}
</nav>

<main class="min-h-screen px-6 py-4">
  {@render children?.()}
</main>
