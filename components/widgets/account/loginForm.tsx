"use client"; 

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { redirect } from 'next/navigation';
import { toast } from "sonner"

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
import { login } from "@/lib/auth";
import { userSchema as formSchema } from "@/lib/schema";
import { UserModal } from "../header/userModal";
import { useDialog } from "@/app/context"

export default function LoginForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { openDialog } = useDialog();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
        password: "",
    },
  });
  
  async function onLogin(values: z.infer<typeof formSchema>) {
    setIsSubmitted(true);
    const { error } = await login(values);

    if (error) {
        toast(`Error Encountered: ${error}.`);
        setIsSubmitted(false);
        return;
    }

    toast("Login Success")
    redirect('/');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onLogin)} className="space-y-6">
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
        <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                  <Button
                    type="button"
                    onClick={() => openDialog('forgot')}
                    variant="link"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Button>
                </div>

                <FormControl>
                  <Input placeholder="••••••••" {...field} type="password" />
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
              </span> : <span>Login</span>}
            </Button>
            <div className="flex text-center text-sm mt-3">
              Don&apos;t have an account?
              <UserModal mode='signup'>
                <Button className="pl-2 py-0 h-auto" variant="link">Sign Up</Button>
              </UserModal>
            </div>
          </div>
      </form>
    </Form>
  )
}