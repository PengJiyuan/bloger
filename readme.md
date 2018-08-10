<img width=100 src="./.github/logo.png" alt="logo" />

# Bloger

一个帮助你在眨眼之间构建博客的工具。

![Screenshot](./.github/screenshot.png)

## Who use?

* [isweety.me](http://isweety.me)
* [litiantian1202.github.io](http://litiantian1202.github.io)

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

## Gh-pages

Github的gh-pages可以为我们免费托管静态网站，如何将Bloger生成的博客发布到gh-pages托管呢？

1. 执行`bloger init xxx` 之后会生成一个项目文件夹
2. 进入这个文件夹之后执行 `git init`，新建一个git仓库
3. 如果你的github仓库有你的同名仓库（比如你的用户名是jay, 那么你的同名仓库就是 `jay.github.io`），使用`git remote add origin git@github.com:jay/jay.github.io.git`将远程地址添加到本地。
4. 将博客推送到github. `git commit -am 'init' && git push`

通过以上的步骤，你的博客就已经被托管到gh-pages了，访问`jay.github.io`即可看到。

## FAQ

[Issues](https://github.com/PengJiyuan/bloger/issues) and [Pull Request](https://github.com/PengJiyuan/bloger/pulls) Welcome!

## LICENSE

[MIT](./LICENSE) © PengJiyuan
