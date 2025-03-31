<script lang="ts">
  import { card } from '$lib/card'
</script>

<main class="grid h-dvh w-full items-center justify-center dark:bg-slate-800">
  <div
    class="flex min-h-60 w-lg flex-col items-center gap-4 rounded-4xl bg-slate-50 p-12 pt-10 dark:bg-slate-950 dark:text-white"
  >
    <section class="flex w-full flex-col gap-y-4">
      <div class="relative">
        <h1 class="mx-8 text-center text-3xl font-bold">{@html card.expression}</h1>
        <div class="absolute top-2 right-0 cursor-pointer text-violet-500">
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
            class="lucide lucide-play-icon lucide-play"><polygon points="6 3 20 12 6 21 6 3" /></svg
          >
          <div class="hidden">{@html card['expression-audio']}</div>
        </div>
      </div>
      <div class="text-xl text-slate-600 dark:text-slate-200">
        <span>{@html card['cloze-prefix']}</span>
        <span class="font-semibold text-violet-500">{@html card['cloze-body']}</span>
        <span>{@html card['cloze-suffix']}</span>
      </div>
    </section>
  </div>
</main>
