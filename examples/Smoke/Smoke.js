function Smoke() {


    this.setup = function()
    {

        this.name = "Smoke";

        this.x = this.NCL.mouseX;
        this.y = this.NCL.mouseY;

        this.generatorSmoke = new SmokeGenerator();


    };


    this.draw = function() {

        this.NCL.clear();
        this.generatorSmoke.render(this.NCL, this.NCL.mouseX-50, this.NCL.mouseY-80);

    };
}





function SmokeGenerator() {


    this.particles = [];
    this.prevTime;
    this.deltaTime;

    this.imageSmoke = new Image();
    this.imageSmoke.src = 'smoke.png';

}

SmokeGenerator.prototype.process = function(){




    var time = new Date().getTime();

    this.prevTime = this.prevTime || new Date().getTime();
    var deltaTime = time - this.prevTime;
    if (deltaTime  > 100 ) {
        this.particles.push({
            opacity: 0,
            y : this.y,
            x: this.x+Math.floor(Math.random() * 50) - 50,
            fade : false,
            speed : 1+Math.random()*2,
            size:  Math.floor(Math.random() * 120) + 80
        });
        this.prevTime = time;
    }
};

SmokeGenerator.prototype.render = function(scene, x, y) {
    this.x = x;
    this.y = y;


    for (var i =0; i < this.particles.length; i++ ) {
        var particle = this.particles[i];
        if (particle.fade) {

            particle.opacity -= 0.0002;
        }
        else
        {
            particle.opacity += 0.011;
        }
        particle.y -= 0.5*particle.speed*1.2;
        if (particle.opacity > 0.2) {
            particle.fade = true;
        }


        if (particle.opacity <= 0) {
            this.particles.splice(i, 1);
        }
        else {
            scene.save()
                .colorBorder('rgba(255,255,255,0')
                .colorShape('rgba(255,255,255,'+particle.opacity+')')
                .opacity(particle.opacity)
                .image(this.imageSmoke, new NCLVector2(particle.x,particle.y), particle.size , particle.size)
                .restore();

        }
    }

    this.process();

};



