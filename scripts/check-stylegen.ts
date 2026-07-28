import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const projectRoot = join(import.meta.dirname, '..')
const generatedStylesheet = join(projectRoot, 'src/shared/assets/style.css')
const temporaryDirectory = mkdtempSync(join(tmpdir(), 'anki-card-stylegen-'))
const firstOutput = join(temporaryDirectory, 'first.css')
const secondOutput = join(temporaryDirectory, 'second.css')

const generate = (output: string) => {
  const result = Bun.spawnSync(
    ['bun', 'x', '@tailwindcss/cli', '-i', './src/app/app.css', '-o', output, '--silent'],
    { cwd: projectRoot, stdout: 'inherit', stderr: 'inherit' },
  )

  if (!result.success) process.exit(result.exitCode)
}

try {
  generate(firstOutput)
  generate(secondOutput)

  const committed = readFileSync(generatedStylesheet, 'utf8')
  const first = readFileSync(firstOutput, 'utf8')
  const second = readFileSync(secondOutput, 'utf8')

  if (first !== second) {
    throw new Error('Повторная генерация Tailwind CSS дала разные результаты')
  }

  if (committed !== first) {
    throw new Error('style.css устарел: выполните bun run stylegen')
  }

  const forbiddenFixtureFragments = ['\\[sound\\:', 'yomitan_audio_', 'data-sc-content']
  for (const fragment of forbiddenFixtureFragments) {
    if (first.includes(fragment)) {
      throw new Error(`В style.css найден фрагмент данных fixture: ${fragment}`)
    }
  }

  const requiredSelectors = [
    '.bg-backgound',
    '.peer-checked\\:text-text-translation',
    '.dark\\:text-slate-200',
    '.xs\\:text-3xl',
    '.\\[\\&\\>img\\]\\:rounded-3xl',
    '.h-\\[calc\\(100dvh-8\\*var\\(--spacing\\)\\)\\]',
  ]
  for (const selector of requiredSelectors) {
    if (!first.includes(selector)) {
      throw new Error(`В style.css отсутствует обязательный селектор: ${selector}`)
    }
  }

  console.log('Tailwind CSS воспроизводим и содержит только ожидаемые источники')
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true })
}
