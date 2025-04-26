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
  weekendPoints: number
}

interface ChampionshipItemProps {
  driver: Driver
}

export function ChampionshipItem({ driver }: ChampionshipItemProps) {
  const totalPoints = driver.championshipPoints + driver.weekendPoints

  return (
    <div className="flex items-center space-x-4 p-3 bg-card rounded-lg border">
      <div className="flex h-7 w-[30px]">
        <div
          className="w-1/3 h-full rounded-l-sm"
          style={{ backgroundColor: driver.teamColors.primary }}
        />
        <div
          className="w-1/3 h-full"
          style={{ backgroundColor: driver.teamColors.secondary }}
        />
        <div
          className="w-1/3 h-full rounded-r-sm"
          style={{ backgroundColor: driver.teamColors.tertiary }}
        />
      </div>
      
      <div className="flex-1">
        <div className="font-medium">
          {driver.name} {driver.surname}
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="text-sm">
          <span className="text-muted-foreground">Championship:</span>{" "}
          <span className="font-medium">{driver.championshipPoints}</span>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">Weekend:</span>{" "}
          <span className="font-medium">{driver.weekendPoints}</span>
        </div>
        <div className="text-sm font-semibold">
          <span className="text-muted-foreground">Total:</span>{" "}
          {totalPoints}
        </div>
      </div>
    </div>
  )
} 