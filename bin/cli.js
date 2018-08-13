#!/usr/bin/env node

const gulp = require('gulp');
const program = require('commander');
const fs = require('fs-extra');
const path = require('path');
const spawn = require('cross-spawn');
const chalk = require('chalk');
const dateTime = require('date-time');
require('../lib/gulpfile');
const { version } = require('../package.json');
const root = process.cwd();

const isRoot = fs.existsSync(path.resolve(root, '_posts'));
const notRootError = chalk.red('\nError: You should in the root path of blog project!\n');

program
  .version(version)
  .option('init [blogName]', 'init blog project')
  .option('new [blog]', 'Create a new blog')
  .option('build', 'Build blog')
  .option('dev', 'Writing blog, watch mode.')
  .option('iconfonts', 'Generate iconfonts.')
  .parse(process.argv);

if (program.init) {
  const projectName = typeof program.init === 'string' ? program.init : 'blog';
  const tplPath = path.resolve(__dirname, '../tpl');
  const projectPath = path.resolve(root, projectName);
  fs.copy(tplPath, projectPath)
    .then((err) => {
      if (err) throw err;
      console.log('\nInit project success!');
      console.log('\nInstall npm packages...\n');
      fs.ensureDirSync(projectPath);
      process.chdir(projectPath);
      const commond = 'npm';
      const args = [
        'install'
      ];

      spawn(commond, args, { stdio: 'inherit' }).on('close', code => {
        if (code !== 0) {
          process.exit(1);
        }
        spawn('npm', ['run', 'build'], { stdio: 'inherit' }).on('close', code => {
          if (code !== 0) {
            process.exit(1);
          }
          console.log(chalk.cyan('\nProject created!\n'));
          console.log(`${chalk.cyan('You can')} ${chalk.grey(`cd ${projectName} && npm start`)} ${chalk.cyan('to serve blog website.')}\n`);
        });
      });
    });
}

if (program.build && gulp.tasks.build) {
  if (isRoot) {
    gulp.start('build');
  } else {
    console.log(notRootError);
  }
}

if (program.dev && gulp.tasks.dev) {
  if (isRoot) {
    gulp.start('dev');
  } else {
    console.log(notRootError);
  }
}

if (program.new && typeof program.new === 'string') {
  if (isRoot) {
    const postRoot = path.resolve(root, '_posts');
    const date = new Date();
    const thisYear = date.getFullYear().toString();
    const template = `---\ntitle: ${program.new}\ndate: ${dateTime()}\nauthor: 作者\ntag: 标签\nintro: 简短的介绍这篇文章.\ntype: 原创\n---\n\nBlog Content`;
    fs.ensureDirSync(path.resolve(postRoot, thisYear));
    const allList = fs.readdirSync(path.resolve(postRoot, thisYear)).map(name => name.split('.md')[0]);
    // name exist
    if (~allList.indexOf(program.new)) {
      console.log(chalk.red(`\nFile ${program.new}.md already exist!\n`));
      process.exit(2);
    }
    fs.outputFile(path.resolve(postRoot, thisYear, `${program.new}.md`), template, 'utf8', (err) => {
      if (err) throw err;
      console.log(chalk.green(`\nCreate new blog ${chalk.cyan(`${program.new}.md`)} done!\n`));
    });
  } else {
    console.log(notRootError);
  }
}

if (program.iconfonts && gulp.tasks.fonts) {
  if (isRoot) {
    gulp.start('fonts');
  } else {
    console.log(notRootError);
  }
}
