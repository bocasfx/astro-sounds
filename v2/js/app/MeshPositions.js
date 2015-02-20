define( ["Three"], function( Three ) {
	return {
		sphere 		 : new Three.Vector3(0, 		0, 		0),
		box		 	 : new Three.Vector3(2000, 		0, 		0),
		dodecahedron : new Three.Vector3(-2000, 	0, 		0),
		icosahedron  : new Three.Vector3(0, 		2000, 	0),
		tetrahedron  : new Three.Vector3(0, 		-2000, 	0),
	};
});