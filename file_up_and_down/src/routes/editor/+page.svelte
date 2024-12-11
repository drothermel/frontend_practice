<script lang="ts">
  class FileUploader {
    fileInput?: HTMLInputElement = $state();
    selectedFile?: File = $state();
    fileContent?: string | null = $state();
    fileType?: string = $state();

    // Trigger the input file dialog
    triggerInput() {
      this.fileInput?.click();
    }

    // If input contains a file then read the file
    // update selectedFile and then read the contents
    // into fileContent
    readInput(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target) {
            this.fileContent = event.target.result as string;
          }
        };
        this.fileType = file.type;
        if (file.type === "application/pdf" || file.type.startsWith("image/")) {
          reader.readAsDataURL(file);
        } else {
          reader.readAsArrayBuffer(file);
        }
      }
    }

    getInputURL() {
      if (this.selectedFile) {
        const blob = new Blob([this.selectedFile], { type: this.fileType });
        const blobLink = URL.createObjectURL(blob);
        return blobLink;
      }
      return null;
    }
  }

  const uploader = new FileUploader();
</script>

<div class="flex flex-col gap-4">
  <h1 class="text-3xl font-bold tracking-tight">Upload Files</h1>
  <input
    type="file"
    bind:this={uploader.fileInput}
    onchange={(e) => uploader.readInput(e)}
  />
  <h2 class="text-xl font-bold tracking-tight">Selected File</h2>
  {#if uploader.selectedFile && uploader.fileContent}
    <div class="flex flex-col gap-2">
      <p class="text-lg tracking-tight">
        File type: {uploader.fileType}
      </p>

      {#if uploader.fileType?.startsWith("image/")}
        <img src={uploader.fileContent} alt="File Content" />
      {:else if uploader.fileType === "application/pdf"}
        <iframe
          class="min-h-screen"
          src={uploader.fileContent}
          title="File Content"
        ></iframe>
      {:else}
        <p>File type not supported</p>
      {/if}
    </div>
  {/if}
</div>
