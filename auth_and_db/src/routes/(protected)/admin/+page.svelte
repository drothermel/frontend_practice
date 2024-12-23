<script lang="ts">
  import { page } from "$app/stores";
</script>

<div class="flex flex-col gap-4">
  <h1>Admin</h1>

  {#if $page.data.user}
    <p>Welcome {$page.data.user.name}!</p>
    <p>This is an admin only page.</p>
  {/if}

  {#if $page.data.user.role === "ADMIN"}
    <p>As an admin you have access to this form:</p>
    <form action="/logout" method="POST">
      <button type="submit">[Log out]</button>
    </form>
  {/if}
</div>
