<script lang="ts">
  import { CodeIcon, CopyIcon } from 'lucide-svelte'

  let { code: data }: { code: { frontHtml: string; backHtml: string; styleHtml: string } } =
    $props()

  const copyCode = (codeId: string) => {
    const code = document.getElementById(codeId)
    navigator.clipboard.writeText(code?.innerText ?? '')
  }
</script>

<button
  popovertarget="code-dialog"
  popovertargetaction="show"
  class="cursor-pointer dark:text-white"
>
  <CodeIcon />
</button>
<dialog
  popover
  onclick={(e) => {
    const dialog = e.target as HTMLDialogElement
    dialog.close()
  }}
  id="code-dialog"
  class="text-text fixed inset-x-0 top-4 z-10 mx-auto hidden h-[calc(100dvh-8*var(--spacing))] w-2xl items-center justify-center rounded-4xl bg-slate-100 text-sm *:bg-transparent! open:block dark:bg-slate-700"
>
  <div
    class="relative h-[500px] w-full space-y-4 p-8 [&>div>pre]:h-max [&>div>pre]:w-full [&>div>pre]:overflow-auto [&>pre]:bg-transparent!"
  >
    <div class="flex justify-between">
      <h3 class="text-xl font-bold">Front</h3>
      <button class="cursor-pointer" onclick={() => copyCode('code-front')}>
        <CopyIcon />
      </button>
    </div>
    <div id="code-front">
      {@html data.frontHtml}
    </div>

    <div class="flex justify-between">
      <h3 class="text-xl font-bold">Front</h3>
      <button class="cursor-pointer" onclick={() => copyCode('code-back')}>
        <CopyIcon />
      </button>
    </div>
    <div id="code-back">
      {@html data.backHtml}
    </div>

    <div class="flex justify-between">
      <h3 class="text-xl font-bold">Style</h3>
      <button class="cursor-pointer" onclick={() => copyCode('code-style')}>
        <CopyIcon />
      </button>
    </div>
    <div id="code-style">
      {@html data.styleHtml}
    </div>
  </div>
</dialog>
