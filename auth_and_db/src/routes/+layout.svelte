<script lang="ts">
  import { enhance } from "$app/forms";
  import "../app.css";
  import { page } from "$app/stores";
  let { children } = $props();
</script>

<svelte:head>
  <title>SvelteKit Auth</title>
</svelte:head>

<nav class="px-6 py-2 flex flex-row gap-4 text-center items-center">
  {#if !$page.data.user}
    <a href="/">Home</a>
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  {/if}

  {#if $page.data.user}
    <a href="/">Home</a>
    <a href="/admin">Admin</a>

    <form action="/logout" method="POST" use:enhance>
      <button
        type="submit"
        class="text-sm font-semibold text-primary-content hover:text-primary"
        >Log out</button
      >
    </form>
  {/if}
</nav>

<main class="min-h-screen px-6 py-4">
  {@render children?.()}
</main>
