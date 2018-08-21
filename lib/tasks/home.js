const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const homeTpl = fs.readFileSync(path.resolve(__dirname, '../pages/home.ejs'), 'utf8');
const root = process.cwd();

function buildHomeHtml() {
  const metadata = require('./metadata');
  const myInfo = require(path.resolve(root, 'my.json'));
  const htmlMenu = require('./menu')();

  const blogList = metadata.post.map((postInfo) => {
    const data = postInfo.metadata;

    return {
      title: data.title,
      date: data.date,
      url: `/blog/${postInfo.year}/${postInfo.filename}`,
      intro: data.intro,
      tags: data.tag.split(','),
      author: data.author,
      type: data.type,
      top: data.top === 'true' ? true : false
    };
  });

  // 默认按发布时间排序
  blogList.sort((a, b) => new Date(a.date) - new Date(b.date));

  // 置顶
  blogList.sort((a, b) => !a.top);

  fs.outputFile(
    path.resolve(root, 'index.html'),
    ejs.render(homeTpl, {
      name: myInfo.name,
      intro: myInfo.intro,
      homepage: myInfo.homepage,
      links: myInfo.links,
      blogList,
      htmlMenu
    }),
    (err) => {
      console.log('\nUpadate home html success!\n');
    }
  );
}

module.exports = buildHomeHtml;
