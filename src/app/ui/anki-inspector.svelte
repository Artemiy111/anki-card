<script lang="ts">
  import { CircleAlertIcon, DatabaseSearchIcon, RefreshCwIcon, XIcon } from 'lucide-svelte'

  type InspectorSuccess = {
    available: true
    modelName: string
    fields: string[]
    noteCount: number
    comparison: {
      fields: {
        liveOnly: string[]
        localOnly: string[]
      }
      cardTemplate: {
        name: string | null
        issue: null | {
          code: 'NO_CARD_TEMPLATE' | 'MULTIPLE_CARD_TEMPLATES'
          message: string
        }
        front: ComparisonStatus
        back: ComparisonStatus
        css: ComparisonStatus
      }
    }
  }

  type ComparisonStatus = 'match' | 'different' | 'unavailable'

  type InspectorError = {
    available: boolean
    error: {
      code: 'ANKI_UNAVAILABLE' | 'MODEL_NOT_FOUND'
      message: string
    }
  }

  type InspectorState =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; data: InspectorSuccess }
    | { status: 'error'; message: string }

  let state: InspectorState = $state({ status: 'idle' })

  const statusLabel = (status: ComparisonStatus) => {
    if (status === 'match') return 'Совпадает'
    if (status === 'different') return 'Отличается'
    return 'Недоступно'
  }

  const inspect = async () => {
    state = { status: 'loading' }

    try {
      const response = await fetch('/api/anki')
      const data = (await response.json()) as InspectorSuccess | InspectorError

      if (!response.ok || 'error' in data) {
        state = {
          status: 'error',
          message:
            'error' in data ? data.error.message : 'Не удалось получить сведения об ArtMiner.',
        }
        return
      }

      state = { status: 'success', data }
    } catch {
      state = {
        status: 'error',
        message: 'Не удалось подключиться к инспектору AnkiConnect.',
      }
    }
  }
</script>

<button
  type="button"
  class="inspector-trigger"
  aria-label="Проверить тип заметки ArtMiner"
  title="Инспектор ArtMiner"
  onclick={inspect}
>
  <DatabaseSearchIcon />
</button>

