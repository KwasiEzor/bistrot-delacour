import { CollectionConfig } from 'payload/types';

const Reservations: CollectionConfig = {
  slug: 'reservations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'date', 'time', 'guests', 'status'],
  },
  access: {
    create: () => true, // Anyone can submit a reservation
    read: ({ req: { user } }) => !!user, // Only logged in users can read
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'guests',
      type: 'number',
      min: 1,
      max: 20,
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'time',
      type: 'text',
      required: true,
    },
    {
      name: 'specialRequests',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Completed', value: 'completed' },
      ],
      defaultValue: 'pending',
      required: true,
    },
    {
      name: 'notes',
      type: 'richText',
    },
  ],
};

export default Reservations;
