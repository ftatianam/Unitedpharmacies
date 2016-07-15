$(document).ready(function() {
	$("a[rel=image_group]").fancybox({
		'transitionIn'		: 'none',
		'transitionOut'		: 'none',
		'titlePosition' 	: 'over',
		'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
		return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
	}
				
	});
$("#various").fancybox();

	$("#various1").fancybox({
		'titlePosition'		: 'inside',
		'transitionIn'		: 'none',
		'transitionOut'		: 'none'
	});

	$("#various2").fancybox();
	
	$("a[rel=member_change_add_group]").fancybox({
		'showNavArrows' : false,
		'arrows' : false,		
		'onComplete' : function() {$("#fancybox-wrap").unbind('mousewheel.fb');} ,
			'hideOnOverlayClick' : false,
			'hideOnContentClick' : false,
			'transitionIn' : 'fade',
			'transitionOut' : 'elastic',
			'scrolling' : 'no',
			'titleShow' : false,
			'showNavArrows' : false,
			'padding' : 50
	});
				

		
	$("#various3").fancybox({
		'width'				: '75%',
		'height'			: '75%',
		'autoScale'			: false,
		'transitionIn'		: 'none',
		'transitionOut'		: 'none',
		'type'				: 'iframe'
	});

	$("#various4").fancybox({
		'padding'			: 0,
		'autoScale'			: false,
		'transitionIn'		: 'none',
		'transitionOut'		: 'none'
	});




});
