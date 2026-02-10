import { api } from "./api";

export type Board = { id: number; title: string };

export const boardsService = {
  async list(): Promise<Board[]> {
    const res = await api.get("/boards");
    const arr = res.data?.data ?? [];
    return arr.map((item: any) => ({
      id: item.id,
      title: item.attributes?.title ?? item.title ?? "",
    }));
  },

  async create(title: string): Promise<Board> {
    const res = await api.post("/boards", { data: { title } });
    const item = res.data?.data; // Strapi => { data: { id, attributes } }
    return {
      id: item.id,
      title: item.attributes?.title ?? title,
    };
  },

  async remove(id: number) {
    const res = await api.delete(`/boards/${id}`);
    return res.data;
  },

  async get(id: number) {
    return (await api.get(`/boards/${id}?populate=deep`)).data;
  },
};
