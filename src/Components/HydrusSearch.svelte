<script lang="ts">
    import { map } from "lodash";
    import { each, onMount } from "svelte/internal";

    import type { EmbeddedFile } from "../main";
    import { appState } from "../stores";
    import { addToEmbeds, getFileFromHydrus } from "../utils";
    import Embedding from "./Embedding.svelte";

    import Tag from "./Tag.svelte";

    let tags: string[] = [];

    let loading = false;

    function removeTag(t: string) {
        tags = tags.filter((e) => e != t);
        update();
    }
    let maps: [number, EmbeddedFile][] = [];

    async function update() {
        loading = true;
        if ($appState.client) {
            try {
                if (tags.length == 0) {
                    maps = [];
                    loading = false;
                    return;
                }
                maps = await getFileFromHydrus(
                    $appState.client,
                    tags.concat(["system:limit=32"]),
                    { file_sort_type: 4 }
                );
            } catch {}
        }
        loading = false;
    }

    onMount(() => {
        return update();
    });
</script>

<div class="cont">
    <input
        type="text"
        placeholder="Input a tag here, then press enter"
        on:keydown={(ev) => {
            if (ev.key == "Enter") {
                if (ev.currentTarget.value)
                    tags = [...tags, ev.currentTarget.value];
                ev.currentTarget.value = "";
                update();
            }
        }}
    />
    <details>
        <summary>Tips</summary>
        Press enter without entering a tag to refresh. <br />
        Files are picked randomly <br />
        Click on a file to embed it <br />
    </details>
    <div class="tagcont">
        {#each tags as tag}
            <Tag {tag} on:toggle={() => removeTag(tag)} />
        {/each}
    </div>
    {#if loading}
        Loading...
    {:else}
        <div class="results">
            {#each maps as map (map[0])}
                <Embedding
                    on:click={() => addToEmbeds(map[1])}
                    inhibitExpand={true}
                    id={"only"}
                    file={map[1]}
                />
            {/each}
        </div>
    {/if}
</div>

<style scoped>
    .results {
        display: flex;
        flex-wrap: wrap;
        max-height: 30vh;
        gap: 10px;
        overflow-y: auto;
        align-items: center;
        justify-content: center;
    }

    .tagcont {
        display: flex;
        gap: 5px;
    }

    .cont {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    details {
        border: 1px solid #aaa;
        border-radius: 4px;
        padding: 0.5em 0.5em 0;
    }

    summary {
        font-weight: bold;
        margin: -0.5em -0.5em 0;
        padding: 0.5em;
        cursor: pointer;
    }

    details[open] {
        padding: 0.5em;
    }

    details[open] summary {
        border-bottom: 1px solid #aaa;
        margin-bottom: 0.5em;
    }
</style>
