<script lang="ts">
  import { hasContext, onDestroy } from 'svelte'

  import { settings } from './stores'

  let visible = false
  let penisEvent = () => {
    console.log('bepis')
    visible = !visible
  }
  document.addEventListener('penis', penisEvent)
  console.log('app loaded')

  let sources = [
    'gelbooru.com',
    'yande.re',
    'capi-v2.sankakucomplex.com',
    'api.rule34.xxx',
    'danbooru.donmai.us',
    'lolibooru.moe',
  ]

  let selectobj: HTMLSelectElement
  let selectobj2: HTMLSelectElement

  function toggleSelection() {
    for (let i = 0; i < selectobj.selectedOptions.length; ++i) {
      let item = selectobj.selectedOptions.item(i)
      if (!item) continue
      if ($settings.sources.includes(item.value))
        $settings.sources = $settings.sources.filter(
          (e: string) => e != item!.value,
        )
      else $settings.sources = [...$settings.sources, item.value]
    }
  }

  function removeSelection() {
    let s = new Set<string>();
    for (let i = 0; i < selectobj2.selectedOptions.length; ++i) {
      let obj = selectobj2.selectedOptions.item(i)
      if (!obj) continue
      s.add(obj.value)
      $settings.blacklist = $settings.blacklist.filter((e: any) => !s.has(e))
    }
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
      <input type="checkbox" bind:checked={$settings.te} />
      Turn off third-eye.
    </label>
    {#if !$settings.te}
      <h3>Booru sources</h3>
      <select multiple bind:this={selectobj} size={sources.length}>
        {#each sources as source, i}
          <option
            class="sourcedi"
            class:sourceen={$settings.sources.includes(source)}
            value={source}>{source}</option
          >
        {/each}
      </select>
      <button on:click={toggleSelection}>Toggle sources</button>
      <hr />
      <h3>Blacklisted tags</h3>
      <select multiple bind:this={selectobj2} size={sources.length}>
        {#each $settings.blacklist as source, i}
          <option value={source}>{source}</option>
        {/each}
      </select>
      <button on:click={removeSelection}>Remove</button>
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
  select {
    font-size: 1.2em;
  }

  .enabled {
    display: block;
  }

  .sourcedi {
    border-right: 10px solid lightcoral;
  }

  .sourceen {
    border-right: 10px solid lightgreen;
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
  }
</style>
