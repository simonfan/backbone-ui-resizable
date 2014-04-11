define('__backbone-ui-resizable/helpers',['require','exports','module','lodash'],function (require, exports, module) {
	

	var _ = require('lodash');

	function notNaN(v) {
		return !isNaN(v);
	}

	exports.min = function min(values) {
		return _(values).filter(notNaN).min().value();
	};

	exports.max = function max(values) {
		return _(values).filter(notNaN).max().value();
	};

	exports.fitValueWithin = function fitValueWithin(value, min, max) {
		var res = value;

		// min
		res = exports.max([res, min]);

		// max
		res = exports.min([res, max]);


		return res;
	}
});

define('__backbone-ui-resizable/initialize-model',['require','exports','module','./helpers'],function (require, exports, module) {
	


	var helpers = require('./helpers');

	function updateMaxWidth($el, model) {

		var left = model.get('left'),
			right = left + model.get('width'),
			minX = model.get('minX'),
			maxX = model.get('maxX'),
			maxWidth = model.get('maxWidth');

		var minXBasedMaxWidth = right - minX,
			maxXBasedMaxWidth = maxX - left;

		console.log([minXBasedMaxWidth, maxXBasedMaxWidth, maxWidth]);

		// the least among the maxWidthes
		var realMaxWidth = helpers.min([minXBasedMaxWidth, maxXBasedMaxWidth, maxWidth]);

		model.set('realMaxWidth', realMaxWidth);

		$el.resizable('option', 'maxWidth', realMaxWidth);
	}


	function updateMaxHeight($el, model) {
		var top = model.get('top'),
			bottom = top + model.get('height'),
			minY = model.get('minY'),
			maxY = model.get('maxY'),
			maxHeight = model.get('maxHeight');

		var minYBasedMaxHeight = bottom - minY,
			maxYBasedMaxHeight = maxY - top;

		// the least among the maxHeights
		var realMaxHeight = helpers.min([minYBasedMaxHeight, maxYBasedMaxHeight, maxHeight]);

		model.set('realMaxHeight', realMaxHeight);

		$el.resizable('option', 'maxHeight', realMaxHeight);
	}


	module.exports = function initializeModel(options) {



		var model = this.model,
			$el = this.$el;

		// set the options onto the model
		model.set(this.resizableOptions);

		// set
		// width, height, left, top
		// start values (in px)
		model.set({
			width: this.$el.width(),
			height: this.$el.height(),
			top: this.$el.position().top,
			left: this.$el.position().left,
		});

		this.listenTo(model, 'change', function (model) {

			this.$el.resizable('option', model.toJSON());

		}, this);

/*
		this.listenTo(
			model,
			'change:left change:width change:maxWidth change:minX change:maxX',
			_.partial(updateMaxWidth, $el)
		);

		this.listenTo(
			model,
			'change:top change:height change:maxHeight change:minY change:maxY',
			_.partial(updateMaxHeight, $el)
		);
		updateMaxWidth($el, model);
		updateMaxHeight($el, model);
*/

	};
});

/**
 * AMD module.
 *
 * @module backbone-ui-resizable
 * @submodule handle-resize
 */

define('__backbone-ui-resizable/handle-resize',['require','exports','module'],function (require, exports, module) {
	

	/**
	 * Handles resizes.
	 *
	 * @method handleResize
	 * @private
	 * @param e {event Object}
	 * @param ui {jquery-ui ui Object}
	 */
	module.exports = function handleResize(e, ui) {

		// do resizing
		var model = this.model,
			width = model.get('width'),
			height = model.get('height'),
			left = model.get('left'),
			top = model.get('top');

		// check for maximums and minimuns
		if (ui.size.width !== width) {
			// silent to false.
			this.resizeWidth(ui.size.width - width, false);
		}

		if (ui.size.height !== height) {
			// silent to false
			this.resizeHeight(ui.size.height - height, false);
		}

		if (ui.position.left !== left) {

			//console.log()

			// silent to false
			this.moveX(ui.position.left - left, false);
		}

		if (ui.position.top !== top) {
			// silent to false
			this.moveY(ui.position.top - top, false);
		}
	};
});

