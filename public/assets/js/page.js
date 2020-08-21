// Document Ready
$(document).ready(function () {

	//Start Bootstrap popup Center
	var modalVerticalCenterClass = ".modal";

	function centerModals($element) {
		var $modals;
		if ($element.length) {
			$modals = $element;
		} else {
			$modals = $(modalVerticalCenterClass + ':visible');
		}
		$modals.each(function (i) {
			var $clone = $(this).clone().css('display', 'block').appendTo('body');
			var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
			top = top > 0 ? top : 0;
			$clone.remove();
			$(this).find('.modal-content').css("margin-top", top);
		});
	}
	$(modalVerticalCenterClass).on('show.bs.modal', function (e) {
		centerModals($(this));
	});
	$(window).on('resize', centerModals);
	//End Bootstrap popup Center

	// Start Menu Onclick Active
	$(".sidebar-menu-list li a").filter(function () {
		return this.href == location.href.replace(/#.*/, "");
	}).addClass("active");
	// End Menu Onclick Active
	
	// Menu Slide Animation
	$(".mob-menu-click").click(function () {
		$(".sidebar").animate({
			width: "toggle"
		});
		$('body').toggleClass('overflow-hide');
	});

	// Start For scrool
	$(function () {
		$('.custom-scrool').slimScroll({
			height: '100%'
		});
	});
	// End For scrool

});


// Start Equal Height
equalheight = function (container) {

	var currentTallest = 0,
		currentRowStart = 0,
		rowDivs = new Array(),
		$el,
		topPosition = 0;
	$(container).each(function () {

		$el = $(this);
		$($el).height('auto')
		topPostion = $el.position().top;

		if (currentRowStart != topPostion) {
			for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
				rowDivs[currentDiv].height(currentTallest);
			}
			rowDivs.length = 0; // empty the array
			currentRowStart = topPostion;
			currentTallest = $el.height();
			rowDivs.push($el);
		} else {
			rowDivs.push($el);
			currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
		}
		for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
			rowDivs[currentDiv].height(currentTallest);
		}
	});
}


// Window Resize
$(window).on("resize", function () {
	equalheight('class-name');
}).resize();


// Window Load
$(window).load(function (evt) {
	equalheight('class-name');
});
