const fs = require('fs');
const path = require('path');
const url = require('url');
const gulp = require('gulp');
const log = require('fancy-log');
const less = require('gulp-less');
const minifyCSS = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const mdpack = require('mdpack');
const buildHome = require('./tasks/home');
const buildTag = require('./tasks/tag');
const root = process.cwd();

function build() {
  const metadata = require(path.resolve(root, 'postMap.json'));
  const myInfo = require(path.resolve(root, 'my.json'));
  const htmlMenu = require('./tasks/menu')();
  const rootBuildPath = path.resolve(root, 'build.json');
  if (fs.existsSync(rootBuildPath)) {
    const rootBuildList = require(rootBuildPath).pages;
    rootBuildList.forEach((item) => {
      const mdConfig = {
        entry: path.resolve(root, item.path, item.entry),
        output: {
          path: item.path,
          name: 'index'
        },
        format: ['html'],
        template: path.resolve(root, item.template),
        resources: {
          markdownCss: '/static/css/markdown.css',
          highlightCss: '/static/css/highlight.css',
          homepage: myInfo.homepage,
          name: myInfo.name,
          htmlMenu
        }
      };
      mdpack(mdConfig);
    });
  }

  fs.readdirSync(path.resolve(root, '_posts'))
  .filter(m => fs.statSync(path.resolve(root, '_posts', m)).isDirectory())
  .forEach((year) => {
    fs.readdirSync(path.resolve(root, '_posts', year))
      .forEach((post) => {
        const filename = post.split('.md')[0];
        const _meta = metadata.post.find(_m => _m.filename === filename).metadata;
        const currentUrl = url.resolve(myInfo.homepage, `blog/${year}/${filename}`);
        const mdConfig = {
          entry: path.resolve(root, '_posts', year, post),
          output: {
            path: path.resolve(root, 'blog', year, filename),
            name: 'index'
          },
          format: ['html'],
          plugins: [
            new mdpack.plugins.mdpackPluginRemoveHead()
          ],
          template: path.join(__dirname, 'pages/blog.ejs'),
          resources: {
            markdownCss: '/static/css/markdown.css',
            highlightCss: '/static/css/highlight.css',
            title: _meta.title,
            author: _meta.author,
            type: _meta.type,
            intro: _meta.intro,
            homepage: myInfo.homepage,
            name: myInfo.name,
            disqusUrl: myInfo.disqus ? myInfo.disqus.src : false,
            currentUrl,
            htmlMenu
          }
        };
        mdpack(mdConfig);
      });
  });
}

gulp.task('css', () => {
  log('Compile less.');
  return gulp.src([path.resolve(__dirname, 'less/*.less'), path.resolve(root, 'static/less/**/*.less')])
    .pipe(plumber())
    .pipe(less({
      paths: [root]
    }))
    .pipe(minifyCSS())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(path.resolve(root, 'static/css')));
});

gulp.task('cssDev', () => {
  log('Starting watch less files...');
  return gulp.watch([path.resolve(__dirname, 'less/**/*.less'), path.resolve(root, 'static/less/**/*.less')], ['css']);
});

gulp.task('mdDev', () => {
  log('Starting watch markdown files...');
  return gulp.watch(path.resolve(root, '_posts/**/*.md'), ['home', 'blog']);
});

gulp.task('home', buildHome);

gulp.task('tag', buildTag);

gulp.task('blog', build);

gulp.task('default', ['build']);

// dev mode
gulp.task('dev', ['cssDev', 'mdDev']);

gulp.task('build', ['css', 'home', 'tag', 'blog']);

gulp.task('fonts', () => {
  console.log('Task: [Generate icon fonts and stylesheets and preview html]');
  return gulp.src([path.resolve(root, 'static/iconfonts/svgs/**/*.svg')])
    .pipe(iconfontCss({
      fontName: 'icons',
      path: 'css',
      targetPath: 'icons.css',
      cacheBuster: Math.random()
    }))
    .pipe(iconfont({
      fontName: 'icons',
      prependUnicode: true,
      fontHeight: 1000,
      normalize: true
    }))
    .pipe(gulp.dest(path.resolve(root, 'static/iconfonts/icons')));
});
          