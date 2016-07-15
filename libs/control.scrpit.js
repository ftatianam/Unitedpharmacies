<!-- use on category -->
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

<!-- use on category -->

<!-- use on index-->

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
<!-- use on index-->


<!-- use on footer Slow top-->

			$(function() {

			$("a[href='#top']").click(function() {
				  $("html, body").animate({ scrollTop: 0 }, "slow");
				  return false;
				});			

			});
<!-- use on footer Slow top-->



//  MESSAGE BOX FADING SCRIPTS ---------------------------------------------------------------------

$(document).ready(function() {
	$(".close-yellow").click(function () {
		$("#message-yellow").fadeOut("slow");
	});
	$(".close-red").click(function () {
		$("#message-red").fadeOut("slow");
	});
	$(".close-blue").click(function () {
		$("#message-blue").fadeOut("slow");
	});
	$(".close-green").click(function () {
		$("#message-green").fadeOut("slow");
	});
});

// END ----------------------------- MESSAGE BOX FADING SCRIPTS

