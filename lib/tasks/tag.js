const fs = require('fs-extra');
const path = require('path');
const ejs = require('ejs');
const del = require('del');
const tagListTpl = fs.readFileSync(path.resolve(__dirname, '../pages/tagList.ejs'), 'utf8');
const tagTpl = fs.readFileSync(path.resolve(__dirname, '../pages/tag.ejs'), 'utf8');
const root = process.cwd();

function buildTag() {
  const metadata = require('./metadata');
  const myInfo = require(path.resolve(root, 'my.json'));
  const htmlMenu = require('./menu')();
  // blog list
  const list = {};
  let tagsList;

  // 删除tag文件夹
  del.sync(path.resolve(root, 'tag'));
  metadata.post.forEach((postInfo) => {
    const data = postInfo.metadata;
    const tagList = data.tag.split(',');
    tagList.forEach((tag) => {
      if (!list[tag]) {
        list[tag] = [{
          tagName: tag,
          blog: data,
          blogUrl: `/blog/${postInfo.year}/${postInfo.filename}`,
          top: data.top === 'true' ? true : false
        }];
      } else {
        list[tag].push({
          tagName: tag,
          blog: data,
          blogUrl: `/blog/${postInfo.year}/${postInfo.filename}`,
          top: data.top === 'true' ? true : false
        });
      }
    });
  });

  tagsList = Object.keys(list).map((l) => {
    return {
      name: l,
      count: list[l].length
    };
  });

  // 排序
  Object.keys(list).forEach((l) => {
    // 按时间排序
    list[l].sort((a, b) => new Date(a.blog.date) - new Date(b.blog.date));
    // 置顶
    list[l].sort((a, b) => !a.top);
  });

  // 归档总页面
  fs.outputFile(
    path.resolve(root, 'tag/index.html'),
    ejs.render(tagListTpl, {
      name: myInfo.name,
      tags: tagsList,
      htmlMenu
    }),
    (err) => {
      if (err) throw err;
    }
  );

  // 归档细分页面
  Object.keys(list).forEach((tagName) => {
    fs.outputFile(
      path.resolve(root, `tag/${tagName}/index.html`),
      ejs.render(tagTpl, {
        name: myInfo.name,
        list: list[tagName],
        tagName,
        htmlMenu
      }),
      (err) => {
        if (err) throw err;
      }
    );
  });
}

module.exports = buildTag;
