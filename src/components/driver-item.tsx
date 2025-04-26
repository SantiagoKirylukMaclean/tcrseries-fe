"use client"

import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"
import { GripVertical } from "lucide-react"

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
        <div className="font-medium">
          {name} {surname}
        </div>
      </div>

      {dnf && (
        <div className="px-2 py-1 text-sm bg-destructive/10 text-destructive rounded">
          DNF
        </div>
      )}

      <div className="flex items-center space-x-1">
        <span className="font-medium">{weight}</span>
        <span className="text-sm text-muted-foreground">kg</span>
      </div>
    </div>
  )
} 