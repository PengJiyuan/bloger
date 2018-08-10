#!/usr/bin/env node

const gulp = require('gulp');
const program = require('commander');
const fs = require('fs-extra');
const path = require('path');
const spawn = require('cross-spawn');
const gulpFile = require('../lib/gulpfile');
const { version } = require('../package.json');
const root = process.cwd();

program
  .version(version)
  .option('init [blogName]', 'init blog project')
  .option('new [blog]', 'Create a new blog')
  .option('build', 'Build blog')
  .option('dev', 'Writing blog, watch mode.')
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
      });
    });
}

if (program.build) {
  if (gulp.tasks.build) {
    gulp.start('build');
  }
}

if (program.dev) {
  if (gulp.tasks.dev) {
    gulp.start('dev');
  }
}
