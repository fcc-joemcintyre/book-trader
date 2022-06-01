const path = require ('path');
const CompressionPlugin = require ('compression-webpack-plugin');

const baseDest = path.resolve (__dirname, '../../dist');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  entry: {
    app: './src/components/app/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: `${baseDest}/public/js`,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            noEmit: false,
          },
        },
      },
    ],
  },
  plugins: [
    new CompressionPlugin ({
      test: /bundle.js$/,
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
