const fs = require('fs');
const path = require('path');
const metadata = require('./metadata');
const homeTpl = fs.readFileSync(path.resolve(__dirname, '../pages/home.html'), 'utf8');
const root = process.cwd();

function buildHomeHtml() {
  const myInfo = JSON.parse(fs.readFileSync(path.resolve(root, 'my.json'), 'utf8'));

  let htmlNav = '';
  let links = '';

  const list = metadata.post.map((postInfo) => {
    const data = postInfo.metadata;

    return {
      title: data.title,
      date: data.date,
      url: `/blog/${postInfo.year}/${postInfo.filename}`,
      intro: data.intro,
      tag: data.tag,
      author: data.author,
      type: data.type
    };
  });

  htmlNav = `
    ${list.map(l => `
      <article>
        <header>
          <h1 class="post-title"><a href="${l.url}">${l.title}</a></h1>
        </header>
        <section>
          <p class="intro">${l.intro}<a href="${l.url}">  »</a></p>
        </section>
        <footer class="author"><img src="/static/images/common/favicon.ico" />${l.author} | ${l.date}</footer>
      </article>
    `).join('')}
  `;

  if (myInfo.links) {
    Object.keys(myInfo.links).forEach((link) => {
      if (link === 'email') {
        links += `<a href="mailto:${myInfo.links[link]}"><i class="icon icon-${link}"></i></a>`;
      } else {
        links += `<a href="${myInfo.links[link]}" target="_blank"><i class="icon icon-${link}"></i></a>`;
      }
    });
  }

  fs.writeFile(
    path.resolve(root, 'index.html'),
    homeTpl
      .replace('<% blogList %>', htmlNav)
      .replace('<% links %>', links)
      .replace(/<% name %>/g, myInfo.name)
      .replace('<% intro %>', myInfo.intro)
      .replace('<% homepage %>', myInfo.homepage),
    (err) => {
      console.log('\nUpadate home html success!\n');
    }
  );
}

module.exports = buildHomeHtml;
