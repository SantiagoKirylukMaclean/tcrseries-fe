"use client"

import { Circle, CircleDashed } from "lucide-react"
import { RACE_POINTS } from "@/constants/points"

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
  race2Points?: number
  weight: number
  currentRacePosition: number
}

interface FutureRaceItemProps {
  driver: Driver
}

function WeightIndicator({ weight }: { weight: number }) {
  const getCircles = () => {
    switch (weight) {
      case 0:
        return Array(4).fill(null).map((_, index) => (
          <CircleDashed key={`dashed-${index}`} className="h-3 w-3" />
        ))
      case 10:
        return [
          <Circle key="circle-1" className="h-3 w-3 fill-current" />,
          ...Array(3).fill(null).map((_, index) => (
            <CircleDashed key={`dashed-${index}`} className="h-3 w-3" />
          ))
        ]
      case 20:
        return [
          <Circle key="circle-1" className="h-3 w-3 fill-current" />,
          <Circle key="circle-2" className="h-3 w-3 fill-current" />,
          ...Array(2).fill(null).map((_, index) => (
            <CircleDashed key={`dashed-${index}`} className="h-3 w-3" />
          ))
        ]
      case 30:
        return [
          <Circle key="circle-1" className="h-3 w-3 fill-current" />,
          <Circle key="circle-2" className="h-3 w-3 fill-current" />,
          <Circle key="circle-3" className="h-3 w-3 fill-current" />,
          <CircleDashed key="dashed-1" className="h-3 w-3" />
        ]
      case 40:
        return Array(4).fill(null).map((_, index) => (
          <Circle key={`circle-${index}`} className="h-3 w-3 fill-current" />
        ))
      default:
        return Array(4).fill(null).map((_, index) => (
          <CircleDashed key={`dashed-${index}`} className="h-3 w-3" />
        ))
    }
  }

  return (
    <div className="flex flex-col space-y-0.5">
      {getCircles().map((circle, index) => (
        <div key={`circle-${index}`}>{circle}</div>
      ))}
    </div>
  )
}

function getWeightByPosition(position: number): number {
  switch (position) {
    case 1:
      return 40
    case 2:
    case 3:
      return 30
    case 4:
      return 20
    case 5:
      return 10
    default:
      return 0
  }
}

export function FutureRaceItem({ driver }: FutureRaceItemProps) {
  const currentRacePoints = RACE_POINTS[driver.currentRacePosition] || 0
  const weekendPoints = driver.qualyPoints + driver.race1Points + (driver.race2Points || 0) + currentRacePoints
  const weight = getWeightByPosition(driver.currentRacePosition)

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

        <div className="mr-10">
          <WeightIndicator weight={weight} />
        </div>

        <div className="flex items-center space-x-6">
          <div className="space-y-0.5 text-[11px]">
            <div className="flex justify-end gap-3">
              <span className="text-muted-foreground">Qualy</span>
              <span className="text-foreground w-4 text-right">{driver.qualyPoints}</span>
            </div>
            <div className="flex justify-end gap-3">
              <span className="text-muted-foreground">Race 1</span>
              <span className="text-foreground w-4 text-right">{driver.race1Points}</span>
            </div>
            {driver.race2Points !== undefined && (
              <div className="flex justify-end gap-3">
                <span className="text-muted-foreground">Race 2</span>
                <span className="text-foreground w-4 text-right">{driver.race2Points}</span>
              </div>
            )}
            <div className="flex justify-end gap-3">
              <span className="text-muted-foreground">Current</span>
              <span className="text-foreground w-4 text-right">{currentRacePoints}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex flex-col items-center justify-center w-14 h-14 bg-card">
              <div className="text-[10px] text-muted-foreground">WEEKEND</div>
              <div className="text-lg font-bold text-foreground">{weekendPoints}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 