import React from 'react'
import { Card, CardBody } from '@heroui/react'

interface ProfessionalCardProps {
  children: React.ReactNode
  className?: string
  bodyClassName?: string
  onClick?: () => void
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ children, className = '', bodyClassName = '', onClick }) => {
  return (
    <Card className={`bg-white/15 backdrop-blur-lg shadow-2xl rounded-2xl border border-white/25 relative overflow-hidden hover:shadow-3xl hover:bg-white/20 transition-all duration-300 ${className}`} onClick={onClick}>
      {/* Enhanced background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-indigo-600/10 rounded-2xl"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-t-2xl"></div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-700 via-purple-600 to-blue-600 rounded-b-2xl"></div>
      <CardBody className={`relative z-10 ${bodyClassName}`}>
        {children}
      </CardBody>
    </Card>
  )
}