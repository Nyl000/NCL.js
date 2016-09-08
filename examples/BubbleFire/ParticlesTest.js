
/**
 * NylCanvasLibraryPlugin
 * Particles Generator Test By Nyl
 * @returns {MyPlugin}
 */
function ParticlesGeneratorTest() {
	this.setup = function()
	{
		this.particlesStack = [];
	};
	
	this.draw = function(scene)
	{
		NCL.clear();
		for (var i = 0; i< this.particlesStack.length; i++) {
			this.particlesStack[i].render();
			this.particlesStack[i].addLifeTick();
			if (this.particlesStack[i].lifetick >= 100) {
				this.particlesStack.splice(i, 1);
			}
		}
		if (this.particlesStack.length <= 100) {
			this.particlesStack.push(new Generator(NCL,NCL.mouseX, NCL.mouseY));
		}
	};
	
	this.onMousePress = function() {

	};
	
	this.onMouseReleased = function() {

	};	
}

function Generator(NCL, posX, posY) {
	
	this.theposX = posX;
	this.theposY = posY;
	this.rotation=NCL.random(360);
	this.size = 10;
	this.lifetick = 0;
	this.speed = NCL.random2(2,3);
	this.opacity = 0.3;

	this.render = function() {


		NCL.save();
		NCL.translate(this.theposX+(this.size/2), this.theposY+(this.size/2));
		NCL.rotate(NCL.radians(this.rotation));
		NCL.translate(-(this.theposX+(this.size/2)), -(this.theposY+(this.size/2)));
		NCL.context.globalAlpha=this.opacity;

		NCL.context.fillStyle ="orange";
		NCL.context.strokeStyle ="orange";
        NCL.applyShadow("red",20);

		NCL.circle(this.size,new NCLVector2(this.theposX,this.theposY));

		NCL.context.globalAlpha=1;

		NCL.restore();
		
		
				
	};
	
	this.addLifeTick =  function() {
		this.lifetick++;
		var randomX = NCL.random(100000);
		
		if (randomX > 50000) {
			this.theposX++;
		}
		else {
			this.theposX--;

		}
	

		this.theposY = this.theposY-this.speed;
		this.rotation++;
		if (this.size != 4) {
			this.size = this.size-0.1;
		}
		if (this.opacity >0.05) {
			this.opacity = this.opacity-0.005;
		}
	};
	
}





