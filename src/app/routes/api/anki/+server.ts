import { json } from '@sveltejs/kit'
import { YankiConnect } from 'yanki-connect'

const yanki = new YankiConnect()

export const POST = async ({ request }) => {
  const data = await yanki.deck.deckNames()
  console.log(data)
  return json(data)
}
