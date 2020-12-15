import { terser } from "rollup-plugin-terser"
export default {
    input: 'src/index.js',
    output: [{
        name: 'xlsx-exchange',
        file: 'dist/xlsx-exchange.cjs.js',
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
        terser()
    ]
};