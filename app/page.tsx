import Link from 'next/link'

import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/menu');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div>
        <Link href="/menu">Menu</Link>
      </div>
    </main>
  )
}
