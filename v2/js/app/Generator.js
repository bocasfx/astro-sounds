
define( ["Geometry", "Material", "MeshPositions", "Scene", "SoundEngine", "Three"], function( Geometry , Material, MeshPositions, Scene, SoundEngine, Three) {

    function Generator( obj ) {
        this.soundsLoaded = false;
    	this.mesh = new Three.Mesh( Geometry[obj], Material[obj] );
        this.mesh.position.set( MeshPositions[obj].x, MeshPositions[obj].y, MeshPositions[obj].z );
        Scene.add( this.mesh );
        this.soundEngine = null;
        this.initSound( obj );
        this.distance = 1000;
        this.maxDistance = 2000;
    }

    Generator.prototype.initSound = function( obj ) {
        this.soundEngine = new SoundEngine(obj, this.soundLoadedCallback, this);
    };

    Generator.prototype.soundLoadedCallback = function() {
        this.soundsLoaded = true;
    }

    Generator.prototype.mesh = function( obj ) {
    	if (typeof obj != 'undefined' ) {
    		this.mesh = obj;
    	}

    	return this.mesh;
    };

    Generator.prototype.soundEngine = function( obj ) {
    	if (typeof obj != 'undefined' ) {
    		this.soundEngine = obj;
    	}
    	return this.soundEngine;
    };

    Generator.prototype.rotate = function() {
        this.mesh.rotation.x += 0.0005;
        this.mesh.rotation.y += 0.001;
    };

    Generator.prototype.volume = function( vol ) {
        return this.soundEngine.volume(vol);
    };

    Generator.prototype.updateVolume = function() {
        if ( this.soundsLoaded ) {
            if (this.distance >= this.maxDistance) {
                this.volume(0);
                this.soundEngine.stop();
            } else {
                if ( !this.soundEngine.isPlaying() ) {
                    this.soundEngine.play();
                }
                var vol = this.distance / this.maxDistance;
                this.volume(1 - vol);

            }
        }
    }

    Generator.prototype.xRotation = function() {
        return this.mesh.rotation._x;
    }

    return Generator;
});