import { CollectionConfig } from 'payload/types';

const GalleryImages: CollectionConfig = {
  slug: 'gallery-images',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'isFeatured', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Interior', value: 'interior' },
        { label: 'Exterior', value: 'exterior' },
        { label: 'Food', value: 'food' },
        { label: 'Events', value: 'events' },
        { label: 'Team', value: 'team' },
      ],
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
};

export default GalleryImages;
