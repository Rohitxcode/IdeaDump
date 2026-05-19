'use client'

import {
  createIdea,
  deleteIdea,
  getIdeas,
  searchIdeas,
  toggleFavorite,
} from '@/lib/ideas'
import { Idea } from '@/lib/types'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { EmptyState } from '@/components/empty-state'
import { IdeaCard } from '@/components/idea-card'
import { IdeaInput } from '@/components/idea-input'
import { Navbar } from '@/components/navbar'
import { SearchBar } from '@/components/search-bar'

export default function DashboardPage() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string>()
  const [userId, setUserId] = useState<string>()
  const [supabase, setSupabase] = useState<any>(null)

  useEffect(() => {
    const initSupabase = async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        setSupabase(createClient())
      } catch (error) {
        console.error('[v0] Failed to initialize Supabase:', error)
      }
    }

    initSupabase()
  }, [])

  useEffect(() => {
    if (!supabase) return

    const loadUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) {
          window.location.href = '/auth/login'
          return
        }
        setUserEmail(user.email)
        setUserId(user.id)
      } catch (error) {
        console.error('[v0] Failed to load user:', error)
      }
    }

    loadUser()
  }, [supabase])

  useEffect(() => {
    const loadIdeas = async () => {
      if (!userId || !supabase) return
      try {
        setIsLoading(true)
        const data = await getIdeas(supabase, userId)
        setIdeas(data)
      } catch (error) {
        console.error('Failed to load ideas:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadIdeas()
  }, [userId, supabase])

  useEffect(() => {
    if (!searchQuery) {
      setFilteredIdeas(ideas)
      return
    }

    const filtered = ideas.filter((idea) => {
      const query = searchQuery.toLowerCase()
      return (
        idea.title.toLowerCase().includes(query) ||
        (idea.description?.toLowerCase().includes(query) ?? false) ||
        idea.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    })

    setFilteredIdeas(filtered)
  }, [searchQuery, ideas])

  const handleAddIdea = async (title: string, description: string, tags: string[]) => {
    if (!userId || !supabase) return
    try {
      const newIdea = await createIdea(supabase, userId, { title, description, tags })
      setIdeas([newIdea, ...ideas])
    } catch (error) {
      console.error('Failed to create idea:', error)
      alert('Failed to save idea. Please try again.')
    }
  }

  const handleToggleFavorite = async (ideaId: string) => {
    if (!userId || !supabase) return
    try {
      const updated = await toggleFavorite(supabase, userId, ideaId)
      setIdeas(ideas.map((idea) => (idea.id === ideaId ? updated : idea)))
    } catch (error) {
      console.error('Failed to toggle favorite:', error)
    }
  }

  const handleDeleteIdea = async (ideaId: string) => {
    if (!userId || !supabase) return
    try {
      await deleteIdea(supabase, userId, ideaId)
      setIdeas(ideas.filter((idea) => idea.id !== ideaId))
    } catch (error) {
      console.error('Failed to delete idea:', error)
      alert('Failed to delete idea. Please try again.')
    }
  }

  return (
    <div className="min-h-svh bg-black">
      <Navbar userEmail={userEmail} />

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Your Ideas</h1>
          <p className="text-gray-400">Capture and manage all your creative thoughts</p>
        </motion.div>

        {/* Input Form */}
        <div className="mb-8">
          <IdeaInput onSubmit={handleAddIdea} />
        </div>

        {/* Search Bar */}
        {ideas.length > 0 && (
          <div className="mb-8">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        )}

        {/* Ideas Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500/20 border-t-purple-500" />
          </div>
        ) : filteredIdeas.length === 0 ? (
          <EmptyState
            title={searchQuery ? 'No ideas found' : 'No ideas yet'}
            description={
              searchQuery
                ? "Try a different search term"
                : "Create your first idea to get started"
            }
          />
        ) : (
          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {filteredIdeas.map((idea, index) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <IdeaCard
                  idea={idea}
                  onToggleFavorite={handleToggleFavorite}
                  onDelete={handleDeleteIdea}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  )
}
