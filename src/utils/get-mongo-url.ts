import { isEnvProduction } from './is-env-production.js';
import dotenv from 'dotenv';

export function getMongoUrl() {
  if (!isEnvProduction()) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    dotenv.config();
    return `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:27017`;
  }

  return `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}`;
}
