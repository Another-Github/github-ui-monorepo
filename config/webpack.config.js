const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [],
};
