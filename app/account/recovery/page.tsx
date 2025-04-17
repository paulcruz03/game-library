

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ResetPasswordForm from "@/components/widgets/account/resetPasswordForm"
import { createSupaServerClient } from "@/utils/supabase";
import { EmailOtpType } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] }> }) {
  const { token_hash, type } = await searchParams;
  const tokenHash = Array.isArray(token_hash) ? token_hash[0] : token_hash;
  const typeVal = Array.isArray(type) ? type[0] : type;

  if (!tokenHash || !type) {
    return notFound();
  }

  const supabase = await createSupaServerClient()
  const { data, error } = await supabase.auth.verifyOtp({
    type: typeVal as EmailOtpType,
    token_hash: tokenHash,
  })

  console.log(data)
  if (error) {
    return notFound();
  }

  return (
    <Card className="w-[350px] mx-auto my-10">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter new password</CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm />
      </CardContent>
    </Card>
  )
}