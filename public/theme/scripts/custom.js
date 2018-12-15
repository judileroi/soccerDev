/* ----------------- Start Document ----------------- */
(function($){
"use strict";

$(document).ready(function(){

	/*--------------------------------------------------*/
	/*  Navigation
	/*--------------------------------------------------*/
	var jPanelMenu = $.jPanelMenu({
	  menu: '#responsive',
	  animated: true,
	  duration: 200,
	  keyboardShortcuts: false,
	  closeOnContentClick: true
	});

	// Menu Trigger
	$('.menu-trigger').on('click', function(){

	  var jpm = $(this);

	  if( jpm.hasClass('active') )
	  {
	    jPanelMenu.off();
	    jpm.removeClass('active');

	  }
	  else
	  {
	    jPanelMenu.on();
	    jPanelMenu.open();
	    jpm.addClass('active');


		$("#jPanelMenu-menu li li").each(function() {
			var subMenuTrigger = $(this).children('a').not('#jPanelMenu-menu li li li a');
			var subMenuItem = $(this).find('ul');
			
			subMenuTrigger.on('click', function(){
				subMenuItem.toggleClass('sub-menu-visible');
				$(this).toggleClass('active-sub-trigger');
			});
		});

		// Removes SuperFish Styles
		$('#jPanelMenu-menu').removeClass('menu');
		$('ul#jPanelMenu-menu li').removeClass('dropdown');
		$('ul#jPanelMenu-menu li ul').removeAttr('style');
		$('ul#jPanelMenu-menu li div').removeClass('mega').removeAttr('style');
		$('ul#jPanelMenu-menu li div div').removeClass('mega-container');
	  }
	  return false;

	});


	$(window).resize(function (){
		var winWidth = $(window).width();
		if(winWidth>992) {
			jPanelMenu.close();
		}
	});

    /*  User Menu */
    $('.user-menu').on('click', function(){
		$(this).toggleClass('active');
	});


	/*----------------------------------------------------*/
	/*  Sticky Header 
	/*----------------------------------------------------*/
	$( "#header" ).not( "#header.not-sticky" ).clone(true).addClass('cloned unsticky').insertAfter( "#header" );
	$( "#navigation.style-2" ).clone(true).addClass('cloned unsticky').insertAfter( "#navigation.style-2" );

	// Logo for header style 2
	$( "#logo .sticky-logo" ).clone(true).prependTo("#navigation.style-2.cloned ul#responsive");


	// sticky header script
	var headerOffset = $("#header-container").height() * 2; // height on which the sticky header will shows

	$(window).scroll(function(){
		if($(window).scrollTop() >= headerOffset){
			$("#header.cloned").addClass('sticky').removeClass("unsticky");
			$("#navigation.style-2.cloned").addClass('sticky').removeClass("unsticky");
		} else {
			$("#header.cloned").addClass('unsticky').removeClass("sticky");
			$("#navigation.style-2.cloned").addClass('unsticky').removeClass("sticky");
		}
	});


	/*----------------------------------------------------*/
	/*  Back to Top
	/*----------------------------------------------------*/
	var pxShow = 600; // height on which the button will show
	var scrollSpeed = 500; // how slow / fast you want the button to scroll to top.

	$(window).scroll(function(){
	 if($(window).scrollTop() >= pxShow){
		$("#backtotop").addClass('visible');
	 } else {
		$("#backtotop").removeClass('visible');
	 }
	});

	$('#backtotop a').on('click', function(){
	 $('html, body').animate({scrollTop:0}, scrollSpeed);
	 return false;
	});


	/*----------------------------------------------------*/
	/*  Inline CSS replacement for backgrounds etc.
	/*----------------------------------------------------*/
	function inlineCSS() {

		// Common Inline CSS
		$(".main-search-container, section.fullwidth, .listing-slider .item, .address-container, .img-box-background, .image-edge, .edge-bg").each(function() {
			var attrImageBG = $(this).attr('data-background-image');
			var attrColorBG = $(this).attr('data-background-color');

	        if(attrImageBG !== undefined) {
	            $(this).css('background-image', 'url('+attrImageBG+')');
	        }

	        if(attrColorBG !== undefined) {
	            $(this).css('background', ''+attrColorBG+'');
	        }
		});

	}

	// Init
	inlineCSS();

	function parallaxBG() {

		$('.parallax').prepend('<div class="parallax-overlay"></div>');

		$( ".parallax").each(function() {
			var attrImage = $(this).attr('data-background');
			var attrColor = $(this).attr('data-color');
			var attrOpacity = $(this).attr('data-color-opacity');
			
	        if(attrImage !== undefined) {
	            $(this).css('background-image', 'url('+attrImage+')');
	        }

	        if(attrColor !== undefined) {
	            $(this).find(".parallax-overlay").css('background-color', ''+attrColor+'');
	        }

	        if(attrOpacity !== undefined) {
	            $(this).find(".parallax-overlay").css('opacity', ''+attrOpacity+'');
	        }

		});
	}

	parallaxBG();



    /*----------------------------------------------------*/
    /*  Image Box 
    /*----------------------------------------------------*/
	$('.category-box').each(function(){

		// add a photo container
		$(this).append('<div class="category-box-background"></div>');

		// set up a background image for each tile based on data-background-image attribute
		$(this).children('.category-box-background').css({'background-image': 'url('+ $(this).attr('data-background-image') +')'});

		// background animation on mousemove
		// $(this).on('mousemove', function(e){
		//   $(this).children('.category-box-background').css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
		// })
	});


    /*----------------------------------------------------*/
    /*  Image Box 
    /*----------------------------------------------------*/
	$('.img-box').each(function(){
		$(this).append('<div class="img-box-background"></div>');
		$(this).children('.img-box-background').css({'background-image': 'url('+ $(this).attr('data-background-image') +')'});
	});



	/*----------------------------------------------------*/
	/*  Parallax
	/*----------------------------------------------------*/

	/* detect touch */
	if("ontouchstart" in window){
	    document.documentElement.className = document.documentElement.className + " touch";
	}
	if(!$("html").hasClass("touch")){
	    /* background fix */
	    $(".parallax").css("background-attachment", "fixed");
	}

	/* fix vertical when not overflow
	call fullscreenFix() if .fullscreen content changes */
	function fullscreenFix(){
	    var h = $('body').height();
	    // set .fullscreen height
	    $(".content-b").each(function(i){
	        if($(this).innerHeight() > h){ $(this).closest(".fullscreen").addClass("overflow");
	        }
	    });
	}
	$(window).resize(fullscreenFix);
	fullscreenFix();

	/* resize background images */
	function backgroundResize(){
	    var windowH = $(window).height();
	    $(".parallax").each(function(i){
	        var path = $(this);
	        // variables
	        var contW = path.width();
	        var contH = path.height();
	        var imgW = path.attr("data-img-width");
	        var imgH = path.attr("data-img-height");
	        var ratio = imgW / imgH;
	        // overflowing difference
	        var diff = 100;
	        diff = diff ? diff : 0;
	        // remaining height to have fullscreen image only on parallax
	        var remainingH = 0;
	        if(path.hasClass("parallax") && !$("html").hasClass("touch")){
	            //var maxH = contH > windowH ? contH : windowH;
	            remainingH = windowH - contH;
	        }
	        // set img values depending on cont
	        imgH = contH + remainingH + diff;
	        imgW = imgH * ratio;
	        // fix when too large
	        if(contW > imgW){
	            imgW = contW;
	            imgH = imgW / ratio;
	        }
	        //
	        path.data("resized-imgW", imgW);
	        path.data("resized-imgH", imgH);
	        path.css("background-size", imgW + "px " + imgH + "px");
	    });
	}


	$(window).resize(backgroundResize);
	$(window).focus(backgroundResize);
	backgroundResize();

	/* set parallax background-position */
	function parallaxPosition(e){
	    var heightWindow = $(window).height();
	    var topWindow = $(window).scrollTop();
	    var bottomWindow = topWindow + heightWindow;
	    var currentWindow = (topWindow + bottomWindow) / 2;
	    $(".parallax").each(function(i){
	        var path = $(this);
	        var height = path.height();
	        var top = path.offset().top;
	        var bottom = top + height;
	        // only when in range
	        if(bottomWindow > top && topWindow < bottom){
	            //var imgW = path.data("resized-imgW");
	            var imgH = path.data("resized-imgH");
	            // min when image touch top of window
	            var min = 0;
	            // max when image touch bottom of window
	            var max = - imgH + heightWindow;
	            // overflow changes parallax
	            var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
	            top = top - overflowH;
	            bottom = bottom + overflowH;


	            // value with linear interpolation
	            // var value = min + (max - min) * (currentWindow - top) / (bottom - top);
	            var value = 0;
				if ( $('.parallax').is(".titlebar") ) {
				    value = min + (max - min) * (currentWindow - top) / (bottom - top) *2;
				} else {
					value = min + (max - min) * (currentWindow - top) / (bottom - top);
				}

	            // set background-position
	            var orizontalPosition = path.attr("data-oriz-pos");
	            orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
	            $(this).css("background-position", orizontalPosition + " " + value + "px");
	        }
	    });
	}
	if(!$("html").hasClass("touch")){
	    $(window).resize(parallaxPosition);
	    //$(window).focus(parallaxPosition);
	    $(window).scroll(parallaxPosition);
	    parallaxPosition();
	}

	// Jumping background fix for IE
	if(navigator.userAgent.match(/Trident\/7\./)) { // if IE
	    $('body').on("mousewheel", function () {
	        event.preventDefault(); 

	        var wheelDelta = event.wheelDelta;
	        var currentScrollPosition = window.pageYOffset;
	        window.scrollTo(0, currentScrollPosition - wheelDelta);
	    });
	}
	



	// Responsive Nav Trigger
    $('.dashboard-responsive-nav-trigger').on('click', function(e){
    	e.preventDefault();
		$(this).toggleClass('active');

		var dashboardNavContainer = $('body').find(".dashboard-nav");

		if( $(this).hasClass('active') ){
			$(dashboardNavContainer).addClass('active');
		} else {
			$(dashboardNavContainer).removeClass('active');
		}

	});

    // Dashbaord Messages Alignment
	$(window).on('load resize', function() {
		var msgContentHeight = $(".message-content").outerHeight();
		var msgInboxHeight = $(".messages-inbox ul").height();
		
		if( msgContentHeight > msgInboxHeight ){
			$(".messages-container-inner .messages-inbox ul").css('max-height', msgContentHeight)
		}
	});



    /*----------------------------------------------------*/
	/* Pricing List
	/*----------------------------------------------------*/
	function newMenuItem() {
		var newElem = $('tr.pricing-list-item.pattern').first().clone();
		newElem.find('input').val('');
		newElem.appendTo('table#pricing-list-container');
	}

	if ($("table#pricing-list-container").is('*')) {
		$('.add-pricing-list-item').on('click', function(e) {
			e.preventDefault();
			newMenuItem();
		});

		// remove ingredient
		$(document).on( "click", "#pricing-list-container .delete", function(e) {
			e.preventDefault();
			$(this).parent().parent().remove();
		});

		// add submenu
		$('.add-pricing-submenu').on('click', function(e) {
			e.preventDefault();

			var newElem = $(''+
				'<tr class="pricing-list-item pricing-submenu">'+
					'<td>'+
						'<div class="fm-move"><i class="sl sl-icon-cursor-move"></i></div>'+
						'<div class="fm-input"><input type="text" placeholder="Category Title" /></div>'+
						'<div class="fm-close"><a class="delete" href="#"><i class="fa fa-remove"></i></a></div>'+
					'</td>'+
				'</tr>');

			newElem.appendTo('table#pricing-list-container');
		});

		$('table#pricing-list-container tbody').sortable({
			forcePlaceholderSize: true,
			forceHelperSize: false,
			placeholder : 'sortableHelper',
			zIndex: 999990,
			opacity: 0.6,
			tolerance: "pointer",
			start: function(e, ui ){
			     ui.placeholder.height(ui.helper.outerHeight());
			}
		});
 	}


    // Unit character
    var fieldUnit = $('.pricing-price').children('input').attr('data-unit');
    $('.pricing-price').children('input').before('<i class="data-unit">'+ fieldUnit + '</i>');



	/*----------------------------------------------------*/
	/*  Notifications
	/*----------------------------------------------------*/
	$("a.close").removeAttr("href").on('click', function(){

		function slideFade(elem) {
			var fadeOut = { opacity: 0, transition: 'opacity 0.5s' };
			elem.css(fadeOut).slideUp();
		}
		slideFade($(this).parent());

	});


	/*----------------------------------------------------*/
	/* Panel Dropdown
	/*----------------------------------------------------*/
    function close_panel_dropdown() {
		$('.panel-dropdown').removeClass("active");
		$('.fs-inner-container.content').removeClass("faded-out");
    }
 
    $('.panel-dropdown a').on('click', function(e) {
    	
		if ( $(this).parent().is(".active") ) {
            close_panel_dropdown();
        } else {
            close_panel_dropdown();
            $(this).parent().addClass('active');
			$('.fs-inner-container.content').addClass("faded-out");
        }
 
        e.preventDefault();
    }); 

    // Apply / Close buttons
    $('.panel-buttons button').on('click', function(e) {
	    $('.panel-dropdown').removeClass('active');
		$('.fs-inner-container.content').removeClass("faded-out");
    });

    // Closes dropdown on click outside the conatainer
	var mouse_is_inside = false;

	$('.panel-dropdown').hover(function(){ 
	    mouse_is_inside=true; 
	}, function(){ 
	    mouse_is_inside=false; 
	});

	$("body").mouseup(function(){ 
	    if(! mouse_is_inside) close_panel_dropdown();
	});

    // "All" checkbox
    $('.checkboxes.categories input').on('change', function() {
        if($(this).hasClass('all')){
            $(this).parents('.checkboxes').find('input').prop('checked', false);
            $(this).prop('checked', true);
        } else {
            $('.checkboxes input.all').prop('checked', false);
        }
    });




    /*----------------------------------------------------*/
    /*  Show More Button
    /*----------------------------------------------------*/
    $('.show-more-button').on('click', function(e){
    	e.preventDefault();
    	$(this).toggleClass('active');

		$('.show-more').toggleClass('visible');
		if ( $('.show-more').is(".visible") ) {

			var el = $('.show-more'),
				curHeight = el.height(),
				autoHeight = el.css('height', 'auto').height();
				el.height(curHeight).animate({height: autoHeight}, 400);


		} else { $('.show-more').animate({height: '450px'}, 400); }

	});


	/*----------------------------------------------------*/
	/* Listing Page Nav
	/*----------------------------------------------------*/

    $(window).on('load resize', function() {
      var containerWidth = $(".container").width();
      $('.listing-nav-container.cloned .listing-nav').css('width', containerWidth);
    });

	if(document.getElementById("listing-nav") !== null) {
		$(window).scroll(function(){
			var window_top = $(window).scrollTop();
			var div_top = $('.listing-nav').not('.listing-nav-container.cloned .listing-nav').offset().top + 90;
		    if (window_top > div_top) {
		        $('.listing-nav-container.cloned').addClass('stick');
		    } else {
		        $('.listing-nav-container.cloned').removeClass('stick');
		    }
		});
	}

	$( ".listing-nav-container" ).clone(true).addClass('cloned').prependTo("body");


    // Smooth scrolling using scrollto.js
	$('.listing-nav a, a.listing-address, .star-rating a').on('click', function(e) {
        e.preventDefault();
        $('html,body').scrollTo(this.hash, this.hash, { gap: {y: -20} }); 
    });

	$(".listing-nav li:first-child a, a.add-review-btn, a[href='#add-review']").on('click', function(e) {
        e.preventDefault();
        $('html,body').scrollTo(this.hash, this.hash, { gap: {y: -100} }); 
    });


    // Highlighting functionality.
	$(window).on('load resize', function() {
		var aChildren = $(".listing-nav li").children();
		var aArray = [];
		for (var i=0; i < aChildren.length; i++) {    
		    var aChild = aChildren[i];
		    var ahref = $(aChild).attr('href');
		    aArray.push(ahref);
		}

		$(window).scroll(function(){
		    var windowPos = $(window).scrollTop(); 
		    for (var i=0; i < aArray.length; i++) {
		        var theID = aArray[i];
		        var divPos = $(theID).offset().top - 150;
		        var divHeight = $(theID).height();
		        if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
		            $("a[href='" + theID + "']").addClass("active");
		        } else {
		            $("a[href='" + theID + "']").removeClass("active");
		        }
		    }
		});
	});


	/*----------------------------------------------------*/
	/*  Payment Accordion
	/*----------------------------------------------------*/
	var radios = document.querySelectorAll('.payment-tab-trigger > input');

	for (var i = 0; i < radios.length; i++) {
		radios[i].addEventListener('change', expandAccordion);
	}

	function expandAccordion (event) {
	  var allTabs = document.querySelectorAll('.payment-tab');
	  for (var i = 0; i < allTabs.length; i++) {
	    allTabs[i].classList.remove('payment-tab-active');
	  }
	  event.target.parentNode.parentNode.classList.add('payment-tab-active');
	}


	/*----------------------------------------------------*/
	/*  Contact Form
	/*----------------------------------------------------*/

    var shake = "No";

    $('#message').hide();

    // Add validation parts
    $('#contact input[type=text], #contact input[type=number], #contact input[type=email], #contact input[type=url], #contact input[type=tel], #contact select, #contact textarea').each(function(){

    });

	 // Validate as you type
	   $('#name, #comments, #subject').focusout(function() {
	       if (!$(this).val()) {
	           $(this).addClass('error').parent().find('mark').removeClass('valid').addClass('error');
	       }
	       else {
	           $(this).removeClass('error').parent().find('mark').removeClass('error').addClass('valid');
	       }
	         $('#submit')
	           .prop('disabled',false)
	           .removeClass('disabled');
	   });
	   $('#email').focusout(function() {
	       if (!$(this).val() || !isEmail($(this).val())) {
	           $(this).addClass('error').parent().find('mark').removeClass('valid').addClass('error');
	       } else {
	           $(this).removeClass('error').parent().find('mark').removeClass('error').addClass('valid');
	       }
	   });

	   $('#email').focusin(function() {
	        $('#submit')
	           .prop('disabled',false)
	           .removeClass('disabled');
	   });

	$('#submit').on('click', function() {
        $("#contact-message").slideUp(200,function() {
            $('#contact-message').hide();

            // Kick in Validation
            $('#name, #subject, #phone, #comments, #website, #email').triggerHandler("focusout");

            if ($('#contact mark.error').size()>0) {
                if(shake == "Yes") {
                    $('#contact').effect('shake', { times:2 }, 75, function(){
                        $('#contact input.error:first, #contact textarea.error:first').focus();
                    });
                } else $('#contact input.error:first, #contact textarea.error:first').focus();

                return false;
            }

        });
    });

    $('#contactform').submit(function(){

        if ($('#contact mark.error').size()>0) {
            if(shake == "Yes") {
            $('#contact').effect('shake', { times:2 }, 75);
            }
            return false;
        }

        var action = $(this).attr('action');

        $('#contact #submit').after('<img src="images/loader.gif" class="loader" />');

        $('#submit')
            .prop('disabled',true)
            .addClass('disabled');

        $.post(action, $('#contactform').serialize(),
            function(data){
                $('#contact-message').html( data );
                $('#contact-message').slideDown();
                $('#contactform img.loader').fadeOut('slow',function(){$(this).remove();});
                // $('#contactform #submit').removeAttr('disabled');
                if(data.match('success') !== null) $('#contactform').slideUp('slow');

            }
        );

        return false;

    });

    function isEmail(emailAddress) {

        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        return pattern.test(emailAddress);
    }



// ------------------ End Document ------------------ //
});

})(this.jQuery);


