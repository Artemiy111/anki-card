<script lang="ts">
  import ReverseButton from '~/shared/ui/reverse-button.svelte'
  import CodeDialogButton from '~/shared/ui/code-dialog-button.svelte'
  import DarkmodeButton from '~/shared/ui/darkmode-button.svelte'
  import { PenIcon } from 'lucide-svelte'

  import '~/app/app.css'
  let { data, children } = $props()

  $effect(() => {
    if (data.isDark) document.documentElement.classList.add('nightMode')
    else document.documentElement.classList.remove('nightMode')
  })
</script>

<div class="">
  {@render children()}
  <div
    class="fixed right-[calc(8*var(--spacing)+100%-100dvw)] bottom-4 flex flex-col gap-4 lg:right-[calc(50%-var(--container-xl)/2-24px-50px)]"
  >
    <PenIcon
      class="text-text cursor-pointer"
      onclick={() => fetch('/api/anki', { method: 'POST' })}
    />
    <DarkmodeButton bind:isDark={data.isDark} />
    <ReverseButton />
    <CodeDialogButton code={data.code} />
  </div>
</div>
