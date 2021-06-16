const path = require('path');
const EntryPath = path.join(__dirname, 'client');
const OutputPath = path.join(__dirname, 'public');

module.exports = {
  mode: 'development',
  entry: `${EntryPath}/index.js`,
  output: {
    filename: 'bundle.js',
    path: OutputPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: EntryPath,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  }
}