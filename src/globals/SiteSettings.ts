import { GlobalConfig } from 'payload/types';

const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'restaurantName',
      type: 'text',
      required: true,
      defaultValue: 'Bistrot De La Cour',
    },
    {
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    {
      name: 'city',
      type: 'text',
      required: true,
    },
    {
      name: 'zipCode',
      type: 'text',
    },
    {
      name: 'country',
      type: 'text',
      defaultValue: 'Belgique',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      type: 'group',
      name: 'openingHours',
      fields: [
        {
          name: 'monday_thursday',
          type: 'group',
          fields: [
            { name: 'open', type: 'text' },
            { name: 'close', type: 'text' },
          ],
        },
        {
          name: 'friday_saturday',
          type: 'group',
          fields: [
            { name: 'open', type: 'text' },
            { name: 'close', type: 'text' },
          ],
        },
        {
          name: 'sunday',
          type: 'group',
          fields: [
            { name: 'open', type: 'text' },
            { name: 'close', type: 'text' },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'hero',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'subtitle', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'badgeRating', type: 'text' },
        { name: 'badgeReviewCount', type: 'number' },
      ],
    },
    {
      type: 'group',
      name: 'socialLinks',
      fields: [
        { name: 'facebookUrl', type: 'text' },
        { name: 'instagramUrl', type: 'text' },
        { name: 'googleMapsUrl', type: 'text' },
        { name: 'tripadvisorUrl', type: 'text' },
      ],
    },
  ],
};

export default SiteSettings;
