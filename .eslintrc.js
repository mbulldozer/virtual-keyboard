module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'no-param-reassign': ['error', { props: false }],
    'import/extensions': ['error', 'ignorePackages', { js: 'always' }],
  },
};
