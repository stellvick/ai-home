import { LucideIcon, LucideProps } from 'lucide-react'
import { forwardRef } from 'react'

interface IconProps extends LucideProps {
  name: string
}

const iconMap: Record<string, LucideIcon> = {
  // Add icons as needed
  // e.g., home: Home,
  // search: Search,
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(({ name, ...props }, ref) => {
  const IconComponent = iconMap[name]
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`)
    return null
  }
  return <IconComponent ref={ref} {...props} />
})

Icon.displayName = 'Icon'