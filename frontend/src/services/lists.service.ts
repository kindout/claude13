import { api } from "./api";

export const listsService = {
  async create(boardId: number, title: string, order = 0) {
    // Relation : list -> board
    return (await api.post("/lists", { data: { title, order, board: boardId } })).data;
  },

  async rename(listId: number, title: string) {
    return (await api.put(`/lists/${listId}`, { data: { title } })).data;
  },

  async remove(listId: number) {
    return (await api.delete(`/lists/${listId}`)).data;
  },

  async setOrder(listId: number, order: number) {
    return (await api.put(`/lists/${listId}`, { data: { order } })).data;
  },

  async setBoard(listId: number, boardId: number) {
    return (await api.put(`/lists/${listId}`, { data: { board: boardId } })).data;
  },
};
