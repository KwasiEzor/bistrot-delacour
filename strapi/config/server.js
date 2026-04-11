const { Config } = require('@strapi/strapi').schemas;

module.exports = ({ env }) => ({
  server: {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
      keys: env.array('APP_KEYS', ['default-key-1', 'default-key-2']),
    },
  },
});
