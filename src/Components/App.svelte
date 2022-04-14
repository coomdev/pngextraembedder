<script lang="ts">
  import { hasContext, onDestroy } from "svelte";
  import Dialog from "./Dialog.svelte";

  import Tag from "./Tag.svelte";
  import type { Booru } from "../thirdeye";
  import Tabs from "./Tabs.svelte";
  import TabList from "./TabList.svelte";
  import Tab from "./Tab.svelte";
  import TabPanel from "./TabPanel.svelte";

  import { settings, appState } from "../stores";
  import { filehosts } from "../filehosts";
  import HydrusSearch from "./HydrusSearch.svelte";

  let newbooru: Partial<Omit<Booru, "quirks"> & { view: string }> = {};
  let dial: Dialog;

  function appendBooru() {
    $settings.rsources = [...$settings.rsources, newbooru as any];
    dial.toggle();
    newbooru = {};
  }

  let visible = false;
  let penisEvent = () => {
    visible = !visible;
  };
  document.addEventListener("penis", penisEvent);
  console.log("app loaded");

  function removeTag(t: string) {
    $settings.blacklist = $settings.blacklist.filter((e: any) => e != t);
  }

  function removeBooru(t: string) {
    const idx = $settings.rsources.findIndex((e) => e.domain == t);
    const rep = prompt("You DO know what you're doing, right? (type 'y')");
    if (!rep || rep != "y") return;
    if (idx >= 0) $settings.rsources.splice(idx, 1);
    $settings.rsources = $settings.rsources;
  }

  const boardname = location.pathname.match(/\/([^/]*)\//)![1];
  let updating = false;
  let threads: { id: number; cnt: number }[] = [];
  async function updateThreads() {
    updating = true;
    let params = "";
    if ($settings.phash) {
      params = "?mdist=" + $settings.mdist;
    }
    let res = await fetch(
      "https://shoujo.coom.tech/listing/" + boardname + params
    );
    threads = await res.json();
    updating = false;
  }

  function toggleBooru(t: string) {
    const elem = $settings.rsources.find((e) => e.domain == t);
    if (elem) elem.disabled = !elem.disabled;
    $settings.rsources = $settings.rsources;
  }

  onDestroy(() => {
    document.removeEventListener("penis", penisEvent);
  });
</script>

<div class="backpanel" class:enabled={visible} class:disabled={!visible}>
  <div class="content">
    <h1>PEE Settings</h1>
    <hr />
    <Tabs>
      <TabList>
        <Tab>General</Tab>
        <Tab>External</Tab>
        <Tab>File Host</Tab>
        <Tab>Thread Watcher</Tab>
        {#if $appState.akValid}
          <Tab>Hydrus</Tab>
        {/if}
      </TabList>
      <TabPanel>
        <label>
          <input type="checkbox" bind:checked={$settings.vercheck} />
          Check for new versions at startup.
        </label>
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
          Disable hover preview.
        </label>

        <label>
          <input type="checkbox" bind:checked={$settings.eye} />
          Hide embedded content behind an eye.
        </label>
        {#if $settings.eye}
          <label>
            <input type="checkbox" bind:checked={$settings.ho} />
            Hide original content when hidden content is visible.
          </label>
        {/if}
        <label>
          <input type="checkbox" bind:checked={$settings.pre} />
          Preload external files.
        </label>
        <label>
          <input type="checkbox" bind:checked={$settings.prev} />
          Preload external files when they are in view.
        </label>
        <label>
          <input type="checkbox" bind:checked={$settings.hotlink} />
          Hotlink content.
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
          Disable embedded file preloading<a
            title="You might still want to enable 'preload external files'">?</a
          >
        </label>
        <label>
          <input type="checkbox" bind:checked={$settings.hyd} />
          <!-- svelte-ignore a11y-missing-attribute -->
          Enable Hydrus Integration
        </label>
        {#if $settings.hyd}
          {#if $appState.herror}
            <span class="error">{$appState.herror}</span>
          {/if}
          <label>
            Hydrus Access Key
            <!-- svelte-ignore a11y-missing-attribute -->
            <a
              title="Only requires Search Files permission. See Hydrus docs on where to set this up."
              >?</a
            >
            <input type="text" bind:value={$settings.ak} />
          </label>
          {#if $appState.akValid}
            <label>
              Auto-embed <input
                style="width: 5ch;"
                type="number"
                bind:value={$settings.auto_embed}
              />
              random files
              <!-- svelte-ignore a11y-missing-attribute -->
            </label>
            <label>
              <!-- svelte-ignore a11y-missing-attribute -->
              <input
                placeholder="Restrict to these tags (space to separate tags, _ to separate words)"
                type="text"
                bind:value={$settings.auto_tags}
              />
            </label>
          {/if}
        {/if}
      </TabPanel>
      <TabPanel>
        <label>
          <input type="checkbox" bind:checked={$settings.te} />
          Disable third-eye.
        </label>
        {#if !$settings.te}
          <label>
            <input type="checkbox" bind:checked={$settings.phash} />
            Enable perceptual hash-based filtering
          </label>
          {#if $settings.phash}
            <label>
              <input type="number" bind:value={$settings.mdist} />
              Minimum distance required (5 recommended)
              <!-- svelte-ignore a11y-missing-attribute -->
              <a
                title="Higher will filter more potentially different images, lower will let more identical images through"
                >?</a
              >
            </label>
          {/if}
          <h3>Booru sources</h3>
          <div class="tagcont">
            {#each $settings.rsources as source, i}
              <Tag
                tag={source.name}
                on:remove={() => removeBooru(source.domain)}
                on:toggle={() => toggleBooru(source.domain)}
                toggleable={true}
                toggled={!$settings.rsources.find(
                  (e) => e.domain == source.domain
                )?.disabled}
              />
            {/each}
          </div>
          <button
            on:click={(ev) => {
              dial.setPos([ev.clientX, ev.clientY]);
              dial.toggle();
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
            on:keydown={(ev) => {
              if (ev.key == "Enter") {
                $settings.blacklist = [
                  ...$settings.blacklist,
                  ev.currentTarget.value,
                ];
                ev.currentTarget.value = "";
              }
            }}
          />
        {/if}
      </TabPanel>
      <TabPanel>
        <p>Host to use when uploading files (Only permanent hosts)</p>
        <select bind:value={$settings.fhost}>
          {#each filehosts as fh, i}
            <option value={i}>{fh.domain}</option>
          {/each}
        </select>
        <label>
          Maximum number of embedded links to display
          <input type="number" bind:value={$settings.maxe} />
        </label>
      </TabPanel>
      <TabPanel>
        <label>
          <input type="checkbox" bind:checked={$settings.tm} />
          <!-- svelte-ignore a11y-missing-attribute -->
          Contribute to help keep this list up to date. [<a
            title="This will make PEE automatically send the
           post number of posts you find with embedded content">?</a
          >]
        </label>

        <button on:click={updateThreads} disabled={updating}>Refresh</button>

        {#if !updating}
          <div class="bepis">
            {#each threads as thread}
              <div class="mbepis">
                <a
                  href={"https://boards.4chan.org/" +
                    boardname +
                    "/thread/" +
                    thread.id}>>>{thread.id}</a
                >
                ({thread.cnt} embeds)
              </div>
            {/each}
          </div>
        {:else}
          <p>Loading...</p>
        {/if}
      </TabPanel>
      {#if $appState.akValid}
        <TabPanel>
          <HydrusSearch />
        </TabPanel>
      {/if}
    </Tabs>
  </div>
</div>

<style scoped>
  .bepis {
    max-height: 260px;
    overflow-y: auto;
  }

  .tagcont {
    display: flex;
    gap: 5px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }

  label > input[type="text"],
  label > input[type="number"] {
    width: 95%;
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

  .error {
    color: red;
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
