# NCL.js
NylCanvasLibrary (NCL) is a lightweight toolbox to make canvas animations 

## Features
* Use requestAnimationFrame API when possible, if not, a setInterval.
* Provide helpers and function chaining to draw with canvas
* Plugin architecture
* Mouse and touch events handled in plugins
* ... Well, there's probably more, but the doc is coming. Please be patient and look up the code until the doc release :)


## Getting started

**1) Create a "plugin" function**

```
function MyNclPlugin() {

	//Setup is used to init variables before the loop render begins
	this.setup = function()
	{
	
	};
	
	//The (infinite) loop render. You can draw here
	this.draw = function(scene)
	{
	}
}
```

**2) In your HTML, create and empty div with an id**

```

	<div id="myanimation"></div>
	
```

**2) Load the library and hook your function**

```

	var NCL = new NylCanvasLibrary("myanimation",800,600,"canvaselementid",60);
	
	//load the plugin
	NCL.loadPlugin(new MyNclPlugin(NCL));
	NCL.setFullscreen(false);
	NCL.init();
	
```

# More details and doc to come ! (But the code is documented)

