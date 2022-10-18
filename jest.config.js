module.exports = {
  automock: false,

  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
  ],
  coverageProvider: 'babel',
  coverageReporters: ['json'],

  maxWorkers: '1',

  moduleNameMapper: {},
};