/*!
 * jquery.scrollto.js 0.0.1 - https://github.com/yckart/jquery.scrollto.js
 * Copyright (c) 2012 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 **/

$.scrollTo = $.fn.scrollTo = function(x, y, options){
    if (!(this instanceof $)) return $.fn.scrollTo.apply($('html, body'), arguments);

    options = $.extend({}, {
        gap: {
            x: 0,
            y: 0
        },
        animation: {
            easing: 'swing',
            duration: 600,
            complete: $.noop,
            step: $.noop
        }
    }, options);

    return this.each(function(){
        var elem = $(this);
        elem.stop().animate({
            scrollLeft: !isNaN(Number(x)) ? x : $(y).offset().left + options.gap.x,
            scrollTop: !isNaN(Number(y)) ? y : $(y).offset().top + options.gap.y
        }, options.animation);
    });
};


/*----------------------------------------------------*/
/*  Ratings Script
/*----------------------------------------------------*/

/*  Numerical Script
/*--------------------------*/
function numericalRating(ratingElem) {

	$(ratingElem).each(function() {
		var dataRating = $(this).attr('data-rating');

		// Rules
	    if (dataRating >= 4.0) {
	        $(this).addClass('high');
	    } else if (dataRating >= 3.0) {
	        $(this).addClass('mid');
	    } else if (dataRating < 3.0) {
	        $(this).addClass('low');
	    }

	});

} numericalRating('.numerical-rating');


