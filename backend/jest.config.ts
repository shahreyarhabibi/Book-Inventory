module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.spec.ts$',
  collectCoverage: true,
  coverageDirectory: '../coverage',
  moduleNameMapper: {
    '^@users/(.*)$': '<rootDir>/users/$1',
    '^@books/(.*)$': '<rootDir>/books/$1',
  },
};
