// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: '.',
});

const customJestConfig = {
  resetMocks: false,
  setupFilesAfterEnv: ['<rootDir>/__test__/setupTests.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: ['<rootDir>/components/**/*.{js,jsx,ts,tsx}'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'identity-obj-proxy',
    '\\.(css|less|scss|sss|style)$': '<rootDir>/node_modules/jest-css-modules',
    '@/(.*)$': '<rootDir>/$1',
    '^@components(.*)$': '<rootDir>/components$1',
    '^@public(.*)$': '<rootDir>/public$1',
    '^@__test__(.*)$': '<rootDir>/__test__$1',
  },
};

module.exports = createJestConfig(customJestConfig);
