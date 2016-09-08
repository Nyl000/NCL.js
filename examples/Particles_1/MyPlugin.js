
/**
 * ParticlesCurved Test by Nyl000
 * @returns {MyPlugin}
 */
function ShyParticles() {


    this.obj = [];


    this.setup = function()
    {
        for (var i = 0; i < 800; i++)
        {
            this.obj.push(new object(this.NCL, 0 + this.NCL.random(1000), 0 + this.NCL.random(1000), 0, 0));
        }
    };

    this.draw = function(scene)
    {
        this.NCL.clear();
        for (var i = 0; i < this.obj.length; i++)
        {
            this.obj[i].render();
        }

        this.moveWorld();
    };

    this.onMousePress = function() {
    };

    this.onMouseReleased = function() {
    };

    this.moveWorld = function()
    {
        for (var i = 0; i < this.obj.length; i++)
        {
            this.obj[i].move();
        }

    };
}


var object = function(ncl, x, y, vX, vY)
{
    var NCL = ncl;
    var x = x;
    var y = y;
    var size = 2;
    var velocityX = vX;
    var velocityY = vY;
    var fear = 3;
    var isFear = false;
    var rotation = NCL.random(360);
    var rVelocity = 10;

    var speed = 1+Math.random()*2;
    return {
        render: function()
        {

            NCL.save().pointRotate(NCL.radians(rotation), x + (size / 2), y + (size / 2)).translate(x, y).colorShape("rgba(255,255,255,0.2)").colorBorder("rgba(255,255,255,0.2)").circle(size,new NCLVector2(0, 0)).restore();
        },
        move: function()
        {
            if (isFear)
            {
                rotation += rVelocity;
            }
            else
            {
                rotation += 0.5;
            }
            if ((NCL.mouseX >= x - size && NCL.mouseX <= x) && (NCL.mouseY >= y && NCL.mouseY <= y + size))
            {
                velocityX = NCL.random2(fear, fear + 3);
                velocityY = NCL.random2(-25, 50);

                isFear = true;

            }
            else
            if ((NCL.mouseX >= x && NCL.mouseX <= x + size * 2) && (NCL.mouseY >= y && NCL.mouseY <= y + size))
            {
                velocityX = NCL.random2(-fear - 3, -fear);
                velocityY = NCL.random2(-25, 50);

                isFear = true;

            }
            else
            if ((NCL.mouseY >= y - size && NCL.mouseY <= y) && (NCL.mouseX >= x && NCL.mouseX <= x + size))
            {
                velocityY = NCL.random2(fear, fear + 3);
                velocityX = NCL.random2(-25, 50);

                isFear = true;

            }
            else
            if ((NCL.mouseY >= y && NCL.mouseY <= y + size * 2) && (NCL.mouseX >= x && NCL.mouseX <= x + size))
            {
                velocityY = NCL.random2(-fear - 3, -fear);
                velocityX = NCL.random2(-25, 50);

                isFear = true;

            }
           
            if (!isFear && NCL.mouseX !== undefined && NCL.mouseY !== undefined)
            {

                var diffY = y > NCL.mouseY ? y - NCL.mouseY : NCL.mouseY - y;
                var diffX = x > NCL.mouseX ? x - NCL.mouseX : NCL.mouseX - x;
                var diff = diffX > diffY ? diffX / diffY : diffY / diffX;

                velocityY = y > NCL.mouseY ? -diffY / 150 - 1 / diff : diffY / 150 + 1 / diff;

                velocityX = x > NCL.mouseX ? -diffX / 150 - 1 / diff : diffX / 150 + 1 / diff;

            }







            x += (speed * velocityX);
            y += (speed * velocityY);

            if (velocityX > 0)
            {
                if (velocityX >= 0.1)
                {
                    velocityX -= (velocityX / 15);
                }
                else
                {
                    velocityX = 0;

                    isFear = false;

                }
            }
            if (velocityX < 0)
            {
                if (velocityX < -0.1)
                {
                    velocityX += (Math.abs(velocityX) / 15);
                }
                else
                {
                    velocityX = 0;

                    isFear = false;
                }
            }
            if (velocityY >= 0)
            {
                if (velocityY >= 0.1)
                {
                    velocityY -= (velocityY / 15);
                }
                else
                {
                    velocityY = 0;

                    isFear = false;

                }
            }
            else
            {
                if (velocityY <= -0.1)
                {
                    velocityY += (Math.abs(velocityY) / 15);
                }
                else
                {
                    velocityY = 0;

                    isFear = false;
                }
            }


        }
    };
};

