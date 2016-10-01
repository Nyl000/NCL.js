# NCL.js
NylCanvasLibrary (NCL) is a lightweight toolbox to make canvas animations 

N.B: Examples are old and a little messy. I know about that. I'll prepare some new  examples soon :)

## Features
* Use requestAnimationFrame API when possible, if not, a setInterval.
* Provide helpers and function chaining to draw with canvas
* Plugin architecture
* Mouse and touch events handled in plugins
* ... Well, there's probably more, but the doc is coming. Please be patient and look up the code until the doc release :)


## Getting started

**1) Create a "plugin" function**

```javascript
function MyNclPlugin() {

	//Setup is used to init variables before the loop render begins
	this.setup = function()
	{
	    this.position = new NCLVector2(this.NCL.mouseX, this.NCL.mouseY);
	    this.size = 20;

	};
	
	//The (infinite) loop render. You can draw here
	this.draw = function(scene)
	{
	
		this.NCL.clear();

		this.NCL.colorShape('cyan')
				.colorBorder('red')
				.square(this.position, this.size);
				
		  this.position.setX(this.NCL.mouseX);
		  this.position.setY(this.NCL.mouseY);
	}
}
```

**2) In your HTML, create an empty div with an id**

```html

	<div id="myanimation"></div>
	
```

**2) Load the library and hook your function**

```javascript

	var NCL = new NylCanvasLibrary("myanimation",800,600,"canvaselementid",60);
	
	//load the plugin
	NCL.loadPlugin(new MyNclPlugin(NCL));
	NCL.setFullscreen(false);
	NCL.init();
	
```

# API References

**Doc is under writing and is not complete for now. Please be patient**

## Render functions

###Shapes
| Function      | Arguments     | Description  |
| ------------- |:-------------| -----|
| NCL.square(startVector,size)    | **startVector** : NCLVector2<br /> **size** : number | Draw a square|
| NCL.rect(startVector,width,height)    | **startVector** : NCLVector2<br /> **width** : number<br /> **height** : number | Draw a rectangle|
| NCL.line(startVector, endVector)    | **startVector** : NCLVector2<br />**endVector** : NCLVector2<br /> | Draw a line|
| NCL.circle(radius,position)    | **radius** : number<br /> **position** : NCLVector2 | Draw a circle|
| NCL.triangle(v1,v2,v3)    | **v1** : NCLVector2<br />**v2** : NCLVector2<br />**v3** : NCLVector2<br /> | Draw a triangle|


###Utils
| Function      | Arguments     | Description  |
| ------------- |:-------------| -----|
| NCL.clear()    | none | Clear the screen|





#### More details and doc to come ! (But the code is documented)

