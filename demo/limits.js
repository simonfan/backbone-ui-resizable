define(['backbone-ui-draggable', 'jquery', 'lowercase-backbone', './resizable-model.js', 'lodash'],

function (draggable            ,  $      ,  backbone           ,  resizableModel       , _       ) {



	// builders
	var base = draggable.extend({
			initialize: function initialize(options) {
				draggable.prototype.initialize.call(this, options);

				var proxiedAttribute = options.proxiedAttribute;

				// whnever there is a movement,
				// change value
				this.on('move', this.handleMove, this);


				// whenever value is changed,
				// set it to a position
				this.model.on('change:value change:enable', function (model) {
					// set to position
					var position = this.toPosition(model.get('value'));
					this.model.set(position);

					// set the proxied value
					// onto the resizableModel!
					if (_.contains(model.get('enable'), 'enable')) {
						resizableModel.set(proxiedAttribute, model.get('value'));
					} else {

						resizableModel.set(proxiedAttribute, false);

						console.log(proxiedAttribute + ' limit not enabled');
					}

				}, this);

				// set intial value
				var initialValue = resizableModel.get(proxiedAttribute);

				if (!_.isUndefined(initialValue)) {


					// enable
					this.model.set('enable', ['enable']);
					this.model.set('value', initialValue);
				}
			},

			handleMove: function handleMove() {

				var value = this.toValue(this.model);

				this.model.set('value', value);

			},


			map: {
				left: '->css:left',
				top: '->css:top',
				value: 'input[type="text"]',
				enable: 'input[type="checkbox"]'
			},
		}),
		horizontal = base.extend({
			axis: 'y'
		}),
		vertical = base.extend({
			axis: 'x'
		});

	// top-limit
	var minHorizontal = horizontal.extend({
		toValue: function (model) {
			return model.get('top') + this.$el.outerHeight();
		},

		toPosition: function (value) {
			return {
				top: parseInt(value, 10) - parseInt(this.$el.outerHeight(), 10)
			};
		},
	});


	// bottom-limit
	var maxHorizontal = horizontal.extend({

		toValue: function (model) {
			return model.get('top');
		},

		toPosition: function (value) {
			return {
				top: parseInt(value, 10),
			}
		}
	});


	// left-limit
	var minVertical = vertical.extend({

		toValue: function (model) {
			return model.get('left') + this.$el.outerWidth();
		},

		toPosition: function (value) {
			return {
				left: parseInt(value, 10) - parseInt(this.$el.outerWidth(), 10)
			};
		},
	});

	// right-limit
	var maxVertical = vertical.extend({

		toValue: function (model) {
			return model.get('left');
		},

		toPosition: function (value) {
			return {
				left: parseInt(value, 10)
			}
		}
	});

	// builders

	window.limits = {};

	// top
	limits.minTop = minHorizontal({
		el: $('#minTop'),
		proxiedAttribute: 'minTop',
		model: backbone.model({
			enable: 'enable'
		})
	});

	limits.maxTop = maxHorizontal({
		el: $('#maxTop'),
		proxiedAttribute: 'maxTop'
	});

	// bottom
	limits.minBottom = minHorizontal({
		el: $('#minBottom'),
		proxiedAttribute: 'minBottom',
	});

	limits.maxBottom = maxHorizontal({
		el: $('#maxBottom'),
		proxiedAttribute: 'maxBottom'
	});

	// left:
	limits.minLeft = minVertical({
		el: $('#minLeft'),
		proxiedAttribute: 'minLeft'
	});

	limits.maxLeft = maxVertical({
		el: $('#maxLeft'),
		proxiedAttribute: 'maxLeft'
	});

	// right
	limits.minRight = minVertical({
		el: $('#minRight'),
		proxiedAttribute: 'minRight'
	});

	limits.maxRight = maxVertical({
		el: $('#maxRight'),
		proxiedAttribute: 'maxRight'
	});



});
