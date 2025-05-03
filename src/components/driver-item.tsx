"use client"

import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"
import { GripVertical, Circle, CircleDashed } from "lucide-react"

interface TeamColors {
  primary: string
  secondary: string
  tertiary: string
}

interface DriverItemProps {
  id: string
  position: number
  name: string
  surname: string
  teamColors: TeamColors
  weight: number
  dnf?: boolean
}

function WeightIndicator({ weight }: { weight: number }) {
  const getCircles = () => {
    switch (weight) {
      case 0:
        return Array(4).fill(<CircleDashed className="h-4 w-4" />)
      case 10:
        return [
          <Circle key="1" className="h-4 w-4 fill-current" />,
          ...Array(3).fill(<CircleDashed className="h-4 w-4" />)
        ]
      case 20:
        return [
          <Circle key="1" className="h-4 w-4 fill-current" />,
          <Circle key="2" className="h-4 w-4 fill-current" />,
          ...Array(2).fill(<CircleDashed className="h-4 w-4" />)
        ]
      case 30:
        return [
          <Circle key="1" className="h-4 w-4 fill-current" />,
          <Circle key="2" className="h-4 w-4 fill-current" />,
          <Circle key="3" className="h-4 w-4 fill-current" />,
          <CircleDashed className="h-4 w-4" />
        ]
      case 40:
        return Array(4).fill(null).map((_, index) => (
          <Circle key={index} className="h-4 w-4 fill-current" />
        ))
      default:
        return Array(4).fill(null).map((_, index) => (
          <CircleDashed key={index} className="h-4 w-4" />
        ))
    }
  }

  return (
    <div className="flex items-center space-x-0.5">
      {getCircles().map((circle, index) => (
        <div key={`circle-${index}`}>{circle}</div>
      ))}
    </div>
  )
}

export function DriverItem({
  id,
  position,
  name,
  surname,
  teamColors,
  weight,
  dnf = false,
}: DriverItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center space-x-4 p-3 bg-card rounded-lg border ${
        isDragging ? "shadow-lg opacity-50" : ""
      }`}
    >
      <div {...attributes} {...listeners}>
        <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
      </div>
      
      <div className="flex h-7 w-[30px]">
        <div
          className="w-1/3 h-full rounded-l-sm"
          style={{ backgroundColor: teamColors.primary }}
        />
        <div
          className="w-1/3 h-full"
          style={{ backgroundColor: teamColors.secondary }}
        />
        <div
          className="w-1/3 h-full rounded-r-sm"
          style={{ backgroundColor: teamColors.tertiary }}
        />
      </div>

      <div className="w-8 text-lg font-bold">{position}</div>
      
      <div className="flex-1">
        <div className="font-medium text-sm">
          {name[0]}. {surname}
        </div>
      </div>

      {dnf && (
        <div className="px-2 py-1 text-sm bg-destructive/10 text-destructive rounded">
          DNF
        </div>
      )}

      <WeightIndicator weight={weight} />
    </div>
  )
} 