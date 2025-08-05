# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and
some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)
  uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)
  uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the
configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install
[eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x)
and
[eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom)
for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

## Tecnologías usadas

- React (v19)
- TailwindCSS (v4)
- React Router (v7)
- React Icons (v5)
- @tanstack/react-query (v5)
- axios (v1)

## Apis utilizadas

- https://docs.github.com/en/rest/issues/labels?apiVersion=2022-11-28
- https://github.com/facebook/react/issues
- https://api.github.com/repos/facebook/react/labels (tiene límite de uso, puede
  que sea necesario crear un usuario y un api_key)

---

- En esta siguiente sección veremos puntualmente:
  - Pre-fetch de queries
  - Establecer data en el caché
  - Establecer data en caché específico
  - Cargar data bajo demanda
  - QueryClient

---

- En esta siguiente sección veremos puntualmente:
  - Esta sección está enfocada en poder construir nombres de caché complejos
    para manejar posibles variaciones de nombres. Por ejemplo:
    - Buscar por _varios labels + estado abierto o cerrado_ debería ser igual
      sin importar el orden de los factores.

  - Hasta el momento, hemos visto una única forma de nombrar el caché, la cual
    está bien, pero si tenemos varios factores que pueden variar y queremos que
    sea insensible a su posición, hay consideraciones diferentes y eso es lo que
    veremos en esta sección.
