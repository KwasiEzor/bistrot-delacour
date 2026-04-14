import { buildConfig } from 'payload/config';
import path from 'path';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import { viteBundler } from '@payloadcms/bundler-vite';

import MenuItems from './collections/MenuItems';
import MenuCategories from './collections/MenuCategories';
import GalleryImages from './collections/GalleryImages';
import Reviews from './collections/Reviews';
import Testimonials from './collections/Testimonials';
import Media from './collections/Media';
import TeamMembers from './collections/TeamMembers';
import FAQs from './collections/FAQs';
import Reservations from './collections/Reservations';
import ContactMessages from './collections/ContactMessages';

import SiteSettings from './globals/SiteSettings';
import SEOSettings from './globals/SEOSettings';

export default buildConfig({
  admin: {
    bundler: viteBundler(),
  },
  editor: slateEditor({}),
  collections: [
    MenuItems,
    MenuCategories,
    GalleryImages,
    Reviews,
    Testimonials,
    Media,
    TeamMembers,
    FAQs,
    Reservations,
    ContactMessages,
  ],
  globals: [
    SiteSettings,
    SEOSettings,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
});
