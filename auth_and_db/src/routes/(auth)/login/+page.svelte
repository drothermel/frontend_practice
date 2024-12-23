<script lang="ts">
  import {
    Label,
    Button,
    ButtonGroup,
    InputAddon,
    Input,
    Card,
  } from "flowbite-svelte";
  import { EyeOutline, EyeSlashOutline } from "flowbite-svelte-icons";
  import { enhance } from "$app/forms";
  let { form } = $props();
  let showPassword = $state(false);
</script>

<div class="w-full items-center justify-center">
  <form
    action="?/login"
    method="POST"
    use:enhance
    class="flex flex-col space-y-4 w-[400px] mx-auto"
  >
    <div>
      <Card class="flex flex-col gap-2">
        <h3 class="mb-4 text-xl font-medium text-primary-content">Log In</h3>
        <Label class="space-y-2">
          <span>Username</span>
          <Input name="username" type="text" placeholder="Username" required />
        </Label>

        <Label for="password" class="space-y-2">Password</Label>
        <ButtonGroup class="w-full">
          <InputAddon>
            <button
              type="button"
              onclick={() => (showPassword = !showPassword)}
            >
              {#if showPassword}
                <EyeOutline class="w-6 h-6" />
              {:else}
                <EyeSlashOutline class="w-6 h-6" />
              {/if}
            </button>
          </InputAddon>
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="•••••"
            required
          />
        </ButtonGroup>

        {#if form?.invalid}
          <p class="error">Username and password are both required.</p>
        {/if}
        {#if form?.credentials}
          <p class="error">You have entered the wrong credentials</p>
        {/if}
        <Button type="submit" class="w-full1 bg-secondary mt-4">Login</Button>
      </Card>
    </div>
  </form>
</div>
