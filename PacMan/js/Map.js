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
    1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 1, 1, 
    1, 1, 1, 1, 2, 1, 2, 1, 1, 0, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 
    1, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 1, 1, 
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
    
    var leftTop = groundPlane.position.clone();
    
    leftTop.x += 150;
    leftTop.y -= 150;
    leftTop.z = 7;
    
    var level = 0;
    
    for(i = 0; i < map.length; i++){
        var cube;
        var ball;
        
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
        }
    }
    
    
    
    
}