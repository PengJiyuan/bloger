const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const root = process.cwd();
const htmlMenu = fs.readFileSync(path.resolve(__dirname, '../pages/components/menu.ejs'), 'utf8');

function getMenu() {
  const myInfo = require(path.resolve(root, 'my.json'));
  const menus = myInfo.menus.map((menu) => {
    return `<a href="${menu.link}">${menu.name}</a>`;
  }).join('');
  const followMe = myInfo.followMe.map((follow) => {
    return `<a href="${follow.link}">${follow.name}</a>`;
  }).join('');

  return ejs.render(htmlMenu, {menus, followMe});
}

module.exports = getMenu;
