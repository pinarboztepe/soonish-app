'use client'

import { useState } from 'react'
import Calendar from '../components/Calendar'  // Alternative import path

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <main className="h-screen flex">
      <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 p-4">
        <h1 className="text-2xl font-semibold mb-6">Days</h1>
        <Calendar 
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      </aside>

      <section className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="What's on your mind?"
            className="w-full bg-transparent text-3xl font-light focus:outline-none"
          />
        </div>
      </section>
    </main>
  )
}
