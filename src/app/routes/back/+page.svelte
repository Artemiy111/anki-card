<script lang="ts">
  import { card } from '~/shared/lib/card'
</script>

<main
  class="xs:text-lg text-text bg-backgound absolute inset-x-0 top-0 grid h-max w-full items-center justify-center py-16 text-base"
>
  <div
    class="bg-card-background flex min-h-60 w-[min(100dvw-8*var(--spacing),var(--container-lg))] flex-col items-center gap-4 rounded-4xl p-8 pt-7 sm:p-12 sm:pt-10 lg:w-xl"
  >
    <section class="flex w-full flex-col gap-y-4">
      <h1 class="xs:text-3xl text-center text-2xl font-bold">{@html card.expression}</h1>

      <div class="grid grid-cols-[1fr_min-content]">
        <div class="dark:text-slate-200">
          {@html card.sentence}
        </div>
        {#if card['sentence-audio']}
          <div class="text-primary relative ml-4 cursor-pointer">
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
            <div class="hidden">{@html card['sentence-audio']}</div>
          </div>
        {/if}
      </div>
      <label for="translation">
        <input
          type="checkbox"
          name="translation"
          id="translation"
          class="peer hidden appearance-none"
        />
        <div
          class="peer-checked:text-text-translation cursor-pointer rounded-lg bg-slate-200 text-transparent transition peer-checked:bg-transparent dark:bg-slate-700"
        >
          {@html card['sentence-translation']}
        </div>
      </label>
    </section>

    {#if card.image}
      <div class="[&>img]:w-full [&>img]:rounded-3xl">
        {@html card.image}
      </div>
    {/if}

    <section class="flex w-full flex-col gap-y-4">
      {#if card.notes}
        <div class="text-text-notes grid grid-cols-[min-content_1fr] gap-4">
          <div class="bg-primary h-full w-1"></div>
          {@html card.notes}
        </div>
      {/if}

      <div class="xs:text-base w-full p-0 text-sm">
        {@html card.meaning}
      </div>

      <div class="">
        <div class="text-primary relative w-fit">
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
            class="text-card-background absolute inset-0 z-1 w-full overflow-hidden whitespace-nowrap"
          >
            {@html card.url}
          </span>
        </div>
      </div>
    </section>
  </div>
</main>
