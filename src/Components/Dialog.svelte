<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let pos = [0, 0]
  let visible = false

  export function toggle() {
    visible = !visible
  }

  export function setPos(p: [number, number]) {
    //pos = p;
  }
</script>

{#if visible}
  <div style="top: {pos[1]}px; left: {pos[0]}px" class="dialog">
    <slot />
  </div>
{/if}

<style scoped>
  .dialog {
    position: relative;
  }
</style>
