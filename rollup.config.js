import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import commonjs from '@rollup/plugin-commonjs';
import del from 'rollup-plugin-delete';
import externals from 'rollup-plugin-node-externals';
import styles from 'rollup-plugin-styles';
import pkg from './package.json';

const config = [
    {
        input: ['src/index.ts'],
        output: [
            {
                format: 'es',
                file: pkg.module,
                // plugins: [terser()]
            },
            {
                format: 'cjs',
                file: pkg.main,
                plugins: [terser()]
            }
        ],
        plugins: [
            del({ targets: 'dist/*' }),
            externals({ deps: true }),
            resolve({ extensions: ['.js', '.ts', '.jsx', '.tsx'] }),
            typescript({ sourceMap: false }),
            commonjs({ include: /node_modules/ }),
            babel({
                babelHelpers: 'runtime',
                exclude: '**/node_modules/**',
                extensions: ['.js', '.ts', '.jsx', '.tsx']
            }),
            styles({
                modules: {
                    generateScopedName: (name, file) => {
                        const componentPathRegExp = new RegExp(/(?<=\\|\/)([^\\|\/]*)(?=\.module\.less)/, 'g');
                        const componentName = file.match(componentPathRegExp)?.[0] || '';
                        const className = `${componentName}_${name}`; // e.g. ElementRow_element-row__section-main
                        return className;
                    }
                },
                less: {
                    math: 'always'
                }
            }),
        ],
        watch: {
            include: ['src/**', 'assets/**']
        }
    },
    {
        input: './src/index.ts',
        output: [{ file: 'dist/index.d.ts', format: 'es' }],
        plugins: [dts()],
        watch: {
            include: 'src/**'
        }

    }
];
export default config;