<script lang="ts">
  type Post = {
    title: string;
    body: string;
  };

  async function getJSONPosts() {
    const response = await fetch("https://dummyjson.com/posts");
    const { posts } = await response.json();
    return posts as Post[];
  }

  function slugify(text: string) {
    return text
      .replace(/\s/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase();
  }
</script>

<h1 class="text-3xl font-bold tracking-tight">Dummy JSON Posts</h1>

{#await getJSONPosts()}
  <p>Loading...</p>
{:then posts}
  <pre>{JSON.stringify(posts, null, 2)}</pre>
{:catch error}
  <p>{error.message}</p>
{/await}
