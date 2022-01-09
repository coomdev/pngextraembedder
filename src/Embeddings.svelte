<script lang="ts">
  import type { EmbeddedFile } from './main';
	import { createEventDispatcher } from 'svelte';
  import Embedding from './Embedding.svelte';

  export const dispatch = createEventDispatcher();

  export let files: EmbeddedFile[]
  export let id: string = '';

  let children: {[k in number]: Embedding}= {}
  export async function bepis(ev: MouseEvent) {
    for (let child of Object.values(children))
      child.bepis(ev);
  }
</script>

{#each files as file, i}
  <Embedding bind:this={children[i]} {id} {file} />
{/each}

<style scoped>
</style>
