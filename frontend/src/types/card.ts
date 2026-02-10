import type { StrapiRelationOne } from "./strapi";
import type { ListAttributes } from "./list";

export type CardAttributes = {
  title: string;
  description?: string | null;
  dueDate?: string | null; // ISO string
  order?: number | null;
  labels?: string[] | null;

  // relations
  list?: StrapiRelationOne<ListAttributes>;
};

export type CardDTO = {
  id: number;
  title: string;
  description?: string;
  dueDate?: string;
  order: number;
  labels: string[];
  listId?: number;
};
