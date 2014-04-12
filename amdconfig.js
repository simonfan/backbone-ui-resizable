require.config({
	urlArgs: 'bust=0.19880544603802264',
	baseUrl: '/src',
	paths: {
		requirejs: '../bower_components/requirejs/require',
		text: '../bower_components/requirejs-text/text',
		mocha: '../node_modules/mocha/mocha',
		should: '../node_modules/should/should',
		'backbone-ui-resizable': 'index',
		'jquery.filler': '../bower_components/jquery.filler/built/jquery.filler',
		backbone: '../bower_components/backbone/backbone',
		'collection-dock': '../bower_components/collection-dock/built/collection-dock',
		'jquery-ui': '../bower_components/jquery-ui/ui/jquery-ui',
		'jquery-ui-resizable': '../bower_components/jquery-ui/ui/jquery-ui',
		lodash: '../bower_components/lodash/dist/lodash.compat',
		'lowercase-backbone': '../bower_components/lowercase-backbone/built/lowercase-backbone',
		'dockable-view': '../bower_components/dockable-view/built/dockable-view',
		jquery: '../bower_components/jquery/dist/jquery',
		qunit: '../bower_components/qunit/qunit/qunit',
		q: '../bower_components/q/q',
		'model-dock': '../bower_components/model-dock/built/model-dock',
		underscore: '../bower_components/underscore/underscore',
		'requirejs-text': '../bower_components/requirejs-text/text',
		subject: '../bower_components/subject/built/subject',
		'backbone-ui-draggable': '../bower_components/backbone-ui-draggable/built/backbone-ui-draggable'
	},
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: [
				'jquery',
				'underscore'
			]
		},
		underscore: {
			exports: '_'
		},
		mocha: {
			exports: 'mocha'
		},
		should: {
			exports: 'should'
		},
		'jquery-ui-resizable': {
			deps: [
				'jquery'
			]
		}
	}
});
