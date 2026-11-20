import dotenv from 'dotenv';
import path from 'path';

// Carrega .env.local primeiro, com fallback para .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Se DIRECT_URL não foi explicitamente setado, usa DATABASE_URL como fallback
if (!process.env['DIRECT_URL'] && process.env['DATABASE_URL']) {
  process.env['DIRECT_URL'] = process.env['DATABASE_URL'];
}

import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env['DATABASE_URL'] ?? '',
    // @ts-ignore
    directUrl: process.env['DIRECT_URL'] ?? process.env['DATABASE_URL'] ?? '',
  },
});

