NOR.VR = function($) {

	var container = EXT.select('#vr');

	var content = container.ext.select('.content');

	var logo = container.ext.select('.tt');
	var head = container.ext.select('.head');
	var sub = container.ext.select('.sub');

	var watchBtn = container.ext.select('.watch-btn');
	var htw = container.ext.select('.htw');

	if(Simplrz.touch) {
		watchBtn.innerHTML = "Watch in 360&deg;";
	}


	var fadeInDelay = NOR.Animation.MENU_SLIDE_TIME;
	if(!Simplrz.touch ) fadeInDelay += 1000;

	var tx = 0, mx = 0;
	var ty = 0, my = 0;

	var trackMouse = function(e) {
		tx = (e.pageX / window.innerWidth) * 2 - 1;
		ty = (e.pageY / window.innerHeight) * 2 - 1;
	}

	var moveTitle = function() {
		mx += (tx - mx) * 0.1;
 		content.ext.transform({ rotY: mx * 40 });
	}

	var getYTurl = function(id) {
		return 'https://www.youtube.com/watch?v=' + id;
	}

	watchBtn.ext.on('click', function() {
		if(Simplrz.touch) {
			window.open(getYTurl($.data.vrfilm.url));
		} else {
			Application.navigate.trigger("vrfilm");
		}
	});

	NOR.Animation.moveForMenu($, container);

	Application.route.on(function(c, l) {
		if(c.parts[0] == NOR.NAV_VR) {
			container.ext.show();
			// document.addEventListener('mousemove', trackMouse);
			// FrameImpulse.on(moveTitle);

			logo.style.opacity = 0;
			logo.ext.transform({ y: -20 });
			logo.ext.transition(
				{ opacity: 1, transform: { y: 0 } }, 
				NOR.Animation.FADE_IN_TIME * 2, 
				Util.cssEase.easeOut, 
				fadeInDelay
			);

			head.style.opacity = 0;
			head.ext.transform({ y: -10 });
			head.ext.transition(
				{ opacity: 1, transform: { y: 0 } }, 
				NOR.Animation.FADE_IN_TIME * 2.2, 
				Util.cssEase.easeOut, 
				fadeInDelay + 100
			);

			sub.style.opacity = 0;
			sub.ext.transform({ y:  20 });
			sub.ext.transition(
				{ opacity: 1, transform: { y: 0 } }, 
				NOR.Animation.FADE_IN_TIME * 2.4, 
				Util.cssEase.easeOut, 
				fadeInDelay + 200,
				function() {
					if(Application.route.value.parts[0] == NOR.NAV_VR) {
						// FrameImpulse.on(moveTitle);
					}
				}
			);

			htw.style.opacity = 0;
			htw.ext.transform({ y: 30 });
			htw.ext.transition(
				{ opacity: 1, transform: { y: 0 } }, 
				NOR.Animation.FADE_IN_TIME * 2.2, 
				Util.cssEase.easeOut, 
				fadeInDelay + 400
			);

		} else {
			container.ext.hide();
		}
	});
}