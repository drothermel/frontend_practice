<script lang="ts">
  import { enhance } from "$app/forms";
  let { form } = $props();
</script>

<div class="w-full items-center justify-center bg-slate-300 py-4">
  <div class="max-w-80 mx-auto text-center bg-green-500">
    <h1>Login</h1>

    <form action="?/login" method="POST" use:enhance>
      <div class="flex flex-col gap-4 py-4">
        <div class="grid grid-col-2">
          <label for="username">Username</label>
          <input id="username" name="username" type="text" required />
          <label for="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>

        {#if form?.invalid}
          <p class="error">Username and password are both required.</p>
        {/if}
        {#if form?.credentials}
          <p class="error">You have entered the wrong credentials</p>
        {/if}
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</div>