{#if state.status !== 'idle'}
  <aside class="inspector-panel" aria-live="polite" aria-label="Инспектор ArtMiner">
    <header>
      <div>
        <h2>ArtMiner</h2>
        <p>Данные только для чтения из AnkiConnect</p>
      </div>
      <button
        type="button"
        class="icon-button"
        aria-label="Закрыть инспектор"
        onclick={() => (state = { status: 'idle' })}
      >
        <XIcon size={20} />
      </button>
    </header>

    {#if state.status === 'loading'}
      <div class="status loading" role="status">
        <RefreshCwIcon size={20} />
        <span>Подключаемся к AnkiConnect…</span>
      </div>
    {:else if state.status === 'error'}
      <div class="error" role="alert">
        <div class="status">
          <CircleAlertIcon size={20} />
          <p>{state.message}</p>
        </div>
        <button type="button" class="retry" onclick={inspect}>Повторить</button>
      </div>
    {:else}
      <dl>
        <dt>AnkiConnect</dt>
        <dd>доступен</dd>
        <dt>Тип заметки</dt>
        <dd>{state.data.modelName}</dd>
        <dt>Заметок</dt>
        <dd>{state.data.noteCount.toLocaleString('ru-RU')}</dd>
        <dt>Полей</dt>
        <dd>{state.data.fields.length}</dd>
      </dl>

      <h3>Поля модели</h3>
      <ol class="field-list">
        {#each state.data.fields as field (field)}
          <li><code>{field}</code></li>
        {/each}
      </ol>

      <section class="comparison">
        <h3>Расхождения полей</h3>
        {#if state.data.comparison.fields.liveOnly.length === 0 && state.data.comparison.fields.localOnly.length === 0}
          <p class="match-message">Ссылки в локальных шаблонах соответствуют полям ArtMiner.</p>
        {:else}
          {#if state.data.comparison.fields.liveOnly.length > 0}
            <h4>Есть в Anki, но не используются локально</h4>
            <ul>
              {#each state.data.comparison.fields.liveOnly as field (field)}
                <li><code>{field}</code></li>
              {/each}
            </ul>
          {/if}
          {#if state.data.comparison.fields.localOnly.length > 0}
            <h4>Есть локально, но отсутствуют в Anki</h4>
            <ul>
              {#each state.data.comparison.fields.localOnly as field (field)}
                <li><code>{field}</code></li>
              {/each}
            </ul>
          {/if}
        {/if}
      </section>

      <section class="comparison">
        <h3>Шаблон карточки</h3>
        {#if state.data.comparison.cardTemplate.name}
          <p class="template-name">{state.data.comparison.cardTemplate.name}</p>
        {/if}
        {#if state.data.comparison.cardTemplate.issue}
          <p class="comparison-warning" role="status">
            {state.data.comparison.cardTemplate.issue.message}
          </p>
        {/if}
        <dl class="template-statuses">
          <dt>Front</dt>
          <dd class={state.data.comparison.cardTemplate.front}>
            {statusLabel(state.data.comparison.cardTemplate.front)}
          </dd>
          <dt>Back</dt>
          <dd class={state.data.comparison.cardTemplate.back}>
            {statusLabel(state.data.comparison.cardTemplate.back)}
          </dd>
          <dt>CSS</dt>
          <dd class={state.data.comparison.cardTemplate.css}>
            {statusLabel(state.data.comparison.cardTemplate.css)}
          </dd>
        </dl>
      </section>
    {/if}
  </aside>
{/if}

<style>
  .inspector-trigger,
  .icon-button {
    display: flex;
    cursor: pointer;
    color: var(--color-text);
  }

  .inspector-panel {
    position: fixed;
    right: 5rem;
    bottom: 1rem;
    z-index: 20;
    width: min(calc(100dvw - 2rem), 24rem);
    max-height: calc(100dvh - 2rem);
    padding: 1.25rem;
    overflow: auto;
    color: var(--color-text);
    background: var(--color-card-background);
    border: 1px solid var(--color-slate-200);
    border-radius: 1rem;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
  }

  :global(.nightMode) .inspector-panel {
    border-color: var(--color-slate-700);
  }

  header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.125rem;
    font-weight: 700;
  }

  header p,
  dt,
  .loading {
    color: var(--color-text-muted);
  }

  header p,
  dl,
  h3,
  ol {
    font-size: 0.875rem;
  }

  .status {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .status :global(svg) {
    flex-shrink: 0;
    margin-top: 0.125rem;
  }

  .loading :global(svg) {
    animation: spin 1s linear infinite;
  }

  .error {
    color: #dc2626;
  }

  :global(.nightMode) .error {
    color: #f87171;
  }

  .retry {
    margin-top: 1rem;
    padding: 0.5rem 0.75rem;
    color: white;
    cursor: pointer;
    background: var(--color-primary);
    border-radius: 0.5rem;
  }

  dl {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5rem 0.75rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  .field-list {
    max-height: 10rem;
    overflow: auto;
    list-style-position: inside;
  }

  li {
    padding: 0.5rem 0.75rem;
    margin-bottom: 0.25rem;
    background: var(--color-slate-100);
    border-radius: 0.5rem;
  }

  :global(.nightMode) li {
    background: var(--color-slate-800);
  }

  .comparison {
    margin-top: 1.25rem;
  }

  h4,
  .template-name,
  .match-message,
  .comparison-warning {
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
  }

  h4 {
    margin-top: 0.75rem;
    color: var(--color-text-muted);
  }

  .comparison ul {
    font-size: 0.875rem;
  }

  .match-message,
  .match {
    color: #16a34a;
  }

  .comparison-warning,
  .different {
    color: #dc2626;
  }

  .unavailable {
    color: var(--color-text-muted);
  }

  :global(.nightMode) .match-message,
  :global(.nightMode) .match {
    color: #4ade80;
  }

  :global(.nightMode) .comparison-warning,
  :global(.nightMode) .different {
    color: #f87171;
  }

  .template-statuses {
    margin-bottom: 0;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 30rem) {
    .inspector-panel {
      right: 1rem;
      bottom: 4rem;
    }
  }
</style>
