const paths = require("./paths");
const Dotenv = require("dotenv-webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              plugins: [require.resolve("react-refresh/babel")]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: paths.root + "/.env.development"
    }),
    new ReactRefreshWebpackPlugin()
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
