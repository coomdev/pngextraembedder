<script lang="ts">
  import { hasContext, onDestroy } from 'svelte'
import Dialog from './Dialog.svelte';

  import { settings } from './stores'
  import Tag from './Tag.svelte'
import type { Booru } from './thirdeye';

  let newbooru: Partial<Omit<Booru, 'quirks'> & {view: string}> = {};
  let dial: Dialog;

  function appendBooru() {
    $settings.rsources = [...$settings.rsources, newbooru as any];
    dial.toggle();
    newbooru = {}
  }

  let visible = false
  let penisEvent = () => {
    console.log('bepis')
    visible = !visible
  }
  document.addEventListener('penis', penisEvent)
  console.log('app loaded')

  function removeTag(t: string) {
    $settings.blacklist = $settings.blacklist.filter((e: any) => e != t)
  }

  function removeBooru(t: string) {
    const idx = $settings.rsources.findIndex(e => e.domain == t)
    const rep = prompt("You DO know what you're doing, right? (type 'y')")
    if (!rep || rep != 'y') return
    if (idx >= 0) $settings.rsources.splice(idx, 1)
    $settings.rsources = $settings.rsources
  }

  function toggleBooru(t: string) {
    const elem = $settings.rsources.find(e => e.domain == t)
    if (elem)
      elem.disabled = !elem.disabled;
    $settings.rsources = $settings.rsources
  }

  onDestroy(() => {
    document.removeEventListener('penis', penisEvent)
  })
</script>

<div class="backpanel" class:enabled={visible} class:disabled={!visible}>
  <div class="content">
    <h1>PEE Settings</h1>
    <hr />
    <label>
      <input type="checkbox" bind:checked={$settings.xpi} />
      Autoexpand Images on opening.
    </label>
    <label>
      <input type="checkbox" bind:checked={$settings.xpv} />
      Autoexpand Videos on opening.
    </label>
    <label>
      <input type="checkbox" bind:checked={$settings.loop} />
      Loop media content.
    </label>
    <label>
      <input type="checkbox" bind:checked={$settings.dh} />
      Turn off hover preview.
    </label>
    <label>
      <input type="checkbox" bind:checked={$settings.eye} />
      Hide embedded content behind an eye.
    </label>
    <label>
      <input type="checkbox" bind:checked={$settings.pre} />
      Preload external files.
    </label>
    <label>
      <input type="checkbox" bind:checked={$settings.prev} />
      Preload external files when they are in view.
    </label>
    <label>
      <input type="checkbox" bind:checked={$settings.ca} />
      Control audio on videos with mouse wheel.
    </label>
    <label>
      <input type="checkbox" bind:checked={$settings.sh} />
      Show Minimap
    </label>
    <label>
      <input type="checkbox" bind:checked={$settings.ep} />
      <!-- svelte-ignore a11y-missing-attribute -->
      Turn off embedded file preloading<a
        title="You might still want to enable 'preload external files'">?</a
      >
    </label>
    <label>
      <input type="checkbox" bind:checked={$settings.te} />
      Turn off third-eye.
    </label>
    {#if !$settings.te}
      <h3>Booru sources</h3>
      <div class="tagcont">
        {#each $settings.rsources as source, i}
          <Tag
            tag={source.name}
            on:remove={() => removeBooru(source.domain)}
            on:toggle={() => toggleBooru(source.domain)}
            toggleable={true}
            toggled={!$settings.rsources.find(e => e.domain == source.domain)
              ?.disabled}
          />
        {/each}
      </div>
      <button
        on:click={ev => {
          dial.setPos([ev.clientX, ev.clientY])
          dial.toggle()
        }}>Add a source</button
      >
      <Dialog bind:this={dial}>
        <div class="form">
          <label>
            Name
            <input
              type="text"
              placeholder="Gelbooru"
              bind:value={newbooru.name}
            />
          </label>
          <label>
            Domain
            <input
              type="text"
              placeholder="gelbooru.com"
              bind:value={newbooru.domain}
            />
          </label>
          <label>
            API Endpoint
            <input
              type="text"
              placeholder="/post.json?tags=md5:"
              bind:value={newbooru.endpoint}
            />
          </label>
          <label>
            Post page prefix (for sources)
            <input
              type="text"
              placeholder="https://yande.re/post/show/"
              bind:value={newbooru.view}
            />
          </label>
          <button on:click={appendBooru}>Add</button>
        </div>
      </Dialog>

      <hr />
      <h3>Blacklisted tags</h3>
      <div class="tagcont">
        {#each $settings.blacklist as tag, i}
          <Tag {tag} on:toggle={() => removeTag(tag)} />
        {/each}
      </div>
      <input
        placeholder="Press enter after typing your tag"
        on:keydown={ev => {
          if (ev.key == 'Enter') {
            $settings.blacklist = [
              ...$settings.blacklist,
              ev.currentTarget.value,
            ]
            ev.currentTarget.value = ''
          }
        }}
      />
    {/if}
  </div>
</div>

<style scoped>
  .tagcont {
    display: flex;
    gap: 5px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }

  select {
    font-size: 1.2em;
  }

  .enabled {
    display: block;
  }

  .disabled {
    display: none;
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
  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: absolute;
    padding: 15px;
    border: 1px solid white;
    background-color: inherit;
    border-radius: 10px;
  }

  .form > label {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .backpanel {
    position: absolute;
    right: 32px;
    padding: 10px;
    width: 15%;
    top: 32px;
    border: 1px solid;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.2);
    pointer-events: all;
    backdrop-filter: blur(9px);
    max-height: 80vh;
    min-width: 321px;
  }
</style>
