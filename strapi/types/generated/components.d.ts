import type { Schema, Struct } from '@strapi/strapi';

export interface SeoPageMeta extends Struct.ComponentSchema {
  collectionName: 'components_seo_page_metas';
  info: {
    description: 'Per-page SEO meta configuration';
    displayName: 'Page Meta';
    icon: 'search';
  };
  attributes: {
    canonicalUrl: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    noIndex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    path: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'seo.page-meta': SeoPageMeta;
    }
  }
}
