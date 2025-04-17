import { createSupaServerClient } from "@/utils/supabase";

export async function serverGetUserLibary() {
  const supabase = await createSupaServerClient()
  return await supabase
    .from('users_library')
    .select()
}

export async function getUserLibraryGameById(gameId: number) {
  const supabase = await createSupaServerClient()
  return await supabase
    .from('users_library')
    .select()
    .eq('game_id', gameId)
}