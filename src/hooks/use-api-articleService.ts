import { Articleblog, createArticleblog } from "@/interfaces/Aricleblog";
import api from "./use-post";
import { ResponseList } from "@/interfaces/ResponseList";

export const articleService = {
    post: async (dataform: createArticleblog) => {
        const res = await api.post<createArticleblog>('articleblog/create', {
            json: dataform
        });
        const data = await res.json();
        return data;
    },
    patch: async (dataform: createArticleblog) => {
        const res = await api.patch<createArticleblog>('articleblog', {
            json: dataform
        });
        const data = await res.json();
        return data;
    },
    getId: async (id: string) => {
        const res = await api.get<ResponseList<Articleblog>>(`articleblog/${id}`);
        const data = await res.json();
        return data.data;
    }
}