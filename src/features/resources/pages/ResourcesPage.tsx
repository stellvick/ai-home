import { ResourceList } from '../components/ResourceList'
import { MysticalBackground } from '../../../components/ui/MysticalBackground'
import { MysticalCard } from '../../../components/ui/MysticalCard'

export const ResourcesPage: React.FC = () => {
  return (
    <MysticalBackground className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <MysticalCard className="h-full flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-heading text-white mb-4 tracking-heading">
                  Recursos IA
                </h1>
                <p className="text-white/70">
                  Explore recursos de IA e avalie seu potencial
                </p>
              </div>
            </MysticalCard>
          </div>
          <div className="lg:w-2/3">
            <MysticalCard className="p-8">
              <ResourceList />
            </MysticalCard>
          </div>
        </div>
      </div>
    </MysticalBackground>
  )
}