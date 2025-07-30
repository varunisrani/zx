"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, Users, BarChart3, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Scene Breakdown", href: "/scenes", icon: Film },
  { name: "Departments", href: "/departments", icon: Users },
  { name: "Eighths Agent", href: "/eightsagent", icon: Clock },
  { name: "Budget Analysis", href: "/budget", icon: BarChart3 },
  { name: "Schedule", href: "/schedule", icon: Calendar },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-1 bg-muted/30 rounded-lg p-1">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}