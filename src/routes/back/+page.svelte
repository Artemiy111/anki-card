<script lang="ts">
  import { card } from '$lib/card'
</script>

<main class="mx-auto min-h-dvh w-fit my-10 dark:bg-slate-800">
  <div
    class="flex min-h-60 w-lg flex-col items-center gap-6 rounded-4xl bg-slate-50 p-12 pt-10 text-xl dark:bg-slate-950 dark:text-white"
  >
    <section class="flex w-full flex-col gap-y-4">
      <h1 class="text-center text-3xl font-bold">{@html card.expression}</h1>

      <div class="grid grid-cols-[1fr_min-content] items-baseline gap-4">
        <div class="dark:text-slate-200">
          {@html card.sentence}
        </div>
        <label class="relative cursor-pointer text-violet-500">
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
          <div class="absolute invisible">{@html card['sentence-audio']}</div>
        </label>
      </div>
      <label for="translation" class=" text-slate-600 dark:text-slate-500">
        <input type="checkbox" name="" id="translation" class="peer hidden appearance-none" />
        <div
          class="cursor-pointer rounded-lg bg-slate-200 text-transparent transition peer-checked:bg-transparent peer-checked:text-slate-600"
        >
          {@html card['sentence-translation']}
        </div>
      </label>
    </section>
    <div class="[&>img]:w-full [&>img]:rounded-3xl">
      {@html card.image}
    </div>
    <section class="flex flex-col gap-y-4">
      <div class="grid grid-cols-[min-content_1fr] gap-4 text-slate-800 dark:text-slate-200">
        <div class="h-full w-1 bg-violet-500"></div>
        {@html card.notes}
      </div>
      <div class="text-lg w-full p-0">
        {@html card.meaning}
      </div>
      <div class="">
        <div class="relative w-fit text-violet-500">
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
            class="lucide lucide-link-icon lucide-link"
            ><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path
              d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
            /></svg
          >
          <span
            class="absolute inset-0 z-1 w-full text-transparent overflow-hidden whitespace-nowrap" 
          >
            {@html card.url}
          </span>
        </div>
      </div>
    </section>
  </div>
</main>
