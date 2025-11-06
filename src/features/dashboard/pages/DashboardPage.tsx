import { Button } from '@heroui/react';
import { Plus } from 'lucide-react';
import { ItemList } from '../components/ItemList';
import { MysticalBackground } from '../../../components/ui/MysticalBackground';
import { MysticalCard } from '../../../components/ui/MysticalCard';

export function DashboardPage() {
  return (
    <MysticalBackground>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading text-white mb-4 tracking-heading drop-shadow-lg">
            Oráculo IA Dashboard
          </h1>
          <p className="text-white/80 text-lg">
            Gerencie seus recursos de IA no reino das estrelas
          </p>
          <Button
            color="primary"
            variant="solid"
            startContent={<Plus size={20} />}
            className="mt-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold px-8 py-4 shadow-2xl hover:shadow-[0_0_30px_rgba(75,0,130,0.5)] transition-all duration-300 rounded-2xl border-0"
          >
            Novo Recurso
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <MysticalCard className="text-center py-8">
            <div className="text-4xl font-bold text-white mb-3">42</div>
            <div className="text-white/70 text-sm font-medium">Recursos Ativos</div>
          </MysticalCard>
          <MysticalCard className="text-center py-8">
            <div className="text-4xl font-bold text-white mb-3">12</div>
            <div className="text-white/70 text-sm font-medium">Conversas Hoje</div>
          </MysticalCard>
          <MysticalCard className="text-center py-8">
            <div className="text-4xl font-bold text-white mb-3">98%</div>
            <div className="text-white/70 text-sm font-medium">Precisão Média</div>
          </MysticalCard>
        </div>

        {/* Resources Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <MysticalCard className="h-full flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-heading text-white mb-4 tracking-heading">
                  Seus Recursos
                </h2>
                <p className="text-white/70">
                  Explore e gerencie seus artefatos místicos de IA
                </p>
              </div>
            </MysticalCard>
          </div>
          <div className="lg:w-2/3">
            <MysticalCard className="p-8">
              <ItemList />
            </MysticalCard>
          </div>
        </div>
      </div>
    </MysticalBackground>
  );
}
