export default ({ env }: { env: (key: string, defaultVal?: any) => any }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'default-admin-jwt-secret-change-me'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'default-api-token-salt'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'default-transfer-token-salt'),
    },
  },
  encrypt: {
    secret: env('ENCRYPTION_SECRET', 'default-encryption-secret'),
  },
});
