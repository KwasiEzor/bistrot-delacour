import { CollectionConfig } from 'payload';

const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'rating', 'date', 'source', 'isVerified'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      required: true,
    },
    {
      name: 'date',
      type: 'date',
    },
    {
      name: 'isVerified',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'source',
      type: 'select',
      options: [
        { label: 'Google', value: 'google' },
        { label: 'TripAdvisor', value: 'tripadvisor' },
        { label: 'Facebook', value: 'facebook' },
        { label: 'Direct', value: 'direct' },
      ],
      defaultValue: 'google',
    },
  ],
};

export default Reviews;
