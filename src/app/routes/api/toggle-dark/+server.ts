export const POST = async ({ request, cookies }) => {
  const data = (await request.json()) as { isDark: boolean }
  cookies.set('isDark', data.isDark.toString(), { path: '/' })
  return new Response(JSON.stringify({ isDark: data.isDark }))
}
