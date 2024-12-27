const players = [
  { id: 1, name: 'Marcus Rashford', position: 'Forward', age: 25, nationality: 'England', team_id: 1 },
  { id: 2, name: 'Mohamed Salah', position: 'Forward', age: 30, nationality: 'Egypt', team_id: 2 },
  { id: 3, name: 'Bukayo Saka', position: 'Midfielder', age: 21, nationality: 'England', team_id: 3 },
]

export default function PlayersPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Players</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nationality</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {players.map((player) => (
              <tr key={player.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{player.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.position}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{player.nationality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

