
define( ["Three"], function( Three ) {

    function ThreePointLight() {
        this.container   = new Three.Object3D();

        var light = new Three.AmbientLight(0x101010);
        light.name = 'Ambient light';
        this.container.add(light);

        light = new Three.DirectionalLight('white', 0.225);
        light.position.set(2.6,1,3);
        light.name = 'Back light';
        this.container.add(light);

        light = new Three.DirectionalLight('white', 0.375);
        light.position.set(-2, -1, 0);
        light.name = 'Key light';
        this.container.add(light);

        light = new Three.DirectionalLight('white', 0.75);
        light.position.set(3, 3, 2);
        light.name = 'Fill light';
        this.container.add(light);
    }

    ThreePointLight.prototype.setIntensity = function( intensity_ ) {
        this.container.children[1].intensity = intensity_;
        this.container.children[2].intensity = intensity_;
        this.container.children[3].intensity = intensity_;
    };

    ThreePointLight.prototype.getLight = function() {
        return this.container;
    };

    return ThreePointLight;
});