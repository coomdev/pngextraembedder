<script lang="ts">
  import { fileTypeFromBuffer } from 'file-type'
  import { settings, appState } from './stores'
  import { beforeUpdate, tick } from 'svelte'
  import type {EmbeddedFile} from './main';
	import { createEventDispatcher } from 'svelte';

  export const dispatch = createEventDispatcher();

  export let file: EmbeddedFile
  let isVideo = false
  let isImage = false
  let isAudio = false
  let url = ''
  let settled = false
  let contracted = true;
  let hovering = false
  let ftype = '';

  let place: HTMLDivElement
  let hoverElem: HTMLDivElement
  let imgElem: HTMLImageElement
  let videoElem: HTMLVideoElement
  let hoverVideo: HTMLVideoElement
  let dims: [number, number] = [0, 0]
  let furl: string | undefined = undefined;

  let visible = false;
  export const isNotChrome = !navigator.userAgent.includes("Chrome/");

  export let id = ''; 
  document.addEventListener("reveal", (e: any) => {
    if (e.detail.id == id)
      visible = !visible;
  });

  export function isContracted() {
    return contracted;
  }

  beforeUpdate(async () => {
    if (settled) return
    settled = true
    
    const thumb = file.thumbnail || file.data;
    const type = await fileTypeFromBuffer(thumb);
    url = URL.createObjectURL(new Blob([thumb], { type: type?.mime }))
    if (!type)
      return;
    ftype = type.mime;
    isVideo = type.mime.startsWith('video/')
    isAudio = type.mime.startsWith('audio/')
    isImage = type.mime.startsWith('image/')
    dispatch("fileinfo", {type})

    if (isImage) {
      contracted = !$settings.xpi;
    }
    if (isVideo) {
      contracted = !$settings.xpv && !$appState.isCatalog
    }
    if ($appState.isCatalog)
        contracted = true;
    if ($settings.pre) {
      unzip(); // not awaiting on purpose
    }

    if ($settings.prev) {
      let obs = new IntersectionObserver((entries, obs) => {
        for(const item of entries) {
          if(!item.isIntersecting) continue
          unzip();
          obs.unobserve(place);
        }
      }, {root:null, rootMargin: '0px', threshold: 0.01});
      obs.observe(place);
    }
  });

  let unzipping = false;
  let progress = [0, 0]
  async function unzip() {
    if (!file.thumbnail)
      return;
    if (unzipping)
      return;
    unzipping = true;
    let lisn = new EventTarget();
    lisn.addEventListener("progress", (e: any) => {
      progress = e.detail
    });
    let full = await file.data(lisn);
    const type = await fileTypeFromBuffer(full);
    furl = URL.createObjectURL(new Blob([full], { type: type?.mime }));
    unzipping = false;
    if (!type)
      return;
    isVideo = type.mime.startsWith('video/')
    isAudio = type.mime.startsWith('audio/')
    isImage = type.mime.startsWith('image/')
    dispatch("fileinfo", {type})

    if (hovering) {
      // reset hovering to recompute proper image coordinates
      setTimeout(() => {
        recompute();
        hoverUpdate();
      }, 20);
    }
  }

  function hasAudio(video: any) {
    return (
      video.mozHasAudio ||
      !!(video.webkitAudioDecodedByteCount) ||
      !!(video.audioTracks && video.audioTracks.length)
    )
  }

  export async function bepis(ev: MouseEvent) {
    if ($appState.isCatalog) return;
    if (ev.button == 0) {
      contracted = !contracted
      if (hovering) hoverStop()
      if (contracted && isVideo) {
        videoElem.controls = false
        videoElem.pause()
      }
      if (!contracted && isVideo) {
        videoElem.controls = true
        // has to be delayed
        setTimeout(async () => {
          videoElem.currentTime = hoverVideo.currentTime || 0;
          await videoElem.play()
        }, 10)
      }
      if (file.thumbnail && !furl) {
        // don't know how you managed to click before hovering but oh well
        unzip()
      }    
    } else if (ev.button == 1) { // middle click
      let src = furl || url;
      if (ev.altKey && file.source) {
        src = file.source;
      }
      if (ev.shiftKey && file.page) {
        src = file.page;
      }
      if (isNotChrome) {
        window.open(src, '_blank');
      } else
        await GM.openInTab(src, {active: false, insert: true});
    }
  }

  const getViewport = () => (typeof visualViewport != "undefined" ? () => [visualViewport.width, visualViewport.height] : () => [document.documentElement.clientWidth, document.documentElement.clientHeight])();

  function recompute() {
    const [sw, sh] = getViewport();

    let [iw, ih] = [0, 0]
    if (isImage) {
      ;[iw, ih] = [imgElem.naturalWidth, imgElem.naturalHeight]
    } else {
      ;[iw, ih] = [videoElem.videoWidth, videoElem.videoHeight]
    }
    let scale = Math.min(1, sw / iw, sh / ih)
    dims = [~~(iw * scale), ~~(ih * scale)]

    hoverElem.style.width = `${dims[0]}px`
    hoverElem.style.height = `${dims[1]}px`
  }

  async function hoverStart(ev?: MouseEvent) {
    if ($settings.dh)return;
    if (file.thumbnail && !furl) {
       unzip();
    }

    if (!isImage && !isVideo) return
    if (!contracted) return

    recompute();
    hovering = true

    if (isVideo){
      try {
          await hoverVideo.play()
        } catch (e) {
          // probably didn't interact with document error, mute the video and try again?
          hoverVideo.muted = true;
          hoverVideo.volume = 0;
          await hoverVideo.play()
        }
      }
    }

  function hoverStop(ev?: MouseEvent) {
    if ($settings.dh) return;
    hovering = false
    if (isVideo) hoverVideo.pause()
  }

  let lastev: MouseEvent | undefined;
  function hoverUpdate(ev?: MouseEvent) {
    lastev = lastev || ev;
    if ($settings.dh) return;
    if (!contracted) return
    const [sw, sh] = [visualViewport.width, visualViewport.height]
    // shamelessly stolen from 4chanX
    let width = dims[0]
    let height = dims[1] + 25
    let { clientX, clientY } = (ev || lastev!)
    let top = Math.max(0, (clientY * (sh - height)) / sh)
    let threshold = sw / 2
    let marginX: number | string =
      (clientX <= threshold ? clientX : sw - clientX) + 45
    marginX = Math.min(marginX, sw - width)
    marginX = marginX + 'px'
    let [left, right] = clientX <= threshold ? [marginX, ''] : ['', marginX]
    let { style } = hoverElem
    style.top = top + 'px'
    style.left = left
    style.right = right
  }

  function adjustAudio(ev: WheelEvent) {
    if (!$settings.ca) return
    if (!isVideo) return
    if ($settings.dh && contracted) return
    if (!hasAudio(videoElem))
      return;
    let vol = videoElem.volume * (ev.deltaY > 0 ? 0.9 : 1.1);
    vol = Math.max(0, Math.min(1, vol));
    videoElem.volume = vol;
    hoverVideo.volume = videoElem.volume;
    hoverVideo.muted = vol < 0;
    ev.preventDefault()
  }
