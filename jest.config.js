module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
  },
  testEnvironment: 'jsdom',
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/layout/**',
    '!src/pages/**',
    '!src/custom.d.ts',
    '!src/**/types.ts',
    '!src/@types/**',
    '!src/components/screens/**',
  ],
}
