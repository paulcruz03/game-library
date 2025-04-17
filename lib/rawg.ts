import { request } from '@/utils/rawg'

export async function getGames(
  page: string = "1",
  search?: string,
  tags?: string,
  genres?: string
) {
  const searchAdditionals = search ? { search, search_precise: 'true', search_exact: 'true' } : {}
  return await request(
    '/games', 
    { page, page_size: '8', metacritic: "50,100", ordering: "-added", ...searchAdditionals, tags, genres },
    {}
  )
}

export async function getHighlyRatedGames() {
  // gets games that have high metacritic rating
  return await request(
    '/games', 
    { ordering: "-metacritic", page: "1", page_size: '20', metacritic: "90,100" },
    {}
  )
}

export async function getGameDetailsById(gameId: number) {
  return await request(`/games/${gameId}`, {}, {})
}

export async function getGameDetailBySlug(slug: string) {
  return await request(`/games/${slug}`, {}, {})
}

export async function getGameScreenShotsBySlug(slug: string) {
  return await request(`/games/${slug}/screenshots`, {}, {})
}

export async function getGameStoresBySlug(slug: string) {
  return await request(`/games/${slug}/stores`, {}, {})
}

export async function getGameSeriesBySlug(slug: string) {
  return await request(`/games/${slug}/game-series`, {}, {})
}

export async function getGameDLCsBySlug(slug: string) {
  return await request(`/games/${slug}/additions`, {}, {})
}

export async function getGameTrailerBySlug(slug: string) {
  return await request(`/games/${slug}/movies`, {}, {})
}

export async function getGameSuggestionBaseOnTagsOrGenres(
  page: string = "1",
  tags?: string,
  genres?: string
) {
  return await request(
    '/games', 
    { page, page_size: '5', metacritic: "50,100", ordering: "-added", tags, genres },
    {}
  )
}

export async function getTags(page: string = "1") {
  return await request(
    '/tags', 
    { page, page_size: '100' },
    {}
  )
}

export async function getGenre(page: string = "1") {
  return await request(
    '/genres', 
    { page, page_size: '100' },
    {}
  )
}