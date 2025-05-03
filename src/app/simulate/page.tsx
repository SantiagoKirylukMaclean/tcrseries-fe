"use client"

import { useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
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
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Driver } from "@/types/driver"
import { RACE_POINTS } from "@/constants/points"

const initialDrivers = [
  // Grupo: Michelisz, Azcona, Girolami
  {
    id: "1",
    position: 1,
    name: "Norbert",
    surname: "Michelisz",
    teamColors: { primary: "#1E90FF", secondary: "#FFD700", tertiary: "#FF4500" },
    weight: 0,
    qualyPoints: 0,
    race1Points: 0, // 18 en la lista (posición 18) => 0
    race2Points: 0,
    championshipPoints: 0,
  },
  {
    id: "2",
    position: 2,
    name: "Mikel",
    surname: "Azcona",
    teamColors: { primary: "#1E90FF", secondary: "#FFD700", tertiary: "#FF4500" },
    weight: 0,
    qualyPoints: 0,
    race1Points: 8, // 10 en la lista (posición 10) => 8
    race2Points: 0,
    championshipPoints: 0,
  },
  {
    id: "3",
    position: 3,
    name: "Néstor",
    surname: "Girolami",
    teamColors: { primary: "#1E90FF", secondary: "#FFD700", tertiary: "#FF4500" },
    weight: 0,
    qualyPoints: 0,
    race1Points: 6, // 11 en la lista (posición 11) => 6
    race2Points: 6,
    championshipPoints: 0,
  },
  // Grupo: Björk, Urrutia, Ehrlacher, Ma
  {
    id: "4",
    position: 4,
    name: "Thed",
    surname: "Björk",
    teamColors: { primary: "#228B22", secondary: "#00CED1", tertiary: "#8A2BE2" },
    weight: 0,
    qualyPoints: 8,
    race1Points: 30, // 1 en la lista (posición 1) => 30
    race2Points: 18,
    championshipPoints: 0,
  },
  {
    id: "5",
    position: 5,
    name: "Santiago",
    surname: "Urrutia",
    teamColors: { primary: "#228B22", secondary: "#00CED1", tertiary: "#8A2BE2" },
    weight: 0,
    qualyPoints: 4,
    race1Points: 25, // 2 en la lista (posición 2) => 25
    race2Points: 16,
    championshipPoints: 0,
  },
  {
    id: "6",
    position: 6,
    name: "Yann",
    surname: "Ehrlacher",
    teamColors: { primary: "#228B22", secondary: "#00CED1", tertiary: "#8A2BE2" },
    weight: 0,
    qualyPoints: 10,
    race1Points: 22, // 3 en la lista (posición 3) => 22
    race2Points: 25,
    championshipPoints: 0,
  },
  {
    id: "7",
    position: 7,
    name: "Ma",
    surname: "Qing Hua",
    teamColors: { primary: "#228B22", secondary: "#00CED1", tertiary: "#8A2BE2" },
    weight: 0,
    qualyPoints: 0,
    race1Points: 16, // 6 en la lista (posición 6) => 16
    race2Points: 20,
    championshipPoints: 0,
  },
  // Grupo: Montenegro, Guerrieri
  {
    id: "8",
    position: 8,
    name: "Ignacio",
    surname: "Montenegro",
    teamColors: { primary: "#FF69B4", secondary: "#00BFFF", tertiary: "#FFD700" },
    weight: 0,
    qualyPoints: 6,
    race1Points: 0, // No está en la lista => 0
    race2Points: 14,
    championshipPoints: 0,
  },
  {
    id: "9",
    position: 9,
    name: "Esteban",
    surname: "Guerrieri",
    teamColors: { primary: "#FF69B4", secondary: "#00BFFF", tertiary: "#FFD700" },
    weight: 0,
    qualyPoints: 15,
    race1Points: 20, // 4 en la lista (posición 4) => 20
    race2Points: 30,
    championshipPoints: 0,
  },
  // Grupo: Filippi, Comte
  {
    id: "10",
    position: 10,
    name: "John",
    surname: "Filippi",
    teamColors: { primary: "#8B0000", secondary: "#FFA500", tertiary: "#4682B4" },
    weight: 0,
    qualyPoints: 0,
    race1Points: 4, // 12 en la lista (posición 12) => 4
    race2Points: 8,
    championshipPoints: 0,
  },
  {
    id: "11",
    position: 11,
    name: "Aurélien",
    surname: "Comte",
    teamColors: { primary: "#8B0000", secondary: "#FFA500", tertiary: "#4682B4" },
    weight: 0,
    qualyPoints: 2,
    race1Points: 18, // 5 en la lista (posición 5) => 18
    race2Points: 22,
    championshipPoints: 0,
  },
  // Resto de pilotos (colores aleatorios)
  {
    id: "12",
    position: 12,
    name: "Julio",
    surname: "Rejón",
    teamColors: { primary: "#A52A2A", secondary: "#5F9EA0", tertiary: "#D2691E" },
    weight: 0,
    qualyPoints: 0,
    race1Points: 14, // 7 en la lista (posición 7) => 14
    race2Points: 0,
    championshipPoints: 0,
  },
  {
    id: "13",
    position: 13,
    name: "José Carlos",
    surname: "Sandoval",
    teamColors: { primary: "#556B2F", secondary: "#9932CC", tertiary: "#FF6347" },
    weight: 0,
    qualyPoints: 0,
    race1Points: 0, // 16 en la lista (posición 16) => 0
    race2Points: 4,
    championshipPoints: 0,
  },
  {
    id: "14",
    position: 14,
    name: "Ignacio",
    surname: "Sánchez",
    teamColors: { primary: "#4682B4", secondary: "#FFDAB9", tertiary: "#B22222" },
    weight: 0,
    qualyPoints: 0,
    race1Points: 0, // 22 en la lista (posición 22) => 0
    race2Points: 0,
    championshipPoints: 0,
  },
  {
    id: "15",
    position: 15,
    name: "Horia Traian",
    surname: "Chirigut",
    teamColors: { primary: "#2E8B57", secondary: "#DAA520", tertiary: "#7B68EE" },
    weight: 0,
    qualyPoints: 0,
    race1Points: 0, // 20 en la lista (posición 20) => 0
    race2Points: 1,
    championshipPoints: 0,
  },
  {
    id: "16",
    position: 16,
    name: "Michel",
    surname: "Jourdain",
    teamColors: { primary: "#DC143C", secondary: "#00FA9A", tertiary: "#FFD700" },
    weight: 0,
    qualyPoints: 0,
    race1Points: 12, // 8 en la lista (posición 8) => 12
    race2Points: 12,
    championshipPoints: 0,
  },
  {
    id: "17",
    position: 17,
    name: "Todd",
    surname: "Sloan",
    teamColors: { primary: "#00BFFF", secondary: "#FF8C00", tertiary: "#8B008B" },
    weight: 0,
    qualyPoints: 0,
    race1Points: 0, // 19 en la lista (posición 19) => 0
    race2Points: 0,
    championshipPoints: 0,
  },
  {
    id: "18",
    position: 18,
    name: "Carlo",
    surname: "Zesati",
    teamColors: { primary: "#B8860B", secondary: "#20B2AA", tertiary: "#C71585" },
    weight: 0,
    qualyPoints: 0,
    race1Points: 3, // 13 en la lista (posición 13) => 3
    race2Points: 3,
    championshipPoints: 0,
  },
  {
    id: "19",
    position: 19,
    name: "Paul",
    surname: "Abed",
    teamColors: { primary: "#9932CC", secondary: "#FF4500", tertiary: "#2F4F4F" },
    weight: 0,
    qualyPoints: 0,
    race1Points: 0, // 23 en la lista (posición 23) => 0
    race2Points: 0,
    championshipPoints: 0,
  },
  {
    id: "20",
    position: 20,
    name: "Humberto",
    surname: "Zesati",
    teamColors: { primary: "#BDB76B", secondary: "#8B0000", tertiary: "#00CED1" },
    weight: 0,
    qualyPoints: 0,
    race1Points: 0, // 21 en la lista (posición 21) => 0
    race2Points: 0,
    championshipPoints: 0,
  },
  {
    id: "21",
    position: 21,
    name: "César Tiberio",
    surname: "Jiménez",
    teamColors: { primary: "#191970", secondary: "#32CD32", tertiary: "#FFD700" },
    weight: 0,
    qualyPoints: 0,
    race1Points: 0, // 17 en la lista (posición 17) => 0
    race2Points: 0,
    championshipPoints: 0,
  },
  {
    id: "22",
    position: 22,
    name: "Santos",
    surname: "Zanella",
    teamColors: { primary: "#8B4513", secondary: "#00FF7F", tertiary: "#4682B4" },
    weight: 0,
    qualyPoints: 0,
    race1Points: 0, // 15 en la lista (posición 15) => 0
    race2Points: 0,
    championshipPoints: 0,
  },
  {
    id: "23",
    position: 23,
    name: "Rodrigo",
    surname: "Rejón",
    teamColors: { primary: "#B22222", secondary: "#00BFFF", tertiary: "#FFD700" },
    weight: 0,
    qualyPoints: 0,
    race1Points: 10, // 9 en la lista (posición 9) => 10
    race2Points: 10,
    championshipPoints: 0,
  },
  {
    id: "24",
    position: 24,
    name: "Pablo",
    surname: "Cervantes",
    teamColors: { primary: "#4B0082", secondary: "#7FFF00", tertiary: "#FF1493" },
    weight: 0,
    qualyPoints: 0,
    race1Points: 2, // 14 en la lista (posición 14) => 2
    race2Points: 2,
    championshipPoints: 0,
  },
];

