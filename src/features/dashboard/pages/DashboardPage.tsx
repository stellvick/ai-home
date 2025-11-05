import { Button, Card, CardBody } from '@heroui/react';
import { Plus } from 'lucide-react';

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-primary/20">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md border-b border-border rounded-b-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-heading text-foreground mb-2 tracking-heading">
                Oráculo IA Dashboard
              </h1>
              <p className="text-muted">
                Gerencie seus recursos de IA
              </p>
            </div>
            <Button
              color="primary"
              variant="solid"
              startContent={<Plus size={20} />}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-foreground font-semibold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl border-0"
            >
              Novo Recurso
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/20 to-secondary/20 border border-border backdrop-blur-sm rounded-2xl shadow-lg">
            <CardBody className="text-center py-8">
              <div className="text-3xl font-bold text-foreground mb-3">42</div>
              <div className="text-muted text-sm font-medium">Recursos Ativos</div>
            </CardBody>
          </Card>
          <Card className="bg-gradient-to-br from-secondary/20 to-accent/20 border border-border backdrop-blur-sm rounded-2xl shadow-lg">
            <CardBody className="text-center py-8">
              <div className="text-3xl font-bold text-foreground mb-3">12</div>
              <div className="text-muted text-sm font-medium">Conversas Hoje</div>
            </CardBody>
          </Card>
          <Card className="bg-gradient-to-br from-accent/20 to-primary/20 border border-border backdrop-blur-sm rounded-2xl shadow-lg">
            <CardBody className="text-center py-8">
              <div className="text-3xl font-bold text-foreground mb-3">98%</div>
              <div className="text-muted text-sm font-medium">Precisão Média</div>
            </CardBody>
          </Card>
        </div>

        <Card className="bg-card/80 backdrop-blur-md border border-border rounded-2xl shadow-xl">
          <CardBody className="p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Seus Recursos</h2>
            <p className="text-muted">Lista de itens será exibida aqui.</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
