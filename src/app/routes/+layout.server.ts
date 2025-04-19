import { getCode } from '$lib'
import type { LayoutServerLoad } from './$types'

const code = await getCode()

export const load: LayoutServerLoad = async ({ cookies }) => {
  const isDark = cookies.get('isDark') === 'true'

  return {
    isDark,
    code,
  }
}
