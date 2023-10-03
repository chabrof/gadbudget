module.exports = {
  'env': {
    'browser': true,
    'es2021': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'overrides': [],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'ignorePatterns': ['webpack.*.*.*'],
  'plugins': [
    'react',
    'react-hooks',
    '@typescript-eslint'
  ],
  'settings' : {
    'react': {
      'version': 'detect'
    },
  },
  'rules': {
    'space-before-function-paren': ['error'],
    'indent': ['error', 2, { 'SwitchCase': 1 } ],
    'linebreak-style': [ 'error', 'unix'],
    'react-hooks/exhaustive-deps': ['warn', {
      'additionalHooks': ''
    }],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ]
  }
}
