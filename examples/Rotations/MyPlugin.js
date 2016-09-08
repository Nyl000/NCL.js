function RotateParticles()
{
    this.NCL = NCL;
    this.name = "RotateParticles";
    this.particleArray = [];
    this.mousePressed = false;

    //control variables
    this.rotationSpeed = 0.7;
    this.force = 10;
    this.rendermode = 3;
    this.color = "cyan";
    //end control
    this.onMousePress = function()
    {
        this.mousePressed = true;
    };

    this.onMouseReleased = function()
    {
        this.mousePressed = false;
    };
    this.setup = function()
    {
        for (var i = 0; i < 400; i++) {
            this.particleArray.push(new Particle(this.NCL, NCL.random(500), NCL.random(500), NCL.random(10)));
        }
    };
    this.draw = function()
    {
        this.NCL.clear();

        for (var i = 0; i < this.particleArray.length; i++) {
            this.particleArray[i].render(this.rotationSpeed, this.force, this.rendermode, this.color);
        }


    };
}
RotateParticles.prototype = new NCLPlugin();

function Particle(NCL, x, y, s)
{
    this.NCL = NCL;
    this.x = x;
    this.y = y;
    this.size = s;
    this.direction = Math.random() * 3;
    this.anglePlus = 0.2 + Math.random() * 0.8;
    this.angle = Math.random() * 360;
    this.dist = Math.random() * 500;
    this.coeficient = 0;
    this.rotation = 0;
    this.force = 0;
    this.center = new NCLVector2(this.NCL.mouseX, this.NCL.mouseY);
    this.freak = false;

    this.render = function(rs, force, rm, color)
    {
        switch (rm)
        {
            default:
            case "1":
                this.NCL.save().opacity(0.1).translate(this.x, this.y).colorShape(color).colorBorder(color).square(new NCLVector2(0, 0), this.size).restore();
                break;
            case "2":
                this.NCL.save().opacity(0.01).colorBorder(color).colorShape(color).triangle(this.center, new NCLVector2(this.NCL.mouseX, this.NCL.mouseY), new NCLVector2(this.x, this.y)).restore();
                break;
            case "3":
                this.NCL.save().opacity(0.05).colorBorder(color).curve(this.center, new NCLVector2(this.NCL.mouseX, this.NCL.mouseY), new NCLVector2(this.x, this.y)).restore();
                break;
            case "4":
                this.NCL.save().opacity(0.05).colorBorder(color).curve(new NCLVector2(this.x, this.y), new NCLVector2(this.NCL.mouseX, this.NCL.mouseY), this.center).restore();
                break;
        }
        this.move(rs, force);
    };

    this.move = function(rs, force)
    {
        // sourisX + cos angle * distance
        // sourisY + sin angle * distance
        // 
        // distance =  theoreme pythagore
        var movementX = Math.abs(this.NCL.pMouseX - this.NCL.mouseX);
        var movementY = Math.abs(this.NCL.pMouseY - this.NCL.mouseY);
        var movement = movementX + movementY;
        // var dist = Math.sqrt(Math.pow((this.x - this.NCL.mouseX), 2) + Math.pow((this.y - this.NCL.mouseY), 2));
        this.x = this.direction > 1 ? this.center.x + Math.cos(this.NCL.radians(this.angle)) * this.dist : this.center.x - Math.sin(this.NCL.radians(this.angle)) * this.dist;
        this.y = this.direction > 1 ? this.center.y + Math.sin(this.NCL.radians(this.angle)) * this.dist : this.center.y - Math.cos(this.NCL.radians(this.angle)) * this.dist;

        this.angle += this.anglePlus * (this.coeficient + rs);
        this.angle = this.NCL.trimAngle(this.angle);

        if (this.coeficient > 0.1)
        {
            this.coeficient -= this.coeficient / 100;
        }
        else {
            this.coeficient = 0;
        }

        if (this.dist < 0)
        {
            this.force = Math.random() * force;
            this.freak = true;
        }
        this.dist -= 2 - this.force;

        if (this.force > 0.1)
        {
            this.force -= this.force / 100;
        }
        else {
            this.force = 0;
            this.freak = false;
        }


        //move the rotation axis:
        var diffCenterX = Math.abs(this.center.x - this.mouseX);
        var diffCenterY = Math.abs(this.center.y - this.mouseY);
        if (diffCenterX >= 0.1 && thisCenterY >= 0.1)
        {
            this.center.setX(this.NCL.mouseX).setY(this.NCL.mouseY);
        }

        {

            this.center.x -= (this.center.x - this.NCL.mouseX) / 30;
            this.center.y -= (this.center.y - this.NCL.mouseY) / 30;



        }


    };
}




