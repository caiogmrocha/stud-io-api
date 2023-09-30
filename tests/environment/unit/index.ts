import path from 'node:path';

import dotenv from 'dotenv';
import type { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment';
import NodeEnvironment from 'jest-environment-node';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '..', '.env') });

import { InMemoryDatabaseEnvironment } from './in-memory-database-environment';

export default class UnitTestEnvironment extends NodeEnvironment {
  private inMemoryDatabaseEnvironment: InMemoryDatabaseEnvironment;

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
		super(config, context);

    this.inMemoryDatabaseEnvironment = new InMemoryDatabaseEnvironment();
	}

	async setup(): Promise<void> {
    await this.inMemoryDatabaseEnvironment.setup();

		return super.setup();
	}

	async teardown(): Promise<void> {
    await this.inMemoryDatabaseEnvironment.teardown();
	}
}
