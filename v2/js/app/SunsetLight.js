
define( ["Three"], function( Three ) {

    function SunsetLight() {
        this.container = new Three.Object3D();
        var light = new Three.AmbientLight( 0x080808 );
        this.container.add( light );
        light = new Three.DirectionalLight( 'midnightblue', 1 );
        light.position.set(5,1,0);
        this.container.add( light );
        light = new Three.DirectionalLight( 'darkred', 1.5 );
        this.container.add( light );
    }

    SunsetLight.prototype.setIntensity = function( intensity_ ) {
        this.container.children[1].intensity = intensity_;
        this.container.children[2].intensity = intensity_;
    };

    SunsetLight.prototype.getLight = function() {
        return this.container;
    };

    return SunsetLight;
});