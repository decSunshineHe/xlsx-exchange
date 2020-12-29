import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser"
export default {
    input: 'src/exchange.js',
    output: [{
        name: 'xlsx-exchange',
        file: 'dist/xlsx-exchange.cjs.js',
        //exports: 'default',
        format: 'cjs'
    }, {
        name: 'xlsx-exchange',
        file: 'dist/xlsx-exchange.umd.js',
        format: 'umd'
    }, {
        name: 'xlsx-exchange',
        file: 'dist/xlsx-exchange.esm.js',
        format: 'esm'
    }],
    plugins: [
        babel({
            exclude: "node_modules/**"
        }),
        //terser()
    ]
};