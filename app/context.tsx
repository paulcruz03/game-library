'use client'
import { createContext, useContext, useState, ReactNode } from "react"

type DialogType = "login" | "signup" | "forgot" | null

interface DialogContextProps {
  activeDialog: DialogType
  openDialog: (type: DialogType) => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogContextProps | undefined>(undefined)

export function DialogProvider({ children }: { children: ReactNode }) {
  const [activeDialog, setActiveDialog] = useState<DialogType>(null)

  const openDialog = (type: DialogType) => setActiveDialog(type)
  const closeDialog = () => setActiveDialog(null)

  return (
    <DialogContext.Provider value={{ activeDialog, openDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  )
}

export function useDialog() {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider")
  }
  return context
}
