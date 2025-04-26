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
  qualyPoints: number
  race1Points: number
  race2Points: number
}

interface FutureRaceItemProps {
  driver: Driver
}

export function FutureRaceItem({ driver }: FutureRaceItemProps) {
  const totalPoints = driver.qualyPoints + driver.race1Points + driver.race2Points

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
          <span className="text-muted-foreground">Qualy:</span>{" "}
          <span className="font-medium">{driver.qualyPoints}</span>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">R1:</span>{" "}
          <span className="font-medium">{driver.race1Points}</span>
        </div>
        <div className="text-sm">
          <span className="text-muted-foreground">R2:</span>{" "}
          <span className="font-medium">{driver.race2Points}</span>
        </div>
        <div className="text-sm font-semibold">
          <span className="text-muted-foreground">Total:</span>{" "}
          {totalPoints}
        </div>
      </div>
    </div>
  )
} 