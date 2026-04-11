module.exports = ({ env }) => ({
  database: {
    client: env('DATABASE_CLIENT', 'sqlite'),
    connection: {
      filename: env('DATABASE_FILENAME', './data/data.sqlite'),
    },
    useNullAsDefault: true,
  },
  plugins: {
    graphql: {
      enabled: true,
      config: {
        endpoint: '/graphql',
        shadowCRUD: true,
      },
    },
  },
});
