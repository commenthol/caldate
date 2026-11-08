export default {
  input: ['./src/index.js'],
  output: {
    dir: 'lib',
    format: 'cjs',
    entryFileNames: '[name].cjs',
    exports: 'auto',
    preserveModules: true
  }
}
