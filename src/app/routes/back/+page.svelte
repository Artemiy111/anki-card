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
          <button
            type="button"
            aria-label="Воспроизвести аудио предложения"
            title="Воспроизведение доступно в Anki"
            class="text-primary relative ml-4 cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <svg
              aria-hidden="true"
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
          </button>
        {/if}
      </div>
      {#if card['sentence-translation']}
        <label for="translation" data-field="sentence-translation">
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
      {/if}
    </section>

    {#if card.image}
      <div data-field="image" class="[&>img]:w-full [&>img]:rounded-3xl">
        {@html card.image}
      </div>
    {/if}

    <section class="flex w-full flex-col gap-y-4">
      {#if card.notes}
        <div data-field="notes" class="text-text-notes grid grid-cols-[min-content_1fr] gap-4">
          <div class="bg-primary h-full w-1"></div>
          {@html card.notes}
        </div>
      {/if}

      {#if card.conjugation}
        <div data-field="conjugation" class="text-text-muted xs:text-sm w-full text-xs">
          {@html card.conjugation}
        </div>
      {/if}

      {#if card.frequencies}
        <div data-field="frequencies" class="text-text-muted xs:text-sm w-full text-xs">
          {@html card.frequencies}
        </div>
      {/if}

      <div class="xs:text-base w-full p-0 text-sm">
        {@html card.meaning}
      </div>

      {#if card.url}
        <div data-field="url" class="anki-source-link">
          {@html card.url}
        </div>
      {/if}
    </section>
  </div>
</main>
