define( ["Three","Texture"], function ( Three, Texture ) {
    var materials = [
        new THREE.MeshPhongMaterial({bumpMap: Texture.moon}),
        new THREE.MeshPhongMaterial({bumpMap: Texture.moon}),
        new THREE.MeshPhongMaterial({bumpMap: Texture.moon}),
        new THREE.MeshPhongMaterial({bumpMap: Texture.moon})
    ];

    // var materials = [
    //     new Three.MeshLambertMaterial( {
    //         color: 0xFF0000,
    //         shading: Three.FlatShading
    //     }),
    //     new Three.MeshLambertMaterial( {
    //         color: 0x00FF00,
    //         shading: Three.FlatShading
    //     }),
    //     new Three.MeshLambertMaterial( {
    //         color: 0x0000FF,
    //         shading: Three.FlatShading
    //     }),
    //     new Three.MeshLambertMaterial( {
    //         color: 0x00FFFF,
    //         shading: Three.FlatShading
    //     })
    // ];

    // var materials = [ 
    //     new THREE.MeshBasicMaterial({color:0xFF0000}), 
    //     new THREE.MeshBasicMaterial({color:0x00FF00}), 
    //     new THREE.MeshBasicMaterial({color:0x0000FF}), 
    //     new THREE.MeshBasicMaterial({color:0xFFFF00}), 
    //     new THREE.MeshBasicMaterial({color:0x00FFFF}), 
    //     new THREE.MeshBasicMaterial({color:0xFFFFFF}) 
    // ]; 

    return {
        sphere: new Three.MeshPhongMaterial( { bumpMap: Texture.moon } ),
        box: new Three.MeshPhongMaterial( { bumpMap: Texture.moon } ),
        dodecahedron: new Three.MeshPhongMaterial( { bumpMap: Texture.moon } ),
        icosahedron: new Three.MeshPhongMaterial( { bumpMap: Texture.moon } ),
        // tetrahedron: new Three.MeshPhongMaterial( { bumpMap: Texture.moon } )
        tetrahedron: new THREE.MeshFaceMaterial(materials)
        /*box: new Three.MeshLambertMaterial( {
            color: 0xCCCCCC,
            shading: Three.FlatShading
        }),
        dodecahedron: new Three.MeshLambertMaterial( {
            color: 0xCCCCCC,
            shading: Three.FlatShading
        }),
        icosahedron: new Three.MeshLambertMaterial( {
            color: 0xCCCCCC,
            shading: Three.FlatShading
        }),
        tetrahedron: new Three.MeshLambertMaterial( {
            color: 0xCCCCCC,
            shading: Three.FlatShading
        })*/
    };
} );
