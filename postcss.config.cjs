module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: ['last 4 versions', 'ie >= 10', 'Safari >= 8']
    })
  ]
};
