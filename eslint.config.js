import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query'

/* Plugins */
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginReact from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config([
  // Ignora archivos y directorios específicos
  globalIgnores([
    'dist',
    'eslint.config.js',
    '.prettierrc',
    'tsconfig.json',
    'tsconfig.app.json',
    'tsconfig.node.json',
    'vite.config.js',
    'vite.config.ts',
  ]),

  // Reglas para archivos JavaScript y TypeScript
  {
    files: ['**/*.{js,ts}'],
    rules: {
      // 'max-lines-per-function': [
      //   'warn', // Máximo de líneas por función dejando de lado líneas en blanco y comentarios. Toma en cuenta desde el inicio hasta el cierre de la función
      //   {
      //     max: 5,
      //     skipBlankLines: true,
      //     skipComments: true,
      //   },
      // ],
    },
  },

  // Reglas para archivos JavaScript y TypeScript con JSX y React
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [
      eslint.configs.recommended, // Base ESLint rules
      tseslint.configs.recommended, // TypeScript ESLint rules
      tseslint.configs.recommendedTypeChecked, // TypeScript rules for type-checked files
      tseslint.configs.stylistic, // TypeScript stylistic rules
      tseslint.configs.stylisticTypeChecked, // TypeScript stylistic rules for type-checked files
      eslintPluginReact.configs.flat.recommended, // React rules
      eslintPluginReact.configs.flat['jsx-runtime'], // React rules for JSX runtime
      jsxA11y.flatConfigs.recommended, // Accessibility rules for JSX
      reactHooks.configs['recommended-latest'], // React Hooks rules
      reactRefresh.configs.vite, // React Refresh rules for Vite
      eslintConfigPrettier, // Prettier rules to disable conflicting ESLint rules
      pluginQuery.configs['flat/recommended'], // TanStack Query ESLint rules
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json'],
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'simple-import-sort': simpleImportSort, // Plugin for sorting imports
      'import': eslintPluginImport, // Plugin for managing import/export syntax
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      /* REGLAS BÁSICAS DE BUENAS PRÁCTICAS */
      'no-console': 'warn', // Evita el uso de console.log, console.warn, etc.
      'no-debugger': 'warn', // Evita el uso de debugger
      'no-duplicate-imports': 'warn', // Evita importar el mismo módulo varias veces
      'no-promise-executor-return': 'error', // Evita retornar un valor en el executor de una promesa según https://eslint.org/docs/latest/rules/no-promise-executor-return
      'no-self-compare': 'warn', // Evita comparar una variable consigo misma
      'no-template-curly-in-string': 'warn', // Evita el uso de ${} dentro de strings sin template literals
      'no-unused-vars': 'warn', // Evita variables no utilizadas
      // 'no-unused-vars': [
      //   'warn',
      //   {
      //     vars: 'all',
      //     args: 'after-used',
      //     ignoreRestSiblings: true,
      //     caughtErrors: 'all',
      //   },
      // ],
      'no-use-before-define': 'error', // Evita el uso de variables antes de ser definidas
      'require-atomic-updates': 'error', // Evita actualizaciones atómicas en variables que pueden ser modificadas por otros procesos según https://eslint.org/docs/latest/rules/require-atomic-updates
      'eqeqeq': ['error', 'always'], // Usa siempre === y !== en lugar de == y !=
      'default-case': 'warn', // Siempre usa un caso por defecto en switch
      'default-case-last': 'warn', // Caso por defecto al final de la lista
      'no-alert': 'warn', // Evita el uso de alert
      'no-bitwise': 'error', // Evita el uso de operadores bitwise (solo clásicos como ||, &&, <, >)
      'no-empty-function': 'warn', // Evita el uso de funciones vacías
      'no-multi-assign': 'warn', // Evita el uso de múltiples asignaciones como -- let a = b = c = 5; --
      'no-new-func': 'warn', // Evita el uso de funciones construidas con new (new Function('return 5;'))
      'no-new-wrappers': 'warn', // Evita el uso de objetos construidos con new (como String, Number, Boolean)
      'yoda': 'warn', // Evita el uso de la notación Yoda (=== '5' vs '5' ===)
      'no-shadow': 'warn', // Evita el uso de los mismos nombres de variables en diferentes ámbitos
      // 'no-throw-literal': 'warn', // Evita lanzar literales en lugar de errores como -- throw 'error'; -- en lugar de -- throw new Error('error'); --
      'no-useless-rename': 'warn', // Evita renombrar variables a nombres idénticos
      'no-var': 'warn', // Evita el uso de var
      'radix': 'warn', // Evita el uso de parseInt sin especificar la base como -- parseInt('5'); -- en lugar de -- parseInt('5', 10); --
      'require-await': 'warn', // Evita funciones async sin await
      'no-else-return': 'warn', // Evita else si hay un return previo
      'prefer-const': 'warn', // Prefiere const sobre let si no se reasigna
      'no-multiple-empty-lines': [
        'warn', // Evita múltiples líneas en blanco consecutivas
        {
          max: 1, // Máximo de una línea en blanco
          maxEOF: 1, // Máximo de una línea en blanco al final del archivo
          maxBOF: 0, // Máximo de una línea en blanco al principio del archivo
        },
      ],
      // 'max-lines': [
      //   'warn', // Máximo número de líneas en un archivo dejando de lado líneas en blanco y comentarios. Toma en cuenta desde el inicio hasta el cierre del archivo
      //   {
      //     max: 200,
      //     skipBlankLines: true,
      //     skipComments: true,
      //   },
      // ],

      /* REGLAS PARA REACT (hooks y componentes) */
      'react-refresh/only-export-components': [
        'error', // Asegura que solo se exporten componentes para que React Refresh funcione correctamente
        {
          allowConstantExport: false, // Permite exportaciones constantes sin advertencia
        },
      ],
      'react-hooks/rules-of-hooks': 'error', // Reglas de los hooks de React
      'react-hooks/exhaustive-deps': 'warn', // Revisa las dependencias de los hooks de React
      'react/button-has-type': 'warn', // Advierte que los botones tengan type="button" o type="submit"
      'react/checked-requires-onchange-or-readonly': 'warn', // Evita el uso de checked sin onChange o readOnly
      'react/hook-use-state': 'error', // Asegura sobre el uso incorrecto (nomenclatura y asignación) de useState
      'react/jsx-pascal-case': 'error', // Asegura sobre el uso incorrecto de PascalCase en los nombres de los componentes
      'react/no-array-index-key': 'error', // Asegura sobre el uso de índices de matriz (ejemplo .map) como key en JSX
      'react/style-prop-object': 'error', // Asegura sobre el uso de un objeto en la prop style
      'react/void-dom-elements-no-children': 'error', // Asegura que los elementos de DOM vacíos no tengan hijos
      'react/self-closing-comp': 'warn', // Advierte que los componentes vacíos deben ser autocontenidos
      'react/jsx-boolean-value': ['warn', 'never'], // Advierte el no usear value={true} sino solo la prop
      'react/jsx-sort-props': [
        'warn', // Advierte sobre el orden de las props de los componentes JSX
        {
          callbacksLast: true, // Coloca las props de callback al final como onClick, onChange, etc.
          shorthandFirst: true, // Coloca las props abreviadas al principio
          shorthandLast: false, // Coloca las props abreviadas al final
          noSortAlphabetically: false, // Ordena alfabéticamente las props como { foo, bar } hacia { bar, foo }
          reservedFirst: true, // Coloca las props reservadas al principio como key, ref, className, etc.
          ignoreCase: true, // Ignora mayúsculas y minúsculas al ordenar las props
          multiline: 'last', // Coloca las props multilineales al final de la lista
        },
      ],

      /* REGLAS PARA IMPORTACIONES (orden y estilo) */
      'simple-import-sort/imports': 'warn', // Ordena las importaciones de manera sencilla
      'simple-import-sort/exports': 'warn', // Ordena las exportaciones de manera sencilla
      'no-restricted-syntax': [
        'error', // Evita exportaciones o re-exports de tipo 'export * from'
        {
          selector: 'ExportAllDeclaration',
          message: "Exports of type 'export * from' are not allowed.",
        },
      ],
    },
  },
]);
