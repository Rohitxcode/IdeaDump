'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Lightbulb, Lock, Zap } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { createClient } = await import('@/lib/supabase/client')
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setIsLoggedIn(!!user)
      } catch (error) {
        console.error('[v0] Failed to check user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkUser()
  }, [])

  return (
    <div className="min-h-svh bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-purple-500/20 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              IdeaDump
            </div>
            <div className="flex gap-4">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button
                      variant="outline"
                      className="border-purple-500/30 text-purple-400 hover:bg-purple-950/50"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/sign-up">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-6 text-5xl sm:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-600 to-purple-400 bg-clip-text text-transparent">
                Capture Every Idea
              </span>
              <br />
              <span className="text-gray-300">As It Comes</span>
            </h1>

            <p className="mb-8 text-xl text-gray-400 max-w-2xl mx-auto">
              IdeaDump is your personal space to collect, organize, and manage all your
              brilliant ideas. Never lose a creative spark again.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href={isLoggedIn ? '/dashboard' : '/auth/sign-up'}>
                <Button className="gap-2 h-12 px-8 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  {isLoggedIn ? 'Go to Dashboard' : 'Start for Free'}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-20 rounded-lg border border-purple-500/20 bg-gradient-to-b from-purple-950/40 to-black/40 p-8 backdrop-blur"
          >
            <div className="aspect-video rounded bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center">
              <Lightbulb className="h-20 w-20 text-purple-400/30" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 border-t border-purple-500/10">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why IdeaDump?</h2>
            <p className="text-gray-400 text-lg">
              Everything you need to capture and organize your ideas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Capture ideas instantly with our quick-capture interface',
              },
              {
                icon: Lock,
                title: 'Secure & Private',
                description:
                  'Your ideas are encrypted and visible only to you',
              },
              {
                icon: Lightbulb,
                title: 'Organized',
                description: 'Tag, search, and organize all your brilliant thoughts',
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-lg border border-purple-500/20 bg-purple-950/20 p-8 backdrop-blur hover:border-purple-500/40 transition-colors"
                >
                  <Icon className="h-10 w-10 text-purple-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8 border-t border-purple-500/10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-4xl font-bold text-white">
              Ready to start dumping ideas?
            </h2>
            <p className="mb-8 text-xl text-gray-400">
              Join thousands of creators capturing and sharing their brilliant ideas
            </p>

            {!isLoggedIn && (
              <Link href="/auth/sign-up">
                <Button className="gap-2 h-12 px-8 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Create Free Account
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center text-gray-500 text-sm">
          <p>&copy; 2024 IdeaDump. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
