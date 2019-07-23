const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const os = require("os");
const HappyPack = require("happypack");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: {
          loader: "happypack/loader?id=happyLess"
        }
      },
      {
        test: /\.less$/,
        use: {
          loader: "happypack/loader?id=happyLess"
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: "happypack/loader?id=happyBabel"
        }
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
          plugins: [
            "@babel/plugin-transform-flow-strip-types",
            "@babel/plugin-proposal-class-properties"
          ]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./tpl.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
      NODE_ENV: JSON.stringify("development"),
      spyOnDev: false,
      spyOnDevAndProd: false,
      spyOnProd: false,
      __PROFILE__: true
    }),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: "happyBabel",
      //如何处理  用法和loader 的配置一样
      loaders: [
        {
          loader: "babel-loader?cacheDirectory=true"
        }
      ],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true
    }),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: "happyLess",
      //如何处理  用法和loader 的配置一样
      loaders: ["style-loader", "css-loader", "less-loader"],
      //共享进程池
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true
    })
  ],
  devtool: "inline-source-map", // enum
  devServer: {
    contentBase: path.join(__dirname, "src"),
    port: 9000,
    hot: true,
    overlay: true
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "./src/packages"),
      path.resolve(__dirname, "./src/packages/shared")
    ],
    alias: {
      "@packages": path.resolve(__dirname, "./src/packages/")
    }
  }
};
