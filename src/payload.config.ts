import { buildConfig } from '@payloadcms/next/config';
import path from 'path';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

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
    bundler: webpackBundler(),
  },
  editor: lexicalEditor({}),
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
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
});
