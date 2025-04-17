import { type EmailOtpType } from '@supabase/supabase-js'

import { createSupaServerClient } from '@/utils/supabase'
import ConfirmAccount from '@/components/widgets/account/confirmAccount';
import { notFound } from 'next/navigation';

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] } }) {
  const { token_hash, type } = await searchParams;
  const tokenHash = Array.isArray(token_hash) ? token_hash[0] : token_hash;

  if (token_hash && type) {
    const supabase = await createSupaServerClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type: type as EmailOtpType,
      token_hash: tokenHash,
    });

    return (
      <div>
        <ConfirmAccount data={data} error={error} />
      </div>
    );
  }

  return notFound();
}