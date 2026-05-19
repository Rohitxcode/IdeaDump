'use client'

import { motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'

interface IdeaInputProps {
  onSubmit: (title: string, description: string, tags: string[]) => Promise<void>
  isLoading?: boolean
}

export function IdeaInput({ onSubmit, isLoading }: IdeaInputProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [isSaving, setIsSaving] = useState(false)

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      const newTag = tagInput.trim().toLowerCase()
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag])
      }
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSaving(true)
    try {
      await onSubmit(title, description, tags)
      setTitle('')
      setDescription('')
      setTags([])
      setTagInput('')
      setIsExpanded(false)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-950/40 to-black/40 p-6 backdrop-blur"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <Input
            placeholder="What's your idea?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="border-purple-500/30 bg-purple-900/20 text-white placeholder:text-gray-500"
          />
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-4"
          >
            <Textarea
              placeholder="Add a description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-purple-500/30 bg-purple-900/20 text-white placeholder:text-gray-500 resize-none"
              rows={3}
            />

            <div className="flex flex-col gap-2">
              <Input
                placeholder="Add tags (press Enter)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="border-purple-500/30 bg-purple-900/20 text-white placeholder:text-gray-500"
              />
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <motion.div
                      key={tag}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center gap-2 rounded-full bg-purple-500/20 px-3 py-1"
                    >
                      <span className="text-sm text-purple-300">{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-purple-300 hover:text-purple-100"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                disabled={!title.trim() || isSaving || isLoading}
                className="flex-1 gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Plus className="h-4 w-4" />
                {isSaving || isLoading ? 'Saving...' : 'Save Idea'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsExpanded(false)
                  setTitle('')
                  setDescription('')
                  setTags([])
                  setTagInput('')
                }}
                className="border-purple-500/30 text-purple-400 hover:bg-purple-950/50"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}
