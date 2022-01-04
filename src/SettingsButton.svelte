<script lang="ts">
  let visible = false;
  function opensettings() {
    visible = !visible
    document.dispatchEvent(new CustomEvent("penis"));
  }
</script>

<span class="clickable" class:glow={visible} on:click={() => opensettings()}>
  [PEE Settings]
</span>

<style scoped>

  .glow {
    text-shadow: 0 0 4px red;
  }

  .clickable {
    cursor: pointer;
  }

  .clickable:hover {
    text-shadow: 0 0 2px palevioletred;
  }
</style>
