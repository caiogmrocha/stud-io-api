import type { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment';
import NodeEnvironment from 'jest-environment-node';

import { PrismaTestEnvironment } from './prisma-test-environment';

import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
	path: path.resolve(__dirname, '..', '..', '..', '.env.test'),
	override: true,
});

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
