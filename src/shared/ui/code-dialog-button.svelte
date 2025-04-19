<script lang="ts">
  import { CodeIcon } from 'lucide-svelte'

  let { code: data }: { code: { frontHtml: string; backHtml: string; styleHtml: string } } =
    $props()
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
  class="fixed inset-x-0 top-4 z-10 mx-auto hidden h-[calc(100dvh-8*var(--spacing))] w-2xl items-center justify-center rounded-4xl bg-slate-100 text-sm *:bg-transparent! open:block"
>
  <div
    class="relative h-[500px] w-full space-y-4 p-8 [&>pre]:h-max [&>pre]:w-full [&>pre]:overflow-auto [&>pre]:bg-transparent!"
  >
    <h3 class="text-xl font-bold">Front</h3>
    {@html data.frontHtml}
    <h3 class="text-xl font-bold">Back</h3>
    {@html data.backHtml}
    <h3 class="text-xl font-bold">Style</h3>
    {@html data.styleHtml}
  </div>
</dialog>
