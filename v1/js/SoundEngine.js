
var dependencies = [
	"dojo/_base/declare",
	"dojo/_base/lang",
	"js/lib/SeamlessLoop"
];

define(dependencies, function(declare, lang, SeamlessLoop){
	return declare("SoundEngine", null, {

		soundscapes : [
			{
				idx : 0,
				loops : [
					{
						id : "w02-1",
						uri : "./audio/w02-1.mp3",
						length : 61958,
						loaded : false
					}, {
						id : "w02-2",
						uri : "./audio/w02-2.mp3",
						length : 94000,
						loaded : false
					},
				]
			}, {
				idx : 1,
				loops : [
					{
						id : "w01-1",
						uri : "./audio/w01-1.mp3",
						length : 39000,
						loaded : false
					}, {
						id : "w01-2",
						uri : "./audio/w01-2.mp3",
						length : 39000,
						loaded : false
					}, {
						id : "w01-3",
						uri : "./audio/w01-3.mp3",
						length : 39000,
						loaded : false
					}
				]
			}
		],

		objects : [],

		selectedSoundscape : null,

		playing : false,
			
		constructor : function( soundscape ){

			console.log(this.declaredClass + "::" + arguments.callee.nom + "()");
			
			var module = this;
			this.selectedSoundscape = soundscape;

			var ss = module.soundscapes[soundscape];
			var idx = 0;
			ss.loops.forEach( function(loop) {
				console.log("loop: " + loop.length);
				module.objects[idx] = new SeamlessLoop();
				module.objects[idx].addUri(loop.uri, loop.length, loop.id);
				module.objects[idx].callback(lang.hitch(module, module.soundsLoaded, loop));
				module.objects[idx].__id = loop.id;
				idx += 1;
			});
		},

		soundsLoaded : function( loop ) {
			console.log("loop " + loop.id + " loaded.");
			loop.loaded = true;
			this.play();
		},

		play : function() {
			console.log(this.declaredClass + "::" + arguments.callee.nom + "()");
			var loops = this.soundscapes[this.selectedSoundscape].loops;
			loops.forEach( function(loop) {
				if ( !loop.loaded ) {
					return;
				}
			});

			if ( !this.playing ) {
				console.log("Playing");
				this.objects.forEach( function(object) {
					object.start(object.__id);
				});
				this.playing = true;
			}
		}
	});
});
