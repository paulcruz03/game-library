import { createSupaClient } from "@/utils/supabase-client"
import { User } from "@supabase/supabase-js";

export async function addToLibrary(user: User, gameId: number) {
  const supabase = await createSupaClient()
  return await supabase
    .from('users_library')
    .insert({ game_id: gameId, user_id: user.id })
}

export async function getUserLibrary() {
  const supabase = await createSupaClient()
  return await supabase
    .from('users_library')
    .select()
}

export async function getUserLibraryGameById(gameId: number) {
  const supabase = await createSupaClient()
  return await supabase
    .from('users_library')
    .select()
    .eq('game_id', gameId)
}

export async function removeFromTheLibrary(user: User, gameId: number) {
  const supabase = await createSupaClient()
  return await supabase
    .from('users_library')
    .delete()
    .eq('game_id', gameId)
    .eq('user_id', user.id)
}