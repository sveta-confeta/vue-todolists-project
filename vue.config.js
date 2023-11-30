
module.exports = {
  transpileDependencies: true,

  publicPath: process.env.NODE_ENV === 'production'
      ? '/vue-todolists-project/'
      : '/',
  outputDir: 'dist',
  css: {
    sourceMap: true,
    extract: false
  },
}
