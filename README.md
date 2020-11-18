# react-project-archictecture

一个基于Webpack搭建的React项目脚手架。

所用技术：

- 使用**React.js**作为编码语言。
- 使用**Webpack**进行项目打包及配置。
- 使用**Antd**组件进行页面编写。
- 集成**Sass**、**Less**进行样式编写。
- 使用**React-router4**管理路由。
- 使用**React-Redux+Immutable.js**管理数据。
- 使用**React-Saga**中间件处理异步操作。
- 使用**Axios**进行服务端交互。
- 使用**Eslint+Airbub、Prettier、Commitlint**配置规范代码。

## 项目目录结构

```cmd
|-- react-project-archictecture
    |-- .babelrc										# babel配置文件
    |-- .browserslistrc									# 浏览器兼容配置
    |-- .editorconfig									# 代码风格配置文件
    |-- .eslintrc.js									# eslint配置文件
    |-- .gitignore										# git忽略文件
    |-- .prettierrc.js									# Prettier配置文件
    |-- commitlint.config.js							# commitlint配置文件
    |-- package.json
    |-- READEME.md
    |-- yarn-error.log
    |-- yarn.lock
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |-- src											# API接口
    |   |-- App.jsx
    |   |-- index.js
    |   |-- api
    |   |   |-- base.js									# 环境域名配置
    |   |   |-- modules									# 模块接口
    |   |       |-- demo.js
    |   |       |-- index.js
    |   |-- assets									# 全局样式
    |   |   |-- images
    |   |   |   |-- demo.png
    |   |   |-- styles
    |   |       |-- common.less							# 入口文件
    |   |       |-- layout.less							# 全局布局样式
    |   |       |-- mixin.less							# 全局混合
    |   |       |-- variable.less						# 全局样式变量
    |   |       |-- theme								# antd主题配置
    |   |           |-- base.js
    |   |-- components									# 全局组件
    |   |   |-- AuthRoute                               # 路由权限组件
    |   |   |   |-- index.jsx
    |   |   |-- BaseComponent						    # 封装的基类组件
    |   |   |   |-- index.jsx
    |   |   |-- Loading									# 路由加载效果组件
    |   |       |-- index.jsx
    |   |       |-- index.less
    |   |-- redux
    |   |   |-- index.js                                # 全局状态配置文件
    |   |   |-- modules                                 # 模块状态
    |   |       |-- index.js                            # 出口文件
    |   |       |-- demo
    |   |           |-- actions.js
    |   |           |-- constants.js
    |   |           |-- reducer.js
    |   |-- routes                                      # 全局路由
    |   |   |-- HomeRoute.js
    |   |   |-- index.js
    |   |   |-- LoginRoute.js
    |   |   |-- NotFound.js
    |   |-- sagas                                       # saga中间件
    |   |   |-- index.js
    |   |   |-- modules
    |   |       |-- demo.js
    |   |-- utils										# 全局公用方法
    |   |   |-- http.js
    |   |-- views
    |       |-- index.js                                # 组件按需加载入口文件
    |       |-- Loadable.js                             # 封装组件按需加载
    |       |-- Home
    |       |   |-- index.jsx
    |       |   |-- index.less
    |       |-- Login
    |       |   |-- index.jsx
    |       |-- NotFound
    |           |-- index.jsx
    |-- webpack
        |-- webpack.base.conf.js						# webpack基础配置
        |-- webpack.dev.conf.js							# 开发环境配置
        |-- webpack.prod.conf.js						# 生产环境配置
```

## 全局配置

### webpack

基础配置：

```js
// /webpack/webpack.base.conf.js
const path = require("path");
const webpack = require("webpack");

const resolve = (dir) => path.resolve(__dirname, dir);
const jsonToStr = (json) => JSON.stringify(json);
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: resolve("../src/index.js"),
  resolve: {
    extensions: [".js", ".json", ".jsx"],
    alias: {
      "@": resolve("../src"),
      assets: resolve("../src/assets"),
      api: resolve("../src/api"),
      views: resolve("../src/views"),
      components: resolve("../src/components"),
      reduxModules: resolve("../src/redux/modules"),
      sagas: resolve("../src/sagas"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              // 图片小于10kb就是图片地址，大于正常打包成base64格式编码
              limit: 10000,
              // 输出路径
              outputPath: "img/",
              // 指定生成的目录
              name: "img/[name].[hash:7].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
        include: resolve("../src"),
      },
      {
        test: /\.(js|jsx)$/,
        include: resolve("../src"),
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          fix: true,
          emitWarning: true,
        },
      },
    ],
  },
  plugins: [
    // 定义全局变量
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": isProd ? jsonToStr("production") : jsonToStr("development"),
    }),
  ],
  performance: false,
};
```

