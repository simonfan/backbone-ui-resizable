define(['lowercase-backbone'],
function (backbone) {

	return backbone.model({
	//	width: '50%',

		minHeight: 200,
		height: 200,
		maxHeight: 400,

		minWidth: 200,
		width: 400,
		maxWidth: 700,


		left: 250,

		minLeft: 200,
		maxLeft: 400,

		minRight: 400,
		maxRight: 700,

		top: 200,

		minTop: 150,
		maxTop: 400,

		minBottom: 400,
		maxBottom: 600
	});

});
