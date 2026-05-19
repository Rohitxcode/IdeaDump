'use client'

import { Idea } from '@/lib/types'
import { motion } from 'framer-motion'
import { Heart, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'

interface IdeaCardProps {
  idea: Idea
  onToggleFavorite?: (ideaId: string) => Promise<void>
  onDelete?: (ideaId: string) => Promise<void>
}

export function IdeaCard({ idea, onToggleFavorite, onDelete }: IdeaCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!onToggleFavorite) return
    setIsFavoriteLoading(true)
    try {
      await onToggleFavorite(idea.id)
    } finally {
      setIsFavoriteLoading(false)
    }
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!onDelete || !confirm('Are you sure you want to delete this idea?')) return
    setIsDeleteLoading(true)
    try {
      await onDelete(idea.id)
    } finally {
      setIsDeleteLoading(false)
    }
  }

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group relative overflow-hidden rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-950/40 to-black/40 p-6 backdrop-blur transition-all duration-300"
    >
      {/* Glow effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0"
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white line-clamp-2">
              {idea.title}
            </h3>
            {idea.description && (
              <p className="mt-2 text-sm text-gray-400 line-clamp-3">
                {idea.description}
              </p>
            )}
          </div>
        </div>

        {idea.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {idea.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between gap-2 pt-2 text-xs text-gray-500">
          <span>
            {new Date(idea.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleToggleFavorite}
              disabled={isFavoriteLoading}
              className="h-8 w-8 p-0 text-gray-400 hover:bg-purple-500/20 hover:text-pink-400"
            >
              <Heart
                className="h-4 w-4"
                fill={idea.is_favorite ? 'currentColor' : 'none'}
              />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDelete}
              disabled={isDeleteLoading}
              className="h-8 w-8 p-0 text-gray-400 hover:bg-red-500/20 hover:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
