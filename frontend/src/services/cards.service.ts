import { api } from "./api";

type UpdateCardPayload = {
  title?: string;
  description?: string;
  dueDate?: string; // ISO
  order?: number;
  labels?: string[]; // si tu stockes des labels en string[]
  list?: number; // relation: card -> list
};

export const cardsService = {
  async create(listId: number, title: string, order = 0) {
    return (await api.post("/cards", { data: { title, order, list: listId } })).data;
  },

  async update(cardId: number, payload: UpdateCardPayload) {
    return (await api.put(`/cards/${cardId}`, { data: payload })).data;
  },

  async remove(cardId: number) {
    return (await api.delete(`/cards/${cardId}`)).data;
  },

  // Déplacement vers une autre colonne + nouvel ordre
  async move(cardId: number, listId: number, order: number) {
    return (await api.put(`/cards/${cardId}`, { data: { list: listId, order } })).data;
  },

  // Réorganisation dans la même colonne
  async reorder(cardId: number, order: number) {
    return (await api.put(`/cards/${cardId}`, { data: { order } })).data;
  },
};
