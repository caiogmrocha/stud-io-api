import { setupInMemoryDatabase } from "./tests/helpers/in-memory-database";

const exitSignals = ['SIGINT', 'SIGTERM'];

exitSignals.forEach((signal) => {
	process.on(signal, async () => {
		await setupInMemoryDatabase({
			profiles: [],
			students: [],
			teachers: [],
			subjects: [],
			profile_subjects: [],
		});

		process.exit(0);
	});
});

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  testEnvironment: './tests/environment/unit/index.ts',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  modulePathIgnorePatterns: [
		"<rootDir>/tests/mocks/infra/database",
		"<rootDir>/docker/",
		"<rootDir>/node_modules/",
	],
  testRegex: '.spec.ts$'
};
