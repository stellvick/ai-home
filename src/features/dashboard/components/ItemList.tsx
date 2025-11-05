import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Input, Button, Card, CardBody, Pagination, Chip } from '@heroui/react'
import { api } from '../../../services/api'
import { useQueryParams } from '../../../hooks/useQueryParams'
import { ItemModal } from './ItemModal'
import { Recurso } from '../../../types/contracts'

export const ItemList: React.FC = () => {
  const { getParam, setParam } = useQueryParams()
  const [search, setSearch] = useState(getParam('search') || '')
  const [page, setPage] = useState(Number(getParam('page')) || 1)
  const [selectedItem, setSelectedItem] = useState<Recurso | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ['items', page, search],
    queryFn: () => api.getItems({ page, pageSize: 20, search }),
  })

  const handleSearch = () => {
    setParam('search', search)
    setPage(1)
    setParam('page', '1')
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    setParam('page', newPage.toString())
  }

  const openModal = (item: Recurso) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
  }

  if (isLoading) return (
    <div className="flex items-center justify-center py-12">
      <div className="text-foreground/70">Carregando recursos místicos...</div>
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
      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Buscar recursos místicos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
          classNames={{
            input: "bg-background border-border",
          }}
        />
        <Button
          onClick={handleSearch}
          className="bg-primary hover:bg-primary/90"
        >
          🔍 Buscar
        </Button>
      </div>

      {/* Items Grid */}
      {data?.items.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-foreground/60 mb-4">Nenhum recurso encontrado</div>
          <p className="text-foreground/40 text-sm">
            Tente ajustar sua busca ou explore outras categorias
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.items.map((item: Recurso) => (
              <Card
                key={item.id}
                className="bg-surface border border-border hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer group"
                onClick={() => openModal(item)}
              >
                <CardBody className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {item.titulo}
                    </h3>
                    <Chip
                      size="sm"
                      variant={item.avaliado ? "solid" : "bordered"}
                      color={item.avaliado ? "success" : "default"}
                      className="ml-2"
                    >
                      {item.avaliado ? "⭐ Avaliado" : "⏳ Pendente"}
                    </Chip>
                  </div>

                  <p className="text-foreground/70 text-sm leading-body line-clamp-3 mb-4">
                    {item.descricao}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-foreground/50 text-xs">
                      Clique para detalhes
                    </span>
                    <span className="text-primary group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <Pagination
              total={Math.ceil((data?.total || 0) / 20)}
              page={page}
              onChange={handlePageChange}
              classNames={{
                item: "bg-surface border-border",
                cursor: "bg-primary",
              }}
            />
          </div>
        </>
      )}

      <ItemModal item={selectedItem} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}