<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let tag: string;
  export let toggleable = false;

  export let toggled = false;

  const dispatch = createEventDispatcher();
</script>

<span
  class:toggle={toggleable}
  class:toggled={toggleable && toggled}
  on:click={() => dispatch("toggle")}
  class="tag"
>
  {tag}
  {#if toggleable}
    <span on:click={(e) => (e.preventDefault(), dispatch("remove"))}>x</span>
  {/if}
</span>

<style scoped>
  .tag {
    padding: 5px;
    border: 1px solid;
    border-radius: 55px;
    cursor: pointer;
    display: inline-flex;
  }

  .tag.toggled {
    background-color: rgb(213, 255, 212);
  }

  span.tag > span {
    margin-left: 5px;
    border-left: 1px solid;
    padding-left: 5px;
  }

  .tag.toggled:hover {
    color: white;
    background-color: rgb(255 156 156 / 80%);
    color: white;
  }

  .tag:not(.toggled):hover {
    color: white;
    background-color: rgb(213, 255, 212);
    color: white;
  }
</style>
