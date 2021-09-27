const paths = require("./paths");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  plugins: [
    new Dotenv({
      path: paths.root + "/.env.development"
    })
  ],
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 8008
  },
  devtool: "eval-source-map"
};
