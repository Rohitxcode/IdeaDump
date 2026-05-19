'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { useState } from 'react'

export function Navbar({ userEmail }: { userEmail?: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-purple-500/20 bg-black/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              IdeaDump
            </div>
          </div>
          <div className="flex items-center gap-4">
            {userEmail && <span className="text-sm text-gray-400">{userEmail}</span>}
            <Button
              onClick={handleLogout}
              disabled={isLoading}
              variant="outline"
              className="border-purple-500/30 text-purple-400 hover:bg-purple-950/50"
            >
              {isLoading ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
