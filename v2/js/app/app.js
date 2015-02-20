define( ["Camera", "Controls", "Generator", "Light", "Objects", "Renderer", "Scene", "Three", "TweenLite", "Container"],
function ( Camera, Controls, Generator, Light, Objects, Renderer, Scene, Three, TweenLite, Container) {
    var app = {

        generators: [],
        volume: 0,
        clock: null,
        fadeParams: { volume: 0, lightIntensity: 0 },
        camPosition: { x:0, y:0, z:0}, 
        camLookAt: {x:0, y:0, z:0},
        flyToIdx: null,
        easeDuration: 1,
        rotation: 0,

        init: function () {
            for (var i in Objects) {
                var obj = Objects[i];
                var generator = new Generator(obj);
                app.generators.push(generator);
                app.clock = new Three.Clock();
            }

            var tween = new TweenLite.to( app.fadeParams, 5, { volume: 1, lightIntensity: 1, onUpdate: app.fadeIn } );

            app.generateStars();

            // Set the canvas' size.
            Container.children[0].style.width = window.innerWidth + "px";
            Container.children[0].style.height = window.innerHeight + "px";

            window.onkeyup = function(e) {
               var key = e.keyCode ? e.keyCode : e.which;

               if (key >= 49 && key <= 53 ) {
                    app.flyToIdx = key - 49;
                    app.resetCam();
               }
            }
        },

        animate: function ( nowMsec ) {
            window.requestAnimationFrame( app.animate );

            for (var g in app.generators) {
                app.generators[g].rotate();
                var dVector = new Three.Vector3();
                dVector.subVectors(Camera.position, app.generators[g].mesh.position);
                app.generators[g].distance = dVector.length();
                app.generators[g].updateVolume();
            }

            var delta = app.clock.getDelta();
            Controls.update( delta );
            app.camPosition.x = Controls.object.position.x;
            app.camPosition.y = Controls.object.position.y;
            app.camPosition.z = Controls.object.position.z;

            Camera.rotation.z = app.rotation;
            app.rotation += 0.0005;

            Renderer.render( Scene, Camera );
        },

        fadeIn: function() {
            Light.setIntensity(app.fadeParams.lightIntensity);
        },

        generateStars: function() {
            // stars

            var i;
            var r = 6371;
            var starsGeometry = [ new THREE.Geometry(), new THREE.Geometry() ];

            for ( i = 0; i < 250; i ++ ) {

                var vertex = new THREE.Vector3();
                vertex.x = Math.random() * 2 - 1;
                vertex.y = Math.random() * 2 - 1;
                vertex.z = Math.random() * 2 - 1;
                vertex.multiplyScalar( r );

                starsGeometry[ 0 ].vertices.push( vertex );

            }

            for ( i = 0; i < 1500; i ++ ) {

                var vertex = new THREE.Vector3();
                vertex.x = Math.random() * 2 - 1;
                vertex.y = Math.random() * 2 - 1;
                vertex.z = Math.random() * 2 - 1;
                vertex.multiplyScalar( r );

                starsGeometry[ 1 ].vertices.push( vertex );

            }

            var stars;
            var starsMaterials = [
                new THREE.PointCloudMaterial( { color: 0x555555, size: 2, sizeAttenuation: false } ),
                new THREE.PointCloudMaterial( { color: 0x555555, size: 1, sizeAttenuation: false } ),
                new THREE.PointCloudMaterial( { color: 0x333333, size: 2, sizeAttenuation: false } ),
                new THREE.PointCloudMaterial( { color: 0x3a3a3a, size: 1, sizeAttenuation: false } ),
                new THREE.PointCloudMaterial( { color: 0x1a1a1a, size: 2, sizeAttenuation: false } ),
                new THREE.PointCloudMaterial( { color: 0x1a1a1a, size: 1, sizeAttenuation: false } )
            ];

            for ( i = 10; i < 30; i ++ ) {

                stars = new THREE.PointCloud( starsGeometry[ i % 2 ], starsMaterials[ i % 6 ] );

                stars.rotation.x = Math.random() * 6;
                stars.rotation.y = Math.random() * 6;
                stars.rotation.z = Math.random() * 6;

                s = i * 10;
                stars.scale.set( s, s, s );

                stars.matrixAutoUpdate = false;
                stars.updateMatrix();

                Scene.add( stars );

            }
        },

        flyTo: function() {

            var tween1 = new TweenLite.to( app.camPosition, app.easeDuration, { 
                x: app.generators[app.flyToIdx].mesh.position.x,
                y: app.generators[app.flyToIdx].mesh.position.y,
                z: app.generators[app.flyToIdx].mesh.position.z + 1000,
                ease: Power2.easeInOut
            });

            var tween2 = new TweenLite.to( app.camLookAt, app.easeDuration, {
                x: app.generators[app.flyToIdx].mesh.position.x,
                y: app.generators[app.flyToIdx].mesh.position.y,
                z: app.generators[app.flyToIdx].mesh.position.z,
                onUpdate: app.updateCam,
                ease: Power2.easeInOut
            });
            
        },

        updateCam: function() {
            Camera.position.set(app.camPosition.x, app.camPosition.y, app.camPosition.z);
            var lookAt = new Three.Vector3(app.camLookAt.x, app.camLookAt.y, app.camLookAt.z)
            Camera.lookAt(lookAt);
        },

        resetCam : function() {

            var cp = app.camPosition;
            if (cp.x === 0 && cp.y === 0 && cp.z === 10000) {
                app.flyTo();
                return;
            }

            var tween1 = new TweenLite.to( app.camLookAt, app.easeDuration, { 
                x: 0,
                y: 0,
                z: 0,
                ease: Power2.easeInOut
            });
            
            var tween2 = new TweenLite.to( app.camPosition, app.easeDuration, {
                x: 0,
                y: 0,
                z: 10000,
                onUpdate: app.updateCam,
                onComplete: app.flyTo,
                ease: Power2.easeInOut
            });
        }
    };

    return app;
} );