define('__backbone-ui-resizable/actions/move/index',['require','exports','module','../../helpers'],function (require, exports, module) {
	

	var helpers = require('../../helpers');

	exports.moveX = function moveX(attemptedDelta) {

		var model = this.model,
			leftBefore = model.get('left'),
			// convert the attemptedDelta into attemptedLeft
			attemptedLeft = leftBefore + attemptedDelta;

			// get the allowed left
		var left = helpers.fitValueWithin(attemptedLeft, model.get('minX'), model.get('maxX') - model.get('width'));

		model.set('left', left);

		// return remainder
		return attemptedLeft - left;
	};

	exports.moveY = function moveY(attemptedDelta) {
		var model = this.model,
			topBefore = model.get('top'),
			// convert the attemptedDelta into attemptedLeft
			attemptedTop = topBefore + attemptedDelta;

			// get the allowed top
		var top = helpers.fitValueWithin(attemptedTop, model.get('minY'), model.get('maxY') - model.get('height'));

		model.set('top', top);

		// return remainder
		return attemptedTop - top;
	};




	/**
	 * Moves the whole view to the left.
	 *   <<<<<<<<
	 *   --------
	 *   |      |
	 *   |      |
	 *   |      |
	 *   --------
	 *
	 * @method moveToLeft
	 * @param attemptedDelta {+Number}
	 */
	exports.moveToLeft = function moveToLeft(attemptedDelta) {
		return this.moveX(-1 * attemptedDelta);
	};


	/**
	 * Moves the whole view to the right.
	 *   >>>>>>>>
	 *   --------
	 *   |      |
	 *   |      |
	 *   |      |
	 *   --------
	 *
	 * @method moveToRight
	 * @param attemptedDelta {+Number}
	 */
	exports.moveToRight = function moveToRight(attemptedDelta) {
		return this.moveX(attemptedDelta);
	};

	exports.moveToTop = function moveToTop(attemptedDelta) {
		return this.moveY(-1 * attemptedDelta);
	};

	exports.moveToBottom = function moveToBottom(attemptedDelta) {
		return this.moveY(attemptedDelta);
	};


	// extend exports
});

define('__backbone-ui-resizable/actions/resize/contract',['require','exports','module'],function (require, exports, module) {
	

	/**
	 * Contracts the view by moving the left handle
	 * towards the right direction while maintaining
	 * the right handle at a fixed position.
	 *   --------
	 * ->|      |
	 * ->|      |
	 * ->|      |
	 *   --------
	 *
	 * @method contractToRight
	 * @param attemptedDelta {+Number}
	 */
	exports.contractToRight = function contractToRight(attemptedDelta, silent) {

		var remainder = this.resizeWidth(-1 * attemptedDelta, silent);
		remainder = -1 * remainder;

		// delta is always >= 0
		var delta = attemptedDelta - remainder;

		// move
		this.moveX(delta);

		return remainder;
	};

	/**
	 * Contracts the view by moving the right handle
	 * towards the left direction while maintaing the
	 * left handle at a fixed position.
	 *   --------
	 *   |      |<-
	 *   |      |<-
	 *   |      |<-
	 *   --------
	 *
	 * @method contractToLeft
	 * @param attemptedDelta {+Number}
	 */
	exports.contractToLeft = function contractToLeft(attemptedDelta, silent) {

		return -1 * this.resizeWidth(-1 * attemptedDelta, silent);
	};


	/**
	 * Contracts the view by moving the top handle
	 * towards the bottom direction while maintaining
	 * the bottom handle at a fixed position.
	 *
	 *    vvvvvv
	 *   --------
	 *   |      |
	 *   |      |
	 *   |      |
	 *   --------
	 *
	 * @method contractToBottom
	 * @param attemptedDelta {+Number}
	 */
	exports.contractToBottom = function contractToBottom(attemptedDelta, silent) {

		var remainder = this.resizeHeight(-1 * attemptedDelta, silent);
		remainder = -1 * remainder;

		// delta >= 0
		var delta = attemptedDelta - remainder;
		this.moveY(delta);

		return remainder;
	};

	/**
	 * Contracts the view by moving the bottom handle
	 * towards the top direction while maintaing the
	 * top handle at a fixed position.
	 *   --------
	 *   |      |
	 *   |      |
	 *   |      |
	 *   --------
	 *    ^^^^^^
	 *
	 * @method contractToTop
	 * @param attemptedDelta {+Number}
	 */
	exports.contractToTop = function contractToTop(attemptedDelta, silent) {
		var remainder = this.resizeHeight(-1 * attemptedDelta, silent);

		return -1 * remainder;
	};
});

