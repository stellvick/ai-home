import React from 'react'

interface MysticalBackgroundProps {
  children: React.ReactNode
  className?: string
}

export const MysticalBackground: React.FC<MysticalBackgroundProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0B2545] relative overflow-hidden ${className}`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#4B0082]/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#D4AF37]/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#2E2E2E]/20 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
