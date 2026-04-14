import { GlobalConfig } from 'payload';

const SEOSettings: GlobalConfig = {
  slug: 'seo-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'defaultTitle',
      type: 'text',
      required: true,
      defaultValue: 'Bistrot De La Cour - Restaurant Charleroi',
    },
    {
      name: 'defaultDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'defaultImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'siteUrl',
      type: 'text',
      defaultValue: 'https://bistrot-delacour.be',
    },
    {
      name: 'siteLanguage',
      type: 'text',
      defaultValue: 'fr',
    },
    {
      name: 'twitterHandle',
      type: 'text',
    },
    {
      name: 'googleSiteVerification',
      type: 'text',
    },
  ],
};

export default SEOSettings;
