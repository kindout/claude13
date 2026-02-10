import type { Schema, Struct } from '@strapi/strapi';

export interface ModeleContenuPubliable extends Struct.ComponentSchema {
  collectionName: 'components_modele_contenu_publiables';
  info: {
    displayName: 'contenu publiable';
    icon: 'bulletList';
  };
  attributes: {
    publication_date: Schema.Attribute.DateTime;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'modele.contenu-publiable': ModeleContenuPubliable;
    }
  }
}
