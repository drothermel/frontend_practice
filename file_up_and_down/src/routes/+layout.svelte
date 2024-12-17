<script lang="ts">
  import "../app.css";
  let { children } = $props();
</script>

<div class="bg-background relative flex min-h-screen flex-col">
  <div class="flex flex-col">
    <!--Nav Bar-->
    <div class="border-b">
      <div class="flex h-16 px-8 items-center space-x-4 lg:space-x-6">
        <a
          href="/"
          class="hover:text-primary text-sm font-medium transition-colors"
          >Home</a
        >
        <a
          href="/editor"
          class="hover:text-primary text-sm font-medium transition-colors"
          >Editor</a
        >
      </div>
    </div>

    <!--Main Body-->
    <div class="flex-1 space-y-4 p-8 pt-6">
      {@render children()}
    </div>
  </div>
</div>
