<script lang="ts">
import { fileTypeFromBuffer } from 'file-type';

import type { EmbeddedFile } from './main';

  import { settings } from './stores'

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
</script>

{#if $settings.sh}
  <div class="scroll-container" />
{/if}

<style scoped>
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

  .scroll-container span.position {
    pointer-events: none;
  }

  .marker-hovered {
    opacity: 0.8;
  }
</style>
