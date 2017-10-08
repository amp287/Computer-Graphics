var map = 
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
    1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 
    1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 
    1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 
    1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 
    1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 
    1, 0, 0, 1, 2, 1, 2, 2, 2, 0, 2, 2, 2, 1, 2, 1, 0, 0, 1, 1, 
    1, 1, 1, 1, 2, 1, 2, 1, 1, 0, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 
    1, 2, 2, 2, 2, 2, 2, 1, 0, 3, 0, 1, 2, 2, 2, 2, 2, 2, 1, 1, 
    1, 1, 1, 1, 2, 1, 2, 1, 1, 0, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 
    1, 0, 0, 1, 2, 1, 2, 2, 2, 4, 2, 2, 2, 1, 2, 1, 0, 0, 1, 1, 
    1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 
    1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 
    1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 
    1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 1, 1, 
    1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 1, 
    1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1, 1, 
    1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
];

var groundPlane;

var balls = [];
var leftTop;

var enemies = [];

function Ball(x, y){
    var ballGeometry = new THREE.SphereGeometry(3);
    var ballMaterial = new Physijs.createMaterial(new THREE.MeshLambertMaterial({color:'yellow'}), 1, 0);
    this.mesh = new Physijs.BoxMesh( ballGeometry, ballMaterial );
    this.status = "alive";
    this.mesh.mass = 0;
    this.mesh.name = "ball";
    this.mesh.position.set(x, y, 5);
    this.mesh._physijs.collision_flags = 4;
    scene.add(this.mesh);
}

function updateBalls(){
    var ballsTemp = new Array();
    for(i = 0; i < balls.length; i++){
        if(balls[i].status == "dead"){
            scene.remove(balls[i].mesh);
            console.log("removed");
        } else {
            ballsTemp.push(balls[i]);
        }
    }
    balls = ballsTemp;
}

function generateMap(){
        var material = new Physijs.createMaterial(new THREE.MeshLambertMaterial({color:"black"}), .95, 1.3 );
		var geometry = new THREE.PlaneGeometry(300, 300, 6);
		groundPlane = new Physijs.BoxMesh(geometry, material, 0);
		groundPlane.name = "GroundPlane";
		
		scene.add( groundPlane );
    
    var height = 15;
    var width = 15;
    var length = 20;
    
    geometry = new THREE.CubeGeometry(width, height, length);
    material = new Physijs.createMaterial(new THREE.MeshLambertMaterial({color:"blue"}), .95, 1.3);
    
    var cube = new Physijs.BoxMesh(geometry, material, 0);
    
    leftTop = groundPlane.position.clone();
    
    leftTop.x += 150;
    leftTop.y -= 150;
    leftTop.z = 7;
    
    var level = 0;
    
    for(i = 0; i < map.length; i++){
        var cube;
        var ball;
        var ghost;
        
        if(i % 20 == 0 && i != 0)
            level++;
        
        if(map[i] == 1){
            cube = new Physijs.BoxMesh(geometry, material, 0);
            cube.position.set(leftTop.x, leftTop.y, leftTop.z);
            cube.position.x -= (15 * (i % 20));
            cube.position.y += 15 * level;
            cube.name = "Wall";
            scene.add(cube);
        } else if(map[i] == 2){
            ball = new Ball(leftTop.x - (15 * (i % 20)), leftTop.y + 15 * level);
            //ball.mesh.position.set(leftTop.x, leftTop.y, leftTop.z);
           // ball.mesh.position.x -= (15 * (i % 20));
           // ball.mesh.position.y += 15 * level;
           // scene.add(ball.mesh);
            balls.push(ball);
        } else if(map[i] == 3){
            ghost = new Ghosts(leftTop.x - (15 * (i % 20)), leftTop.y + 15 * level);
            enemies.push(ghost);
        }
        else if(map[i] == 4){
            ;//player.position.set(leftTop.x - (15 * (i % 20)), leftTop.y + 15 * level, 100);
        }
    }
}

function getCell(x, y){
    var quit = false;
    var cellx = 0;
    var celly = 0;
    var posx = leftTop.x;
    var posy = leftTop.y;
    console.log("Pos: " + x + " " + y);
    
    while(cellx < 20){
        var temp;
        
        temp = Math.abs((posx - (cellx * 15)) - x);
        
        console.log("[X]: temp:" + temp + " cellx:" + cellx + " posx:" + posx + " value: " + (cellx * 15));
        
        if(temp <= 7.5)
            break;
        cellx++;
    }
    while(celly < 21){
        var temp;
        temp = Math.abs((posy +(celly * 15)) - y);
        
        console.log("[Y]: temp:" + temp + " cellx:" + celly + " posy:" + posy + " value: " + (celly * 15));
        
        if(temp <= 7.5)
            break;
        celly++;
    }
    return new THREE.Vector3(cellx, celly, 5);
}

function getPosition(x, y){
    return new THREE.Vector3(leftTop.x - (15 * x), leftTop.y + (15 * y), 5);
}