module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.ts', '!**/types.ts', '!**/node_modules/**', '!**/lib/**'],
};
