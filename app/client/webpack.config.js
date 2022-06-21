/* eslint-disable @typescript-eslint/no-var-requires */
const path = require ('path');
const CompressionPlugin = require ('compression-webpack-plugin');

const baseDest = path.resolve (__dirname, '../../dist');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      'react/jsx-runtime': 'react/jsx-runtime.js',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
    },
  },
  entry: {
    app: './src/components/app/index.tsx',
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
