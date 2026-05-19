'use client'

import { Lightbulb } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description?: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-purple-500/20 bg-purple-950/20 p-12 text-center">
      <Lightbulb className="mb-4 h-12 w-12 text-purple-400/50" />
      <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
      {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
    </div>
  )
}
