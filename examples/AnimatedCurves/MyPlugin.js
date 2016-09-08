
/**
 * ParticlesCurved Test by Nyl000
 * @returns {MyPlugin}
 */
function MyPlugin() {
	this.setup = function()
	{
		NCL = parent.NCL;
		this.ItemStack = [];
		this.mousePressed = false;
	};
	
	this.draw = function(scene)
	{
		NCL.clear();
		
		if (this.ItemStack.length <= 100) 
		{
			this.ItemStack.push(new CurvedParticle(NCL,NCL.mouseX,NCL.mouseY));

		}
		
		for (i=0; i < this.ItemStack.length; i++) 
		{
			this.ItemStack[i].render();
			if (this.ItemStack[i].lifetick >= 100)
			{
				this.ItemStack.splice(i, 1);
			}
		}
	};
	
	this.onMousePress = function() {
		this.mousePressed = true;
	};
	
	this.onMouseReleased = function() {
		this.mousePressed = false
	};	
}

function CurvedParticle(NCL,x,y) {
	
	this.opacity = 0.4;
	
	this.location1 = new NCLVector2(x,y);
	this.location2 = new NCLVector2(x,y);
	this.location3 = new NCLVector2(x,y);

	this.lifetick = 0;
	this.size = 10;
	this.speed = NCL.random(5);
	this.speed2 = NCL.random2(3,4);
	this.speed3 = NCL.random2(1,2);
	this.randomdirection = NCL.random(20000);
	this.randomdirection2 = NCL.random(20000);
	this.randomdirection3 = NCL.random(20000);

	this.render = function()
	{
		this.lifetick++;
		NCL.context.strokeStyle="cyan";
		NCL.context.globalAlpha=this.opacity;
		NCL.curve(this.location1,this.location2,this.location3);
		
		if (this.size > 0.5) {
			this.size = this.size-0.1;
		}
		if (this.opacity > 0.05) {
			this.opacity = this.opacity -0.005;
		}
		if (this.randomdirection3 < 10000) {
			this.location2.setY(this.location2.y-this.speed2);
		}
		else {
			this.location2.setY(this.location2.y+this.speed2);

		}
		
		if (this.randomdirection2 < 10000) {
			this.location2.setX(this.location2.x-this.speed3);
		}
		else {
			this.location2.setX(this.location2.x+this.speed3);

		}

		if (this.randomdirection < 10000) {
			this.location3.setX(this.location3.x-this.speed3);
		}
		else {
			this.location3.setX(this.location3.x+this.speed3);
		}

	}
	
	
}



