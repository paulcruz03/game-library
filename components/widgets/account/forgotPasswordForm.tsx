import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { resetPassword } from "@/lib/auth";

const formSchema = z.object({
  email: z.string().email({
      message: "Please enter a valid email address.",
  })
});

export default function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
    },
  });
  
  async function onReset(values: z.infer<typeof formSchema>) {
    setIsSubmitted(true);
    const { error } = await resetPassword(values);
    if (error) {
        toast(`Error Encountered: ${error}.`);
        return;
    }

    toast(`Email sent to ${values.email} to reset password.`);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onReset)} className="space-y-6">
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input placeholder="you@example.com" {...field} type="email" />
                </FormControl>
                <FormMessage /> {/* Displays validation errors */}
              </FormItem>
            )}
          />
          <div className="block">
            <Button disabled={isSubmitted} type="submit" className="w-full">
                {isSubmitted ? <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" />
                    Please wait
                </span> : <span>Reset Password</span>}
            </Button>
          </div>
      </form>
    </Form>
  )
}