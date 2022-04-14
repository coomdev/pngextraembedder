<script context="module">
  export const TABS = {}
</script>

<script lang="ts">
  import { setContext, onDestroy } from 'svelte'
  import { writable } from 'svelte/store'
  import type Tab from './Tab.svelte'
  import type TabPanel from './TabPanel.svelte'

  const tabs: Tab[] = []
  const panels: TabPanel[] = []
  const selectedTab = writable<Tab | null>(null)
  const selectedPanel = writable<TabPanel | null>(null)

  setContext(TABS, {
    registerTab: (tab: Tab) => {
      tabs.push(tab)
      selectedTab.update((current) => current || tab)

      onDestroy(() => {
        const i = tabs.indexOf(tab)
        tabs.splice(i, 1)
        selectedTab.update((current) =>
          current === tab ? tabs[i] || tabs[tabs.length - 1] : current,
        )
      })
    },

    registerPanel: (panel: TabPanel) => {
      panels.push(panel)
      selectedPanel.update((current) => current || panel)

      onDestroy(() => {
        const i = panels.indexOf(panel)
        panels.splice(i, 1)
        selectedPanel.update((current) =>
          current === panel ? panels[i] || panels[panels.length - 1] : current,
        )
      })
    },

    selectTab: (tab: Tab) => {
      const i = tabs.indexOf(tab)
      selectedTab.set(tab)
      selectedPanel.set(panels[i])
    },

    selectedTab,
    selectedPanel,
  })
</script>

<div class="tabs">
  <slot />
</div>

<style scoped>
  .tabs {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>