开发环境配置：

```js
// /webpack/webpack.dev.conf.js
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const path = require("path");

const resolve = (dir) => path.resolve(__dirname, dir);

const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseWebpack = require("./webpack.base.conf");

const PROXY_URL = require("../src/api/base");
const antdThemeOption = require("../src/assets/styles/theme/base");

module.exports = merge(baseWebpack, {
  mode: "development",
  output: {
    path: resolve("../dist"),
    filename: "js/[name].js",
    chunkFilename: "js/[name].chunk.js",
  },
  devtool: "source-map",
  devServer: {
    contentBase: resolve("../public"),
    port: "8080",
    inline: true,
    historyApiFallback: true,
    disableHostCheck: true,
    hot: true,
    open: true,
    proxy: {
      "/api": {
        target: PROXY_URL.development,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modifyVars: antdThemeOption,
                javascriptEnabled: true,
              },
            },
          },
          {
            loader: "style-resources-loader",
            options: {
              patterns: resolve("../src/assets/styles/common.less"),
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      multiStep: true,
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: resolve("../public/index.html"),
    }),
  ],
});
```

生产环境配置：

```js
// /webpack/webpack.prod.conf.js
const { merge } = require("webpack-merge");
const path = require("path");

const resolve = (dir) => path.resolve(__dirname, dir);

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCss = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const baseWebpack = require("./webpack.base.conf");

module.exports = merge(baseWebpack, {
  mode: "production",
  devtool: false,
  output: {
    path: resolve("../dist"),
    filename: "static/js/[name].[chunkhash:8].js",
  },
  optimization: {
    minimizer: [
      new OptimizeCss(),
      new TerserWebpackPlugin({
        // 压缩es6
        terserOptions: {
          // 启用文件缓存
          cache: true,
          // 使用多线程并行运行提高构建速度
          parallel: true,
          // 使用 SourceMaps 将错误信息的位置映射到模块
          sourceMap: true,
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|scss|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: false,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: false,
            },
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: false,
            },
          },
          {
            loader: "style-resources-loader",
            options: {
              patterns: resolve("../src/assets/styles/common.less"),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve("../public/index.html"),
      title: "vue-project-archictecture",
      favicon: resolve("../public/favicon.ico"),
      // 压缩html
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve("../public"),
          to: resolve("../dist"),
        },
      ],
    }),
  ],
});
```

### .eslintrc.js

ESLint基本配置。

```js
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: "./webpack/webpack.base.conf.js",
      },
    },
  },
  extends: ["eslint:recommended", "airbnb-base", "plugin:prettier/recommended"],
  parserOptions: {
    parser: "babel-eslint",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react", "prettier", "babel"],
  rules: {
    "prettier/prettier": "error",
    quotes: [1, "double"],
    "import/extensions": [
      "error",
      "always",
      {
        js: "never",
        jsx: "never",
      },
    ],
    "global-require": 0,
    "import/prefer-default-export": 0,
    "import/no-extraneous-dependencies": 0,
    "no-console": 0,
    "no-param-reassign": 0,
    "no-unused-vars": 0,
    "class-methods-use-this": 0,
    "no-underscore-dangle": 0,
    "no-useless-constructor": 0,
    "no-restricted-syntax": 0,
    "no-alert": 0,
  },
};
```

### .prettierrc.js

Prettier格式化规则配置。

```js
// .prettierrc.js
module.exports = {
  printWidth: 100, //一行的字符数，如果超过会进行换行，默认为80
  tabWidth: 2, //一个tab代表几个空格数，默认为80
  useTabs: false, //是否使用tab进行缩进，默认为false，表示用空格进行缩减
  singleQuote: false, //字符串是否使用单引号，默认为false，使用双引号
  semi: true, //行位是否使用分号，默认为true
  trailingComma: 'es5', //是否使用尾逗号，有三个可选值"<none|es5|all>"
  bracketSpacing: true, //对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
};
```

