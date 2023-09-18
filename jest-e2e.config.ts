/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  testEnvironment: './tests/environment/e2e/index.ts',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '~/(.*)': '<rootDir>/tests/$1'
  },
  testRegex: '.test.ts$',
	modulePathIgnorePatterns: [
		"<rootDir>/tests/mocks/infra/database",
		"<rootDir>/docker/",
		"<rootDir>/node_modules/",
	],
};
