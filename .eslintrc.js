module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    semi: ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'no-unused-vars': "off",
    "@typescript-eslint/no-unused-vars": ["off"],
    'lines-between-class-members': ["error", "always"],
    'no-debugger': ["off"],
    'no-undef': ["off"],
    '@typescript-eslint/explicit-function-return-type': ["off"],
    '@typescript-eslint/no-non-null-assertion': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/camelcase': ['off'],
    '@typescript-eslint/consistent-type-assertions': ['off']
  }
};
