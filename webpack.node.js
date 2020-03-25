const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server/main.js',
  target: "node",
  devtool: 'inline-source-map',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'server.js',
    path: path.resolve('./'),
  },
  devServer: {
    after: ()=>{
      console.log('runned ded')
    }
  }
};