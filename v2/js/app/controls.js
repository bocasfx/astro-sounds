define( ["Three", "Camera", "Container"], function( Three, Camera, Container ) { 
	var controls = new Three.FlyControls( Camera, Container );
	controls.movementSpeed = 100;
	controls.domElement = Container;
	controls.rollSpeed = Math.PI / 16;
	controls.autoForward = false;
	controls.dragToLook = true;
	return controls;
} );
