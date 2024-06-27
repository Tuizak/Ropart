const webpack = require('webpack');

module.exports = {
  // ... tus otras configuraciones
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env': JSON.stringify(process.env)
    })
  ]
};
