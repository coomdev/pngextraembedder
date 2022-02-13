<script lang="ts">
  import { fileTypeFromBuffer, FileTypeResult } from 'file-type'
  import { settings, appState } from '../stores'
  import { beforeUpdate, tick } from 'svelte'
  import type { EmbeddedFile } from '../main'
  import { createEventDispatcher } from 'svelte'
  import { Buffer } from 'buffer'
  import { getHeaders, Platform } from '../platform'

  export const dispatch = createEventDispatcher()

  export let file: EmbeddedFile
  let isVideo = false
  let isImage = false
  let isAudio = false
  let isText = false
  let url = ''
  let settled = false
  let contracted = true
  let hovering = false
  let ftype = ''

  let place: HTMLDivElement
  let hoverElem: HTMLDivElement
  let imgElem: HTMLImageElement
  let videoElem: HTMLVideoElement
  let hoverVideo: HTMLVideoElement
  let dims: [number, number] = [0, 0]
  let furl: string | undefined = undefined

  let visible = false
  export const isNotChrome = !navigator.userAgent.includes('Chrome/')

  export let id = ''
  document.addEventListener('reveal', (e: any) => {
    if (e.detail.id == id) visible = !visible
  })

  export function isContracted() {
    return contracted
  }

  let content: Blob
  beforeUpdate(async () => {
    if (settled) return
    settled = true

    const thumb = file.thumbnail || file.data
    let type: FileTypeResult | undefined
    if (typeof thumb != "string") {
      let buff = Buffer.isBuffer(thumb) ? thumb : await thumb();
      type = await fileTypeFromBuffer(buff)
      if (
        !type &&
        file.filename.endsWith('.txt') &&
        file.filename.startsWith('message')
      ) {
        type = { ext: 'txt', mime: 'text/plain' } as any
      }
      content = new Blob([buff], { type: type?.mime })
      url = URL.createObjectURL(content)
      if (!type) return
    } else {
      let head = await getHeaders(thumb)
      url = thumb;
      type = {
        ext: '' as any,
        mime: head['content-type'].split(';')[0].trim() as any,
      }
    }
    ftype = type.mime
    isVideo = type.mime.startsWith('video/')
    isAudio = type.mime.startsWith('audio/')
    isImage = type.mime.startsWith('image/')
    isText = type.mime.startsWith('text/plain')
    dispatch('fileinfo', { type })

    if (isImage) {
      contracted = !$settings.xpi
    }
    if (isVideo) {
      contracted = !$settings.xpv && !$appState.isCatalog
    }
    if ($appState.isCatalog) contracted = true
    if ($settings.pre) {
      unzip() // not awaiting on purpose
    }

    if ($settings.prev) {
      let obs = new IntersectionObserver(
        (entries, obs) => {
          for (const item of entries) {
            if (!item.isIntersecting) continue
            unzip()
            obs.unobserve(place)
          }
        },
        { root: null, rootMargin: '0px', threshold: 0.01 },
      )
      obs.observe(place)
    }
  })

  let unzipping = false
  let progress = [0, 0]
  async function unzip() {
    if (!file.thumbnail) return
    if (unzipping) return

    let type: FileTypeResult | undefined
    if (typeof file.data != 'string') {
      unzipping = true
      let lisn = new EventTarget()
      lisn.addEventListener('progress', (e: any) => {
        progress = e.detail
      })
      let full = Buffer.isBuffer(file.data) ? file.data : await file.data(lisn)
      type = await fileTypeFromBuffer(full)
      if (
        !type &&
        file.filename.endsWith('.txt') &&
        file.filename.startsWith('message')
      ) {
        type = { ext: 'txt', mime: 'text/plain' } as any
      }
      content = new Blob([full], { type: type?.mime })
      furl = URL.createObjectURL(content)
    } else {
      url = file.data
      furl = file.data
      let head = await getHeaders(file.data)
      type = {
        ext: '' as any,
        mime: head['content-type'].split(';')[0].trim() as any,
      }
    }
    if (!type) return
    ftype = type.mime;
    isVideo = type.mime.startsWith('video/')
    isAudio = type.mime.startsWith('audio/')
    isImage = type.mime.startsWith('image/')
    isText = type.mime.startsWith('text/plain')
    unzipping = false

    dispatch('fileinfo', { type })

    if (hovering) {
      // reset hovering to recompute proper image coordinates
      setTimeout(async () => {
        do {
          hoverUpdate()
          await new Promise((_) => setTimeout(_, 20))
        } while (dims[0] == 0 && dims[1] == 0)
      }, 20)
    }
  }

  function hasAudio(video: any) {
    return (
      video.mozHasAudio ||
      !!video.webkitAudioDecodedByteCount ||
      !!(video.audioTracks && video.audioTracks.length)
    )
  }

  export async function bepis(ev: MouseEvent) {
    if ($appState.isCatalog) return

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
          videoElem.currentTime = hoverVideo.currentTime || 0
          await videoElem.play()
        }, 10)
      }
      if (file.thumbnail && !furl) {
        // don't know how you managed to click before hovering but oh well
        unzip()
      }
      ev.preventDefault()
    } else if (ev.button == 1) {
      // middle click
      let src = furl || url
      if (ev.altKey && file.source) {
        src = file.source
      }
      if (ev.shiftKey && file.page) {
        src = file.page.url
      }
      ev.preventDefault()
      if (isNotChrome) {
        window.open(src, '_blank')
      } else await Platform.openInTab(src, { active: false, insert: true })
    }
  }

  const getViewport = () =>
    (typeof visualViewport != 'undefined'
      ? () => [visualViewport.width, visualViewport.height]
      : () => [
          document.documentElement.clientWidth,
          document.documentElement.clientHeight,
        ])()

  function recompute() {
    const [sw, sh] = getViewport()

    let [iw, ih] = [0, 0]
    if (isImage) {
      ;[iw, ih] = [imgElem.naturalWidth, imgElem.naturalHeight]
    } else if (isVideo) {
      ;[iw, ih] = [videoElem.videoWidth, videoElem.videoHeight]
    }
    let scale = Math.min(1, sw / iw, sh / ih)
    dims = [~~(iw * scale), ~~(ih * scale)]

    hoverElem.style.width = `${dims[0]}px`
    hoverElem.style.height = `${dims[1]}px`
  }

  async function hoverStart(ev?: MouseEvent) {
    if (!(isVideo || isImage)) return
    if ($settings.dh) return
    if (file.thumbnail && !furl) {
      unzip()
    }

    if (!isImage && !isVideo) return
    if (!contracted) return

    recompute()
    hovering = true

    if (isVideo) {
      try {
        await hoverVideo.play()
      } catch (e) {
        // probably didn't interact with document error, mute the video and try again?
        hoverVideo.muted = true
        hoverVideo.volume = 0
        await hoverVideo.play()
      }
    }
  }

  function hoverStop(ev?: MouseEvent) {
    if ($settings.dh) return
    hovering = false
    if (isVideo) hoverVideo.pause()
  }

  let lastev: MouseEvent | undefined
  function hoverUpdate(ev?: MouseEvent) {
    lastev = lastev || ev
    if ($settings.dh) return
    if (!contracted) return
    if (!(isVideo || isImage)) return
    recompute() // yeah I gave up
    const [sw, sh] = [visualViewport.width, visualViewport.height]
    // shamelessly stolen from 4chanX
    if (dims[0] == 0 && dims[1] == 0) recompute()
    let width = dims[0]
    let height = dims[1] + 25
    let { clientX, clientY } = ev || lastev!
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
    if (!hasAudio(videoElem)) return
    let vol = videoElem.volume * (ev.deltaY > 0 ? 0.9 : 1.1)
    vol = Math.max(0, Math.min(1, vol))
    videoElem.volume = vol
    hoverVideo.volume = videoElem.volume
    hoverVideo.muted = vol < 0
    ev.preventDefault()
  }
