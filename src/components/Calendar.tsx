'use client'

import { useState } from 'react'

interface CalendarProps {
  selectedDate: Date
  onDateSelect: (date: Date) => void
}

export default function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() => new Date(selectedDate))
  
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i)

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))
  }

  return (
    <div className="calendar bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 p-4">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={handlePrevMonth} 
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-500 dark:text-zinc-400 transition-colors"
        >
          ←
        </button>
        <h2 className="text-base font-semibold">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <button 
          onClick={handleNextMonth} 
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-500 dark:text-zinc-400 transition-colors"
        >
          →
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-zinc-400 dark:text-zinc-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {emptyDays.map(day => (
          <div key={`empty-${day}`} className="h-9" />
        ))}
        {days.map(day => {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
          const isSelected = 
            selectedDate.getDate() === day && 
            selectedDate.getMonth() === currentMonth.getMonth() && 
            selectedDate.getFullYear() === currentMonth.getFullYear()
          const isToday = 
            new Date().getDate() === day &&
            new Date().getMonth() === currentMonth.getMonth() &&
            new Date().getFullYear() === currentMonth.getFullYear()

          return (
            <button
              key={day}
              onClick={() => onDateSelect(date)}
              className={`
                relative h-9 w-full rounded-full flex items-center justify-center text-sm
                transition-all duration-200
                ${isSelected 
                  ? 'bg-black text-white dark:bg-white dark:text-black font-medium shadow-lg hover:bg-black/90 dark:hover:bg-white/90' 
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100'}
                ${isToday && !isSelected ? 'font-semibold' : ''}
              `}
            >
              {day}
              {isToday && !isSelected && (
                <span className="absolute bottom-1.5 h-1 w-1 bg-blue-500 rounded-full" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}