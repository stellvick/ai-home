import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

interface UseItemsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export function useItems(params: UseItemsParams = {}) {
  return useQuery({
    queryKey: ['items', params],
    queryFn: async () => {
      return api.getItems({
        page: params.page,
        pageSize: params.limit,
        search: params.search,
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}