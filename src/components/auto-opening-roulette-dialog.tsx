'use client'

import { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import RouletteWheel from '@/components/roulette-wheel'
import { Button } from '@/components/ui/button'

export function AutoOpeningRouletteDialog() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>¡Ruleta de premios!</AlertDialogTitle>
          <AlertDialogDescription>
            Toma captura de tu premio y preséntalo en la academia para reclamarlo
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center my-4">
          <RouletteWheel />
        </div>
        <div className="flex justify-end">
          <Button onClick={() => setIsOpen(false)}>Cerrar</Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}