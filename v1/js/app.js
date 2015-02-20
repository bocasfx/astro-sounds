

var dependencies = [
	"dojo/_base/declare",	
	"js/SoundEngine"
];

define(dependencies, function(declare, SoundEngine, three){
	return declare("app", null, {

		version : "1.0",

		soundEngine : {},
		
		constructor : function(){
			console.log(this.declaredClass + "::" + arguments.callee.nom + "()");
						
			var module = this;
			soundEngine = new SoundEngine(1);
		}
	});
});
