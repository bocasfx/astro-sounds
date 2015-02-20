
define( ["SeamlessLoop", "Loop"], function ( SeamlessLoop, Loop ) {
	function SoundEngine( obj, callback, gnrtr ) {
		var self = this;
		this.soundscape = Loop[obj];
		this.seamlessLoops = [];
		this.playing = false;
		this.playCallback = callback;
		this.generator = gnrtr;
		this._volume = 0;
		
		var idx = 0;
		this.soundscape.loops.forEach( function(loop) {
			self.seamlessLoops[idx] = new SeamlessLoop();
			self.seamlessLoops[idx].addUri(loop.uri, loop.length, loop.id);
			self.seamlessLoops[idx].callback(self.soundLoaded, [loop, self]);
			self.seamlessLoops[idx].__id = loop.id;
			idx += 1;
		});
	}

	SoundEngine.prototype.soundLoaded = function( args ) {
		var loop = args[0];
		var self = args[1];
		loop.loaded = true;
		self.ready(self);
	}

	SoundEngine.prototype.ready = function( self ) {
		this.soundscape.loops.forEach( function(loop) {
			if ( !loop.loaded ) {
				return;
			}
		});

		self.playCallback.call(self.generator);
	}

	SoundEngine.prototype.play = function() {
		if ( !this.playing ) {
			this.seamlessLoops.forEach( function(seamlessLoop) {
				seamlessLoop.start(seamlessLoop.__id);
			});
			this.playing = true;
		}
	};

	SoundEngine.prototype.stop = function() {
		if ( this.playing ) {
			this.seamlessLoops.forEach( function(seamlessLoop) {
				seamlessLoop.stop();
			});
			this.playing = false;
		}
	};

	SoundEngine.prototype.volume = function( vol ) {
		if (typeof vol != 'undefined') {
			this._volume = vol;
			for( var sl in this.seamlessLoops ) {
				this.seamlessLoops[sl].volume(this._volume);
			}
		}

		return this._volume;
	}

	SoundEngine.prototype.isPlaying = function() {
		return this.playing;
	}

	return SoundEngine;
});
