import crypto from 'crypto';
import util from 'util';
import { exec } from 'child_process';

import { PrismaClient } from '@prisma/client';
import NodeEnvironment from 'jest-environment-node';

const execAsync = util.promisify(exec);

export class PrismaTestEnvironment {
  private databaseName: string;
  private connectionString: string;

  constructor () {
    const dbDriver = process.env.DATABASE_DRIVER
    const dbHost = process.env.DATABASE_HOST;
    const dbPort = process.env.DATABASE_PORT;
    const dbUser = process.env.DATABASE_USER;
    const dbPass = process.env.DATABASE_PASS ?? null;

    this.databaseName = `test_${crypto.randomUUID().split('-').join('_')}`;
    this.connectionString = `${dbDriver}://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${this.databaseName}`;
  }

  async setup(mainEnvironment: NodeEnvironment): Promise<void> {
    process.env.DATABASE_URL = this.connectionString;
    mainEnvironment.global.process.env.DATABASE_URL = this.connectionString

    await execAsync('npx prisma migrate deploy');
  }

  async teardown(): Promise<void> {
    const prisma = new PrismaClient();

    await prisma.$executeRawUnsafe(`DROP DATABASE ${this.databaseName}`);
    await prisma.$disconnect();
  }
}
