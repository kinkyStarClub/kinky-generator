'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var shell = require('shelljs');


var KinkyGenerator = yeoman.generators.NamedBase.extend({
  message: '',
  hasError: false,

  initializing: function () {
    this.log(yosay(
          "This will prepare the changes, add a message and upload them."
        ));
  },

  prompting: function(){
    var done = this.async();
    this.prompt({
      type    : 'input',
      name    : 'message',
      message : 'Short description of the changes',
      default : ''
    }, function (answers) {
      this.message = answers.message;
      done();
    }.bind(this));
  },

  writing: function () {
    shell.cd('~/workspace/kinkyStarClub.github.io');

    if (shell.exec('preparechange').code !== 0) {
      console.log('Error: Preparing the changes failed');
      this.hasError = true;
    }

    if(!this.hasError){
      if (shell.exec('addchange "' + this.message + '"').code !== 0) {
        console.log('Error: adding message changed');
        this.hasError = true;
      }
    }

    if(!this.hasError){
      if (shell.exec('upload').code !== 0) {
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
