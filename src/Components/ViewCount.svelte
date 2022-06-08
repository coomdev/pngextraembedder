<script lang="ts">
  import { settings } from "../stores";
  import {
    getThreadDataCache,
    refreshThreadDataCache,
    threadDataCache,
  } from "../utils";

  export let board: string;
  export let op: number;
  let loading = false;
  export let pid: number;

  const snooze = (n: number) => new Promise<void>((_) => setTimeout(_, n));

  const execRefresh = async (trueRefresh: boolean) => {
    loading = true;
    let p: Promise<void>[] = [];
    if (trueRefresh) {
      p.push(snooze(250)); // meant for the user to see that the thing is being reloaded
      p.push(refreshThreadDataCache(board, op));
    } else
      p.push(
        (async () => {
          await getThreadDataCache(board, op);
        })()
      );
    await Promise.all(p);
    loading = false;
  };

  settings.subscribe((newsetting) => {
    if (newsetting.dvc) execRefresh(false);
  });
</script>

{#if $settings.dvc}
  <span title="click to refresh" on:click={() => execRefresh(true)} class="tag">
    {#if loading}
      ...
    {:else if ($threadDataCache || {})[pid]}
      {($threadDataCache || {})[pid].cnt} views
    {:else}
      smth wrong...
    {/if}
  </span>
{/if}

<style scoped>
  .tag {
    padding: 5px;
    border: 1px solid;
    border-radius: 55px;
    cursor: pointer;
    display: inline-flex;
  }
</style>
