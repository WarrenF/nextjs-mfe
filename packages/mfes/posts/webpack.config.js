const HtmlWebpackPlugin = require("html-webpack-plugin")
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin
const { NodeAsyncHttpRuntime } = require("@telenko/node-mf")
const path = require("path")
const packageJson = require('./package.json')

const webpackConfig = target => ({
  name: target === "web" ? "web" : 'node',
  target: target === "web" ? "web" : false,
  entry: "./src/index",
  mode: "development",
  devtool: "hidden-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3001,
  },
  output: {
    path: path.join(__dirname, "dist", target),
    publicPath: `http://localhost:3001/${target}/`,
    clean: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /bootstrap\.tsx$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "posts",
      filename: "remoteEntry.js",
      exposes: {
        "./Post": "./src/components/Post.tsx",
        "./Posts": "./src/components/Posts.tsx"
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: packageJson.dependencies["react"],
        },
        ["react-dom"]: {
          singleton: true,
          requiredVersion: packageJson.dependencies["react-dom"],
        },
      },
    }),
    ...(target === "web"
      ? [
          new HtmlWebpackPlugin({
            template: "./public/index.html"
          }),
        ]
      : [new NodeAsyncHttpRuntime()]
    ),
  ],
})

module.exports = [webpackConfig('web'), webpackConfig('node')]