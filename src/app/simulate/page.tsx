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
import { FutureRaceItem } from "@/components/future-race-item"
import { ChampionshipItem } from "@/components/championship-item"

const initialDrivers = [
  {
    id: "1",
    position: 1,
    name: "Esteban",
    surname: "Guerrieri",
    teamColors: {
      primary: "#9DB8F0",
      secondary: "#1F377C",
      tertiary: "#F64342",
    },
    weight: 40,
    qualyPoints: 15,
    race1Points: 25,
    race2Points: 18,
    championshipPoints: 150,
  },
  {
    id: "2",
    position: 2,
    name: "Néstor",
    surname: "Girolami",
    teamColors: {
      primary: "#9DB8F0",
      secondary: "#1F377C",
      tertiary: "#F64342",
    },
    weight: 30,
    qualyPoints: 12,
    race1Points: 18,
    race2Points: 25,
    championshipPoints: 142,
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
    weight: 30,
    qualyPoints: 10,
    race1Points: 15,
    race2Points: 15,
    championshipPoints: 135,
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
    weight: 20,
    qualyPoints: 8,
    race1Points: 12,
    race2Points: 12,
    championshipPoints: 128,
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
    weight: 10,
    qualyPoints: 6,
    race1Points: 10,
    race2Points: 10,
    championshipPoints: 120,
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
    weight: 0,
    qualyPoints: 4,
    race1Points: 8,
    race2Points: 8,
    championshipPoints: 115,
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
    weight: 0,
    qualyPoints: 2,
    race1Points: 6,
    race2Points: 6,
    championshipPoints: 108,
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
    weight: 0,
    qualyPoints: 1,
    race1Points: 4,
    race2Points: 4,
    championshipPoints: 98,
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
    weight: 0,
    qualyPoints: 0,
    race1Points: 2,
    race2Points: 2,
    championshipPoints: 85,
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
    weight: 0,
    qualyPoints: 0,
    race1Points: 1,
    race2Points: 1,
    championshipPoints: 75,
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
        <p className="text-muted-foreground mb-8">
          Drag and drop drivers to reorder the grid positions.
        </p>
      </div>

      <div className="flex gap-20 max-w-[1400px] mx-auto">
        <div className="min-w-[320px]">
          <h2 className="text-xl font-semibold mb-4 text-center">Current Race</h2>
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

        <div className="border-l border-white/10 h-auto" />

        <div className="flex-1 grid grid-cols-2 gap-12">
          <div className="min-w-[320px]">
            <h2 className="text-xl font-semibold mb-4 text-center">Weights - Future Race</h2>
            <div className="rounded-lg overflow-hidden border-[0.5px] border-white">
              {drivers.map((driver, index) => (
                <div key={driver.id} className="[&:not(:last-child)]:border-b-[0.5px] [&:not(:last-child)]:border-white/30">
                  <FutureRaceItem driver={{
                    ...driver,
                    currentRacePosition: driver.position
                  }} />
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-[320px]">
            <h2 className="text-xl font-semibold mb-4 text-center">Championship</h2>
            <div className="rounded-lg overflow-hidden border-[0.5px] border-white">
              {drivers.map((driver, index) => (
                <div key={driver.id} className="[&:not(:last-child)]:border-b-[0.5px] [&:not(:last-child)]:border-white/30">
                  <ChampionshipItem driver={driver} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 