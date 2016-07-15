$(function() {
	$('.default').raty();
	$('#fixed').raty({
		readOnly	: true,
		score		: 2
	});				
	$('#defaultone').raty();
		$('#fixed').raty({
			readOnly	: true,
			score		: 2
		});				
});
			
$(function(){
	$('.tab ul li a').click(function(){
	$(".tab ul li a").removeClass("click")
		.addClass("none");
	$(this).removeClass('none')
		.addClass('click');
	});
});
		
		
$(function(){
	$('#products').slides({
		preload: true,
		preloadImage: 'style/img/loading.gif',
		effect: 'slide, fade',
		crossfade: true,
		slideSpeed: 350,
		fadeSpeed: 700,
		auto:true,
		generateNextPrev: true,
		generatePagination: false
	});
});

