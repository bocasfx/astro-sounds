
var require = {
    baseUrl:                'js/app',
    shim: {
        ThreeCore:          { exports: 'THREE' },
        FlyControls:        { deps: ['ThreeCore'], exports: 'THREE' },
        Detector:           { exports: 'Detector' },
        SeamlessLoop:       { exports: 'SeamlessLoop'}
    },
    paths: {
        Three:              '../lib/three',
        ThreeCore:          '../lib/three.min',
        FlyControls:        '../lib/controls/FlyControls',
        Detector:           '../lib/Detector',
        text:               '../lib/text',
        shader:             '../lib/shader',
        shaders:            '../shaders',
        SeamlessLoop:       '../lib/SeamlessLoop',
        TweenLite:          "../lib/TweenLite"
    }
};
