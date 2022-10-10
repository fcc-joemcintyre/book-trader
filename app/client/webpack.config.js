/* eslint-disable @typescript-eslint/no-var-requires */
const path = require ('path');
const CompressionPlugin = require ('compression-webpack-plugin');
const MiniCssExtractPlugin = require ('mini-css-extract-plugin');

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
    filename: 'js/[name].bundle.js',
    path: `${baseDest}/public`,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          compilerOptions: {
            noEmit: false,
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false } },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin ({
      filename: 'css/main.css',
    }),
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
