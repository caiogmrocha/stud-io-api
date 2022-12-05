import type { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment';
import NodeEnvironment from 'jest-environment-node';

export default class E2ETestEnvironment extends NodeEnvironment {
    constructor (config: JestEnvironmentConfig, context: EnvironmentContext) {
        super(config, context);
    }

    async setup(): Promise<void> {
        return super.setup();
    }

    async teardown(): Promise<void> {
        
    }
}