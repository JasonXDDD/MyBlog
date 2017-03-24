/*
	Story by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		xxsmall: '(max-width: 360px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$wrapper = $('#wrapper');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Browser fixes.

			// IE: Flexbox min-height bug.
				if (skel.vars.browser == 'ie')
					(function() {

						var flexboxFixTimeoutId;

						$window.on('resize.flexbox-fix', function() {

							var $x = $('.fullscreen');

							clearTimeout(flexboxFixTimeoutId);

							flexboxFixTimeoutId = setTimeout(function() {

								if ($x.prop('scrollHeight') > $window.height())
									$x.css('height', 'auto');
								else
									$x.css('height', '100vh');

							}, 250);

						}).triggerHandler('resize.flexbox-fix');

					})();

			// Object fit workaround.
				if (!skel.canUse('object-fit'))
					(function() {

						$('.banner .image, .spotlight .image').each(function() {

							var $this = $(this),
								$img = $this.children('img'),
								positionClass = $this.parent().attr('class').match(/image-position-([a-z]+)/);

							// Set image.
								$this
									.css('background-image', 'url("' + $img.attr('src') + '")')
									.css('background-repeat', 'no-repeat')
									.css('background-size', 'cover');

							// Set position.
								switch (positionClass.length > 1 ? positionClass[1] : '') {

									case 'left':
										$this.css('background-position', 'left');
										break;

									case 'right':
										$this.css('background-position', 'right');
										break;

									default:
									case 'center':
										$this.css('background-position', 'center');
										break;

								}

							// Hide original.
								$img.css('opacity', '0');

						});

					})();

		// Smooth scroll.
			$('.smooth-scroll').scrolly();
			$('.smooth-scroll-middle').scrolly({ anchor: 'middle' });

		// Wrapper.
			$wrapper.children()
				.scrollex({
					top:		'30vh',
					bottom:		'30vh',
					initialize:	function() {
						$(this).addClass('is-inactive');
					},
					terminate:	function() {
						$(this).removeClass('is-inactive');
					},
					enter:		function() {
						$(this).removeClass('is-inactive');
					},
					leave:		function() {

						var $this = $(this);

						if ($this.hasClass('onscroll-bidirectional'))
							$this.addClass('is-inactive');

					}
				});
		//tku
			$('.tku-hover').hover(function() {
				$(this).attr('src', 'images/tku-dark.jpg');
			}, function() {
				$(this).attr('src', 'images/tku.jpg');
			});

		// Items.
			$('.items')
				.scrollex({
					top:		'30vh',
					bottom:		'30vh',
					delay:		50,
					initialize:	function() {
						$(this).addClass('is-inactive');
					},
					terminate:	function() {
						$(this).removeClass('is-inactive');
					},
					enter:		function() {
						$(this).removeClass('is-inactive');
					},
					leave:		function() {

						var $this = $(this);

						if ($this.hasClass('onscroll-bidirectional'))
							$this.addClass('is-inactive');

					}
				})
				.children()
					.wrapInner('<div class="inner"></div>');

		// Gallery.
			$('.gallery')
				.wrapInner('<div class="inner"></div>')
				.prepend(skel.vars.mobile ? '' : '<div class="forward"></div><div class="backward"></div>')
				.scrollex({
					top:		'30vh',
					bottom:		'30vh',
					delay:		50,
					initialize:	function() {
						$(this).addClass('is-inactive');
					},
					terminate:	function() {
						$(this).removeClass('is-inactive');
					},
					enter:		function() {
						$(this).removeClass('is-inactive');
					},
					leave:		function() {

						var $this = $(this);

						if ($this.hasClass('onscroll-bidirectional'))
							$this.addClass('is-inactive');

					}
				})
				.children('.inner')
					//.css('overflow', 'hidden')
					.css('overflow-y', skel.vars.mobile ? 'visible' : 'hidden')
					.css('overflow-x', skel.vars.mobile ? 'scroll' : 'hidden')
					.scrollLeft(0);

			// Style #1.
				// ...

			// Style #2.
				$('.gallery')
					.on('wheel', '.inner', function(event) {

						var	$this = $(this),
							delta = (event.originalEvent.deltaX * 10);

						// Cap delta.
							if (delta > 0)
								delta = Math.min(25, delta);
							else if (delta < 0)
								delta = Math.max(-25, delta);

						// Scroll.
							$this.scrollLeft( $this.scrollLeft() + delta );

					})
					.on('mouseenter', '.forward, .backward', function(event) {

						var $this = $(this),
							$inner = $this.siblings('.inner'),
							direction = ($this.hasClass('forward') ? 1 : -1);

						// Clear move interval.
							clearInterval(this._gallery_moveIntervalId);

						// Start interval.
							this._gallery_moveIntervalId = setInterval(function() {
								$inner.scrollLeft( $inner.scrollLeft() + (5 * direction) );
							}, 10);

					})
					.on('mouseleave', '.forward, .backward', function(event) {

						// Clear move interval.
							clearInterval(this._gallery_moveIntervalId);

					});

			// team
				var team = [
					{
						text: "<h3>第一屆資工系計算機中心</h3>新創的系上組織，希望能將系上行政與目前相關的組織連結，並且提供一個資源空間，讓我們能開發新東西。<br>我擔任系記中的前端群與總負責人。", 
						img: "images/team/csiecc-photo.JPG"
					},
					{
						text: "<h3>EXD前端聚</h3>由我創立的前端方面的聚會，希望透過這個聚會能群聚學校對於這方面的同好者，彼此分享各自學習歷程。<br>目前聚會在星期四晚上分享。", 
						img: "images/team/exd-photo.jpg"
					},
					{
						text: "<h3>TiramisuTW</h3>在前端聚找到兩個有經驗的朋友，一同組成的團隊，我們會找些好玩的網頁題材來做些作品。", 
						img: "images/team/tiramisu-photo.jpg"
					}
				];

				$('.teamMember')
					.hover(function() {
						let id = $(this).attr('index');
						$('.showText')[0].innerHTML = team[id].text;
						$('.teamPhoto').attr('src', team[id].img );
					}, function() {
						/* Stuff to do when the mouse leaves the element */
					});

			// Lightbox.
				$('.gallery.lightbox')
					.on('click', 'a', function(event) {

						var $a = $(this),
							$gallery = $a.parents('.gallery'),
							$modal = $gallery.children('.modal'),
							$modalImg = $modal.find('img'),
							href = $a.attr('href');

						// Not an image? Bail.
							if (!href.match(/\.(jpg|gif|png|mp4)$/))
								return;

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Locked? Bail.
							if ($modal[0]._locked)
								return;

						// Lock.
							$modal[0]._locked = true;

						// Set src.
							$modalImg.attr('src', href);

						// Set visible.
							$modal.addClass('visible');

						// Focus.
							$modal.focus();

						// Delay.
							setTimeout(function() {

								// Unlock.
									$modal[0]._locked = false;

							}, 600);

					})
					.on('click', '.modal', function(event) {

						var $modal = $(this),
							$modalImg = $modal.find('img');

						// Locked? Bail.
							if ($modal[0]._locked)
								return;

						// Already hidden? Bail.
							if (!$modal.hasClass('visible'))
								return;

						// Lock.
							$modal[0]._locked = true;

						// Clear visible, loaded.
							$modal
								.removeClass('loaded')

						// Delay.
							setTimeout(function() {

								$modal
									.removeClass('visible')

								setTimeout(function() {

									// Clear src.
										$modalImg.attr('src', '');

									// Unlock.
										$modal[0]._locked = false;

									// Focus.
										$body.focus();

								}, 475);

							}, 125);

					})
					.on('keypress', '.modal', function(event) {

						var $modal = $(this);

						// Escape? Hide modal.
							if (event.keyCode == 27)
								$modal.trigger('click');

					})
					.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
						.find('img')
							.on('load', function(event) {

								var $modalImg = $(this),
									$modal = $modalImg.parents('.modal');

								setTimeout(function() {

									// No longer visible? Bail.
										if (!$modal.hasClass('visible'))
											return;

									// Set loaded.
										$modal.addClass('loaded');

								}, 275);

							});

	});

})(jQuery);
