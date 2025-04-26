"use client"

import { useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { DriverItem } from "@/components/driver-item"

const initialDrivers = [
  {
    id: "1",
    position: 1,
    name: "Esteban",
    surname: "Guerrieri",
    teamColors: {
      primary: "#FF0000",
      secondary: "#FFFFFF",
      tertiary: "#0000FF",
    },
    weight: 20,
  },
  {
    id: "2",
    position: 2,
    name: "Néstor",
    surname: "Girolami",
    teamColors: {
      primary: "#00FF00",
      secondary: "#000000",
      tertiary: "#FFFFFF",
    },
    weight: 15,
    dnf: true,
  },
  {
    id: "3",
    position: 3,
    name: "Agustín",
    surname: "Canapino",
    teamColors: {
      primary: "#0000FF",
      secondary: "#FFFF00",
      tertiary: "#FF0000",
    },
    weight: 25,
  },
  {
    id: "4",
    position: 4,
    name: "Matías",
    surname: "Rossi",
    teamColors: {
      primary: "#FF00FF",
      secondary: "#00FFFF",
      tertiary: "#000000",
    },
    weight: 18,
  },
  {
    id: "5",
    position: 5,
    name: "Leonel",
    surname: "Pernía",
    teamColors: {
      primary: "#FFFF00",
      secondary: "#FF0000",
      tertiary: "#00FF00",
    },
    weight: 22,
  },
  {
    id: "6",
    position: 6,
    name: "Juan Manuel",
    surname: "Silva",
    teamColors: {
      primary: "#00FFFF",
      secondary: "#FF00FF",
      tertiary: "#FFFFFF",
    },
    weight: 17,
  },
  {
    id: "7",
    position: 7,
    name: "Facundo",
    surname: "Ardusso",
    teamColors: {
      primary: "#000000",
      secondary: "#FFFF00",
      tertiary: "#00FFFF",
    },
    weight: 30,
  },
  {
    id: "8",
    position: 8,
    name: "Julián",
    surname: "Santero",
    teamColors: {
      primary: "#FFFFFF",
      secondary: "#0000FF",
      tertiary: "#FF00FF",
    },
    weight: 12,
  },
  {
    id: "9",
    position: 9,
    name: "Matías",
    surname: "Milla",
    teamColors: {
      primary: "#FF0000",
      secondary: "#00FF00",
      tertiary: "#0000FF",
    },
    weight: 28,
  },
  {
    id: "10",
    position: 10,
    name: "Bernardo",
    surname: "Llaver",
    teamColors: {
      primary: "#00FF00",
      secondary: "#FF0000",
      tertiary: "#FFFF00",
    },
    weight: 16,
  },
]

export default function SimulatePage() {
  const [drivers, setDrivers] = useState(initialDrivers)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      setDrivers((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        const newItems = arrayMove(items, oldIndex, newIndex)
        return newItems.map((item, index) => ({
          ...item,
          position: index + 1,
        }))
      })
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-6">Simulate Weekend</h1>
        <p className="text-muted-foreground">
          Drag and drop drivers to reorder the grid positions.
        </p>
      </div>

      <div className="space-y-3">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={drivers.map((d) => d.id)}
            strategy={verticalListSortingStrategy}
          >
            {drivers.map((driver) => (
              <DriverItem key={driver.id} {...driver} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  )
} 