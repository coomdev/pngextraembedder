<script lang="ts">
  import { getContext } from 'svelte'
  import { TABS } from './Tabs.svelte'

  const tab = {}
  const { registerTab, selectTab, selectedTab } = getContext(TABS)

  registerTab(tab)
</script>

<button class:selected={$selectedTab === tab} on:click={() => selectTab(tab)}>
  <slot />
</button>

<style>
  button {
    background: none;
    border: none;
    border-bottom: 2px solid white;
    border-radius: 0;
    margin: 0;
    color: unset;
  }

  button:hover {
    cursor: pointer;
    background-color: #8d8d8d80;
  }

  .selected {
    border-bottom: 2px solid;
    color: #333;
  }
</style>
