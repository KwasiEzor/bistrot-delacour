export default ({ env }: { env: (key: string, defaultVal?: any) => any }) => ({
  graphql: {
    enabled: true,
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
    },
  },
});
