<script lang="ts">
  import { fileTypeFromBuffer } from 'file-type'
  import { settings } from './stores'
  import { beforeUpdate } from 'svelte'

  export let file: { filename: string; data: Buffer }
  let isVideo = false
  let isImage = false
  let isAudio = false
  let isFile = false
  let url = ''
  let settled = false
  let contracted = true
  let hovering = false

  let place: HTMLDivElement
  let hoverElem: HTMLDivElement
  let imgElem: HTMLImageElement
  let videoElem: HTMLVideoElement
  let hoverVideo: HTMLVideoElement
  let dims: [number, number] = [0, 0]

  beforeUpdate(async () => {
    if (settled) return
    settled = true
    const type = await fileTypeFromBuffer(file.data)
    url = URL.createObjectURL(new Blob([file.data], { type: type?.mime }))
    if (!type) {
      isFile = true
      return
    }
    isVideo = type.mime.startsWith('video/')
    isAudio = type.mime.startsWith('audio/')
    isImage = type.mime.startsWith('image/')

    if (isImage) contracted = !$settings.xpi
    if (isVideo) {
      contracted = !$settings.xpv
    }
  })

  function hasAudio(video: any) {
    return (
      video.mozHasAudio ||
      Boolean(video.webkitAudioDecodedByteCount) ||
      Boolean(video.audioTracks && video.audioTracks.length)
    )
  }

  function bepis() {
    contracted = !contracted
    if (hovering) hoverStop()
    if (contracted && isVideo) {
      videoElem.controls = false
      videoElem.pause()
    }
    if (!contracted && isVideo) {
      videoElem.controls = true
      // has to be delayed
      setTimeout(() => videoElem.play(), 10)
    }
  }

  function hoverStart(ev: MouseEvent) {
    if (!isImage && !isVideo) return
    if (!contracted) return

    const [sw, sh] = [visualViewport.width, visualViewport.height]

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
    hovering = true
    if (isVideo) hoverVideo.play()
  }

  function hoverStop(ev?: MouseEvent) {
    hovering = false
    if (isVideo) hoverVideo.pause()
  }

  function hoverUpdate(ev: MouseEvent) {
    if (!contracted) return
    const [sw, sh] = [visualViewport.width, visualViewport.height]
    // shamelessly stolen from 4chanX
    let width = dims[0]
    let height = dims[1] + 25
    let { clientX, clientY } = ev
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
    if (!isVideo) return
    if (hasAudio(videoElem)) {
      let vol = videoElem.volume * (ev.deltaY > 0 ? 0.9 : 1.1);
      videoElem.volume = Math.max(0, Math.min(1, vol));
      hoverVideo.volume = videoElem.volume;
      ev.preventDefault()
    }
  }
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
  class:contract={contracted}
  class="place fileThumb"
  on:click={() => bepis()}
  on:mouseover={hoverStart}
  on:mouseout={hoverStop}
  on:mousemove={hoverUpdate}
  on:wheel={adjustAudio}
  bind:this={place}
>
  {#if isImage}
    <img bind:this={imgElem} alt={file.filename} src={url} />
  {/if}
  {#if isAudio}
    <audio loop={$settings.loop} alt={file.filename} src={url} />
  {/if}
  {#if isVideo}
    <!-- svelte-ignore a11y-media-has-caption -->
    <video loop={$settings.loop} bind:this={videoElem} src={url} />
  {/if}
  {#if isFile}
    <button>Download {file.filename}</button>
  {/if}
</div>
<div
  bind:this={hoverElem}
  class:visible={hovering && contracted}
  class="hoverer"
>
  {#if isImage}
    <img alt={file.filename} src={url} />
  {/if}
  {#if isVideo}
    <!-- svelte-ignore a11y-media-has-caption -->
    <video loop={$settings.loop} bind:this={hoverVideo} src={url} />
  {/if}
</div>

<style scoped>
  .place {
    cursor: pointer;
    max-width: 90vw;
    max-height: 90vh;
  }

  .hoverer {
    display: none;
    position: fixed;
    pointer-events: none;
  }

  .visible {
    display: block;
    z-index: 1;
  }

  .contract > img,
  .contract > video {
    max-width: 125px;
    max-height: 125px;
    width: auto;
    height: auto;
  }

  .place:not(.contract) > video,
  .place:not(.contract) > img,
  .hoverer > video,
  .hoverer > img {
    max-width: 90vw;
    max-height: 90vh;
  }
</style>
