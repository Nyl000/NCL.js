/**
 * N.C.L (Nyl Canvas Library)
 * Wrapper and toolbox to handle canvas interactives animations.
 *
 * Author: Nyl (Loic Boucha)
 * https://github.com/Nyl000
 * https://nyl.graphics
 */


(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();



function NylCanvasLibrary(div, width, height, id, fps)
{
    var self = this;

    this.fps = fps;
    /**
     * The loaded plugin list;
     */
    this.pluginlist = {};
    /**
     * the xhtml id of the parent element.
     */
    this.element = div;
    /**
     * the xhtml id of the canvas
     */
    this.id = id;
    /**
     * the width of the canvas
     */
    this.width = width;

    /**
     * the height of the canvas
     */
    this.height = height;

    /**
     * the canvas used.
     */
    this.canvas;
    /**
     * the context (2d) canvas.
     */
    this.context;

    /**
     * the asynchronous interval function to render the canvas.
     */
    this.setinterval;

    /**
     * the mouseX position in canvas
     */
    this.mouseX = 0;

    /**
     * the mouseY position in canvas
     */
    this.mouseY = 0;

    /**
     * is the canvas fullscreen?
     */



    this.pMouseX = 0;

    this.pMouseY = 0;

    this.isFullscreen = false;

    this.timeOnPrevious = 0;

    this.truefps = 0;

    var instance = this;

    /**
     * Max Frames per Seconds.
     */
    this.MaxFPS = this.defineFPS();



    /**
     * Send mousedown event to plugins
     */
    this.onPress = function(e) {


        for (var plugin in instance.pluginlist) {

            instance.pluginlist[plugin].onMousePress && instance.pluginlist[plugin].onMousePress(e);
        }
    };


    /**
     * Send mouseup event to plugins
     */
    this.onRelease = function() {
        for (var plugin in instance.pluginlist) {
            instance.pluginlist[plugin].onMouseRelease && instance.pluginlist[plugin].onMouseRelease();

        }

    };

    this.onTouchStart = function(e) {
        for (var plugin in instance.pluginlist) {
            instance.pluginlist[plugin].onTouchStart && instance.pluginlist[plugin].onTouchStart(e);

        }
    };

    this.onTouchEnd = function(e) {
        for (var plugin in instance.pluginlist) {
            instance.pluginlist[plugin].onTouchEnd && instance.pluginlist[plugin].onTouchEnd(e);

        }
    };

    this.onTouchMove = function(e) {
        for (var plugin in instance.pluginlist) {
            instance.pluginlist[plugin].onTouchMove && instance.pluginlist[plugin].onTouchMove(e);

        }

    };


    /**
     * get the mouse position inside the canvas
     */
    this.getMousePosition = function(e) {

        if (e.offsetX) {
            self.mouseX = e.offsetX;
            self.mouseY = e.offsetY;
        }
        else if (e.layerX) {
            self.mouseX = e.layerX;
            self.mouseY = e.layerY;
        }

        for (var plugin in instance.pluginlist) {
            instance.pluginlist[plugin].onMouseMove && instance.pluginlist[plugin].onMouseMove(e);
        }

    };
}


/**
 * Init function
 */
NylCanvasLibrary.prototype.init = function() {
    var self = this;
    this.defineFPS();
    this.createCanvas();

    for (var plugin in this.pluginlist) {
        this.pluginlist[plugin].setup();
    }

    if (window.requestAnimationFrame) {
       self.draw();
    }
    else {
        this.draw();
        this.interval = setInterval((function (self) {
                return function () {
                    self.draw();
                };
            })(this),
            1 / this.MaxFPS * 1000);
    }

};


/**
 * Define the max FPS (default: 15)
 */
NylCanvasLibrary.prototype.defineFPS = function() {
    return this.fps || 15;
};

/**
 * A helper to trim angles when your angles are over 360
 * @param angle
 * @returns {number}
 */
NylCanvasLibrary.prototype.trimAngle = function(angle) {
    return angle % 360;
};

/**
 * Return the plugin instance asked
 * @param {string} pluginName
 * @returns mixed
 */
NylCanvasLibrary.prototype.getPlugin = function(pluginName) {
    return this.pluginlist[pluginName];
};


/**
 * Create the canvas into the document.
 */
NylCanvasLibrary.prototype.createCanvas = function() {
    var pTag = document.createElement("canvas");

    pTag.setAttribute("id", this.id);
    if (this.isFullscreen !== false) {
        var elem = (document.compatMode === "CSS1Compat") ?
            document.documentElement :
            document.body;

        this.height = elem.clientHeight;
        this.width = elem.clientWidth;
    }


    pTag.setAttribute("width", this.width);
    pTag.setAttribute("height", this.height);




    pTag.innerHtml = "Your browser does not support the canvas API";

    this.canvasTag = pTag;

    var selecteddiv = document.getElementById(this.element);
    selecteddiv.appendChild(pTag);



    this.canvas = document.getElementById(this.id);
    //add mouse listeners
    if (this.canvas.addEventListener) {
        this.canvas.addEventListener("mousemove", this.getMousePosition, false);
        this.canvas.addEventListener('mousedown', this.onPress, false);
        this.canvas.addEventListener('mouseup', this.onRelease, false);
        this.canvas.addEventListener("touchmove", this.onTouchMove, false);
        this.canvas.addEventListener("touchstart", this.onTouchStart, false);
        this.canvas.addEventListener("touchend", this.onTouchEnd, false);
    }
    else
    if (this.canvas.attachEvent) {
        this.canvas.attachEvent("onmousemove", this.getMousePosition);
        this.canvas.attachEvent("onmousedown", this.onPress);
        this.canvas.attachEvent("onmouseup", this.onRelease);
        this.canvas.attachEvent("touchmove", this.onTouchMove, false);
        this.canvas.attachEvent("touchstart", this.onTouchStart, false);
        this.canvas.attachEvent("touchend", this.onTouchEnd, false);

    }
    //add window listeners
    if (window.addEventListener) {
        window.addEventListener("resize", this.resize, false);
    }
    else
    if (window.attachEvent) {
        window.attachEvent("onresize", this.resize);
    }

    this.context = this.canvas.getContext("2d");

};


/**
 * Resize the window
 *
 */
NylCanvasLibrary.prototype.resize = function(e) {


    if (this.isFullscreen) {
        var elem = (document.compatMode === "CSS1Compat") ? document.documentElement : document.body;

        this.height = elem.clientHeight;
        this.width = elem.clientWidth;
        this.canvas.width = _this.width;
        this.canvas.height = _this.height;
    }
};

/**
 * Draw function. Load plugins to render.
 */
NylCanvasLibrary.prototype.draw = function() {
    var self= this;

    for (var plugin in this.pluginlist) {
        this.pluginlist[plugin].draw(this.context);
    }
    var curTime = new Date().getTime();
    this.truefps = 1000 / (curTime - this.timeOnPrevious);
    this.timeOnPrevious = curTime;
    this.pMouseX = this.mouseX;
    this.pMouseY = this.mouseY;
    if (window.requestAnimationFrame) {
        window.requestAnimationFrame(function(){
            self.draw();
        });
    }

};



/**
 * setFullscreen on/off (before init)
 */
NylCanvasLibrary.prototype.setFullscreen = function(bool) {
    this.isFullscreen = bool;
};




/**
 * Hook a plugin into the Library.
 */
NylCanvasLibrary.prototype.loadPlugin = function(plugin) {
    if (!plugin instanceof NCLPlugin)
    {
        throw "Plugin first parameter MUST be a NCL Reference";
    }
    plugin.NCL = this;
    this.pluginlist[plugin.name] = plugin;

};


/**
 * Clear the screen
 */
NylCanvasLibrary.prototype.clear = function() {
    this.context.clearRect(0, 0, this.width, this.height);
    return this;
};

/**
 * Generate  a link to print the current canvas view
 * @returns {string}
 */
NylCanvasLibrary.prototype.generateLink = function() {
    return this.canvas.toDataURL();
};

/**
 * Open a new window to download a printscreen
 */
NylCanvasLibrary.prototype.printScreen = function() {
    window.open(this.generateLink());
};

/**
 * Fill the zone with a color (background, etc..)
 * @param color
 * @returns {NylCanvasLibrary}
 */
NylCanvasLibrary.prototype.clearWithColor = function(color) {
    this.context.fillStyle = color;
    this.context.fillRect(0,0,this.width,this.height);
    return this;
};

/**
 * Draw a square.
 */
NylCanvasLibrary.prototype.square = function(v1, size) {
    if (!v1 instanceof NCLVector2)
        throw "params vector2d must be an instance of NCLVector2";
    this.context.beginPath();
    this.context.rect(v1.x, v1.y, size, size);
    this.context.fill();
    this.context.stroke();
    this.context.closePath();
    return this;
};

/**
 * Draw a rect.
 */
NylCanvasLibrary.prototype.rect = function(v1, width, height) {
    if (!v1 instanceof NCLVector2)
        throw "params vector2d must be an instance of NCLVector2";
    this.context.beginPath();
    this.context.rect(v1.x, v1.y, width, height);
    this.context.fill();
    this.context.stroke();
    this.context.closePath();
    return this;
};

/**
 * Draw a line
 * @param {NCLVector2} v1
 * @param {NCLVector2} v2
 * @returns {NylCanvasLibrary}
 */
NylCanvasLibrary.prototype.line = function(v1, v2) {
    if (!v1 instanceof NCLVector2) {
        throw "params vector2d must be an instance of NCLVector2";
    }
    if (!v2 instanceof NCLVector2) {
        throw "params vector2d must be an instance of NCLVector2";
    }

    this.context.beginPath();
    this.context.moveTo(v1.x, v1.y);
    this.context.lineTo(v2.x, v2.y);
    this.context.fill();
    this.context.stroke();
    this.context.closePath();
    return this;
};

/**
 * Draw a circle
 */
NylCanvasLibrary.prototype.circle = function(radius, vector2d) {
    if (!vector2d instanceof NCLVector2) {
        throw "params vector2d must be an instance of NCLVector2";
    }
    this.context.beginPath();
    this.context.arc(vector2d.x, vector2d.y, radius, 0 * Math.PI, 2 * Math.PI);
    this.context.stroke();
    this.context.fill();
    this.context.closePath();
    return this;
};

NylCanvasLibrary.prototype.image = function(image, vector2d, width, height ){
    if (!vector2d instanceof NCLVector2) {
        throw "params vector2d must be an instance of NCLVector2";
    }
    width = width || image.width;
    height = height || image.height;

    if (typeof width !== 'undefined' && typeof height !== 'undefined') {
        this.context.drawImage(image, vector2d.x, vector2d.y, width, height);
    }
    else {
        this.context.drawImage(image, vector2d.x, vector2d.y);
    }
    return this;

};


/**
 * Draw a circle part
 * @param radius
 * @param vector2d
 * @param startAngle
 * @param degrees
 * @returns {NylCanvasLibrary}
 */
NylCanvasLibrary.prototype.circlePart = function(radius, vector2d,startAngle, degrees) {
    var pi = degrees % 2;
    if (!vector2d instanceof NCLVector2) {
        throw "params vector2d must be an instance of NCLVector2";
    }
    this.context.beginPath();
    this.context.arc(vector2d.x, vector2d.y, radius, startAngle*Math.PI , pi * Math.PI);
    this.context.stroke();
    this.context.beginPath();

    return this;

};

/**
 * Draw a triangle
 * Documented
 */
NylCanvasLibrary.prototype.triangle = function(v1, v2, v3) {
    if (!v1 instanceof NCLVector2) {
        throw "params vector2d must be an instance of NCLVector2";
    }
    if (!v2 instanceof NCLVector2) {
        throw "params vector2d must be an instance of NCLVector2";
    }
    if (!v3 instanceof NCLVector2) {
        throw "params vector2d must be an instance of NCLVector2";
    }
    this.context.beginPath();
    this.context.moveTo(v1.x, v1.y);
    this.context.lineTo(v2.x, v2.y);
    this.context.lineTo(v3.x, v3.y);
    this.context.lineTo(v1.x, v1.y);
    this.context.stroke();
    this.context.fill();
    this.context.closePath();
    return this;
};

/**
 * Draw a text
 * @param text
 * @param font
 * @param position
 * @param align
 * Documented
 */
NylCanvasLibrary.prototype.text = function(text, font, position, align)
{
    if (!position instanceof NCLVector2) {
        throw "params vector2d must be an instance of NCLVector2";
    }
    if (typeof align != 'undefined') {
        this.context.textAlign = align;
    }
    this.context.font = font;
    this.context.fillText(text, position.x, position.y);
};

/**
 * Draw a curve
 * Documented
 */
NylCanvasLibrary.prototype.curve = function(location_origin, location_end, location_center) {
    if (location_origin instanceof NCLVector2 && location_end instanceof NCLVector2 && location_center instanceof NCLVector2) {
        this.context.beginPath();
        this.context.moveTo(location_origin.x, location_origin.y);
        this.context.quadraticCurveTo(location_center.x, location_center.y, location_end.x, location_end.y);
        this.context.stroke();
        this.context.closePath();
    }
    return this;
};


NylCanvasLibrary.prototype.opacity = function(opacity) {
    this.context.globalAlpha = opacity;
    return this;
};

NylCanvasLibrary.prototype.clip = function() {
    this.context.clip();
    return this;
};


NylCanvasLibrary.prototype.composite = function(operation) {
    this.context.globalCompositeOperation = operation;
    return this;
};

NylCanvasLibrary.prototype.getOperations = function(){
    return {
        source_atop : "source-atop",
        source_in : "source-in",
        source_out : "source-out",
        source_over : "source_over",
        destination_atop : "destination-atop",
        destination_in : "destination-in",
        destination_out : "destination-out",
        destination_over : "destination_over",
        lighter : "lighter",
        darker : "darker",
        xor : "xor",
        copy : "copy"
    }
};



/**
 * generate a random number
 */
NylCanvasLibrary.prototype.random = function(number) {
    return Math.floor(Math.random() * (number + 1));
};

/**
 * generate a random number between two numbers
 */
NylCanvasLibrary.prototype.random2 = function(number1, number2) {
    return Math.floor(Math.random() * number2) + number1;
};


/**
 * Shadow integration (will slow animations if used over a lot of layers and combined to opacity)
 */
NylCanvasLibrary.prototype.applyShadow = function(color, blur, XOffset, YOffset) {

    this.context.shadowColor = color;

    if (typeof(blur != 'undefinded'))
    {
        this.context.shadowBlur = blur;
    }
    if (typeof(XOffset != 'undefinded'))
    {
        this.context.shadowOffsetX = XOffset;
    }
    if (typeof(YOffset != 'undefinded'))
    {
        this.context.shadowOffsetY = YOffset;
    }
    return this;
};

/**
 * Get the radian of an angle
 */
NylCanvasLibrary.prototype.radians = function(angle) {
    return angle * Math.PI / 180;
};

/**
 * apply a rotation
 */
NylCanvasLibrary.prototype.rotate = function(radian) {
    this.context.rotate(radian);
    return this;
};

/**
 * apply a rotation around the location
 */
NylCanvasLibrary.prototype.pointRotate = function(radian, x, y) {

    var v = new NCLVector2(x,y);

    if (x instanceof NCLVector2) {
        v = x;
    }
    this.context.translate(v.getX(), v.getY());
    this.context.rotate(radian);
    this.context.translate(-v.getX(), -v.getY());

    return this;
};

/**
 * Color the context
 * @param {string} color
 * @returns {NylCanvasLibrary}
 */
NylCanvasLibrary.prototype.colorShape = function(color) {
    this.context.fillStyle = color;
    return this;
};

NylCanvasLibrary.prototype.colorBorder = function(color) {
    this.context.strokeStyle = color;
    return this;
};

/**
 * apply a scale
 */
NylCanvasLibrary.prototype.scale = function(proportionwidth, proportionheight) {
    proportionwidth = proportionwidth / 100;
    proportionheight = proportionheight / 100;
    this.context.scale(proportionwidth, proportionheight);
    return this;
};

NylCanvasLibrary.prototype.lineWidth = function(width) {
    this.context.lineWidth = width;
    return this;

};
NylCanvasLibrary.prototype.setAntialiasing = function(bool) {

    this.context.imageSmoothingEnabled =  bool;
    return this;
};

/**
 * apply a translation
 */
NylCanvasLibrary.prototype.translate = function(xOffset, yOffset) {
    this.context.translate(xOffset, yOffset);
    return this;
};

/**
 * save the context
 */
NylCanvasLibrary.prototype.save = function() {
    this.context.save();
    return this;
};

/**
 * save the context
 */
NylCanvasLibrary.prototype.restore = function() {
    this.context.restore();
    return this;
};





var NCLPlugin = function()
{
    this.NCL = arguments[0];
    this.name = "unknow";
    this.version = 0.1;
};

NCLPlugin.prototype.setup = function() {};
NCLPlugin.prototype.draw = function() {};
NCLPlugin.prototype.onMousePress = function() {};
NCLPlugin.prototype.onMouseReleased = function() {};



/**
 * A simple 2D Location object
 * @param x
 * @param y
 * @returns {NCLVector2}
 */
function NCLVector2(x, y) {

    this.x = x;
    this.y = y;
}

NCLVector2.prototype.setX = function(newx) {
    this.x = newx;
    return this;
};
NCLVector2.prototype.setY = function(newy) {
    this.y = newy;
    return this;
};

