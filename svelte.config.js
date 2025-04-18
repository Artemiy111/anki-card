import adapter from '@sveltejs/adapter-node'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
// import { type Config } from '@sveltejs/kit'

/** @type {import('@sveltejs/kit').Config}*/
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    files: {
      routes: 'src/app/routes',
      lib: 'src',
      appTemplate: 'src/app/app.html',
      assets: 'public'
    },
    alias: {
      '@/*': 'src/*'
    }
  }
}

export default config