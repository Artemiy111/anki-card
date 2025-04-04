<script lang="ts">
  import { card } from '$lib/card'
</script>

<main
  class="xs:text-lg absolute inset-x-0 top-0 grid h-max w-full items-center justify-center py-16 text-base dark:bg-slate-800"
>
  <div
    class="flex min-h-60 w-[min(100dvw-8*var(--spacing),var(--container-lg))] flex-col items-center gap-4 rounded-4xl bg-slate-50 p-8 pt-7 sm:p-12 sm:pt-10 lg:w-xl dark:bg-slate-950 dark:text-white"
  >
    <section class="flex w-full flex-col gap-y-4">
      <div class="relative">
        {#if card['expression-audio']}
          <h1 class="xs:text-3xl mx-8 text-center text-2xl font-bold">{@html card.expression}</h1>
          <label class="absolute top-2 right-0 cursor-pointer text-violet-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-play-icon lucide-play"
              ><polygon points="6 3 20 12 6 21 6 3" /></svg
            >
            <div class="hidden">{@html card['expression-audio']}</div>
          </label>
        {:else}
          <h1 class="xs:text-3xl text-center text-2xl font-bold">{@html card.expression}</h1>
        {/if}
      </div>
      <div class="text-slate-500 dark:text-slate-400">
        <span>{@html card['cloze-prefix']}</span>
        <span class="text-violet-500">{@html card['cloze-body']}</span>
        <span>{@html card['cloze-suffix']}</span>
      </div>
    </section>
  </div>
</main>
