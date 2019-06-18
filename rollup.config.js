import typescript from 'rollup-plugin-typescript2';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const typescriptPluginOptions = {
  typescript: require('typescript'),
  useTsconfigDeclarationDir: true
};

const prodBuild = {
  input: `src/index.ts`,
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
    name: 'decorators-example'
  },
  plugins: [
    typescript(typescriptPluginOptions),
    serve(),      // index.html should be in root of project
    livereload()
  ]
};

export default [
  prodBuild
];