'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var KinkyGenerator = yeoman.generators.Base.extend({
  adios: function() {
    console.log(yosay(
      'Welcome to the sensational Kinky generator!'
    ));
  }
});

module.exports = KinkyGenerator;
