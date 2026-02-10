import type { StrapiRelationMany, StrapiRelationOne } from "./strapi";
import type { BoardAttributes } from "./board";
import type { CardAttributes } from "./card";

export type ListAttributes = {
  title: string;
  order?: number | null;

  // relations
  board?: StrapiRelationOne<BoardAttributes>;
  cards?: StrapiRelationMany<CardAttributes>;
};

export type ListDTO = {
  id: number;
  title: string;
  order: number;
  boardId?: number;
  cards: Array<{
    id: number;
    title: string;
    description?: string;
    dueDate?: string;
    order: number;
    labels: string[];
  }>;
};
