'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var shell = require('shelljs');


var KinkyGenerator = yeoman.generators.NamedBase.extend({
  hasError: false,

  initializing: function () {
    this.log(yosay(
          "This will prepare the changes, add a message and upload them."
        ));
  },

  writing: function () {
    shell.cd('~/workspace/kinkyStarClub.github.io');

    if (shell.exec('~/workspace/kinkyStarClub.github.io/node_modules/.bin/grunt').code !== 0) {
      console.log('Error: Transforming files failed');
      this.hasError = true;
    }

    if(!this.hasError){
      if (shell.exec('git add .').code !== 0) {
        console.log('Error: adding message changed');
        this.hasError = true;
      }
    }

    if(!this.hasError){
      if (shell.exec('git commit -am "' + this.name + '"').code !== 0) {
        console.log('Error: adding message changed');
        this.hasError = true;
      }
    }

    if(!this.hasError){
      if (shell.exec('git push').code !== 0) {
        console.log('Error: upload failed');
        this.hasError = true;
      }
    }
  },

  end: function() {
    if(this.hasError){ return; }

    this.log(yosay(
      'The task is finished'
      ));
  }
});

module.exports = KinkyGenerator;
