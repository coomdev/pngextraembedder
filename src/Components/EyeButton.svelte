<script lang="ts">
  import { fileTypeFromBuffer } from "file-type";
  import { Buffer } from "buffer";
  import type Embedding from "./Embedding.svelte";
  import type Embeddings from "./Embeddings.svelte";

  import type { EmbeddedFile } from "../main";

  import { appState, settings } from "../stores";

  export let id = "";
  export let files: EmbeddedFile[];
  export let inst: Embedding | Embeddings;

  let isVideo = false;

  inst.$on("fileinfo", (info) => {
    isVideo = isVideo || info.detail.type.mime.startsWith("video/");
  });

  let visible = false;
  function reveal() {
    visible = !visible;
    document.dispatchEvent(new CustomEvent("reveal", { detail: { id } }));
  }
  const isNotChrome = !navigator.userAgent.includes("Chrome/");

  async function downloadFile(file: EmbeddedFile) {
    const a = document.createElement("a") as HTMLAnchorElement;
    document.body.appendChild(a);
    a.style.display = "none";
    let url: string;
    if (typeof file.data != "string") {
      const thumb = Buffer.isBuffer(file.data) ? file.data : await file.data();
      const type = await fileTypeFromBuffer(thumb);
      url = URL.createObjectURL(new Blob([thumb], { type: type?.mime }));
    } else url = file.data;
    a.href = url;
    a.download = file.filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
</script>

{#if $settings.eye}
  <span
    on:click={reveal}
    class:fa-eye={!visible}
    class:fa-eye-slash={visible}
    class="fa clickable"
  >
    {$appState.is4chanX ? "" : !visible ? "👁" : "🤦"}
  </span>
{/if}
{#each files as file}
  <span
    title={file.filename}
    on:click={() => downloadFile(file)}
    class="fa fa-download clickable"
  >
    {$appState.is4chanX ? "" : "🖫"}
  </span>
  {#if file.source}
    <!-- svelte-ignore a11y-missing-content -->
    <a href={file.source} target="_blank" class="clickable">Source</a>
  {/if}
  {#if file.page}
    <!-- svelte-ignore a11y-missing-content -->
    <a href={file.page.url} target="_blank" class="clickable"
      >{file.page.title}</a
    >
  {/if}
  {#if isNotChrome && isVideo}
    <!-- svelte-ignore a11y-missing-attribute -->
    <a
      on:click={(ev) => {
        inst.bepis(ev);
      }}
      alt="By clicking this you agree to stay hydrated"
      class="clickable">[PEE contract]</a
    >
  {/if}
{/each}

<style scoped>
  .clickable {
    cursor: pointer;
    margin-left: 5px;
  }

  .clickable:hover {
    text-shadow: 0 0 4px palevioletred;
  }
</style>
