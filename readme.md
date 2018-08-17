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
  iconfonts        Generate iconfonts.
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

#### 编译iconfonts

```bash
# 注意：使用这个命令需要在博客项目的根目录
bloger iconfonts
```

这个命令会把`static/iconfonts/svgs`中的svg图片打包为iconfonts到`static/iconfonts/icons`下。

使用的时候只需要引用`/static/iconfonts/icons/icons.css`即可。

用法：

```html
<i class="icon icon-name"></i>
```

## 配置博客

在生成的博客根目录有一个`my.json`文件，在这个文件中配置网站的一些基本属性。

```json
{
  // XXX' Blog
  "name": "XXX",
  "homepage": "localhost:5000",
  "intro": "这里是简介",
  // 首页图标和跳转地址
  "links": [{
    "name": "github",
    "link": "/"
  }, {
    "name": "zhihu",
    "link": "/"
  }, {
    "name": "twitter",
    "link": "/"
  }, {
    "name": "email",
    "link": "/"
  }],
  // 菜单列表
  "menus": [{
    "name": "博客",
    "link": "/"
  }],
  // 关注我列表
  "followMe": [{
    "name": "Github",
    "link": "https://github.com"
  }],
  "disqus": false
}
```

## 开启[disqus](https://disqus.com/)评论

在`my.json`中，修改`disqus`字段，填上你申请到得disqus的src文件地址，比如:

```json
{
  "disqus": {
    "src": "https://xxx.disqus.com/embed.js"
  }
}
```

`disqus`字段为`false`表示不开启disqus评论系统。

## 增加自定义页面

Bloger支持添加自定义页面，比如你想添加一个关于我的页面，同时给这个页面一个独立的路由，那么你只需要在项目下新建一个模版文件。

比如你新建一个`templates/about-me.ejs`文件，同时在`build.json`中配置所要生成的页面，配置如下：

```json
{
  "pages": [{
    "name": "关于我",
    "path": "about-me",
    "template": "templates/opensource.ejs",
    "entry": "about-me.md"
  }]
}
```

以上配置表示以`templates/opensource.ejs`为模版，生成一个页面，路由为`/about-me`.

如果指定`entry`，需要在`about-me`文件加中新建一个`about-me.md`文件，会自动将`about-me.md`编译高亮，并且插入到模版指定位置。

`about-me.ejs`模版可包含如下字段（会在编译时自动替换）。

* `<%- htmlMenu %>` - 通用的菜单
* `<%- pureHtml %>` - markdown编译后的html
* `<%= name %>` - `my.json`中配置的Username

这个页面的样式怎么写？

在`/static`文件下创建一个`less`文件夹，在less文件夹下创建一个less文件，`bloger build`或者`bloger dev`的时候会把这个less文件编译成css(经过autoprefixer和minify处理)到`/static/css`目录下。

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
