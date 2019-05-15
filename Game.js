var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');
 
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

 
function Sprite(startingState, x, y, width, height, speed) {
    this.currentState = startingState;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
}
 
function Projectile(x, y, trajectory, size, color, speed) {
    this.x = x;
    this.y = y;
    this.trajectory = trajectory;
    this.size = size;
    this.color = color;
    this.speed = speed;
}

function Particle(x, y, trajectory, size, color, speed) {
    this.x = x;
    this.y = y;
    this.trajectory = trajectory;
    this.size = size;
    this.color = color;
    this.speed = speed;
}
 
function Trajectory(startX, startY, endX, endY) {
    this.length = Math.sqrt(Math.pow((endX - startX), 2) + Math.pow((endY - startY), 2));
    this.x = (endX - startX) / this.length;
    this.y = (endY - startY) / this.length;
}
 
function drawSquare(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), size, size);
}
 
function updateProjectiles(mod) {
    for (var key in projectiles) {
        projectiles[key].x += projectiles[key].trajectory.x * projectiles[key].speed * mod;
        projectiles[key].y += projectiles[key].trajectory.y * projectiles[key].speed * mod;
        if (projectiles[key].x > canvas.width || projectiles[key].x < 0 || projectiles[key].y > canvas.height || projectiles[key].y < 0) {
            projectiles.splice(key, 1);
        }
    }
}
 

var game = {
    images: 0,
    imagesLoaded: 0,
    backgroundColor: '#fff',
}
 
var player = new Sprite('right', canvas.width / 2, canvas.height / 2, 44, 108, 400);
 
var keysDown = {};
window.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = true;
});
window.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
});
 
var mouse = {
    x: 0,
    y: 0,
    down: false
}

var colorcon = 0;
 
player.projectileTimer = Date.now();
player.shootDelay = 10;
var projectiles = [];
var particles = [];

var raveparty = [0, 0];

var prospeed = 2500;
var prospeeddiff = 1000;
var beforeclick = 0;
var chick = 0;
 
window.addEventListener('mousedown', function(e) {
    mouse.down = true;
});
window.addEventListener('mouseup', function(e) {
    mouse.down = false;
});
window.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX - canvas.offsetLeft;
    mouse.y = e.clientY - canvas.offsetTop;
});
 
function update(mod) {


canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;


    if ( Date.now() - player.projectileTimer > player.shootDelay) {
        projectiles.push(
            new Projectile(
                player.x,
                player.y,
                new Trajectory(player.x, player.y, Math.random()*canvas.width, Math.random()*canvas.height),
                15,
                '#0f0',
                prospeed
            )
        );
        player.projectileTimer = Date.now();
    }
 
 
     for (var key in projectiles) {
	 if (colorcon == 0){
projectiles[key].color = '#FF0000';
colorcon = 1;
} else if (colorcon == 1) {
projectiles[key].color = '#0f0';
colorcon = 2;
} else if (colorcon == 2) {
projectiles[key].color = '#0000FF';
colorcon = 3;
} else if (colorcon == 3) {
projectiles[key].color = '#FFFF00';
colorcon = 4;
} else if (colorcon == 4) {
projectiles[key].color = '#FF6633';
colorcon = 5;
} else if (colorcon == 5) {
projectiles[key].color = '#00FFFF';
colorcon = 6;
} else {
projectiles[key].color = '#FF00FF';
colorcon = 0;
}
    }
 
 
 
     if (38 in keysDown) {
	 
raveparty[0] = 1;
      } else {
	  raveparty[0] = 0;
	  }
 
 // Rave Party
 if (raveparty[0]){
	 if (colorcon == 0){

game.backgroundColor = '#0f0';

} else if (colorcon == 1) {

game.backgroundColor = '#0000FF';

} else if (colorcon == 2) {

game.backgroundColor = '#FFFF00';

} else if (colorcon == 3) {

game.backgroundColor = '#FF6633';

} else if (colorcon == 4) {

game.backgroundColor = '#00FFFF';

} else if (colorcon == 5) {

game.backgroundColor = '#FF00FF';

} else {

game.backgroundColor = '#FF0000';

}
 }
 
    updateProjectiles(mod);

	
	if (mouse.down){
	prospeed = 0;
	chick = 1;
	} else {
	if (chick) {
	prospeed = 2500;
	chick = 0;
	}
	}
 
     if (32 in keysDown) {
    for (var key in projectiles) {
        if (projectiles[key].x < canvas.width || projectiles[key].x < 0 || projectiles[key].y > canvas.height || projectiles[key].y < 0) {
            projectiles.splice(key, 1);
        }
    }
	game.backgroundColor = '#fff';
      } 
 
    if (37 in keysDown) {
        if (prospeed > 10){
        prospeed -= prospeeddiff * mod;
      } else {
	  prospeed = 10;
	  }
    }
    else if (39 in keysDown) {
               if (prospeed < 5000){ 
       prospeed += prospeeddiff * mod;
     } else {
	 prospeed = 5000;
	 }
    }
	
	
	player.x = mouse.x;
	player.y = mouse.y;
	
	
}
 
function render() {
    ctx.fillStyle = game.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    

	
    for (var key in projectiles) {
        drawSquare(projectiles[key].x, projectiles[key].y, projectiles[key].size, projectiles[key].color);
    }
	 drawSquare(player.x-12, player.y-12, 25, '#0fa');
	 
	ctx.fillStyle = '#000';
    ctx.font = '15pt Arial';
    ctx.textBaseline = 'top';

	ctx.fillText('Speed: ' + prospeed, 15, 15);
	ctx.fillText( 'Press right or left keys to increase or decrease speed!', 15, 40);
	ctx.fillText( 'Left click to draw!', 15, 65);
	ctx.fillText( 'Space bar to clear canvas!', 15, 90);
	ctx.fillText( 'Hold the up arrow key for something special!', 15, canvas.height-30);
	 
}

function main() {
    update((Date.now() - then) / 1000);
    if (game.images == game.imagesLoaded) {
        render();
    }
    then = Date.now();
}
 
var then = Date.now();
setInterval(main, 10);