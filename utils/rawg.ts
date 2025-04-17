export async function request(path: string, params: object, options: RequestInit): Promise<Response | null> {
  if (!process.env.NEXT_PUBLIC_RAWG_API || !process.env.NEXT_PUBLIC_RAWG_API_KEY) {
    return null
  }

  const url = new URL(`${process.env.NEXT_PUBLIC_RAWG_API}${path}`)
  url.searchParams.append('key', process.env.NEXT_PUBLIC_RAWG_API_KEY)
  for (const [key, value] of Object.entries(params)) {
    if (value) {
      url.searchParams.append(key, value)
    }
  }
  return fetch(url, options)
}