function SortableFutureRaceItem({ driver, index, oldIndex }: { driver: Driver, index: number, oldIndex: number }) {
  const {
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: driver.id })

  const positionDiff = Math.abs(index - oldIndex)
  const delay = positionDiff * 2 // 2 seconds delay per position
  const duration = 1000 // 1 second duration for each movement

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ? `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}s` : undefined,
  }

  return (
    <div ref={setNodeRef} style={style} className="[&:not(:last-child)]:border-b-[0.5px] [&:not(:last-child)]:border-border">
      <FutureRaceItem driver={{
        ...driver,
        currentRacePosition: driver.position
      }} />
    </div>
  )
}

function SortableChampionshipItem({ driver, index, oldIndex }: { driver: Driver, index: number, oldIndex: number }) {
  const {
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: driver.id })

  const positionDiff = Math.abs(index - oldIndex)
  const delay = positionDiff * 2 // 2 seconds delay per position
  const duration = 1000 // 1 second duration for each movement

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition ? `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}s` : undefined,
  }

  return (
    <div ref={setNodeRef} style={style} className="[&:not(:last-child)]:border-b-[0.5px] [&:not(:last-child)]:border-border">
      <ChampionshipItem driver={driver} />
    </div>
  )
}

export default function SimulatePage() {
  const [drivers, setDrivers] = useState(initialDrivers)
  const [oldPositions, setOldPositions] = useState<{[key: string]: number}>({})

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (!over || active.id === over.id) return

    // Guardar las posiciones actuales antes de actualizar
    const currentPositions = drivers.reduce((acc, driver, index) => {
      acc[driver.id] = index
      return acc
    }, {} as {[key: string]: number})
    setOldPositions(currentPositions)

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

  // Calcular currentRacePoints, weekendPoints y totalPoints para cada piloto
  const driversWithCalculatedPoints = drivers.map((driver, idx) => {
    const currentRacePosition = idx + 1;
    const currentRacePoints = RACE_POINTS[currentRacePosition] || 0;
    const weekendPoints = driver.qualyPoints + driver.race1Points + driver.race2Points + currentRacePoints;
    const totalPoints = driver.championshipPoints + weekendPoints;
    return {
      ...driver,
      currentRacePosition,
      currentRacePoints,
      weekendPoints,
      totalPoints,
    };
  });

  // Ordenar para Weights - Future Race
  const driversByWeekend = [...driversWithCalculatedPoints].sort((a, b) => b.weekendPoints - a.weekendPoints);

  // Ordenar para Championship
  const driversByTotal = [...driversWithCalculatedPoints].sort((a, b) => b.totalPoints - a.totalPoints);

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
            <div className="rounded-lg overflow-hidden border-[0.5px] border-border">
              <SortableContext
                items={driversByWeekend.map((d) => d.id)}
                strategy={verticalListSortingStrategy}
              >
                {driversByWeekend.map((driver, index) => (
                  <SortableFutureRaceItem 
                    key={driver.id} 
                    driver={driver} 
                    index={index}
                    oldIndex={oldPositions[driver.id] || index}
                  />
                ))}
              </SortableContext>
            </div>
          </div>

          <div className="min-w-[320px]">
            <h2 className="text-xl font-semibold mb-4 text-center">Championship</h2>
            <div className="rounded-lg overflow-hidden border-[0.5px] border-border">
              <SortableContext
                items={driversByTotal.map((d) => d.id)}
                strategy={verticalListSortingStrategy}
              >
                {driversByTotal.map((driver, index) => (
                  <SortableChampionshipItem 
                    key={driver.id} 
                    driver={driver} 
                    index={index}
                    oldIndex={oldPositions[driver.id] || index}
                  />
                ))}
              </SortableContext>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 