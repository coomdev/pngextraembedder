<script lang="ts">
  import { appState } from './stores'
  import type { ImageProcessor } from './main'

  import { fireNotification, getSelectedFile } from './utils'

  export let processors: ImageProcessor[] = []
  export let textinput: HTMLTextAreaElement

  let files: File[] = []

  const addContent = (...newfiles: File[]) => {
    files = [...files, ...newfiles]
    if (files.length > 5) {
      fireNotification(
        'warning',
        'Can only add up to 5 attachments, further attachments will be dropped',
      )
      files = files.slice(0, 5)
    }
  }

  const embedText = async (e: Event) => {
    if (textinput.value == '') return
    if (textinput.value.length > 2000) {
      fireNotification("error", "Message attachments are limited to 2000 characters")
      return;
    }
    addContent(
      new File(
        [new Blob([textinput.value], { type: 'text/plain' })],
        `message${files.length}.txt`,
      ),
    )
    textinput.value = ''
  }

  const embedContent = async (e: Event) => {
    const file = await getSelectedFile()
    if (!file) return
    const type = file.type
    try {
      const proc = processors
        .filter((e) => e.inject)
        .find((e) => e.match(file.name))
      if (!proc) throw new Error('Container filetype not supported')
      const buff = await proc.inject!(file, [...files].slice(0, 5))
      document.dispatchEvent(
        new CustomEvent('QRSetFile', {
          //detail: { file: new Blob([buff]), name: file.name, type: file.type }
          detail: { file: new Blob([buff], { type }), name: file.name },
        }),
      )
      fireNotification(
        'success',
        `File${files.length > 1 ? 's' : ''} successfully embedded!`,
      )
    } catch (err) {
      const e = err as Error
      fireNotification('error', "Couldn't embed file: " + e.message)
    }
  }

  const embedFile = async (e: Event) => {
    const input = document.createElement('input') as HTMLInputElement
    input.setAttribute('type', 'file')
    input.multiple = true
    input.onchange = async (ev) => {
      if (input.files) {
        addContent(...input.files)
      }
    }
    input.click()
  }
</script>

<div class="root">
  <!-- svelte-ignore a11y-missing-attribute -->
  <a on:click={embedFile} title="Add a file">
    <i class="fa fa-magnet"> {$appState.is4chanX ? '' : '🧲'} </i>
  </a>
  <div class="additionnal">
    <!-- svelte-ignore a11y-missing-attribute -->
    <a
      on:click={embedText}
      title="Add a message (this uses the content of the comment text box)"
    >
      <i class="fa fa-pencil"> {$appState.is4chanX ? '' : '🖉'} </i>
    </a>
    <!-- svelte-ignore a11y-missing-attribute -->
    <a on:click={embedContent} title="Ready to Embed (Select a file before)">
      <i class="fa fa-check"> {$appState.is4chanX ? '' : '✅'} </i>
    </a>
    {#if files.length}
      <!-- svelte-ignore a11y-missing-attribute -->
      <a on:click={() => (files = [])} title="Discard ALL selected content">
        <i class="fa fa-times"> {$appState.is4chanX ? '' : '❌'} </i>
      </a>
    {/if}
  </div>
</div>

<style scoped>
  a {
    cursor: pointer;
  }

  .root {
    position: relative;
  }

  .additionnal {
    display: none;
    position: absolute;
    flex-direction: column;
    gap: 5px;
    outline: 1px solid #ce3d08;
    padding: 5px;
    background-color: #fffdee;
    border-radius: 5px;
    left: 50%;
    transform: translateX(-50%);
  }

  .root:hover > .additionnal {
    display: flex;
  }
</style>
