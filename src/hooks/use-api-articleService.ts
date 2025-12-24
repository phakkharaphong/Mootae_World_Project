import { Articleblog, createArticleblog } from '@/interfaces/Aricleblog';
import api from './use-post';
import { ApiPaginatedResponse, ResponseList } from '@/interfaces/ResponseList';

export const articleService = {
  post: async (dataform: createArticleblog) => {
    const res = await api.post<createArticleblog>('blog/create', {
      json: dataform,
    });
    const data = await res.json();
    return data;
  },
  patch: async (dataform: createArticleblog, id: string) => {
    const res = await api.patch<createArticleblog>(`blog/${id}`, {
      json: dataform,
    });
    const data = await res.json();
    return data;
  },
  getId: async (id: string) => {
    const res = await api.get<ResponseList<Articleblog>>(`blog/${id}`);
    const data = await res.json();
    return data.data;
  },
  getAll: async(page: number, limit: number) => {
   const res = await api.get<ApiPaginatedResponse<Articleblog>>(
      `blog?page=${page}&limit=${limit}`,
    );
    const data = await res.json();
    return data.data;
  }
};
