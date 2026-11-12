import 'dotenv/config';
import { definePrismaConfig } from '@prisma/cli-engine';
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';

export default definePrismaConfig({
  orm: ormConfig({
    contract: "./src/prisma/contract.prisma",
    db: {
      // Use unpooled URL for CLI commands (Neon pgBouncer restriction)
      connection: process.env['DATABASE_URL_UNPOOLED'] || process.env['DATABASE_URL']!,
    },
  }),
});
