// Start the app
require( ['Detector', 'App', 'Container'], function ( Detector, App, Container ) {
	if ( ! Detector.webgl ) {
		Detector.addGetWebGLMessage();
		Container.innerHTML = "";
	}

	// Initialize our App and start the animation loop (animate is expected to call itself)
	App.init();
	App.animate();
});
