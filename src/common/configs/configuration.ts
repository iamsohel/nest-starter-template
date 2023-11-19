export default (): any => ({
  env: process.env.NODE_ENV,
  port: Number(process.env.APP_PORT) || 4000,
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
  },
});
