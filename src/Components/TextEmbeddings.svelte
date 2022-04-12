<script lang="ts">
  import type { EmbeddedFile } from "../main";

  export let files: EmbeddedFile[];

  let contents = files.map((e) => (e.data as Buffer).toString());
</script>

{#each contents as content}
  <div class="additionnal">
    {content}
  </div>
{/each}

<style scoped>
  .additionnal {
    border-top: 2px dashed;
    clear: both;
    margin-top: 10px;
    padding-top: 10px;
  }
</style>
