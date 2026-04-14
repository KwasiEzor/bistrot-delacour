import { CollectionConfig } from 'payload';

const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'category', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Reservations', value: 'reservations' },
        { label: 'Menu', value: 'menu' },
        { label: 'General', value: 'general' },
        { label: 'Accessibility', value: 'accessibility' },
      ],
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
};

export default FAQs;
