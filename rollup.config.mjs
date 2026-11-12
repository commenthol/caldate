export default {
  input: ['./src/index.js', './src/moment-timezone.js'],
  output: {
    dir: 'lib',
    format: 'cjs',
    entryFileNames: '[name].cjs',
    exports: 'auto',
    preserveModules: true
  }
}
