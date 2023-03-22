module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  plugins: ['@typescript-eslint', 'vue', 'nuxt', 'simple-import-sort'],
  ignorePatterns: [
    'example.env',
    'package-lock.json',
    'package.json',
    'public'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'warn',
    '@typescript-eslint/explicit-function-return-type': ['warn'],
    'max-len': 'off',
    'import/prefer-default-export': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/multi-word-component-names': 'off',
    camelcase: 'off',
    'no-restricted-imports': ['error', 'bignumber.js'],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/order': 'off',
    'vue/no-v-html': 'off'
  },
  overrides: [
    // override "simple-import-sort" config
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx', '*.vue'],
      rules: {
        'simple-import-sort/imports': [
          'warn',
          {
            groups: [
              // Packages `vue` related packages come first.
              ['^vue', '^@?\\w', '#\\w'],
              // Internal packages.
              ['^~/\\w'],
              // Side effect imports.
              ['^\\u0000'],
              // components
              ['^~/modules/\\w', '^~/components/\\w'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.?(css)$']
            ]
          }
        ]
      }
    }
  ]
}
