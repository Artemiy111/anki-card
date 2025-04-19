<script lang="ts">
  import { invalidateAll } from '$app/navigation'
  import { MoonIcon, SunIcon } from 'lucide-svelte'
  let { isDark = $bindable() }: { isDark: boolean } = $props()

  const toggleDark = async () => {
    const res = await fetch('/api/toggle-dark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isDark: !isDark }),
    })
    await invalidateAll()
    const data = await res.json() as { isDark: boolean }
    isDark = data.isDark
  }
</script>

<button
  class="flex cursor-pointer items-center justify-center gap-2 dark:text-white"
  onclick={toggleDark}
>
  {#if isDark}
    <MoonIcon />
  {:else}
    <SunIcon />
  {/if}
</button>
