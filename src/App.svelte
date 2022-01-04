<script lang="ts">
import { onDestroy } from 'svelte';

  import { settings } from './stores'

  let visible = false;
  let penisEvent = () => {
    console.log("bepis")
    visible = !visible;
  }
  document.addEventListener('penis', penisEvent);
  console.log("app loaded")
  onDestroy(() => {
    document.removeEventListener('penis', penisEvent);
  });
</script>

<div class="backpanel" class:enabled={visible} class:disabled={!visible}>
  <div class="content">
    <h1>PEE Settings</h1>
    <hr />
    <label>
      <input type="checkbox" bind:checked={$settings.apv} />
      Autoplay Videos
    </label>
    <label>
      <input type="checkbox" bind:checked={$settings.apa} />
      Autoplay Audio
    </label>
    <label>
      <input type="checkbox" bind:checked={$settings.xpi} />
      Autoexpand Images on opening.
    </label>
    <label>
      <input type="checkbox" bind:checked={$settings.xpv} />
      Autoexpand Videos on opening.
    </label>
  </div>
</div>

<style scoped>
  .enabled {
    display: block;
  }

  .disabled {
    display: none;
  }

  .glow {
    text-shadow: 0 0 4px red;
  }

  .clickable {
    cursor: pointer;
  }

  .content {
    display: flex;
    flex-direction: column;
  }

  hr {
    width: 100%;
  }

  h1 {
    text-align: center;
  }

  .backpanel {
    position: absolute;
    right: 32px;
    padding: 10px;
    width: 10%;
    top: 32px;
    border: 1px solid;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.2);
    pointer-events: all;
    backdrop-filter: blur(9px);
  }

  .clickable:hover {
    text-shadow: 0 0 2px palevioletred;
  }
</style>
