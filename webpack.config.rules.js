/* eslint-env node, es6 */

'use strict';

const
  SRC_PATH = require('path').resolve(__dirname, 'src'),
  BABEL_RULE = {
    loader: 'babel-loader',
    options: {
      presets: ['es2015'],
      plugins: ['add-module-exports']
    }
  };

module.exports = [
  {
    resource: {and: [SRC_PATH, /\.js$/]},
    use: [BABEL_RULE]
  }
];
