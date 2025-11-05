import { useMedia } from 'react-use'

export const useIsReducedMotion = () => {
  return useMedia('(prefers-reduced-motion: reduce)', false)
}