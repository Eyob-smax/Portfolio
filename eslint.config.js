import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Props pulled out of a destructure purely to keep them out of a `...rest`
      // spread are deliberate, not oversights - react-markdown's `node` is the
      // usual case, and spreading it onto a DOM element warns at runtime.
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    /*
     * shadcn/ui generates these files, and they export a `cva` variants object
     * next to the component by design. Fast Refresh degrades to a full reload
     * for them; that is the trade shadcn makes, and it is not worth rewriting
     * vendored files to silence. Rule off here, on everywhere else.
     */
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
])
