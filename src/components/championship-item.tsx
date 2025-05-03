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
  weekendPoints?: number
  totalPoints?: number
}

interface ChampionshipItemProps {
  driver: Driver
}

export function ChampionshipItem({ driver }: ChampionshipItemProps) {
  const weekendPoints = driver.weekendPoints ?? (driver.qualyPoints + driver.race1Points + driver.race2Points)
  const totalPoints = driver.totalPoints ?? (driver.championshipPoints + weekendPoints)

  return (
    <div className="flex h-[70px] bg-background">
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
          <div className="font-medium text-sm text-foreground">
            {driver.name[0]}. {driver.surname}
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="space-y-0.5 text-[11px]">
            <div className="flex justify-end gap-3">
              <span className="text-muted-foreground">Championship</span>
              <span className="text-foreground w-4 text-right">{driver.championshipPoints}</span>
            </div>
            <div className="flex justify-end gap-3">
              <span className="text-muted-foreground">Weekend</span>
              <span className="text-foreground w-4 text-right">{weekendPoints}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center w-14 h-14 bg-card">
            <div className="text-[10px] text-muted-foreground">TOTAL</div>
            <div className="text-lg font-bold text-foreground">{totalPoints}</div>
          </div>
        </div>
      </div>
    </div>
  )
} 