</script>

{#if !$settings.eye || visible}
  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
  <div
    class:contract={contracted}
    class="place"
    on:click={bepis}
    on:auxclick={bepis}
    on:mouseover={hoverStart}
    on:mouseout={hoverStop}
    on:mousemove={hoverUpdate}
    on:wheel={adjustAudio}
    bind:this={place}
  >
    {#if isImage}
      <img bind:this={imgElem} alt={file.filename} src={furl || url} />
    {/if}
    {#if isAudio}
      <audio
        controls
        src={furl || url}
        loop={$settings.loop}
        alt={file.filename}
      >
        <source src={furl || url} type={ftype} />
      </audio>
    {/if}
    {#if isVideo}
      <!-- svelte-ignore a11y-media-has-caption -->
      <video loop={$settings.loop} bind:this={videoElem} src={furl || url} />
      <!-- assoom videos will never be loaded from thumbnails -->
    {/if}
  </div>
  <div
    bind:this={hoverElem}
    class:visible={hovering && contracted}
    class:unzipping
    class="hoverer"
  >
    {#if unzipping}<span class="progress">[{progress[0]} / {progress[1]}]</span
      >{/if}

    {#if isImage}
      <img alt={file.filename} src={furl || url} />
    {/if}
    {#if isVideo}
      <!-- svelte-ignore a11y-media-has-caption -->
      <video loop={$settings.loop} bind:this={hoverVideo} src={furl || url} />
      <!-- assoom videos will never be loaded from thumbnails -->
    {/if}
  </div>
{/if}

<style scoped>
  .place {
    cursor: pointer;
    max-width: 100vw;
    max-height: 100vh;
  }

  .unzipping > img {
    filter: brightness(0.5) blur(10px);
  }

  .progress {
    color: black;
    -webkit-text-stroke: 0.7px white;
    font-weight: bold;
    left: 50%;
    top: 50%;
    font-size: larger;
    display: inline-block;
    position: absolute;
    z-index: 10;
  }

  .hoverer {
    display: none;
    position: fixed;
    pointer-events: none;
  }

  .visible {
    display: block;
    z-index: 9;
  }

  .contract > img,
  .contract > video {
    max-width: 125px !important;
    max-height: 125px !important;
    width: auto;
    height: auto;
  }

  .place:not(.contract) > video,
  .place:not(.contract) > img,
  .hoverer > video,
  .hoverer > img {
    max-width: 100vw;
    max-height: 100vh;
  }
</style>