define('__backbone-ui-resizable/actions/resize/expand',['require','exports','module'],function (require, exports, module) {
	

	/**
	 * Expands the view by moving the left handle
	 * towards the left direction while maintaing
	 * the right handle at a fixed position.
	 *   --------
	 *   |<-    |
	 *   |<-    |
	 *   |<-    |
	 *   --------
	 *
	 * @method expandToLeft
	 * @param attemptedDelta {+Number}
	 */
	exports.expandToLeft = function expandToLeft(attemptedDelta, silent) {
		var remainder = this.resizeWidth(attemptedDelta, silent);

		// delta >= 0
		var delta = attemptedDelta - remainder;

		// move the thing to the left.
		this.moveX(-1 * delta);

		return remainder;
	};

	/**
	 * Expands the view by moving the right handle
	 * towards the right direction while maintaing
	 * the left handle at a fixed position.
	 *   --------
	 *   |    ->|
	 *   |    ->|
	 *   |    ->|
	 *   --------
	 *
	 * @method expandToRight
	 * @param attemptedDelta {+Number}
	 */
	exports.expandToRight = function expandToRight(attemptedDelta, silent) {
		return this.resizeWidth(attemptedDelta, silent);
	};

	/**
	 * Expands the view by moving the top handle
	 * towards the top direction while maintaing
	 * the bottom handle at a fixed position.
	 *   --------
	 *   |^^^^^^|
	 *   |      |
	 *   |      |
	 *   --------
	 *
	 * @method expandToTop
	 * @param attemptedDelta {+Number}
	 */
	exports.expandToTop = function expandToTop(attemptedDelta, silent) {
		var remainder = this.resizeHeight(attemptedDelta, silent);

		// delta >= 0
		var delta = attemptedDelta - remainder;

		// move the thing to top
		this.moveY(-1 * delta);

		return remainder;
	};

	/**
	 * Expands the view by moving the bottom handle
	 * towards the bottom direction while maintaing
	 * the top handle at a fixed position.
	 *   --------
	 *   |      |
	 *   |      |
	 *   |vvvvvv|
	 *   --------
	 *
	 * @method expandToBottom
	 * @param attemptedDelta {+Number}
	 */
	exports.expandToBottom = function expandToBottom(attemptedDelta, silent) {
		return this.resizeWidth(attemptedDelta, silent);
	};

});

/**
 * AMD module.
 *
 * @module backbone-ui-resizable
 * @submodule handle-resize
 */

define('__backbone-ui-resizable/actions/resize/index',['require','exports','module','lodash','../../helpers','./contract','./expand'],function (require, exports, module) {
	

	var _ = require('lodash');

	var helpers = require('../../helpers');

	exports.resizeWidth = function resizeWidth(attemptedDelta, silent) {

		var model = this.model,
			// calculate the new width
			attemptedWidth = model.get('width') + attemptedDelta,

			resultingWidth = helpers.fitValueWithin(attemptedWidth, model.get('minWidth'), model.get('maxWidth'));

		// set
		model.set('width', resultingWidth);

		var previous = model.previous('width') || 0,
			delta = resultingWidth - previous;

		if (delta && !silent) {
			// only trigger events when there is an actual delta
			// and the silent option is set to false (or unset)

			var data = {
				axis: 'x',
				delta: delta,
				action: delta > 0 ? 'expansion' : 'contraction',
			};

			this.trigger('resize', this, data)
				.trigger('resize-width', this, data);
		}

		// return remainder of operation
		return attemptedWidth - resultingWidth;
	};

	exports.resizeHeight = function resizeHeight(attemptedDelta) {
		var model = this.model,
			// calculate the attempted height
			attemptedHeight = model.get('height') + attemptedDelta,
			resultingHeight = helpers.fitValueWithin(attemptedHeight, model.get('minHeight'), model.get('maxHeight'));

		// set
		model.set('height', resultingHeight);

		var previous = model.previous('height') || 0,
			delta = resultingHeight - previous;

		if (delta) {
			// only trigger events when there is an actual delta.

			var data = {
				axis: 'y',
				delta: delta,
				action: delta > 0 ? 'expansion' : 'contraction'
			};

			this.trigger('resize', this, data)
				.trigger('resize-height', this, data);
		}

		// return remainder of operation
		return attemptedHeight - resultingHeight;
	};


	// extend exports
	_.assign(exports, require('./contract'));
	_.assign(exports, require('./expand'));
});

//     backbone-ui-resizable
//     (c) simonfan
//     backbone-ui-resizable is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module backbone-ui-resizable
 */

