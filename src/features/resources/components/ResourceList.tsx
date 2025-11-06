import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Input, Button, Pagination, Chip, Select, SelectItem } from '@heroui/react'
import { api } from '../../../services/api'
import { useQueryParams } from '../../../hooks/useQueryParams'
import { EvaluateButton } from './EvaluateButton'
import { ProfessionalCard } from '../../../components/ui/ProfessionalCard'
import { Recurso } from '../../../types/contracts'

export const ResourceList: React.FC = () => {
  const { getParam, setParam } = useQueryParams()
  const [search, setSearch] = useState(getParam('search') || '')
  const [avaliado, setAvaliado] = useState(getParam('avaliado') || '')
  const [page, setPage] = useState(Number(getParam('page')) || 1)

  const { data, isLoading, error } = useQuery({
    queryKey: ['resources', page, search, avaliado],
    queryFn: () => api.getResources({ page, pageSize: 20, search, avaliado: avaliado ? avaliado === 'true' : undefined }),
  })

  const handleSearch = () => {
    setParam('search', search)
    setParam('avaliado', avaliado)
    setPage(1)
    setParam('page', '1')
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    setParam('page', newPage.toString())
  }

  if (isLoading) return (
    <div className="flex items-center justify-center py-12">
      <div className="text-foreground/70">Carregando recursos...</div>
    </div>
  )

  if (error) return (
    <div className="text-center py-12">
      <div className="text-red-400 mb-4">Erro ao carregar recursos</div>
      <Button onClick={() => window.location.reload()} variant="ghost">
        Tentar Novamente
      </Button>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Filters */}
      <ProfessionalCard className="p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-white/30 shadow-3xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Buscar recursos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
          <Select
            placeholder="Status de avaliação"
            selectedKeys={avaliado ? [avaliado] : []}
            onSelectionChange={(keys) => setAvaliado(Array.from(keys)[0] as string)}
            className="w-48 bg-white/10 border-white/20"
          >
            <SelectItem key="">Todos</SelectItem>
            <SelectItem key="true">Avaliados</SelectItem>
            <SelectItem key="false">Não avaliados</SelectItem>
          </Select>
          <Button onClick={handleSearch} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg">
            🔍 Buscar
          </Button>
        </div>
      </ProfessionalCard>

      {/* Resources Grid */}
      {data?.items.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-foreground/60 mb-4">Nenhum recurso encontrado</div>
          <p className="text-foreground/40 text-sm">
            Tente ajustar sua busca ou filtros
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.items.map((resource: Recurso) => (
              <ProfessionalCard key={resource.id} className="p-6 hover:scale-105 transition-transform duration-200">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground line-clamp-2">
                    {resource.titulo}
                  </h3>
                  <Chip
                    size="sm"
                    variant={resource.avaliado ? "solid" : "bordered"}
                    color={resource.avaliado ? "success" : "default"}
                  >
                    {resource.avaliado ? "⭐ Avaliado" : "⏳ Pendente"}
                  </Chip>
                </div>

                <p className="text-foreground/70 text-sm leading-body line-clamp-3 mb-4">
                  {resource.descricao}
                </p>

                <div className="flex justify-end">
                  {!resource.avaliado && <EvaluateButton resourceId={resource.id} />}
                </div>
              </ProfessionalCard>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <Pagination
              total={Math.ceil((data?.total || 0) / 20)}
              page={page}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  )
}