'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AddTeamForm } from '../components/AddTeamForm'

const leagues = {
  1: 'Premier League',
  2: 'La Liga',
  3: 'Bundesliga',
  4: 'Serie A',
  5: 'Ligue 1'
}

const initialTeams = [
  { id: 1, name: 'Manchester United', city: 'Manchester', founded_year: 1878, stadium: 'Old Trafford', capacity: 74140, manager: 'Erik ten Hag', league_id: 1 },
  { id: 2, name: 'Liverpool', city: 'Liverpool', founded_year: 1892, stadium: 'Anfield', capacity: 53394, manager: 'Jürgen Klopp', league_id: 1 },
  { id: 3, name: 'Arsenal', city: 'London', founded_year: 1886, stadium: 'Emirates Stadium', capacity: 60704, manager: 'Mikel Arteta', league_id: 1 },
  { id: 4, name: 'Barcelona', city: 'Barcelona', founded_year: 1899, stadium: 'Camp Nou', capacity: 99354, manager: 'Xavi', league_id: 2 },
  { id: 5, name: 'Real Madrid', city: 'Madrid', founded_year: 1902, stadium: 'Santiago Bernabéu', capacity: 81044, manager: 'Carlo Ancelotti', league_id: 2 },
  { id: 6, name: 'Bayern Munich', city: 'Munich', founded_year: 1900, stadium: 'Allianz Arena', capacity: 75000, manager: 'Thomas Tuchel', league_id: 3 },
]

export default function TeamsPage() {
  const [teams, setTeams] = useState(initialTeams)

  useEffect(() => {
    const storedTeams = JSON.parse(localStorage.getItem('teams') || '[]')
    setTeams([...initialTeams, ...storedTeams])
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Teams</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New Team</h2>
          <AddTeamForm />
        </div>
        {teams.map((team) => (
          <div key={team.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">{team.name}</h3>
              <p className="mt-1 text-sm text-gray-600">City: {team.city}</p>
              <p className="mt-1 text-sm text-gray-600">Founded: {team.founded_year}</p>
              <p className="mt-1 text-sm text-gray-600">Stadium: {team.stadium}</p>
              <p className="mt-1 text-sm text-gray-600">Capacity: {team.capacity.toLocaleString()}</p>
              <p className="mt-1 text-sm text-gray-600">Manager: {team.manager}</p>
              <p className="mt-1 text-sm text-gray-600">League: {leagues[team.league_id]}</p>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <Link href={`/teams/${team.id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

