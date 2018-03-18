# electron-react-boilerplate

### A Boilerplate for Scalable Cross-Platform Desktop Apps

<br/>

[![React](/internals/react-padded-90.png)](https://facebook.github.io/react/)
[![Typescript](/internals/ts-padded-90.jpg)](http://www.typescriptlang.org/)
[![Webpack](/internals/webpack-padded-90.png)](https://webpack.github.io/)
[![ESLint](/internals/eslint-padded-90.png)](http://eslint.org/)
[![Yarn](/internals/yarn-padded-90.png)](https://yarnpkg.com/)

## Screenshot

<!-- ![Electron Boilerplate Demo](https://cloud.githubusercontent.com/assets/3382565/10557547/b1f07a4e-74e3-11e5-8d27-79ab6947d429.gif) -->

## Install

First, clone the repo via git:

```bash
git clone --depth=1 https://github.com/blaadje/Electron-react-boilerplate your-project-name
```

And then install dependencies with yarn.

```bash
$ cd your-project-name
$ yarn
```
**Note**: If you can't use [yarn](https://github.com/yarnpkg/yarn), run `npm install`.

## Run

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn start
```
