<script lang="ts">
import { fileTypeFromBuffer } from 'file-type';
import { onDestroy, onMount } from 'svelte';
import type { EmbeddedFile } from './main';

import { settings, appState } from './stores'

function getOffset(el: HTMLElement | null) {
  var _x = 0;
  var _y = 0;
  while(el && el instanceof HTMLElement) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent as HTMLElement;
  }
  return { top: _y, left: _x };
}

let positions:[number, number, number, string][] = [];
const getViewport = () => (typeof visualViewport != "undefined" ? () => [visualViewport.width, visualViewport.height] : () => [document.documentElement.clientWidth, document.documentElement.clientHeight])();
const getDistFromTop = () => (typeof visualViewport != "undefined" ? () => visualViewport.pageTop : () => document.documentElement.scrollTop)();
let viewhint: HTMLSpanElement;

const updatePositions = (v: typeof $appState) => {
  const [sw, sh] = getViewport();
  const containerScrollHeight = document.documentElement.scrollHeight;
  positions = v.foundPosts.map(v => {
    const coords = getOffset(v);
    const top = sh * (coords.top / containerScrollHeight);
    const bot = sh * ((coords.top + v.offsetHeight) / containerScrollHeight);
    const hei = (bot - top);
    return [top, hei, coords.top, getComputedStyle(v)['borderRightColor']];
  })
}

const updateViewhint = () => {
  if (!$settings.sh) return;
  const [sw, sh] = getViewport();
  const fromtop = getDistFromTop();
  const containerScrollHeight = document.documentElement.scrollHeight;
  const top = sh * (fromtop / containerScrollHeight);
  const bot = sh * ((fromtop + sh) / containerScrollHeight);
  const hei = (bot - top);
  viewhint.style.top = top + 'px';
  viewhint.style.height = hei + 'px';
}

appState.subscribe(v => updatePositions(v));

const handleResize = () => {
  updatePositions($appState);
};

let locked = false;
const handleScroll = async () => {
  if (locked) return;
  locked = true;
  updateViewhint();
  await new Promise(_ => requestAnimationFrame(_));
  locked = false;
};

onMount(() => {
  window.addEventListener('resize', handleResize);
  document.addEventListener('scroll', handleScroll);
  updateViewhint();
});

onDestroy(() => {
  window.removeEventListener('resize', handleResize);
  document.addEventListener('scroll', handleScroll);
})

</script>

{#if $settings.sh}
  <div class="scroll-container">
    {#each $appState.foundPosts as post, i}
      <span
        on:click={() => window.scrollTo(0, positions[i][2])}
        style="top: {positions[i][0]}px; height: {positions[
          i
        ][1]}px; background-color: {positions[i][3]}"
        class="marker"
      />
    {/each}
    <span class="hint" bind:this={viewhint} />
  </div>
{/if}

<style scoped>
  .hint {
    background-color: rgb(222 222 222 / 80%);
    z-index: -1;
    pointer-events: none;
  }

  .scroll-container {
    position: fixed;
    height: 100%;
    width: 12px;
    /* pointer-events: none; */
    top: 0;
    right: 0;
    z-index: 1000;
  }

  .scroll-container span {
    /* markers */
    position: absolute;
    right: 0;
    width: 33%;
    cursor: pointer;
    transition: width 200ms;
  }

  .scroll-container:hover span {
    width: 100%;
  }
</style>
