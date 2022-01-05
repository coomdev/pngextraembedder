<script lang="ts">
import { fileTypeFromBuffer } from 'file-type';

import type { EmbeddedFile } from './main';

  import { settings } from './stores'

  export let id = ''
  export let file: EmbeddedFile;

  let visible = false
  function reveal() {
    visible = !visible
    document.dispatchEvent(new CustomEvent('reveal', { detail: { id } }))
  }

  async function downloadFile() {
    const a = document.createElement("a") as HTMLAnchorElement;
    document.body.appendChild(a);
    a.style.display = 'none';
    const thumb = Buffer.isBuffer(file.data) ? file.data : await file.data();
    const type = await fileTypeFromBuffer(thumb);
    const url = URL.createObjectURL(new Blob([thumb], { type: type?.mime }))
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
  />
{/if}
<span title={file.filename} on:click={downloadFile} class="fa fa-download clickable" />

<style scoped>
  .clickable {
    cursor: pointer;
    margin-left: 5px;
  }

  .clickable:hover {
    text-shadow: 0 0 4px palevioletred;
  }
</style>
