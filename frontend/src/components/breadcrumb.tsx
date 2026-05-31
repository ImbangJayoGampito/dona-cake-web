import React from "react"
import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"

interface BreadCrumbItem {
  displayName: string
  path: string
}

interface BreadCrumbProps {
  items?: BreadCrumbItem[] // make optional
  currentPage: string
}

export function BreadCrumb({ items = [], currentPage }: BreadCrumbProps) {
  return (
    <div className="container mx-auto px-4 py-3 md:px-6">
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        {/* Dynamic items */}
        {items.map((item, index) => (
          <React.Fragment key={item.path}>
            <ChevronRight className="h-4 w-4" />
            <Link to={item.path} className="hover:text-foreground">
              {item.displayName}
            </Link>
          </React.Fragment>
        ))}

        {/* Current page separator and label */}
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-foreground">{currentPage}</span>
      </div>
    </div>
  )
}
