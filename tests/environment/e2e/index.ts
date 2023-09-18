import type { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment';
import NodeEnvironment from 'jest-environment-node';
import RedisMock from 'ioredis-mock';

import { PrismaTestEnvironment } from './prisma-test-environment';

export default class E2ETestEnvironment extends NodeEnvironment {
  private prismaTestEnvironment: PrismaTestEnvironment;

  constructor(config: JestEnvironmentConfig, context: EnvironmentContext) {
		super(config, context);

    this.prismaTestEnvironment = new PrismaTestEnvironment();
	}

	async setup(): Promise<void> {
    await this.prismaTestEnvironment.setup(this);

		return super.setup();
	}

	async teardown(): Promise<void> {
    await this.prismaTestEnvironment.teardown();
	}
}
