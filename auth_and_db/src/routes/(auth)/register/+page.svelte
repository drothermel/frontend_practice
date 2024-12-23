<script lang="ts">
  import {
    Card,
    Label,
    Input,
    Button,
    ButtonGroup,
    InputAddon,
    Toast,
  } from "flowbite-svelte";
  import {
    EyeOutline,
    EyeSlashOutline,
    CheckCircleSolid,
  } from "flowbite-svelte-icons";

  import { enhance } from "$app/forms";
  let { form } = $props();
  let showPassword = $state(false);
  let showSuccess = $state(true);
</script>

<div class="w-full items-center justfy-center">
  <form
    action="?/register"
    method="POST"
    use:enhance
    class="flex flex-col space-y-4 w-[400px] mx-auto"
  >
    <div>
      <Card class="flex flex-col gap-2">
        <h3 class="mb-4 text-xl font-medium text-primary-content">Register</h3>
        <Label for="username" class="space-y-2">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          required
        />
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

        {#if form?.user}
          <p class="error">Username is taken.</p>
        {/if}
        {#if form?.invalid}
          <p class="error">Username and password are both required.</p>
        {/if}
        <Button type="submit" class="w-full1 bg-secondary mt-4">Register</Button
        >
      </Card>
    </div>
  </form>
</div>

{#if showSuccess}
  <Toast position="top-right" class="mb-4">
    <CheckCircleSolid color="green" slot="icon" class="w-6 h-6" />
    Registration successful... maybe?
  </Toast>
{/if}
