'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const leagues = {
  1: 'Premier League',
  2: 'La Liga',
  3: 'Bundesliga',
  4: 'Serie A',
  5: 'Ligue 1'
}

export default function TeamPage({ params }: { params: { id: string } }) {
  const [team, setTeam] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true)
      try {
        // Fetch initial teams
        const response = await fetch('/api/teams')
        const initialTeams = await response.json()

        // Fetch teams from localStorage
        const storedTeams = JSON.parse(localStorage.getItem('teams') || '[]')
        
        // Combine initial and stored teams
        const allTeams = [...initialTeams, ...storedTeams]
        
        // Find the team by id
        const foundTeam = allTeams.find(t => t.id.toString() === params.id)
        
        if (foundTeam) {
          setTeam(foundTeam)
        } else {
          // If team is not found, redirect to 404 page
          router.push('/404')
        }
      } catch (error) {
        console.error('Error fetching team:', error)
        // Handle error (e.g., show error message to user)
      } finally {
        setLoading(false)
      }
    }

    fetchTeam()
  }, [params.id, router])

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>
  }

  if (!team) {
    return null // This will be handled by the router.push('/404') above
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{team.name}</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Team Information</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">City</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{team.city}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Founded</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{team.founded_year}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Stadium</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{team.stadium}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Capacity</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{team.capacity?.toLocaleString()}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Manager</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{team.manager}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">League</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{leagues[team.league_id]}</dd>
            </div>
          </dl>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Players</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        {team.players && team.players.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {team.players.map((player, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{player.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.number}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="px-6 py-4 text-sm text-gray-500">No players information available.</p>
        )}
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Results</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {team.recent_results && team.recent_results.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opponent</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {team.recent_results.map((result, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.opponent}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="px-6 py-4 text-sm text-gray-500">No recent results available.</p>
        )}
      </div>
    </div>
  )
}

