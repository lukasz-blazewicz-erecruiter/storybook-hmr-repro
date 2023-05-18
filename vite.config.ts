import { defineConfig } from 'vite'
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';
import { externals } from 'rollup-plugin-node-externals';
import { babel } from '@rollup/plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    del({ targets: 'dist/*' }),
    externals({ deps: true }),
    resolve({ extensions: ['.js', '.ts', '.jsx', '.tsx'] }),
    typescript({ sourceMap: false }),
    commonjs({ include: /node_modules/ }),
    babel({
      babelHelpers: 'runtime',
      exclude: '**/node_modules/**',
      extensions: ['.js', '.ts', '.jsx', '.tsx'],
      plugins: ['@babel/plugin-transform-runtime']
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        math: 'always',
      },
    },
  }
})
