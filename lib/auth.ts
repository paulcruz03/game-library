'use server'

import { createSupaServerClient } from '@/utils/supabase'
import { createSupaClient } from '@/utils/supabase-client'
import { Session } from '@supabase/supabase-js'

export async function login(values: { email: string, password: string }) {
  const supabase = await createSupaServerClient()
  return await supabase.auth.signInWithPassword(values)
}

export async function session() {
  const supabase = await createSupaServerClient()
  return await supabase.auth.getUser()
}

export async function logout() {
  const supabase = await createSupaServerClient()
  return await supabase.auth.signOut()
}

export async function signup(values: { email: string, password: string }) {
  const supabase = await createSupaServerClient()
  return await supabase.auth.signUp({ ...values, options: { emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL! } })
}

export async function resetPassword(values: { email: string }) {
  const supabase = await createSupaServerClient()
  return await supabase.auth.resetPasswordForEmail(values.email, { redirectTo: process.env.NEXT_PUBLIC_SITE_URL! })
}

export async function recoverPassword(values: { password: string }) {
  const supabase = await createSupaClient()
  return await supabase.auth.updateUser({ password: values.password })
}

export async function setSession({ access_token, refresh_token }: Session) {
  const supabase = await createSupaServerClient()
  return await supabase.auth.setSession({ access_token, refresh_token })
}