export default ({ env }: { env: (key: string, defaultVal?: unknown) => string }) => ({
  connection: {
    client: env('DATABASE_CLIENT', 'sqlite'),
    connection: {
      filename: env('DATABASE_FILENAME', './data/data.sqlite'),
    },
    useNullAsDefault: true,
  },
});
