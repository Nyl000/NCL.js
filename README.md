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

# More details and doc to come ! (But the code is documented)