/*  Star Rating
/*--------------------------*/
function starRating(ratingElem) {

	$(ratingElem).each(function() {

		var dataRating = $(this).attr('data-rating');

		// Rating Stars Output
		function starsOutput(firstStar, secondStar, thirdStar, fourthStar, fifthStar) {
			return(''+
				'<span class="'+firstStar+'"></span>'+
				'<span class="'+secondStar+'"></span>'+
				'<span class="'+thirdStar+'"></span>'+
				'<span class="'+fourthStar+'"></span>'+
				'<span class="'+fifthStar+'"></span>');
		}

		var fiveStars = starsOutput('star','star','star','star','star');

		var fourHalfStars = starsOutput('star','star','star','star','star half');
		var fourStars = starsOutput('star','star','star','star','star empty');

		var threeHalfStars = starsOutput('star','star','star','star half','star empty');
		var threeStars = starsOutput('star','star','star','star empty','star empty');

		var twoHalfStars = starsOutput('star','star','star half','star empty','star empty');
		var twoStars = starsOutput('star','star','star empty','star empty','star empty');

		var oneHalfStar = starsOutput('star','star half','star empty','star empty','star empty');
		var oneStar = starsOutput('star','star empty','star empty','star empty','star empty');

		// Rules
        if (dataRating >= 4.75) {
            $(this).append(fiveStars);
        } else if (dataRating >= 4.25) {
            $(this).append(fourHalfStars);
        } else if (dataRating >= 3.75) {
            $(this).append(fourStars);
        } else if (dataRating >= 3.25) {
            $(this).append(threeHalfStars);
        } else if (dataRating >= 2.75) {
            $(this).append(threeStars);
        } else if (dataRating >= 2.25) {
            $(this).append(twoHalfStars);
        } else if (dataRating >= 1.75) {
            $(this).append(twoStars);
        } else if (dataRating >= 1.25) {
            $(this).append(oneHalfStar);
        } else if (dataRating < 1.25) {
            $(this).append(oneStar);
        }

	});

} starRating('.star-rating');


