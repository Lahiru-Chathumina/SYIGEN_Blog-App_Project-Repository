import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">BlogApp</Link>
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  )
}