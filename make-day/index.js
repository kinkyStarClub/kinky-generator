'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var fs = require('fs');


var KinkyGenerator = yeoman.generators.NamedBase.extend({
  hasError: false,
	time: '21:30',
	dayname: '',
	bandname: '',
	country: '',
	description: '',
	links: '',
	images: '',
	createBand: true,

  initializing: function () {
  	fs.exists('src', function(exists){
  		if(!exists){
  			this.log(yosay(
	  			"The src directory doesn't exist! Are you in the correct directory?"
	  		));
	  		this.hasError = true;
  		}else{
  			var msg = 'Start to create the day';

  			this.log(yosay(msg));
  		}
  	}.bind(this));
	},

	prompting: function(){
		var done = this.async(),
				prompts = [{
					type: 'input',
					name: 'time',
					message: 'Time',
					default: this.time
				},
				{
					type: 'input',
					name: 'dayname',
					message: 'Day of the week',
					default: this.dayname
				},
				{
					type: 'input',
					name: 'bandname',
					message: 'Artist/band',
					default: this.bandname
				},
				{
					type: 'input',
					name: 'country',
					message: 'Country',
					default: this.country
				},
				{
					type: 'confirm',
					name: 'createBand',
					message: 'Create artist/band',
					default: this.createBand
				},
				{
					when: function(response) {
						return response.createBand;
					},
					type: 'input',
					name: 'description',
					message: 'Description',
					default: this.description
				},
				{
					when: function(response) {
						return response.createBand;
					},
					type: 'input',
					name: 'links',
					message: 'Links [separate with a | symbol]',
					default: this.links
				},
				{
					when: function(response) {
						return response.createBand;
					},
					type: 'input',
					name: 'images',
					message: 'Images [separate with a | symbol]',
					default: this.images
				}];

    this.prompt(prompts, function (answers) {
      this.time = answers.time;
      this.dayname = answers.dayname;
      this.bandname = answers.bandname;
      this.country = answers.country;
      this.createBand = answers.createBand;
      this.description = answers.description;
      this.links = answers.links;
      this.images = answers.images;
      done();
    }.bind(this));
	},

  writing: function () {
  	if(this.hasError){ return; }

		var urlSegments = this.name.split('/'),
  			cleanSegments = this._.map(urlSegments, this._.slugify),
  			monthDay = this._.last(cleanSegments, 2);

  	cleanSegments.unshift('club');

  	var newDay = 'src/'+cleanSegments.join('/')+'/index.swig',
				dayContent = this.src.read('index.swig'),
				bandSlug = this._.slugify(this.bandname),
  			newDayContent = dayContent
  											.replace('[POSITION]', this._.repeat('../', cleanSegments.length))
  											.replace('[POSITION2]', this._.repeat('../', cleanSegments.length))
  											.replace('[BAND]', this.bandname)
  											.replace('[COUNTRY]', this.country !== '' ? ' <small>('+this.country.toUpperCase()+')</small>' : '')
												.replace('[TIME]', this.time)
												.replace('[DAYNAME]', this.dayname)
												.replace('[DAY]', monthDay[1])
												.replace('[URL]', this._.initial(cleanSegments).join('/'))
												.replace('[MONTH]', monthDay[0])
												.replace('[SLUG]', bandSlug);

  	this.dest.write(newDay, newDayContent);

  	if(this.createBand){
	  	var newBand = 'src/partials/artists/'+bandSlug+'.html',
	  			bandContent = this.src.read('band.html'),
	  			newBandContent = bandContent.replace('[CONTENT]', this.description);

	  	if(this.links !== ''){
	  		var knownSites = ['facebook', 'bandcamp', 'youtube', 'myspace', 'soundcloud'],
	  				urls = this.links.split('|'),
	  				links = this._.map(urls, function(url){
	  					var linkText = 'website';

	  					for(var i = 0, str; str = knownSites[i]; i++){
	  						if(this._.includes(url, str)){
	  							linkText = str;
	  							break;
	  						}
	  					}

	  					return '<li><a href="'+url+'">'+linkText+'</a></li>';
	  				}.bind(this));

	  		newBandContent.replace('[LINKS]', links.join("\n"));
	  	}else{
	  		newBandContent.replace('[LINKS]', '');
	  	}

	  	if(this.images !== ''){
	  		var imgs = this.images.split('|'),
	  				thumbs = this._.map(imgs, function(img){
	  					var img2 = img,
	  							medium = img2.replace(/w_\d+/, 'w_150'),
	  							small = img2.replace('w_150', 'w_80');

	  					return '<li><a href="'+img+'" class="th"><img data-interchange="['+small+', (small)], ['+medium+', (medium)]"></a></li>'
	  				}.bind(this));

	  		newBandContent.replace('[IMAGES]', thumbs.join("\n"));
	  	}else{
	  		newBandContent.replace('[IMAGES]', '');
	  	}

	  	this.dest.write(newBand, newBandContent);
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
