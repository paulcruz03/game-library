"use client"; 

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";
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
import { signup } from "@/lib/auth";
import { userSchema as formSchema } from "@/lib/schema";
import { UserModal } from "../header/userModal";

export default function RegisterForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        email: "",
        password: "",
    },
  });

  async function onRegister(values: z.infer<typeof formSchema>) {
    setIsSubmitted(true);
    const { error } = await signup(values);
    if (error) {
        toast("Error Encountered.");
        return;
    }

    toast("Ok. Check your email for a confirmation link.");
    setIsSubmitted(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onRegister)} className="space-y-6">
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
                <FormLabel>Password</FormLabel>
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
            </span> : <span>Register</span>}
          </Button>
          <div className="text-center text-sm mt-3">
            Already have an account?{" "}
            <UserModal mode='login'>
              <Button className="pl-2 py-0 h-auto" variant="link">Login</Button>
            </UserModal>
          </div>
        </div>
    </form>
  </Form>
)
}