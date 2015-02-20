define( ["Three", "Container"], function ( Three, Container ) {
    Container.innerHTML = "";
    var renderer = new Three.WebGLRenderer( { clearColor: 0x000000 } );
    renderer.sortObjects = false;
    renderer.autoClear = false;
    Container.appendChild( renderer.domElement );

    var updateSize = function () {
        renderer.setSize( Container.offsetWidth, Container.offsetHeight );
    };
    window.addEventListener( 'resize', updateSize, false );
    updateSize();

    return renderer;
} );
