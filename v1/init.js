require({
	"baseUrl" : "/",
	"packages" : [
		{ "name" : "dojo",  "location" : "js/lib/dojo"  },
		{ "name" : "dijit", "location" : "js/lib/dijit" },
		{ "name" : "dojox", "location" : "js/lib/dojox" },
		{ "name" : "cs",    "location" : "js/cs"}
	],
	shim: {
		// --- Use shim to mix together all THREE.js subcomponents
		'threeCore': { exports: 'THREE' },
		'TrackballControls': { deps: ['threeCore'], exports: 'THREE' },
		// --- end THREE sub-components
		'detector': { exports: 'Detector' },
		'stats': { exports: 'Stats' }
	},
	// Third party code lives in js/lib
	paths: {
		// --- start THREE sub-components
		three: '../lib/three',
		threeCore: '../lib/three.min',
		TrackballControls: '../lib/controls/TrackballControls',
		// --- end THREE sub-components
		detector: '../lib/Detector',
		stats: '../lib/stats.min',
		// Require.js plugins
		text: '../lib/text',
		shader: '../lib/shader',
		// Where to look for shader files
		shaders: '../shaders'
	}
}, ["js/app"], function(Application){
	var app = new Application();
});
