define( ["Three"], function ( Three ) {
	return {
		sphere: new Three.SphereGeometry( 200, 64, 64 ),
		box: new Three.BoxGeometry(200, 200, 200),
		// torusKnot: new Three.TorusKnotGeometry(100, 40, 32*8, 32),
		dodecahedron: new Three.DodecahedronGeometry(200, 0),
		icosahedron: new Three.IcosahedronGeometry(200, 0),
		tetrahedron: new Three.TetrahedronGeometry(200, 0)
	};
} );
