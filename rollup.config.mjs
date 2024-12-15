import { terser } from 'rollup-plugin-terser';

export default {
  input: 'build/index.js',
  output: {
    file: 'dist/index.js',
    format: 'es',
    plugins: [terser()],
  },
};
