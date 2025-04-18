import { getCode } from '../../shared/lib'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async (e) => {
  return await getCode()
}
