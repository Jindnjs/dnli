// JavaScript Document

var app = new Vue({
	el: '#app',
	data: { name:'디지털트윈국토' }
});

$(document).ready(function() {
	
	/* FOCUS ABLE */
	var focusable = 'a[href], area[href], input:not([disabled]), input:not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';
	
	/* DEPTH */
	if( depth1 > 0 ){
		$('.gnb > ul > li:eq('+( depth1-1 )+') > .menu').addClass('on');
		if( depth2 > 0 ){
			$('.gnb > ul > li:eq('+( depth1-1 )+') > ul > li:eq('+( depth2-1 )+') > .menu').addClass('on');
			$('.lnb #depth2').removeClass('hide');
			$('.lnb #depth2 > .dropbox > li:eq('+( depth2-1 )+') > .menu').addClass('on');
			var depth2menu = $('.lnb #depth2 > .dropbox > li:eq('+( depth2-1 )+') > .menu.on').text();
			$('.lnb #depth2 > .menu').text(depth2menu);
			if( depth3 > 0 ){
				$('.gnb > ul > li:eq('+( depth1-1 )+') > ul > li:eq('+( depth2-1 )+') > ul > li:eq('+( depth3-1 )+') > .menu').addClass('on');
				$('.lnb #depth3').removeClass('hide');
				$('.lnb #depth3 > .dropbox > li:eq('+( depth3-1 )+') > .menu').addClass('on');
				var depth3menu = $('.lnb #depth3 > .dropbox > li:eq('+( depth3-1 )+') > .menu.on').text();
				$('.lnb #depth3 > .menu').text(depth3menu);
				if( depth4 > 0 ){
					$('.gnb > ul > li:eq('+( depth1-1 )+') > ul > li:eq('+( depth2-1 )+') > ul > li:eq('+( depth3-1 )+') > ul > li:eq('+( depth4-1 )+') > .menu').addClass('on');
					$('.lnb #depth4').removeClass('hide');
					$('.lnb #depth4 > .dropbox > li:eq('+( depth4-1 )+') > .menu').addClass('on');
					var depth4menu = $('.lnb #depth4 > .dropbox > li:eq('+( depth3-1 )+') > .menu.on').text();
					$('.lnb #depth4 > .menu').text(depth3menu);
				};
			};
		};
	};
	
	
	
	/* HEADER FIX */
	$(function(){   
        $('.container').scroll(function () {
            if ($(this).scrollTop() > 0) {
                $('.header').addClass('fix');
            } else {
                $('.header').removeClass('fix');
            }
        });
    });
	
	
	/* FOOTER TOP */
	$(function() {
		$('.container').scroll(function() {
			if ($(this).scrollTop() > 240) {
				$('.footer .bt.ico.go').addClass('on');
			} else {
				$('.footer .bt.ico.go').removeClass('on');
			}
		});

		$('.footer .bt.ico.go').click(function() {
			$('.container').animate({
				scrollTop: 0
			}, 400);
			$('#top').focus();
		});
	});

	
	
	/* 메인팝업 슬라이드 */
	setTimeout(function() {
		$('.popBanner #popSlide').slick({
			dots: true,
			arrows: true,
			autoplay: true,
			speed: 600,
			adaptiveHeight: true,
		});
		$('.popBanner .bt.ico.play').click(function(){
			if($(this).hasClass('on')){
				$('.popBanner #popSlide').slick('slickPlay');
			} else {
				$('.popBanner #popSlide').slick('slickPause');
			}
		});
		$('.popBanner .bt.ico.close').click(function(){
			$(this).parents('.popup').addClass('hide');
		});
	}, 100);
	
	
	/* 띠배너 슬라이드 */
	$('.banner #newsSlide').slick({
		vertical: true,
		arrows: true,
		autoplay: true,
		speed: 600,
		focusOnSelect: true,
	});
	$('.banner .bt.ico.play').click(function(){
		if($(this).hasClass('on')){
			$('.banner #newsSlide').slick('slickPlay');
		} else {
			$('.banner #newsSlide').slick('slickPause');
		}
	});
	$('.banner .bt.ico.close').click(function(){
		$(this).parents('.banner').addClass('hide');
	});
	
	
	/* 로고링크 슬라이드 */
	$('.logolink #siteSlide').slick({
		autoplay: true,
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		autoplaySpeed: 5000,
		speed: 1500,
		/* <--2024-03-26 */
		responsive: [
				{
				breakpoint: 640,
				settings: {
					arrows: false,
					slidesToShow: 4
				}
			},
				{
				breakpoint: 480,
				settings: {
					arrows: false,
					slidesToShow: 3
				}
			}
		]
		/* 2024-03-26--> */
	});
	$('.logolink .bt.ico.play').click(function(){
		if($(this).hasClass('on')){
			$('.logolink #siteSlide').slick('slickPlay');
		} else {
			$('.logolink #siteSlide').slick('slickPause');
		}
	});
	
	
	/* 기업정보 추천상품 슬라이드 */
	$('#companySlide').slick({
		autoplay: false,
		infinite: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplaySpeed: 5000,
		speed: 1500,
		/* <--2024-04-17 */
		responsive: [
				{
				breakpoint: 1080,
				settings: {
					slidesToShow: 3
				}
			},
				{
				breakpoint: 840,
				settings: {
					slidesToShow: 2
				}
			},
				{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}
		]
		/* 2024-04-17--> */
	});
	
	
	/* <--2024-07-10 */
	/* 데이터셋이미지 슬라이드 */
	$('.imgSlider #imgSlide').slick({
		dots: true,
		infinite: false,
		arrows: true,
		autoplay: false,
		speed: 600,
		adaptiveHeight: true,
	});
	/* 2024-07-10--> */
	
	
	/* RANGE */		
	var value = $('.slider:not(.vertical)').siblings('.val');
	$('.slider').slider({
		slide: function( event, ui ) {
			value.text( ui.value );
		}
	});

	var handle = $('.slider.vertical').find('.val');
	$('.slider.vertical').slider({
		orientation: "vertical",
		create: function() {
			handle.text( $( this ).slider('value') );
		},
		slide: function( event, ui ) {
			handle.text( ui.value );
		}
	});
	

	/* DRAG */
	$('.popup.move').draggable({cancel:'.conBody, .conFoot'});


	/* DATE PICKER */
	$('.input.date').datepicker({
		dateFormat: "yy-mm-dd"
	});
	$.datepicker.setDefaults({
		dateFormat: 'yyyy-mm-dd',
		monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		showMonthAfterYear: true,
		changeYear: true,
		changeMonth: true,
		monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12']
	});
	
	
	/* AUTO COMPLETE */
	var availableTags = [
		"ActionScript",
		"AppleScript",
		"Asp",
		"BASIC",
		"C",
		"C++",
		"Clojure",
		"COBOL",
		"ColdFusion",
		"Erlang",
		"Fortran",
		"Groovy",
		"Haskell",
		"Java",
		"JavaScript",
		"Lisp",
		"Perl",
		"PHP",
		"Python",
		"Ruby",
		"Scala",
		"Scheme"
	];
	
	$('.input.auto').autocomplete({ source: availableTags });

	
	
	/* X-SCROLL */
	function row_scroll() {
		$('.tabs.fix').on('mousewheel', function (e) {

		var wheelDelta = e.originalEvent.wheelDelta;

		if (wheelDelta > 0) {
			$(this).scrollLeft(-wheelDelta + $(this).scrollLeft());
			} else {
				$(this).scrollLeft(-wheelDelta + $(this).scrollLeft());
			}
		});
	}
	row_scroll();
	
	
	/* GNB */
	$('.header .toggle > .menu').focusin(function(){
		
		var menu = $(this);
		
		var drop = menu.siblings('.dropbox');
		var dropAll = menu.parents('.toggle').siblings('.toggle').children('.dropbox');
		
		var gnb = menu.parents('.gnb');
		var menuAll = gnb.find('.menu');
		var menuStart = menuAll && menuAll.first();
		var menuEnd = menuAll && menuAll.last();

		dropAll.hide();
		drop.show();
		
		// Shift + Tab
		menuStart.on('keydown',function(event){
			if (event.shiftKey && (event.keyCode || event.which) === 9) {
				event.preventDefault();
				menu.blur();
				drop.hide();
			}
		});
		
		// Tab
		menuEnd.on('keydown',function(event){
			if (!event.shiftKey && (event.keyCode || event.which) === 9) {
				event.preventDefault();
				drop.hide();
			}
		});
		
	});

	
	
	/* COLOR */
    $('input[type="color"]').change(function(){
        var selectColor = $(this).val();
		$(this).siblings('label').text(selectColor);
        $(this).siblings('span').css("background-color", selectColor);
    });
	
	$('.colorpicker').each( function() {
		$(this).minicolors({
			control: $(this).attr('data-control') || 'hue',
			defaultValue: $(this).attr('data-defaultValue') || '',
			format: $(this).attr('data-format') || 'hex',
			keywords: $(this).attr('data-keywords') || '',
			inline: $(this).attr('data-inline') === 'true',
			letterCase: $(this).attr('data-letterCase') || 'lowercase',
			opacity: $(this).attr('data-opacity'),
			position: $(this).attr('data-position') || 'bottom',
			swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
			change: function(hex, opacity) {
				var log;
				try {
				log = hex ? hex : 'transparent';
				if( opacity ) log += ', ' + opacity;
				} catch(e) {}
			},
			theme: 'default'
		});
	});
	
	// 2024-03-14
	/* SPECTRUM */
	$('.spectrum').spectrum({
		type: "color",
		showPalette: false,
  		showPaletteOnly: true
	});
	
	
	/* ATTACH */
    $(document).on('change', 'input[type="file"]', function(){
        var fileName = $(this).val();
        $(this).siblings('label').text(fileName);
    });
	
	
	/* TAB */
	$('.tab[href]:not(.off)').on('click', function(e){
		
		var tab = $(this);
		var tabs = tab.parents('.tabs');
		var index = tab.parents('li').index()+1;

		tabs.find('.tab').removeClass('on').attr('title','');
		
		tab.addClass('on').attr('title','선택된 탭');
		
		tabs.siblings('.tabcon').addClass('hide').removeAttr('tabindex');
		tabs.siblings('.tabcon.view'+ index).removeClass('hide').attr('tabindex','0').focus();
		
		tabs.siblings('.tabview').attr('tabindex','0').focus();
		
		event.preventDefault();
		
	});
	
	
	
	/* MENUAL */
	$('.manual .linktxt').on('click', function(e){
		
		var tab = $(this);
		var tabs = tab.parents('.jump');

		tabs.find('.linktxt').removeClass('on').attr('title','');
		
		tab.addClass('on').attr('title','선택된 메뉴');
		
		tabs.siblings('.item').removeAttr('tabindex');
		tabs.siblings('.item').attr('tabindex','0').focus();
		
		event.preventDefault();
		
	});
	$('.manual .item .con').find('font').attr('face','');

	
	
	/* POPUP */
	$(document).on('click','*[aria-haspopup="dialog"]',function(){
		
		var popbt = $(this);
		var popup = $("#" + $(this).attr('aria-controls'));
		
		popup.removeClass('hide');
		popup.attr('aria-hidden','false');
		
		var tab = popup.find(focusable);
		var tabStart = tab && tab.first();
		var tabEnd = tab && tab.last();
		
		popup.find('.conWrap').attr('tabindex','0').focus();
		
		// Shift + Tab
		tabStart.on('keydown',function(event){
			if (event.shiftKey && (event.keyCode || event.which) === 9) {
				event.preventDefault();
				tabEnd.focus();
			}
		});
		
		// Tab
		tabEnd.on('keydown',function(event){
			if (!event.shiftKey && (event.keyCode || event.which) === 9) {
				event.preventDefault();
				tabStart.focus();
			}
		});		
		
		// popup close
		function popClose() {
			popup.attr('aria-hidden','true').removeAttr('tabindex').addClass('hide');
			popbt.focus();
		}
		$(popup.find('.bt.ico.close').not('.min')).on('click',popClose);
		
		popup.on('click', function(event){
			if (event.target === event.currentTarget) {
				popClose();
			}
		});
		
		// ESC
		window.onkeyup = function(e) {
			var key = e.keyCode ? e.keyCode : e.which;
			if(key == 27) { popClose(); }
		}
		
		/* <--2024-07-10 */
		$('#imgSlide').resize();
		$('#imgSlide').slick('refresh');
		/* 2024-07-10--> */

	});	


	
	
	/* TOGGLE */
	$(document).on("click",'.toggle > .bt:not(.onoff, .customToggle, .x)', function(){
		
		var bt = $(this);
		var tg = bt.parent('.toggle');
		var one = tg.siblings('.toggle')
		var box = tg.children('.overbox,.dropbox');
		var slip = tg.children('.slipbox');
		
		if (bt.hasClass('on')) {
			tg.removeClass('on');
			bt.removeClass('on');
			box.hide().removeAttr('tabindex');
			slip.slideUp().removeAttr('tabindex');
		} else {
			if (tg.hasClass('one')) {
				one.removeClass('on');
				one.children('.toggle > .bt').removeClass('on');
				one.children('.overbox,.dropbox').hide().removeAttr('tabindex');
				one.children('.slipbox').slideUp().removeAttr('tabindex');
			}
			tg.addClass('on');
			bt.addClass('on');
			box.show().attr('tabindex','0').focus();
			slip.slideDown().attr('tabindex','0').focus();
		}

		// toggle close
		function tgClose() {
			tg.removeClass('on');
			box.hide().removeAttr('tabindex');
			slip.slideUp().removeAttr('tabindex');
			bt.removeClass('on').focus();
		}
		$(tg.find('.bt.ico.close')).on('click',tgClose);

	});

	
	
	/* ONOFF */
	$(document).on("click",'.onoff', function(){
		$(this).toggleClass('on');
	});
	
	/* FILTER */
	$(document).on("click",'.headline.bg .bt.onoff', function(){
		if ($(this).hasClass('on')) {
			$('article.filter').slideDown();
		} else {
			$('article.filter').slideUp();
		}
	});
	
	$(document).on("click",'.filter .toggle', function(){
		if ($(this).hasClass('on')) {
			$(this).next('.cropbox').addClass('on');
		} else {
			$(this).next('.cropbox').removeClass('on');
		}
	});

	
	
	
	/* LIST PICK */
	$(document).on('click', '.list.pick li', function(){
		$(this).siblings('li').removeClass('on');
		$(this).addClass('on');
	});
	
	
	
	/* PANEL */
	$(document).on("click",'.panel .bt.ico.close, .panel .bt.ico.arrow', function(){
		
		var panel = $('.panel').outerWidth();
		
		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
			$(this).parents('.panel').animate({left: 0},'swing');
		} else {
			$(this).addClass('on');
			$(this).parents('.panel').animate({left: - panel},'swing');
		}
	});
	
});