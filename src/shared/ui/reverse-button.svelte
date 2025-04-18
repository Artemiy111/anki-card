<script lang="ts">
  import { ArrowBigRightIcon, ArrowBigLeftIcon } from 'lucide-svelte'

  import { page } from '$app/state'

  let isBack = $derived(page.url.pathname === '/back')
</script>

<a href={isBack ? '/' : '/back'} class={['cursor-pointer text-violet-500']}>
  {#if isBack}
    <ArrowBigLeftIcon />
  {:else}
    <ArrowBigRightIcon />
  {/if}
</a>
