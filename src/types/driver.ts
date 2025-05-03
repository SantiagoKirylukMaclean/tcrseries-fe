export interface TeamColors {
  primary: string
  secondary: string
  tertiary: string
}

export interface Driver {
  id: string
  name: string
  surname: string
  teamColors: TeamColors
  championshipPoints: number
  qualyPoints: number
  race1Points: number
  race2Points: number
  position: number
  weight: number
} 