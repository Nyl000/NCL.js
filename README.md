# NCL.js
NylCanvasLibrary (NCL) is a lightweight toolbox to make canvas animations 

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

