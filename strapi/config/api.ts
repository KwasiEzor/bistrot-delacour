export default ({ env }: { env: (key: string, defaultVal?: any) => any }) => ({
  rest: {
    pagination: {
      maxPageSize: 100,
    },
  },
});
