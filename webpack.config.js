const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    historyApiFallback: {
      disableDotRule: true,
    },
    host: "0.0.0.0",
    port: 3000,
  },
  devtool: "source-map",
  entry: "./src/ts/Index.tsx",
  mode: "development",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: "ts-loader",
        test: /\.tsx?$/,
      },
      {
        test: /\.scss/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: true,
              url: false,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: "app.js",
    path: path.join(__dirname, "public/assets/js"),
    publicPath: "/assets/js/",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    plugins: [new TsconfigPathsPlugin({configFile: "./tsconfig.json"})],
  },
};
