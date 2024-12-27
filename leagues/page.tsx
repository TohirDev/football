import Link from 'next/link'

const leagues = [
  { id: 1, name: 'Premier League', country: 'England', founded: 1992, teams: 20, current_champion: 'Manchester City' },
  { id: 2, name: 'La Liga', country: 'Spain', founded: 1929, teams: 20, current_champion: 'Barcelona' },
  { id: 3, name: 'Bundesliga', country: 'Germany', founded: 1963, teams: 18, current_champion: 'Bayern Munich' },
  { id: 4, name: 'Serie A', country: 'Italy', founded: 1898, teams: 20, current_champion: 'Napoli' },
  { id: 5, name: 'Ligue 1', country: 'France', founded: 1932, teams: 20, current_champion: 'Paris Saint-Germain' },
]

export default function LeaguesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Leagues</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {leagues.map((league) => (
          <div key={league.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">{league.name}</h3>
              <p className="mt-1 text-sm text-gray-600">Country: {league.country}</p>
              <p className="mt-1 text-sm text-gray-600">Founded: {league.founded}</p>
              <p className="mt-1 text-sm text-gray-600">Teams: {league.teams}</p>
              <p className="mt-1 text-sm text-gray-600">Current Champion: {league.current_champion}</p>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <Link href={`/leagues/${league.id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View league details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

