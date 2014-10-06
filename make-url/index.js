'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var fs = require('fs');


var KinkyGenerator = yeoman.generators.NamedBase.extend({
	hasError: false,
	urls: [],
	layoutName: '',

  initializing: function () {
  	fs.exists('src', function(exists){
  		if(!exists){
  			this.log(yosay(
	  			"The src directory doesn't exist! Are you in the correct directory?"
	  		));
	  		this.hasError = true;
  		}else{
  			this.urls = this.name.split('|');

  			var msg = 'Started to create the url';

  			if(this.urls.length > 1){ msg += 's'; }

  			this.log(yosay(msg));
  		}
  	}.bind(this));
	},

	prompting: function(){
		var done = this.async();
    this.prompt({
      type    : 'input',
      name    : 'layout',
      message : 'Layout name (default first url segment)',
      default : ''
    }, function (answers) {
      this.layoutName = answers.layout;
      done();
    }.bind(this));
	},

  writing: function () {
  	if(this.hasError){ return; }

  	this._.each(this.urls, function(url){
	  	var urlSegments = url.split('/'),
	  			cleanSegments = this._.map(urlSegments, this._.slugify),
	  			newFile = 'src/'+cleanSegments.join('/')+'/index.swig';

	  	var content = this.src.read('index.swig'),
	  			layoutName = this.layoutName !== '' ? this.layoutName : cleanSegments[0],
	  			newContent = content.replace('[POSITION]', this._.repeat('../', cleanSegments.length)).replace('[SECTION]', layoutName);

	  	this.dest.write(newFile, newContent);
	  }.bind(this));
  },

  end: function() {
  	if(this.hasError){ return; }

  	this.log(yosay(
  		'The task is finished'
  		));
  }
});

module.exports = KinkyGenerator;
