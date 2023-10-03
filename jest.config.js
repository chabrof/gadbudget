module.exports = {
  'roots': [
    '<rootDir>/src'
  ],
  'moduleNameMapper': {
    '^@wwwTs/(.*)': '<rootDir>/src/ts/$1'
  },
  'testMatch': [
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  'transform': {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
}