define('backbone-ui-resizable',['require','exports','module','jquery-ui-resizable','lowercase-backbone','model-dock','lodash','./__backbone-ui-resizable/initialize-model','./__backbone-ui-resizable/handle-resize','./__backbone-ui-resizable/actions/move/index','./__backbone-ui-resizable/actions/resize/index'],function (require, exports, module) {
	

	// require jquery ui resizable
	require('jquery-ui-resizable');

	var backbone = require('lowercase-backbone'),
		modelDock = require('model-dock'),
		_ = require('lodash');

	// internal
	var initializeResizableModel = require('./__backbone-ui-resizable/initialize-model');

	/////////////
	// private //
	var resizableOptionsProperties = [
		'alsoResize', 'animate', 'animateDuration', 'animateEasing',
		'aspectRatio', 'autoHide', 'cancel', 'containment', 'delay',
		'disabled', 'distance', 'ghost', 'grid', 'handles', 'helper',
		'maxHeight', 'maxWidth', 'minHeight', 'minWidth',
	];

	/**
	 * Just adds 'px' string to numerical values.
	 *
	 * @method stringifyPositionalValue
	 * @private
	 */
	var number = /^[0-9]+$/;
	function stringifyPositionalValue(v) {
		// [1] check if it is a number
		return number.test(v) ? v + 'px' : v;
	}

	// private //
	/////////////


	var resizable = module.exports = modelDock.extend({

		/**
		 * Initialization script.
		 *
		 * @method initialize
		 */
		initialize: function initialize(options) {

			backbone.view.prototype.initialize.apply(this, arguments);

			this.initializeModelDock.apply(this, arguments);

			this.initializeUIResizable.apply(this, arguments);
		},

		/**
		 * Holds initialization logic exclusive to resizable-dock.
		 *
		 * @method initializeUIResizable
		 * @param options {Object}
		 */
		initializeUIResizable: function resizableDock(options) {

			// bind event handling methods
			_.bindAll(this,
				'handleElResize',
				'handleElResizeStart',
				'handleElResizeStop',
				'rebuildResizableEl');

			// pick the resizableOptions from the main options object.
			this.resizableOptions = _.defaults(
				// the instance resizableOptions
				_.pick(options, resizableOptionsProperties),
				// the default resizableOptions
				this.resizableOptions
			);
			// listen to events on the $el
			this.$el
				.resizable(this.resizableOptions)
				.on('resize', this.handleElResize)
				.on('resizestart', this.handleElResizeStart)
				.on('resizestop', this.handleElResizeStop);

			initializeResizableModel.apply(this, arguments);
		},

		/**
		 * Destroys (if present) the previous resizable plugin
		 * and reinvokes the resizable jquery method.
		 *
		 * @method rebuildResizableEl
		 * @param options
		 */
		rebuildResizableEl: function rebuildResizableEl() {
			this.$el
				.resizable('destroy')
				.resizable(this.model.attributes);
		},

		/**
		 * $el resize event handlers
		 */
		handleElResize: require('./__backbone-ui-resizable/handle-resize'),
		handleElResizeStart: function (e, ui) {
			this.trigger('resizestart', this);
		},
		handleElResizeStop: function (e, ui) {
			this.trigger('resizestop', this);
		},

		/**
		 * Default options to be passed to the $resizable builder
		 *
		 * @property resizableOptions
		 * @type Object
		 */
		resizableOptions: {
			handles: 'n,ne,e,se,s,sw,w,nw',
		},

		/**
		 * When any of the attributes listed here is changed,
		 * the resizable object will be rebuilt.
		 *
		 * @property rebuildOnChange
		 * @type Array
		 */
		rebuildOnChange: ['handles', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth'],

		stringifiers: {
			height: stringifyPositionalValue,
			minHeight: stringifyPositionalValue,
			maxHeight: stringifyPositionalValue,

			width: stringifyPositionalValue,
			minWidth: stringifyPositionalValue,
			maxWidth: stringifyPositionalValue,

			left: stringifyPositionalValue,
			top: stringifyPositionalValue
		},

		map: {
			top: '->css:top',
			left: '->css:left',

			width: '->css:width',
			minWidth: '->css:min-width',
			maxWidth: '->css:max-width',

			height: '->css:height',
			minHeight: '->css:min-height',
			maxHeight: '->css:max-height',
		},
	});

	// extend
	resizable
		.proto(require('./__backbone-ui-resizable/actions/move/index'))
		.proto(require('./__backbone-ui-resizable/actions/resize/index'));
});

