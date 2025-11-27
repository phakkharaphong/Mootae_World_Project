import { Order } from '@/interfaces/Order';
import { ApiPaginatedResponse } from '@/interfaces/ResponseList';
import api from './use-post';

export const orderService = {
  getall: async (page: number, limit: number) => {
    const res = await api.get<ApiPaginatedResponse<Order>>(
      `orders?page=${page}&limit=${limit}`,
    );
    const data = await res.json();
    return data.data;
  },
};
