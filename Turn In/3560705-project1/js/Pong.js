var renderer;
var scene;
var camera;
var spotLight;
var player1, player2;
var ball;
var scoreObject = null;
var p1Score = 0;
var p2Score = 0;
var score;
var timer;
var goal_text;
var cloud;
var music;
var update_ai = true;

function init() {
    score = false;
    timer = 0;
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
    // frustum vertical view         aspect ratio							 frustum near plane     frustum far plane
        45,                          window.innerWidth / window.innerHeight, 0.1,                   1000 );

    renderer = new THREE.WebGLRenderer();
    //						color     alpha
    renderer.setClearColor( 0x000000, 1.0 );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    camera.position.x = 0;
    camera.position.y = -20;
    camera.position.z = 15;
    //camera.lookAt( scene.position );
    camera.rotation.x = 45 * Math.PI/180;
    
    addSpotLight();
    
    loadSounds();
    
    player1 = new Paddle(.2, 0, -9, 0, 2, .5, 3);
    player2 = new Paddle(.2, 0, 9, 0, 2, .5, 3);
    ball = new Ball();
    scene.add(player2.mesh);
    scene.add(player1.mesh);
    scene.add(ball.mesh);

    var planeGeometry = new THREE.BoxGeometry( 10, 20, 1, 10 );
    var planeMaterial = new THREE.MeshLambertMaterial({color:0x4BD121});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.z = -.9;
    scene.add(plane);
    
    var leftWall = new THREE.BoxGeometry( 1, 18, 5 );
    var wallMaterial = new THREE.MeshLambertMaterial({color:'yellow'});
    var wall1 = new THREE.Mesh( leftWall, wallMaterial );
    wall1.position.x = -5;
    scene.add( wall1 );
    var edges1 = new THREE.EdgesHelper( wall1, 0x5555555 );
    scene.add( edges1 );
    var rightWall = new THREE.BoxGeometry( 1, 18, 5 );
    var wall2 = new THREE.Mesh( rightWall, wallMaterial );
    wall2.position.x = 5;
    scene.add( wall2 );
    var edges2 = new THREE.EdgesHelper( wall2, 0x555555 );
    scene.add( edges2 );
    
    // Output to the stream
    document.body.appendChild(renderer.domElement);
    music.play();
    music.volume = 0.2;
    // Call render
    render();
}

function createBall() {
    var ballSphere = new THREE.SphereGeometry( .5 );
    var ballMaterial = new THREE.MeshBasicMaterial({color:'blue'});
    ball = new THREE.Mesh(ballSphere, ballMaterial);
    scene.add(ball);
}

var xDir = .05, yDir = .09;
function moveBallAndMaintainPaddles() {

    if( Key.isDown( Key.A ) ) {
        player1.move(-1);

    } else if( Key.isDown( Key.D ) ) {
        player1.move(1);
    }
    
    if( ball.mesh.position.y < -8.5) {
        console.log("1:" + player1.mesh.position.x + "ball" + ball.mesh.position.x);
        if(Math.abs(player1.mesh.position.x - ball.mesh.position.x) <= 2.1) {
            one.play();
        } else {
           ball.reset();
            p1Score++;
            score = true;
            cheer.play();
        }
    } else if( ball.mesh.position.y > 8.5) {
        console.log("1:" + player1.mesh.position.x + "ball" + ball.mesh.position.x);
        if( Math.abs(player2.mesh.position.x - ball.mesh.position.x) <= 2.1) {
            two.play();
        } else {
            ball.reset();
            p2Score++;
            score = true;
            cheer.play();
        }
    }
    
    //if(update_ai) {
        player2.AI_move(ball.mesh.position.x);
     //   update_ai = false;
    //} else {
    //    update_ai = true;
   // }
    
    ball.update();
}

function render()
{
    moveCamera();
    
    if(score == true){
        var str = "GOAL!!!";
 
        if(goal_text != null)
            scene.remove(goal_text);
        if(p1Score == 5) {
            str = "AI WINS!";
        } else if(p2Score == 5) {
            str = "YOU WIN!";
        }
        var scoreObjectGeometry = new THREE.TextGeometry( str,
		{
			size: 2,
			height: 0.4,
			curveSegments: 10,
			bevelEnabled: false
		});
		
		var scoreObjectMaterial = new THREE.MeshLambertMaterial({color:Math.random() * 0xffffff });
		
		goal_text = new THREE.Mesh( scoreObjectGeometry, scoreObjectMaterial );
        goal_text.position.x = -4;
        goal_text.position.y = -10;
        goal_text.position.z = 5;
        goal_text.rotateY = (.25 * Math.PI) * (100 - timer);
        goal_text.scale = 10;
        scene.add(goal_text);
        
        timer++;
        
        if(timer > 100){
            if(str != "GOAL!!!") {
                p1Score = 0;
                p2Score = 0;
            }
            timer = 0;
            score = false;
            if(goal_text != null)
                scene.remove(goal_text);
            goal_text = null;
        }
    } else {
        moveBallAndMaintainPaddles();
    }

    updateScore();
    
    // Request animation frame
    requestAnimationFrame( render );

    // Call render()
    renderer.render( scene, camera );
}

function addSpotLight()
{
    spotLight = new THREE.DirectionalLight( 0xffffff );
    spotLight.position.set( 10, 20, 20 );
    spotLight.shadowCameraNear = 20;
    spotLight.shadowCameraFar = 50;
    spotLight.castShadow = true;
    scene.add(spotLight);
}

	function updateScore()
	{
		if( scoreObject != null )
		{
			scene.remove( scoreObject );
		}
		
		var scoreString = p1Score + "|" + p2Score;
		
		var scoreObjectGeometry = new THREE.TextGeometry( scoreString,
		{
			size: 2,
			height: 0.4,
			curveSegments: 10,
			bevelEnabled: false
		});
		
		var scoreObjectMaterial = new THREE.MeshLambertMaterial({color:0xFF0022});
		
		scoreObject = new THREE.Mesh( scoreObjectGeometry, scoreObjectMaterial );
		scoreObject.position.x = 10;
		scoreObject.position.y = 0;
		scoreObject.position.z = 0;
		scoreObject.rotation.x = 25 * Math.PI / 180;
		scene.add( scoreObject );
	}

function moveCamera(){
    if(Key.isDown( Key.DOWNARROW ))
        camera.position.y -= .1;
    if(Key.isDown( Key.UPARROW ))
        camera.position.y += .1;
    if(Key.isDown( Key.LEFTARROW ))
        camera.position.x -= .1;
    if(Key.isDown( Key.RIGHTARROW ))
        camera.position.x += .1;
    if(Key.isDown( Key.GT ))
        camera.position.z += .1;
    if(Key.isDown( Key.LT ))
        camera.positon.z -= .1;
}


var explode, one, two, three, four, five;
function loadSounds() {
    explode = new Audio("sounds/Explosion.mp3");
    one = new Audio("sounds/1.mp3");
    two = new Audio("sounds/2.mp3");
    three = new Audio("sounds/3.mp3");
    four = new Audio("sounds/4.mp3");
    five = new Audio("sounds/5.mp3");
    cheer = new Audio("sounds/1_person_cheering-Jett_Rifkin-1851518140.mp3");
    music = new Audio("sounds/01 Sugar Rush.m4a");
}

window.onload = init;