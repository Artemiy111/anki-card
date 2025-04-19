import { getCode } from '~/shared/lib'
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ cookies }) => {
  const isDark = cookies.get('isDark') === 'true'
  const code = await getCode(isDark)

  return {
    isDark,
    code,
  }
}
