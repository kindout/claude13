export type StrapiMeta = unknown;

export type StrapiEntity<T> = {
  id: number;
  attributes: T;
};

export type StrapiResponse<T> = {
  data: T;
  meta?: StrapiMeta;
};

export type StrapiListResponse<T> = {
  data: T[];
  meta?: StrapiMeta;
};

// Relations Strapi (souvent: { data: ... })
export type StrapiRelationOne<T> = { data: StrapiEntity<T> | null };
export type StrapiRelationMany<T> = { data: Array<StrapiEntity<T>> };
