'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'

const initialLeagues = [
  { 
    id: 1, 
    name: 'Premier League', 
    country: 'England', 
    founded: 1992, 
    numberOfTeams: 20, 
    current_champion: 'Manchester City',
    top_scorers: [
      { name: 'Erling Haaland', team: 'Manchester City', goals: 36 },
      { name: 'Harry Kane', team: 'Tottenham Hotspur', goals: 30 },
      { name: 'Ivan Toney', team: 'Brentford', goals: 20 },
    ],
    teams: [
      { name: 'Manchester City', position: 1, played: 38, won: 28, drawn: 5, lost: 5, points: 89 },
      { name: 'Arsenal', position: 2, played: 38, won: 26, drawn: 6, lost: 6, points: 84 },
      { name: 'Manchester United', position: 3, played: 38, won: 23, drawn: 6, lost: 9, points: 75 },
      { name: 'Newcastle United', position: 4, played: 38, won: 19, drawn: 14, lost: 5, points: 71 },
      { name: 'Liverpool', position: 5, played: 38, won: 19, drawn: 10, lost: 9, points: 67 },
    ]
  },
  { 
    id: 2, 
    name: 'La Liga', 
    country: 'Spain', 
    founded: 1929, 
    numberOfTeams: 20, 
    current_champion: 'Barcelona',
    top_scorers: [
      { name: 'Robert Lewandowski', team: 'Barcelona', goals: 23 },
      { name: 'Karim Benzema', team: 'Real Madrid', goals: 19 },
      { name: 'Joselu', team: 'Espanyol', goals: 16 },
    ],
    teams: [
      { name: 'Barcelona', position: 1, played: 38, won: 28, drawn: 4, lost: 6, points: 88 },
      { name: 'Real Madrid', position: 2, played: 38, won: 24, drawn: 6, lost: 8, points: 78 },
      { name: 'Atletico Madrid', position: 3, played: 38, won: 23, drawn: 7, lost: 8, points: 76 },
      { name: 'Real Sociedad', position: 4, played: 38, won: 19, drawn: 8, lost: 11, points: 65 },
      { name: 'Villarreal', position: 5, played: 38, won: 19, drawn: 6, lost: 13, points: 63 },
    ]
  },
  { 
    id: 3, 
    name: 'Bundesliga', 
    country: 'Germany', 
    founded: 1963, 
    numberOfTeams: 18, 
    current_champion: 'Bayern Munich',
    top_scorers: [
      { name: 'Christopher Nkunku', team: 'RB Leipzig', goals: 16 },
      { name: 'Niclas Füllkrug', team: 'Werder Bremen', goals: 16 },
      { name: 'Randal Kolo Muani', team: 'Eintracht Frankfurt', goals: 15 },
    ],
    teams: [
      { name: 'Bayern Munich', position: 1, played: 34, won: 22, drawn: 5, lost: 7, points: 71 },
      { name: 'Borussia Dortmund', position: 2, played: 34, won: 22, drawn: 3, lost: 9, points: 69 },
      { name: 'RB Leipzig', position: 3, played: 34, won: 20, drawn: 6, lost: 8, points: 66 },
      { name: 'Union Berlin', position: 4, played: 34, won: 18, drawn: 7, lost: 9, points: 61 },
      { name: 'Freiburg', position: 5, played: 34, won: 17, drawn: 8, lost: 9, points: 59 },
    ]
  },
  { 
    id: 4, 
    name: 'Serie A', 
    country: 'Italy', 
    founded: 1898, 
    numberOfTeams: 20, 
    current_champion: 'Napoli',
    top_scorers: [
      { name: 'Victor Osimhen', team: 'Napoli', goals: 26 },
      { name: 'Lautaro Martínez', team: 'Inter Milan', goals: 21 },
      { name: 'Rafael Leão', team: 'AC Milan', goals: 15 },
    ],
    teams: [
      { name: 'Napoli', position: 1, played: 38, won: 28, drawn: 4, lost: 6, points: 90 },
      { name: 'Lazio', position: 2, played: 38, won: 22, drawn: 8, lost: 8, points: 74 },
      { name: 'Inter Milan', position: 3, played: 38, won: 23, drawn: 3, lost: 12, points: 72 },
      { name: 'AC Milan', position: 4, played: 38, won: 20, drawn: 7, lost: 11, points: 67 },
      { name: 'Atalanta', position: 5, played: 38, won: 19, drawn: 7, lost: 12, points: 64 },
    ]
  },
  { 
    id: 5, 
    name: 'Ligue 1', 
    country: 'France', 
    founded: 1932, 
    numberOfTeams: 20, 
    current_champion: 'Paris Saint-Germain',
    top_scorers: [
      { name: 'Kylian Mbappé', team: 'Paris Saint-Germain', goals: 29 },
      { name: 'Alexandre Lacazette', team: 'Lyon', goals: 27 },
      { name: 'Jonathan David', team: 'Lille', goals: 24 },
    ],
    teams: [
      { name: 'Paris Saint-Germain', position: 1, played: 38, won: 27, drawn: 4, lost: 7, points: 85 },
      { name: 'Lens', position: 2, played: 38, won: 24, drawn: 10, lost: 4, points: 84 },
      { name: 'Marseille', position: 3, played: 38, won: 23, drawn: 6, lost: 9, points: 75 },
      { name: 'Monaco', position: 4, played: 38, won: 21, drawn: 8, lost: 9, points: 71 },
      { name: 'Lille', position: 5, played: 38, won: 19, drawn: 9, lost: 10, points: 67 },
    ]
  },
];

export default function LeaguePage({ params }: { params: { id: string } }) {
  const [leagues, setLeagues] = useState(initialLeagues)

  useEffect(() => {
    const storedTeams = JSON.parse(localStorage.getItem('teams') || '[]')
    const updatedLeagues = leagues.map(league => {
      const newTeams = storedTeams.filter(team => team.league_id === league.id)
      return {
        ...league,
        teams: [...league.teams, ...newTeams.map((team, index) => ({
          name: team.name,
          position: league.teams.length + index + 1,
          played: 0,
          won: 0,
          drawn: 0,
          lost: 0,
          points: 0
        }))]
      }
    })
    setLeagues(updatedLeagues)
  }, [])

  const league = leagues.find(l => l.id === parseInt(params.id))

  if (!league) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{league.name}</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">League Information</h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Country</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{league.country}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Founded</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{league.founded}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Number of Teams</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{league.teams.length}</dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Current Champion</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{league.current_champion}</dd>
            </div>
          </dl>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Scorers</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Goals</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {league.top_scorers.map((scorer, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{scorer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{scorer.team}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{scorer.goals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4">League Table</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Played</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Won</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Drawn</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lost</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {league.teams.map((team) => (
              <tr key={team.name}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.position}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{team.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.played}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.won}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.drawn}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.lost}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

