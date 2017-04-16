window._ = require('lodash');
window.$ = window.jQuery = require('jquery');

require("../../plugin/js/main.js");

$(document).ready(function(){
	$('body').equalize();
});