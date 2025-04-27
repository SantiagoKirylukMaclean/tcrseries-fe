"use client"

interface TeamColors {
  primary: string
  secondary: string
  tertiary: string
}

interface Driver {
  id: string
  name: string
  surname: string
  teamColors: TeamColors
  championshipPoints: number
  qualyPoints: number
  race1Points: number
  race2Points: number
}

interface ChampionshipItemProps {
  driver: Driver
}

export function ChampionshipItem({ driver }: ChampionshipItemProps) {
  const weekendPoints = driver.qualyPoints + driver.race1Points + driver.race2Points
  const totalPoints = driver.championshipPoints + weekendPoints

  return (
    <div className="flex h-[70px] bg-zinc-950">
      <div className="flex flex-col w-[12px] py-2 ml-3">
        <div
          className="flex-1"
          style={{ backgroundColor: driver.teamColors.primary }}
        />
        <div
          className="flex-1"
          style={{ backgroundColor: driver.teamColors.secondary }}
        />
        <div
          className="flex-1"
          style={{ backgroundColor: driver.teamColors.tertiary }}
        />
      </div>
      
      <div className="flex flex-1 items-center px-3">
        <div className="flex-1">
          <div className="font-medium text-sm text-zinc-100">
            {driver.name[0]}. {driver.surname}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="space-y-0.5 text-[11px]">
            <div className="flex justify-end gap-3">
              <span className="text-zinc-400">Championship</span>
              <span className="text-zinc-300 w-4 text-right">{driver.championshipPoints}</span>
            </div>
            <div className="flex justify-end gap-3">
              <span className="text-zinc-400">Weekend</span>
              <span className="text-zinc-300 w-4 text-right">{weekendPoints}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center w-14 h-14 bg-zinc-900">
            <div className="text-[10px] text-zinc-400">TOTAL</div>
            <div className="text-lg font-bold text-zinc-100">{totalPoints}</div>
          </div>
        </div>
      </div>
    </div>
  )
} 