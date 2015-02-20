define( ["Three"], function ( Three ) {
	var texturePath = "js/textures/";
	return {
		grass: Three.ImageUtils.loadTexture( texturePath + "grass.png" ),
		moon: Three.ImageUtils.loadTexture( texturePath + "moon.png" )
	};
} );
