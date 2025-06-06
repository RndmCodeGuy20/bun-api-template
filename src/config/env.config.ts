import { hostname } from 'os';

const {
  NODE_ENV,
  APP_PORT,
  APP_HOST,
  DB_HOST,
  MYSQL_DB_PORT,
  POSTGRES_DB_PORT,
  DB_ADMIN_USER,
  DB_ADMIN_PASSWORD,
  DB_DEV_USER,
  DB_DEV_PASSWORD,
  PG_ADMIN_DB_URL,
  PG_DEV_DB_URL,
  DB_NAME,
  NEON_DEV_DB_URL,
  KAFKA_HOST,
  KAFKA_PORT,
  KAFKA_CLIENT_ID,
  KAFKA_GROUP_ID,
  KAFKA_TOPIC,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  JWT_SECRET,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY,
  S3_BUCKET_NAME,
  S3_BUCKET_REGION,
  RESEND_API_KEY,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
  SOURCE_TOKEN,
} = process.env;

export const envConfig = {
  ENV: NODE_ENV,
  PORT: APP_PORT,
  HOST: APP_HOST,
  HOSTNAME: hostname(),
  DB: {
    DB_HOST: DB_HOST,
    MYSQL_DB_PORT: MYSQL_DB_PORT,
    POSTGRES_DB_PORT: POSTGRES_DB_PORT,
    DB_ADMIN_USER: DB_ADMIN_USER,
    DB_ADMIN_PASSWORD: DB_ADMIN_PASSWORD,
    DB_DEV_USER: DB_DEV_USER,
    DB_DEV_PASSWORD: DB_DEV_PASSWORD,
    DB_ADMIN_DB_URL: PG_ADMIN_DB_URL,
    DB_DEV_DB_URL: PG_DEV_DB_URL,
    DB_NAME: DB_NAME,
    NEON_DEV_DB_URL: NEON_DEV_DB_URL,
  },
  KAFKA: {
    KAFKA_HOST: KAFKA_HOST,
    KAFKA_PORT: KAFKA_PORT,
    KAFKA_CLIENT_ID: KAFKA_CLIENT_ID,
    KAFKA_GROUP_ID: KAFKA_GROUP_ID,
    KAFKA_TOPIC: KAFKA_TOPIC,
  },
  REDIS: {
    REDIS_HOST: REDIS_HOST,
    REDIS_PORT: REDIS_PORT,
    REDIS_PASSWORD: REDIS_PASSWORD,
  },
  AWS: {
    ACCESS_KEY_ID: ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: SECRET_ACCESS_KEY,
    S3: {
      BUCKET_NAME: S3_BUCKET_NAME,
      BUCKET_REGION: S3_BUCKET_REGION,
    },
  },
  JWT_SECRET_KEY: JWT_SECRET,
  RESEND_API_KEY: RESEND_API_KEY,
  EMAIL: {
    HOST: EMAIL_HOST,
    PORT: EMAIL_PORT,
    USER: EMAIL_USER,
    PASSWORD: EMAIL_PASSWORD,
  },
  LOGTAIL_SOURCE_TOKEN: SOURCE_TOKEN,
};
