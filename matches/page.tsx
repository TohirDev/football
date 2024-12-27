const matches = [
  { id: 1, home_team_id: 1, away_team_id: 2, match_date: '2023-05-01T15:00:00', home_team_score: 2, away_team_score: 1 },
  { id: 2, home_team_id: 3, away_team_id: 1, match_date: '2023-05-08T15:00:00', home_team_score: 0, away_team_score: 2 },
  { id: 3, home_team_id: 2, away_team_id: 3, match_date: '2023-05-15T15:00:00', home_team_score: 1, away_team_score: 1 },
]

const teams = {
  1: 'Manchester United',
  2: 'Liverpool',
  3: 'Arsenal',
}

export default function MatchesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Matches</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Home Team</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Away Team</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {matches.map((match) => (
              <tr key={match.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(match.match_date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {teams[match.home_team_id]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {teams[match.away_team_id]}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {match.home_team_score} - {match.away_team_score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