function ControlPlugin(NCL)
{
    this.NCL = NCL;
    var _this = this;
    this.name = "Control";
    //LOCAL PLUGIN VARIABLES

    this.setup = function()
    {
        //HOOKS THE SHYPARTICLES PLUGIN 
        this.RotateParticles = this.NCL.getPlugin("RotateParticles");

        //GENERATE CONTOLS FIELDS
        this.controlWrapper = document.createElement("div");
        this.controlWrapper.setAttribute("class", "NCLControlWrapper");

        var colorZone = document.createElement("input");
        colorZone.setAttribute("value", this.RotateParticles.color);
        colorZone.setAttribute("id", "ctrlColor");
        colorZone.setAttribute("type", "text");
        colorZone.onchange = function()
        {
            _this.RotateParticles.color = this.value;
        };
        var colorZoneLabel = document.createElement("label");
        colorZoneLabel.innerHTML = "Color";

        var forceZone = document.createElement("input");
        forceZone.setAttribute("value", this.RotateParticles.force);
        forceZone.setAttribute("id", "ctrlSize");
        forceZone.setAttribute("type", "number");
        forceZone.setAttribute("min", "0");
        forceZone.setAttribute("max", "20");
        forceZone.setAttribute("step", "0.1");

        forceZone.onchange = function()
        {
            _this.RotateParticles.force = this.value;
        };

        var forceZoneLabel = document.createElement("label");
        forceZoneLabel.innerHTML = "Force";

        var rotationZone = document.createElement("input");
        rotationZone.setAttribute("value", this.RotateParticles.rotationSpeed);
        rotationZone.setAttribute("id", "ctrlGravity");
        rotationZone.setAttribute("min", "0");
        rotationZone.setAttribute("max", 5);

        rotationZone.setAttribute("step", 0.1);

        rotationZone.setAttribute("type", "number");
        rotationZone.onchange = function()
        {
            _this.RotateParticles.rotationSpeed = this.value;
        };

        var rotationZoneLabel = document.createElement("label");
        rotationZoneLabel.innerHTML = "Rotation Speed";

        var renderZone = document.createElement("select");
        renderZone.setAttribute("value", this.RotateParticles.rendermode);
        renderZone.setAttribute("id", "ctrlRendermode");

        var renderOption1 = document.createElement("option");
        renderOption1.setAttribute("value", 1);
        renderOption1.setAttribute("selected", "true");
        renderOption1.innerHTML = "1";
        renderZone.appendChild(renderOption1);
        var renderOption2 = document.createElement("option");
        renderOption2.setAttribute("value", 2);
        renderOption2.innerHTML = "2";
        renderZone.appendChild(renderOption2);
        var renderOption3 = document.createElement("option");
        renderOption3.setAttribute("value", 3);
        renderOption3.innerHTML = "3";
        renderZone.appendChild(renderOption3);
        var renderOption4 = document.createElement("option");
        renderOption4.setAttribute("value", 4);
        renderOption4.innerHTML = "4";
        renderZone.appendChild(renderOption4);
        renderZone.onchange = function()
        {
            console.log(this.value);
            _this.RotateParticles.rendermode = this.value;
        };
        var renderZoneLabel = document.createElement("label");
        renderZoneLabel.innerHTML = "RenderMode";

        this.fpsZone = document.createElement("input");
        this.fpsZone.setAttribute("value", this.NCL.truefps);
        this.fpsZone.setAttribute("id", "ctrlFPS");
        this.fpsZone.setAttribute("type", "text");
        this.fpsZone.setAttribute("disabled", "true");



        var fpsZoneLabel = document.createElement("label");
        fpsZoneLabel.innerHTML = "FPS:";


        this.controlWrapper.appendChild(colorZoneLabel);
        this.controlWrapper.appendChild(colorZone);
        this.controlWrapper.appendChild(forceZoneLabel);
        this.controlWrapper.appendChild(forceZone);
        this.controlWrapper.appendChild(rotationZoneLabel);
        this.controlWrapper.appendChild(rotationZone);
        this.controlWrapper.appendChild(renderZoneLabel);
        this.controlWrapper.appendChild(renderZone);
        this.controlWrapper.appendChild(fpsZoneLabel);
        this.controlWrapper.appendChild(this.fpsZone);

        document.getElementById(this.NCL.element).appendChild(this.controlWrapper);



    };
    this.draw = function()
    {
        this.fpsZone.value = Math.round(this.NCL.truefps);
    };
}
ControlPlugin.prototype = new NCLPlugin();