</script>

{#if !$settings.eye || visible}
  <!-- svelte-ignore a11y-mouse-events-have-key-events -->
  <div
    class:contract={contracted}
    class="place"
    on:click={e => e.preventDefault()}
    on:auxclick={e => e.preventDefault()}
    on:mousedown={bepis}
    on:mouseover={hoverStart}
    on:mouseout={hoverStop}
    on:mousemove={hoverUpdate}
    on:wheel={adjustAudio}
    bind:this={place}
  >
    {#if isImage}
      <!-- svelte-ignore a11y-missing-attribute -->
      <img
        referrerpolicy="no-referrer"
        bind:this={imgElem}
        alt={file.filename}
        src={furl || url}
      />
    {/if}
    {#if isAudio}
      <audio
        referrerpolicy="no-referrer"
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
      <!-- svelte-ignore a11y-missing-attribute -->
      <video
        type={ftype}
        referrerpolicy="no-referrer"
        loop={$settings.loop}
        bind:this={videoElem}
      >
        <source referrerpolicy="no-referrer" src={furl || url} />
      </video>
      <!-- assoom videos will never be loaded from thumbnails -->
    {/if}
    {#if isText}
      <!-- svelte-ignore a11y-media-has-caption -->
      <!-- svelte-ignore a11y-missing-attribute -->
      {#await content.text()}
        <pre>Loading...</pre>
      {:then con}
        <pre>{con}</pre>
      {/await}
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
      <video loop={$settings.loop} bind:this={hoverVideo}>
        <source type={ftype} src={furl || url} data-test />
      </video>
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

  pre {
    padding: 10px;
  }

  .contract pre {
    max-width: 20ch;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .contract img,
  .contract video {
    max-width: 125px !important;
    max-height: 125px !important;
    width: auto;
    height: auto;
  }

  .place:not(.contract) video,
  .place:not(.contract) img,
  .hoverer > video,
  .hoverer > img {
    max-width: 100vw;
    max-height: 100vh;
  }
</style>
