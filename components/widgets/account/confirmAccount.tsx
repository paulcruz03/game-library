'use client'
import { AuthError, Session, User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ConfirmAccount({ data, error }: { data: {
  user: User | null;
  session: Session | null;
}, error: AuthError | null }) {

  useEffect(() => {
    if (!error && data.user && data.session) {
      toast('Account Confirmed')
      redirect("/")
    }
  }, [error, data])

  return <>Confirming...</>
}