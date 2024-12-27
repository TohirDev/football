import { NextResponse } from 'next/server'

const initialTeams = [
  { 
    id: 1, 
    name: 'Manchester United', 
    city: 'Manchester', 
    founded_year: 1878, 
    stadium: 'Old Trafford', 
    capacity: 74140, 
    manager: 'Erik ten Hag', 
    league_id: 1,
    players: [
      { name: 'Bruno Fernandes', position: 'Midfielder', number: 8 },
      { name: 'Marcus Rashford', position: 'Forward', number: 10 },
      { name: 'David de Gea', position: 'Goalkeeper', number: 1 },
    ],
    recent_results: [
      { opponent: 'Manchester City', result: 'W 2-1' },
      { opponent: 'Liverpool', result: 'D 0-0' },
      { opponent: 'Arsenal', result: 'L 1-3' },
    ]
  },
  // ... (include all other initial teams here)
]

export async function GET() {
  return NextResponse.json(initialTeams)
}

