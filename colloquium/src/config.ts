import { config } from 'dotenv';
config({ path: __dirname + '/.env' });

export const port = process.env.port || 3000;
