import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

/** @typedef {{ input: string; formats: ['esm', 'cjs'] | ['esm'] }} Entry */

/** @type {Entry} */
const { input, formats } = { input: 'index.ts', formats: ['esm', 'cjs'] };

export default [
  // ESM + CJS build
  {
    input,
    output: formats.map((format) => {
      const extension = format === 'esm' ? '.js' : '.cjs';

      return {
        file: `dist/${input.replace('.ts', extension)}`,
        format,
      };
    }),
    plugins: [
      typescript({
        include: ['./index.ts'],
      }),
    ],
  },

  // Type declarations
  {
    input,
    output: {
      file: `dist/${input.replace('.ts', '.d.ts')}`,
      format: 'cjs',
    },
    external: [],
    plugins: [dts({ respectExternal: true })],
  },
];
