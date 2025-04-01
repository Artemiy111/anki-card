<script lang="ts">
  import ReverseButton from '../components/reverse-button.svelte'
  import CodeDialogButton from '../components/code-dialog-button.svelte';
  import '../app.css'

  let { children } = $props()
</script>

<div class="">
  {@render children()}
  <div class="fixed flex flex-col gap-4 right-[calc(8*var(--spacing)+100%-100dvw)] bottom-4 lg:right-[calc(50%-var(--container-xl)/2-24px-50px)]">
  <ReverseButton  />
  <CodeDialogButton />
  </div>
</div>