### commitlint.config.js

commitlint 基础配置，用于检查 `git commit -m ''` 格式。

```js
// .commitlint.config.js
module.exports = {
  // 继承默认配置
  extends: ["@commitlint/config-angular"],
  // 自定义规则
  rules: {
    "type-enum": [
      2,
      "always",
      ["test", "upd", "feat", "fix", "refactor", "docs", "chore", "style", "revert"],
    ],
    "header-max-length": [0, "always", 72],
  },
};
```

`commit`的格式要求如下：

```cmd
Type(<scope>): <subject>

<body>

<footer>

# Type 字段包含:
#  feat：新功能（feature）
#  fix：修补bug
#  docs：文档（documentation）
#  style： 格式（不影响代码运行的变动）
#  refactor：重构（即不是新增功能，也不是修改bug的代码变动）
#  test：增加测试
#  chore：构建过程或辅助工具的变动
# scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等。
# subject是 commit 目的的简短描述，不超过50个字符
# Body 部分是对本次 commit 的详细描述，可以分成多行
# Footer用来关闭 Issue或以BREAKING CHANGE开头，后面是对变动的描述、
#  以及变动理由和迁移方法
```

例子：

```cmd
git commit -m 'feat: 增加用户搜搜功能'
git commit -m 'fix: 修复用户检测无效的问题'
```

## 样式管理

### base.js

antd 主题样式配置，需要改变相应主题只需在该文件中配置，默认内置样式如下：

```js
// /src/assets/theme/base.js
module.exports = {
  "@primary-color": "#1890ff", // 全局主色 1890ff
  //   "@link-color": "#1890ff", // 链接色
  //   "@success-color": "#52c41a", // 成功色
  //   "@warning-color": "#faad14", // 警告色
  //   "@error-color": "#f5222d", // 错误色
  //   "@font-size-base": "14px", // 主字号
  //   "@heading-color": "rgba(0, 0, 0, 0.85)", // 标题色
  //   "@text-color": "rgba(0, 0, 0, 0.65)", // 主文本色
  //   "@text-color-secondary": "rgba(0, 0, 0, 0.45)", // 次文本色
  //   "@disabled-color": "rgba(0, 0, 0, 0.25)", // 失效色
  //   "@border-radius-base": "2px", // 组件/浮层圆角
  //   "@border-color-base": "#d9d9d9", // 边框色
  //   // 浮层阴影
  //   "@box-shadow-base": `0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08)
  // , 0 9px 28px 8px rgba(0, 0, 0, 0.05)`,
};
```

### 全局样式

全局样式（variable.less、mixin.less、layout.less）在 `common.js` 里导入后，就不用在其它样式文件中 `@import 'xxx.less';` ，直接引用即可。例如：

```less
div {
  color: @color;
}
```

- variable.less：全局样式变量
- mixin.less：全局混合
- layout.less：全局布局样式

如果想要导入其它全局样式，在该目录下创建文件再导入`common.js` 中即可。例如：

```less
@import "./xxx.less";
```

## 接口管理

### base.js

用于配置不同环境下的域名。

```js
// /src/api/base.js
module.exports = {
  production: "https://production.com",
  development: "http://jsonplaceholder.typicode.com",
};
```

### modules

各个模块的接口，例如：

```js
// /src/api/modules/base.js
import service from "@/utils/http";

const demo = {
  getData() {
    return service.get("/posts/1");
  },
  // ...其它
};

export default demo;
```

##  路由管理

### middleware

路由配置基本如下：

```js
// homeRoute.js
import { Home } from "@/views";

const homeRoutes = {
  path: "/home",
  component: Home, // 页面组件
  backUrl: "/login", // 权限不足，重定向路径
  role: ["user"], // 路由权限，例如这里需要role为“user”的用户才能访问
  children: [], //子路由
};

export default homeRoutes;
```

若新建路由，则必须在 “/src/routes/index.js” 中注入。

##  状态管理

### 全局状态配置

```js
// /src/redux/index.js
// 配置store 环境 中间件
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "sagas/";
import rootReducer from "./modules";

