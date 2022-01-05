<script lang="ts">
  import { settings } from './stores'

  export let id = ''
  let visible = false
  function reveal() {
    visible = !visible
    document.dispatchEvent(new CustomEvent('reveal', { detail: { id } }))
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

<style scoped>
  .clickable {
    cursor: pointer;
    margin-left: 5px;
  }

  .clickable:hover {
    text-shadow: 0 0 4px palevioletred;
  }
</style>
