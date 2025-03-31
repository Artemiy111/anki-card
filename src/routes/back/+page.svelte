<script lang="ts">
import {card} from '$lib/card';
</script>

<main class="grid min-h-dvh w-full py-10 items-center justify-center dark:bg-slate-800">
	<div
		class="text-xl flex min-h-60 w-lg flex-col items-center gap-6 rounded-4xl bg-slate-50 p-12 pt-10 dark:bg-slate-950 dark:text-white"
	>
		<section class="flex w-full flex-col gap-y-4">
			<h1 class="text-center text-3xl font-bold">{@html card.expression}</h1>

			<div class="grid grid-cols-[1fr_min-content] items-baseline gap-4">
				<div class="dark:text-slate-200">
					{@html card.sentence}
				</div>
				<div class="cursor-pointer text-violet-500">
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
			<label for="translation" class=" text-slate-600 dark:text-slate-500 ">
				<input type="checkbox" name="" id="translation" class="peer appearance-none hidden ">
				<div class="peer-checked:text-slate-600 peer-checked:bg-transparent transition cursor-pointer text-transparent bg-slate-200 rounded-lg">
					{@html card['sentence-translation']}
				</div>
			</label>
		</section>
		<div class="[&>img]:w-full [&>img]:rounded-3xl">
			{@html card.image}
		</div>
    <section class="flex flex-col gap-y-4">
      <div class="grid gap-4 grid-cols-[min-content_1fr] text-slate-800 dark:text-slate-200">
        <div class="h-full w-1 bg-violet-500"></div>
        {@html card.notes}
      </div>
      <div class="text-lg">
        {@html card.meaning}
      </div>
      <div class="">
        <div class="relative text-violet-500 w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link-icon lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          <span class="[&>a]:overflow-hidden [&>a]:whitespace-nowrap text-transparent absolute inset-0 w-full h-full z-1">
            {@html card.url}
          </span>
        </div>        
      </div>
    </section>
	</div>
</main>
