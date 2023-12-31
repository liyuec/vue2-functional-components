import {terser} from "rollup-plugin-minification";
import resolve from '@rollup/plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import common from 'rollup-plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default{
    input:'./src/main.js',
    external: ['vue'],
    output: [
        {
          file: 'dist/index.esm.js',
          format: 'esm',
          //sourcemap:true,
          exports: 'named'
        },
        {
          file: 'dist/index.umd.js',
          format: 'umd',
          //sourcemap:true,
          name: 'w'
        }
      ],
   /*  output:[ 
            {
                globals:'vue2functionalcomponents',
                dir:"dist",
                name:'vue2functionalcomponents_umd',
                sourcemap:true,
                entryFileNames:"vue2functionalcomponents.umd.js",
                format:'umd'
            },
            {
                globals:'vue2functionalcomponents',
                dir:"dist",
                name:'vue2functionalcomponents_iife',
                sourcemap:true,
                entryFileNames:"vue2functionalcomponents.iife.js",
                format:'iife'
            },
            {
                //globals:'vue2Functional',
                dir:"dist",
                sourcemap:true,
                entryFileNames:"vue2functionalcomponents.esm.js",
                format:'es'
            }
    ], */
   /*  output:{
        dir:"dist",
        //file:'vue2functionalcomponents',
        entryFileNames:"vue2functionalcomponents.esm.js",
        format:'es'
    }, */
    plugins:[
        common(),
        vue({
            css:true,
            compilerTemplate:true,
            preprocessStyles: true
        }),
        resolve(),
        postcss({
            plugins:[
                autoprefixer()
            ]
        }),
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'runtime',
            presets: ['@vue/babel-preset-jsx'],
        }),
        terser()
       
    ]
}