import { getCode } from '$lib'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async (e) => {
  return await getCode()
}