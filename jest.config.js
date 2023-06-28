module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePaths: ['node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    '@api/(.*)': '<rootDir>/src/api/$1',
    '@libs/(.*)': '<rootDir>/src/libs/$1',
  },
};
