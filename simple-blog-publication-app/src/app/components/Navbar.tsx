'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUserEmail(user?.email ?? null)
    }

    fetchUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUserEmail(null)
    router.push('/login')
  }

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-blue-600">
        Blog App
      </Link>

      <div className="space-x-4 flex items-center">
        <Link
          href="/"
          className={pathname === '/' ? 'text-blue-600 font-semibold' : 'text-gray-700'}
        >
          Home
        </Link>

        <Link
          href="/pricing"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-md transition"
        >
          Pricing
        </Link>

        {userEmail ? (
          <>
            <span className="text-sm text-gray-700">
               <span className="font-medium">{userEmail}</span>
            </span>
            <button
              type="button"
              aria-label="Logout"
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 text-sm ml-2 underline"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className={pathname === '/login' ? 'text-blue-600 font-semibold' : 'text-gray-700'}
            >
              Login
            </Link>
            <Link
              href="/register"
              className={pathname === '/register' ? 'text-blue-600 font-semibold' : 'text-gray-700'}
            >
              Register
            </Link>
            <span className="text-sm text-gray-400">Not logged in</span>
          </>
        )}
      </div>
    </nav>
  )
}
