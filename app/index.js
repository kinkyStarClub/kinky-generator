'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var KinkyGenerator = yeoman.generators.Base.extend({
  adios: function() {
    console.log(yosay(
      'This is a command reminder'
    ));
    console.log(chalk.inverse('Every command is followed by enter'));
    console.log(chalk.bold('start: ') + 'Download changed files from live site and go to box site directory.');
    console.log(chalk.bold('download: ') + 'Download changed files from live site');
    console.log(chalk.bold('site: ') + 'Go to box site directory.');
    console.log(chalk.bold('addpage "url": ') + 'Generate directories and file based on the given url.');
    console.log(chalk.bold('addday "yyyy/mm/dd": ') + 'Generate clubday based on the date that is given. This can also create the band/artist info.');
    console.log(chalk.bold('checkchange: ') + 'See which files have changed.');
    console.log(chalk.bold('preparechange: ') + 'Generates files for the site from the src directory and adds new files to upload list.');
    console.log(chalk.bold('transform: ') + 'Generates files for the site from the src directory.');
    console.log(chalk.bold('addfiles: ') + 'Adds new files to upload list.');
    console.log(chalk.bold('addchange "English message": ') + 'Adds a message to the upload');
    console.log(chalk.bold('upload: ') + 'Upload the changed files with the message to the live site.');
  }
});

module.exports = KinkyGenerator;
