/**
 * SeamlessLoop.js 2.0 - Reproduces seamless loops on HTML5/Javascript
 * https://github.com/Hivenfour/SeamlessLoop
 * 
 * Copyright (c) 2012 Main Software,
 * Written by Darío Tejedor Rico. Contact mail: hivenfour@gmail.com
 * The source code is freely distributable under the terms of LGPL license.
 * License details at http://www.gnu.org/licenses/lgpl-3.0.txt
 * 
 * USAGE:
 * - Create the Seamlessloop object
 * 		var loop = new SeamlessLoop();
 * 
 * - Add as many sounds as you will use, providing duration in miliseconds
 * (sounds must be pre-loaded if you want to update the loop without gaps)
 * 		loop.addUri(uri, length, "sound1");
 * 		loop.addUri(uri, length, "sound2");
 * ...
 * 
 * - Establish your callback function that will be called when all sounds are pre-loaded
 * 		loop.callback(soundsLoaded);
 * 
 * - Start reproducing the seamless loop:
 * 		function soundsLoaded() {
 * 			var n = 1;
 * 			loop.start("sound" + n);
 * 		};
 * 
 * - Update the looping sound, you can do module
 * synchronously (waiting the loop to finish)
 * or asynchronously (change sound immediately):
 * 		n++;
 * 		loop.update("sound" + n, false);
 * 
 * - Modify the seamless loop volume:
 * 		loop.volume(0.5);
 * 		loop.volume(loop.volume() + 0.1);
 * 
 * - Stop the seamless loop:
 * 		loop.stop();
 */


var dependencies = [
	"dojo/_base/declare"
];

define(dependencies, function(declare){
	return declare("SeamlessLoop", null, {

		constructor : function() {
			var module = this;
			module.is = {
					  ff: Boolean(!(window.mozInnerScreenX == null) && /firefox/.test( navigator.userAgent.toLowerCase() )),
					  ie: Boolean(document.all && !window.opera),
					  opera: Boolean(window.opera),
					  chrome: Boolean(window.chrome),
					  safari: Boolean(!window.chrome && /safari/.test( navigator.userAgent.toLowerCase() ) && window.getComputedStyle && !window.globalStorage && !window.opera)
					};
			console.debug("ff: " + module.is.ff);
			console.debug("ie: " + module.is.ie);
			console.debug("opera: " + module.is.opera);
			console.debug("chrome: " + module.is.chrome);
			console.debug("safari: " + module.is.safari);
			module._total = 0;
			module._load = 0;
			module.cb_loaded;
			module.cb_loaded_flag = new Boolean();
			module.timeout;
			module.playDelay = -30;
			module.stopDelay = 30;
			if(module.is.chrome) module.playDelay = -25;
			if(module.is.chrome) module.stopDelay = 25;
			if(module.is.ff) module.playDelay = -25;
			if(module.is.ff) module.stopDelay = 85;
			if(module.is.opera) module.playDelay = 5;
			if(module.is.opera) module.stopDelay = 0;
			console.debug(module.playDelay + ", " + module.stopDelay);
			module.next = 1;
			module.audios = new Array();
			module.actual = new Array();
			module.dropOld = new Boolean();
			module.old;
			module._volume = 1;
			
			var t = module;
			module._eventCanplaythrough = function(audBool) {
				if(audBool == false) {
					audBool = true;
					t._load++;
					if(t._load == t._total) {
						t.loaded = true;
						if(t.cb_loaded_flag == true) {
							t.cb_loaded();
							t.cb_loaded_flag = false;
						}
					}
				}
			};
			
			module._eventPlaying = function(audMute) {
				setTimeout(function() {
					audMute.pause();
					try {
						audMute.currentTime = 0;
					} catch (e){console.debug(e.message);};
				}, t.stopDelay);
				
				if(t.dropOld == true) {
					setTimeout(function() {
						if(t.old.paused == false) {
							t.old.pause();
							try {
								t.old.currentTime = 0;
							} catch (e){console.debug(e.message);};
						}
					}, t.stopDelay);
					t.dropOld = false;
				}
			};

			module._eventEnded = function(aud) {
				aud.volume = module._volume;
			};

			module.doLoop = function() {
				var key = (module.next == 1 ? "_1" : "_2");
				var antikey = (module.next == 1 ? "_2" : "_1");
				
				var t = module;
				module.timeout = setTimeout(function() {t.doLoop();}, module.actual._length + module.playDelay);
				
				if(module.is.opera) module.actual[antikey].pause();
				
				module.actual[key].play();
				module.next *= -1;
			};
			
			module.isLoaded = function() {
				return Boolean(module._load == module._total);
			};
		},

		start : function(id) {
			var module = this;
			if(id != "") {
				module.actual = module.audios[id];
			}
			module.doLoop();
		},

		volume : function(vol) {
			var module = this;
			if(typeof vol != "undefined") {
				module.actual._1.volume = vol;
		        	module.actual._2.volume = vol;
				module._volume = vol;
			}
			
			return vol;
		},

		stop : function() {
			var module = this;
			clearTimeout(module.timeout);
			module.actual._1.currentTime = 0;
			module.actual._1.pause();
			module.actual._2.currentTime = 0;
			module.actual._2.pause();
		},

		callback : function(cb_loaded) {
			var module = this;
			module.cb_loaded = cb_loaded;
			if(module.isLoaded() == true) cb_loaded();
			else module.cb_loaded_flag = true;
		},

		update : function(id, sync) {
			var module = this;
			//var key = (module.next == 1 ? "_1" : "_2");
			var antikey = (module.next == 1 ? "_2" : "_1");

			module.old = module.actual[antikey];
			module.actual = module.audios[id];
			if(sync == false) {
				if(module.old.paused == false) {
					module.dropOld = true;
					if(module.is.opera) module.old.pause();
				}
				clearTimeout(module.timeout);
				module.doLoop();
			}
		},

		addUri : function(uri, length, id) {
			var module = this;
			module.audios[id] = new Array();
			module.audios[id]._length = length;
			var t = module;
			module.audios[id]._1_isLoaded = new Boolean();
			module.audios[id]._2_isLoaded = new Boolean();
			module.audios[id]._1 = new Audio(uri);
			module.audios[id]._2 = new Audio(uri);
			module._total++;
			module.audios[id]._1.addEventListener("canplaythrough", function() {t._eventCanplaythrough(t.audios[id]._1_isLoaded);});
			module.audios[id]._2.addEventListener("canplaythrough", function() {t._eventCanplaythrough(t.audios[id]._2_isLoaded);});
			module.audios[id]._1.addEventListener("playing", function() {t._eventPlaying(t.audios[id]._2);});
			module.audios[id]._2.addEventListener("playing", function() {t._eventPlaying(t.audios[id]._1);});
			module.audios[id]._1.addEventListener("ended", function() {t._eventEnded(t.audios[id]._1);});
			module.audios[id]._2.addEventListener("ended", function() {t._eventEnded(t.audios[id]._2);});
			module.audios[id]._1.load();
			module.audios[id]._2.load();
			module.audios[id]._1.volume = module._volume;
			module.audios[id]._2.volume = module._volume;
		}
	});
});

