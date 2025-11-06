import React from 'react'
import { Card, CardBody } from '@heroui/react'

interface MysticalCardProps {
  children: React.ReactNode
  className?: string
  bodyClassName?: string
  onClick?: () => void
}

export const MysticalCard: React.FC<MysticalCardProps> = ({ children, className = '', bodyClassName = '', onClick }) => {
  return (
    <Card className={`bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 relative overflow-hidden cursor-pointer ${className}`} onClick={onClick}>
      {/* Card background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4B0082] via-[#D4AF37] to-[#4B0082] rounded-t-3xl"></div>
      <CardBody className={`relative z-10 ${bodyClassName}`}>
        {children}
      </CardBody>
    </Card>
  )
}
