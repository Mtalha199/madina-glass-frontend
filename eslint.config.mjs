// eslint.config.mjs
// ESLint disabled - all rules turned off
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['**/*'], // Ignore all files
  },
  globalIgnores([
    '**/*', // Ignore everything
  ]),
])
