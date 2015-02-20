define( ["Three", "Container"], function ( Three, Container ) {
	// var camera = new Three.PerspectiveCamera( 90, 1, 1, 50000 );
	var camera = new Three.PerspectiveCamera( 25, window.innerWidth / window.innerHeight, 50, 1e7 );
	camera.position.z = 15000;

	var updateSize = function () {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	};
	window.addEventListener( 'resize', updateSize, false );
	updateSize();

	return camera;
} );
