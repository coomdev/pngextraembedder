<script lang="ts">
  import type { fireNotification } from '../utils'

  type t = Parameters<typeof fireNotification>
  type Notification = {
    type: t[0]
    content: t[1]
    lifetime: t[2]
  }

  let nots: (Notification & { id: number })[] = []

  const removeId = (id: number) => (nots = nots.filter((e) => e.id != id))

  let gid = 0
  document.addEventListener('CreateNotification', <any>((
    e: CustomEvent<Notification>,
  ) => {
    const id = gid++
    nots = [...nots, { ...e.detail, id }]
    setTimeout(() => removeId(id), (e.detail.lifetime || 3) * 1000)
  }))
</script>

<div class="root">
  {#each nots as not (not.id)}
    <span class={not.type}
      >{not.content}<span on:click={() => removeId(not.id)} class="clickable"
        >X</span
      ></span
    >
  {/each}
</div>

<style scoped>

  .clickable {
    cursor: pointer;
    float: right;
  }

  .root > span {
    display: flex;
    gap: 10px;
    border: 1px solid;
    padding: 10px;
    border-radius: 5px;
    font-weight: bolder;
    color: white;
    min-width: 45vw;
  }

  .root {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .error {
    background-color: /*KING*/ crimson;
  }

  .info {
    background-color: cornflowerblue;
  }

  .warning {
    background-color: darkgoldenrod;
  }

  .success {
    background-color: green;
  }
</style>
