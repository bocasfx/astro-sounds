define( ["Scene", "SunsetLight", "ThreePointLight"], function ( Scene, SunsetLight, ThreePointLight ) {
	// var light = new THREE.DirectionalLight( 0xAAAAAA );
	// light.position.set( 300, 300, 100 );
	// Scene.add( light );

	// var light = new ThreePointLight();
	// Scene.add(light.getLight());

	var light = new SunsetLight();
	Scene.add(light.getLight());

	return light;
} );
