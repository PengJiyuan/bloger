<img width=100 src="./.github/logo.png" alt="logo" />

# Bloger

一个帮助你在眨眼之间构建博客的工具。

![Screenshot](./.github/screenshot.png)

## 如何使用

```bash
npm i bloger -g
```

## Cli

```
Usage: bloger [options]

Options:

  -V, --version    output the version number
  init [blogName]  init blog project
  new [blog]       Create a new blog
  build            Build blog
  dev              Writing blog, watch mode.
  -h, --help       output usage information
```

#### 初始化博客项目

```bash
bloger init <projectName>
```

这个命令会在你当前所在的目录创建一个名为`<projectName>`的文件夹，这个文件夹就是一个全新的博客项目。

#### 新建一篇博客

```bash
# 注意：使用这个命令需要在博客项目的根目录
bloger new <blogName>
```

这个命令会在`_posts`目录的当前年份的文件夹中创建一个名为`blogName`的markdown文件，这个文件就是要书写的博客的源文件。

#### 生成博客网站

```bash
# 注意：使用这个命令需要在博客项目的根目录
bloger build
```

或者
```
npm run build
```

这个命令会编译出网站的博客网站。

#### 本地查看博客网站

```bash
npm start
```

打开`localhost:5000即可`

#### 监听模式

```bash
# 注意：使用这个命令需要在博客项目的根目录
bloger dev
```

或者

```bash
npm run dev
```

这个命令会监听`_posts`中markdown文件的改动和`static`中less文件的改动，并且自动编译。

## LICENSE

[MIT](./LICENSE) © PengJiyuan
