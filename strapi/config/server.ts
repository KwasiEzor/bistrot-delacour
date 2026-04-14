export default ({ env }: { env: (key: string, defaultVal?: unknown) => string }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env('PORT', 1337),
  app: {
    keys: env('APP_KEYS', 'key1-change-me,key2-change-me').split(','),
  },
});
