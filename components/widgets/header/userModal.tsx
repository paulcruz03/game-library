import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useDialog } from "@/app/context"
import LoginForm from "../account/loginForm"
import RegisterForm from "../account/registerForm"
import ForgotPasswordForm from "../account/forgotPasswordForm"

export function UserModal({
  mode = "login",
  children,
}: {
  mode?: "login" | "signup" | "forgot"
  children?: React.ReactNode
}) {
  const { activeDialog, openDialog, closeDialog } = useDialog()
  const isOpen = activeDialog === mode

  const titleMap = {
    login: "Login",
    signup: "Register",
    forgot: "Reset Password",
  }

  const descriptionMap = {
    login: "Enter your email and password to access your account.",
    signup: "Fill out the form below to create a new account.",
    forgot: "We’ll email you a link to reset your password.",
  }

  const renderForm = (mode: "login" | "signup" | "forgot") => {
    switch (mode) {
      case "forgot": {
        return <ForgotPasswordForm />
      }
      case "signup": {
        return <RegisterForm />
      }
      default: {
        return <LoginForm />
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (open ? openDialog(mode) : closeDialog())}>
      <DialogTrigger asChild onClick={() => openDialog(mode)}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{titleMap[mode]}</DialogTitle>
          <DialogDescription>{descriptionMap[mode]}</DialogDescription>
        </DialogHeader>
        {renderForm(mode)}
      </DialogContent>
    </Dialog>
  )
}
