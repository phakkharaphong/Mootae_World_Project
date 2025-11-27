import { Articleblog, createArticleblog } from '@/interfaces/Aricleblog';
import api from './use-post';
import { ApiPaginatedResponse, ResponseList } from '@/interfaces/ResponseList';
import { Articlecategories } from '@/interfaces/Articlecategories';

export const articleCatService = {
  // post: async (dataform: createArticleblog) => {
  //     const res = await api.post<createArticleblog>('articleblog/create', {
  //         json: dataform
  //     });
  //     const data = await res.json();
  //     return data;
  // },
  // patch: async (dataform: createArticleblog) => {
  //     const res = await api.patch<createArticleblog>('articleblog', {
  //         json: dataform
  //     });
  //     const data = await res.json();
  //     return data;
  // },
  getId: async (id: string) => {
    const res = await api.get<ResponseList<Articlecategories>>(
      `articlecategories/${id}`,
    );
    const data = await res.json();
    return data.data;
  },
  getAll: async (page: number, limit: number) => {
    const res = await api.get<ApiPaginatedResponse<Articlecategories>>(
      `articlecategories/?page=${page}&limit${limit}`,
    );
    const data = await res.json();
    return data.data;
  },
};
