import React from 'react'
import './MysticalAnimations.css'

export interface MysticalAnimationsProps {
  type: 'particles' | 'energy-lines' | 'glow-pulse' | 'floating'
  intensity?: 'low' | 'medium' | 'high'
  children?: React.ReactNode
}

export const MysticalAnimations: React.FC<MysticalAnimationsProps> = ({
  type,
  intensity = 'medium',
  children,
}) => {
  const intensityClass = `intensity-${intensity}`

  return (
    <div className={`mystical-animation ${type} ${intensityClass}`}>
      {children}
    </div>
  )
}

export const ParticleEffect: React.FC<{ count?: number }> = ({ count = 10 }) => (
  <div className="particle-container">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="particle" />
    ))}
  </div>
)

export const EnergyLine: React.FC<{ direction?: 'horizontal' | 'vertical' }> = ({
  direction = 'horizontal',
}) => (
  <div className={`energy-line ${direction === 'vertical' ? 'vertical' : 'horizontal'}`} />
)

export const GlowPulse: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="glow-pulse">{children}</div>
)

export default MysticalAnimations
