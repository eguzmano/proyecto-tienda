import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
import standard from 'eslint-config-standard'
import standardJsx from 'eslint-config-standard-jsx'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module'
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react
    },
    rules: {
      // 👉 primero lo que traen standard + standard-jsx
      ...js.configs.recommended.rules,
      ...standard.rules,
      ...standardJsx.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // 👉 tus reglas personalizadas
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true }
      ],

      // 🚨 sobreescribir lo que no quieres
      'react/prop-types': 'off'
    }
  }
]
