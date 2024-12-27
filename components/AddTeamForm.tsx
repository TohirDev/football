'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const leagues = [
  { id: 1, name: 'Premier League' },
  { id: 2, name: 'La Liga' },
  { id: 3, name: 'Bundesliga' },
  { id: 4, name: 'Serie A' },
  { id: 5, name: 'Ligue 1' },
]

export function AddTeamForm() {
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [foundedYear, setFoundedYear] = useState('')
  const [stadium, setStadium] = useState('')
  const [capacity, setCapacity] = useState('')
  const [manager, setManager] = useState('')
  const [leagueId, setLeagueId] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newTeam = {
      id: Date.now(),
      name,
      city,
      founded_year: parseInt(foundedYear),
      stadium,
      capacity: parseInt(capacity),
      manager,
      league_id: parseInt(leagueId),
      players: [],
      recent_results: [],
    }

    // Get existing teams from local storage
    const existingTeams = JSON.parse(localStorage.getItem('teams') || '[]')
    
    // Add new team
    const updatedTeams = [...existingTeams, newTeam]
    
    // Save to local storage
    localStorage.setItem('teams', JSON.stringify(updatedTeams))

    // Reset form
    setName('')
    setCity('')
    setFoundedYear('')
    setStadium('')
    setCapacity('')
    setManager('')
    setLeagueId('')

    // Refresh the page to show the new team
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Team Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="foundedYear" className="block text-sm font-medium text-gray-700">Founded Year</label>
        <input
          type="number"
          id="foundedYear"
          value={foundedYear}
          onChange={(e) => setFoundedYear(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="stadium" className="block text-sm font-medium text-gray-700">Stadium</label>
        <input
          type="text"
          id="stadium"
          value={stadium}
          onChange={(e) => setStadium(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacity</label>
        <input
          type="number"
          id="capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="manager" className="block text-sm font-medium text-gray-700">Manager</label>
        <input
          type="text"
          id="manager"
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="league" className="block text-sm font-medium text-gray-700">League</label>
        <select
          id="league"
          value={leagueId}
          onChange={(e) => setLeagueId(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select a league</option>
          {leagues.map((league) => (
            <option key={league.id} value={league.id}>
              {league.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Add Team
      </button>
    </form>
  )
}

