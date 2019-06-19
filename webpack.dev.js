var path = require("path");
var APP_DIR = path.resolve(__dirname, ".");
module.exports = {
  entry: "./jsx/main",
  devtool: "sourcemaps",
  cache: true,
  output: {
    path: __dirname,
    filename: "../public/bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx", ".scss"]
  },

  externals: {
    "di-utilities": "DI.Utilities",
    "di-components": "DI.Components"
  }
};
