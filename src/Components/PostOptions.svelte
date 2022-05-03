<script lang="ts">
  import { appState, settings } from "../stores";
  import type { ImageProcessor } from "../main";

  import {
    addToEmbeds,
    embeddedToBlob,
    fireNotification,
    getFileFromHydrus,
    uploadFiles,
  } from "../utils";

  export let processors: ImageProcessor[] = [];
  export let textinput: HTMLTextAreaElement;

  export let links: string[] = [];

  const addContent = async (...newfiles: File[]) => {
    links = [...links, ...(await uploadFiles(newfiles))];
    return embedContent({} as any);
  };

  let original: File | undefined;
  let currentEmbed: { file: File } | undefined;

  function restore() {
    document.dispatchEvent(
      new CustomEvent("QRSetFile", {
        detail: { file: original },
      })
    );
  }

  // This is an event to signal a change in the container file
  let inhibit = false;

  const isSame = (a: File | null, b: File | null) => {
    if (a == null || b == null) return false;
    (["size", "name", "lastModified"] as const).every((e) => a[e] == b[e]);
  };

  document.addEventListener("PEEFile", async (e) => {
    let file = (e as any).detail as File;
    if (!currentEmbed || (!isSame(currentEmbed.file, file) && !inhibit)) {
      original = file;
      if ($settings.auto_embed && $appState.client) {
        const tags = $settings.auto_tags
          .split(" ")
          .map((e) => e.replaceAll("_", " "));
        const efs = await getFileFromHydrus(
          $appState.client,
          tags.concat(["system:limit=" + $settings.auto_embed]),
          { file_sort_type: 4 }
        );
        const files = await embeddedToBlob(...efs.map((e) => e[1]));
        const nlinks = await uploadFiles(files);
        links = [...links, ...nlinks];
      }
      inhibit = true;
      await embedContent(e);
      setTimeout(() => (inhibit = false), 500); // hack around 4chan(X)(?) inconsistent getFile
    }
  });

  document.addEventListener("QRPostSuccessful", () => {
    if (currentEmbed) {
      links = []; // cleanup
      currentEmbed = undefined;
      original = undefined;
    }
  });

  document.addEventListener("AddPEE", (e) => {
    let link = (e as any).detail as string | string[];
    links = links.concat(link);
    embedContent(e);
  });

  const embedText = async (e: Event) => {
    if (textinput.value == "") return;
    if (textinput.value.length > 2000) {
      fireNotification(
        "error",
        "Message attachments are limited to 2000 characters"
      );
      return;
    }
    await addContent(
      new File(
        [new Blob([textinput.value], { type: "text/plain" })],
        `message${links.length}.txt`
      )
    );
    textinput.value = "";
  };

  const embedContent = async (e: Event) => {
    const file = original;
    if (!file) return;
    if (links.length == 0) return;
    const type = file.type;
    try {
      const proc = processors
        .filter((e) => e.inject)
        .find((e) => e.match(file.name));
      if (!proc) throw new Error("Container filetype not supported");
      const buff = await proc.inject!(file, links.slice(0, $settings.maxe));
      currentEmbed = {
        file: new File([buff], file.name, { type }),
      } as { file: File };
      document.dispatchEvent(
        new CustomEvent("QRSetFile", {
          detail: currentEmbed,
        })
      );
      fireNotification(
        "success",
        `File${links.length > 1 ? "s" : ""} successfully embedded!`
      );
    } catch (err) {
      const e = err as Error;
      fireNotification("error", "Couldn't embed file: " + e.message);
    }
  };

  const embedFile = async (e: Event) => {
    const input = document.createElement("input") as HTMLInputElement;
    input.setAttribute("type", "file");
    input.multiple = true;
    input.onchange = async (ev) => {
      if (input.files) {
        addContent(...input.files);
      }
    };
    input.click();
  };
</script>

<div class="root">
  <!-- svelte-ignore a11y-missing-attribute -->
  <a on:click={embedFile} title="Add a file">
    <i class="fa fa-magnet"> {$appState.is4chanX ? "" : "🧲"} </i>
  </a>
  <div class="additionnal">
    <!-- svelte-ignore a11y-missing-attribute -->
    <a
      on:click={embedText}
      title="Add a message (this uses the content of the comment text box)"
    >
      <i class="fa fa-pencil"> {$appState.is4chanX ? "" : "🖉"} </i>
    </a>
    {#if links.length}
      <!-- svelte-ignore a11y-missing-attribute -->
      <a
        on:click={() => ((links = []), restore())}
        title="Discard ALL {links.length} files"
      >
        <i class="fa fa-times"> {$appState.is4chanX ? "" : "❌"} </i>
      </a>
    {/if}
  </div>
</div>

<style scoped>
  a i {
    font-style: normal;
  }
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
