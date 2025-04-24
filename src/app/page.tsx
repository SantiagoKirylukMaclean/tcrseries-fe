import Link from "next/link"
import { 
  BarChart3, 
  PlayCircle, 
  Clock, 
  Settings, 
  Car, 
  FileText 
} from "lucide-react"

export default function Home() {
  const links = [
    {
      title: "Stadings",
      href: "/standings",
      icon: BarChart3,
    },
    {
      title: "Simulate weekend",
      href: "/simulate",
      icon: PlayCircle,
    },
    {
      title: "Timing by microsector",
      href: "/timing",
      icon: Clock,
    },
    {
      title: "Tests configuration",
      href: "/tests",
      icon: Settings,
    },
    {
      title: "Parts list",
      href: "/parts",
      icon: Car,
    },
    {
      title: "Notes",
      href: "/notes",
      icon: FileText,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {links.map((link, index) => (
        <Link
          key={link.href}
          href={link.href}
          className="p-6 bg-card hover:bg-accent rounded-lg border shadow-sm transition-colors flex items-center space-x-4 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <link.icon className="h-6 w-6" />
          <span className="font-medium">{link.title}</span>
        </Link>
      ))}
    </div>
  )
}