let finalCreateStore;
const saga = createSagaMiddleware();

if (process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__) {
  finalCreateStore = compose(
    applyMiddleware(saga),
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )(createStore);
} else finalCreateStore = applyMiddleware(saga)(createStore);

function configureStore(initState) {
  const store = finalCreateStore(rootReducer, initState);
  if (process.env.NODE_ENV !== "production" && module.hot) {
    module.hot.accept("./modules", () => store.replaceReducer(require("./modules")));
  }
  saga.run(rootSaga);
  return store;
}

export default configureStore;
```

### modules

状态模块，均以 `模块名称` 命名，且 分别将action types、action creators和reducer集成在constants.js、actions.js和reducer.js三个文件中，并将 reducer 在入口文件 “/src/redux/modules/index.js” 中合并。例如：

```js
// /src/redux/modules/demo/constants.js
// action的type常量名称模块
const demoTypes = {
  DECREMENT: "decrement",
  INCREMENT: "increment",
  GETDATA: "getData",
  GETDATASAGA: "getDataSaga",
  ISREQUEST: "isRequest",
};

export default demoTypes;
```

```js
// /src/redux/modules/demo/actions.js
// 创建action
import demoTypes from "./constants";

const demoActions = {
  decrement: (number) => ({
    type: demoTypes.DECREMENT,
    number,
  }),
  increment: (number) => ({
    type: demoTypes.INCREMENT,
    number,
  }),
  getData: () => ({
    type: demoTypes.GETDATASAGA,
  }),
  isRequest: () => ({
    type: demoTypes.ISREQUEST,
  }),
};

export default demoActions;
```

```js
// /src/redux/modules/demo/reducer.js
// 管理状态函数reducer
import { fromJS } from "immutable";

import demoTypes from "./constants";

const defaultState = fromJS({
  number: 1,
  user: {
    id: 1,
    name: `用户${Math.floor(Math.random() * 100)}`,
    role: "user",
  },
});

export default function demoReducer(state = defaultState, action) {
  switch (action.type) {
    case demoTypes.DECREMENT:
      return state.set("number", state.get("number") - 1);
    case demoTypes.INCREMENT:
      return state.set("number", state.get("number") + 1);
    case demoTypes.GETDATA:
      return state.set("data", action.data);
    case demoTypes.ISREQUEST:
      return state.set("isRequest", !state.get("isRequest"));
    default:
      return state;
  }
}
```

```js
// /src/redux/modules/index.js
import { combineReducers } from "redux";

import demoReducer from "./demo/reducer";

const rootReducer = combineReducers({
  demoReducer,
});

export default rootReducer;
```

## Saga 中间件

### modules

每个状态模块均对应一个 sagas 中间件，将需要执行的异步操作写在其中，并在入口文件 “/src/sagas/index.js” 中合并。例如：

```js
// /src/sagas/modules/demo.js
import { delay, takeEvery, put } from "redux-saga/effects";
import { demo } from "api/modules";

import demoTypes from "reduxModules/demo/constants";

function* demoGenerator(param) {
  console.log(param);
  const res = yield demo.getData();
  console.log(res);
  yield put({
    type: demoTypes.GETDATA,
    data: res.data,
  });
}

function* watchDemoSaga() {
  yield takeEvery(demoTypes.GETDATASAGA, demoGenerator);
}

export default watchDemoSaga;
```

```js
// /src/sagas/index.js
import { all } from "redux-saga/effects";
import watchDemoSaga from "./modules/demo";

function* rootSaga() {
  yield all([watchDemoSaga()]);
}

export default rootSaga;
```

## 开发流程

1. 将源仓库克隆/拉取到本地。

   ```cmd
   git clone https://gitee.com/jaqea/react-project-archictecture.git
   ```

2. `cd`到根目录“/react-project-archictecture”，安装依赖。

   ```cmd
   npm install / yarn install
   ```

3. 运行，进行开发。

   ```cmd
   npm run serve / yarn serve
   ```

4. 完成开发后，进行代码校验。

   ```cmd
   npm run eslint / yarn eslint
   ```

5. 打包。

   ```cmd
   npm run build / yarn serve
   ```

6. 代码提交到远程个人仓库。

   ```cmd
   git add .
   npm run commit / yarn commit
   git push ...
   ```