const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.resolve(__dirname, './src');

let distPath;
let publicPath;

distPath = path.resolve(__dirname, './dist');
publicPath = '/dist/';

let loaders, plugins, performance, devServer;

const entry = {
  entry: path.resolve(srcPath, 'main')
}

loaders = [
  {
    test: /\.(css|less)$/,
    use: [{
      loader: 'style-loader'
    }, {
      loader: 'css-loader'
    }, {
      loader: 'less-loader', options: {
        strictMath: true,
        noIeCompat: true
      }
    }]
  },
  {
    test: /\.(js)$/,
    loader: 'babel-loader',
    include: [
      srcPath,
      path.resolve(__dirname, '../../packages'),
      path.resolve(__dirname, './node_modules/@packages')
    ],
    exclude: [
      distPath,
      // path.resolve(__dirname, './node_modules')
    ]
  }
];

plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new webpack.HashedModuleIdsPlugin()
];

Object.keys(entry).forEach((key) => {
  plugins.push(
    new HtmlWebpackPlugin({
      filename: `${key}.html`,
      template: path.resolve(__dirname, './template/entry.html'),
      chunks: [
        key
      ],
      inject: 'body',
      hash: true
    })
  )
})


if (process.env.NODE_ENV !== 'production') {
  loaders = [].concat(loaders)
}

if (process.env.NODE_ENV === 'production') {
  plugins = [].concat(plugins)
}


// performance
if (process.env.NODE_ENV !== 'production') {
  performance = {
    maxEntrypointSize: 1073741824,
    maxAssetSize: 1073741824,
    hints: 'warning'
  }
} else {
  performance = {
    maxEntrypointSize: 250000,
    maxAssetSize: 250000,
    hints: false
  }
}

// dev server

let localDevServer = {};
try {
  localDevServer = require('./dev-server.local.js');
} catch (e) {}

devServer = {
  allowedHosts: [],
  // contentBase: distPath,
  compress: true,
  port: 8080,
  hot: false,
  inline: false,
  publicPath: publicPath,
  proxy: localDevServer
}


module.exports = {
  entry,
  output: {
    path: distPath,
    publicPath: publicPath,
    filename: process.env.NODE_ENV === 'production' ? 'js/[name].[chunkhash].js' : 'js/[name].js'
  },
  resolve: {
    extensions: ['.vue', '.js', '.css', '.json', '.ts'],
    alias: {
      '@': srcPath
    }
  },
  // externals: {
  //   'vue': 'Vue'
  // },
  performance: performance,
  mode: process.env.NODE_ENV !== 'production' ? 'development' : 'production',
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
  // devtool: false,
  // watch: process.env.NODE_ENV !== 'production',
  watch: false,
  module: {
    rules: loaders
  },
  plugins: plugins,
  devServer: devServer
}
