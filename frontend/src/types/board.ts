import type { StrapiRelationMany } from "./strapi";
import type { ListAttributes } from "./list";

export type BoardAttributes = {
  title: string;

  // relations
  lists?: StrapiRelationMany<ListAttributes>;

  // Strapi system fields (souvent présents)
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string | null;
};

export type BoardDTO = {
  id: number;
  title: string;
  lists: Array<{
    id: number;
    title: string;
    order: number;
  }>;
};
