	var renderer, rendererHUD;
	var scene;
	var camera, cameraHUD;
    var controls;
	
	var player;
    var playerDir;

    var forward;
	
	var rw = 200, rh = 150;
	var ca = 100, ar = 2;

    var score = 0;

    var ghost1;

    var music = new Audio("music/pacman.mp3");

    Physijs.scripts.worker = 'libs/physijs_worker.js';
    Physijs.scripts.ammo = 'ammo.js';

	
	function init()
	{   
        playerDir = new THREE.Vector3(10, 0, 0);
        forward = new THREE.Vector3();
		scene = new Physijs.Scene();
		scene.setGravity(new THREE.Vector3( 0, 0, -30 ));

		setupRenderers();

		setupPlayer();
        
        setupCameras();
        
        generateMap();
        
        music.play();
        
        var hemi = new THREE.HemisphereLight(0x2cdff7, 0xf4f7f7, 0.5);
        
        scene.add(hemi);
        
        //addObjectsToScene();

		// Main code here.
		
		// Output to the stream
        
        var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
        light.position.set( 0, 0, 200 );
        light.shadowCameraNear = 10;
        light.shadowCameraFar = 1000;
        light.castShadow = true;
        scene.add(light);
	
		var container = document.getElementById("MainView");
		container.appendChild( renderer.domElement );
        
		// HUD
		var containerHUD = document.getElementById("HUDView");
		containerHUD.appendChild( rendererHUD.domElement );
		
        //controls = new THREE.PointerLockControls(camera);
        //controls.enabled = true;
        //scene.add(controls.getObject(), player);
        //controls.getObject().position.set(0,0, 50);
        
        ghost1 = new Ghosts(0, 0);
        
		// Call render
		render();
	}
	
	function setupPlayer()
	{
		var ballGeometry = new THREE.SphereGeometry(4);
		var ballMaterial = new Physijs.createMaterial(new THREE.MeshLambertMaterial({color:'yellow'}), 0, 0);
		player = new Physijs.BoxMesh( ballGeometry, ballMaterial );
        player.position.set(15, -48, 10);
        player.name = "player";
		scene.add( player );
        
        player.addEventListener( 'collision', function( other_object, linear_velocity, angular_velocity )
		{
            if(other_object.name == "ball"){
                score++;
                scene.remove(other_object);
            }

		});
	}
	
	function setupRenderers()
	{
		renderer = new THREE.WebGLRenderer();
		renderer.setClearColor( 0x000000, 0 );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMapEnabled = true;

		// HUD
		rendererHUD = new THREE.WebGLRenderer();
		rendererHUD.setClearColor( 0x000000, 0 );
		rendererHUD.setSize( rw, rh );
		rendererHUD.shadowMapEnabled = true;
	}
	
	function setupCameras()
	{
		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
		//camera.lookAt( scene.position );
       
        camera.rotateZ((-90 * Math.PI) / 180);
        camera.rotateX((45 * Math.PI) / 180);
        player.add(camera);
        camera.position.set(-10, -2.5, 20);
        //camera.lookAt(player);
        //camera.rotateX((90 * Math.PI) / 180);

		// HUD
		//cameraHUD = new THREE.PerspectiveCamera(ca,ar,0.1,4000);
		cameraHUD = new THREE.OrthographicCamera(
                                                -1000,		// Left
                                                1000,		// Right
                                                1000,		// Top
                                                -1000,		// Bottom
                                                1,            			// Near 
                                                1000 );
        
        cameraHUD.zoom = 6.5;
        cameraHUD.updateProjectionMatrix();
        cameraHUD.up = new THREE.Vector3(0, 0, -1);
        cameraHUD.position.z = 500;
		cameraHUD.lookAt( new THREE.Vector3(0,0,0) );
        
	}
	
	function render()
	{
        //var direction = controls.getDirection();
        var velocity = new THREE.Vector3();
    
        camera.getWorldDirection(forward);
        
        velocity.copy(forward);
        
        velocity.multiplyScalar(50);
        
        velocity.z = 0;
        
        if(Key.isDown(Key.W)) {
            player.setLinearVelocity(velocity);
		} else if(Key.isDown(Key.S)) {

		} else {
            var temp = player.getLinearVelocity();
            temp.x = 0;
            temp.y = 0;
            player.setLinearVelocity(temp);
           
        }
        
		if(Key.isDown(Key.A)) {
            var force = new THREE.Vector3(0, 0, 5);
            player.setAngularVelocity(force)
		} else if( Key.isDown( Key.D ) ) {
            var force = new THREE.Vector3(0, 0, -5);
            player.setAngularVelocity(force)
		} else {
           player.setAngularVelocity(new THREE.Vector3(0, 0, 0));  
        }
        
        scene.simulate();
        
        updateBalls();
        
        ghost1.update();
        
        updateScore();
        
		// Request animation frame
		requestAnimationFrame( render );
		
		renderer.setViewport( 0, 0, window.innerWidth, window.innerHeight );
		renderer.render( scene, camera );
		
		rendererHUD.setScissorTest(true);
		rendererHUD.setViewport( 0, 0, rw, rh );
		rendererHUD.render( scene, cameraHUD );
	}
	
	function setBrightness( value )
	{
		var i;
		for( i=1; i<=4; i++ )
		{
			var name = "SpotLight"+i;
			var light = scene.getObjectByName( name );
			light.intensity = value;
		}
	}
	

    function updateScore(){
        var element = document.getElementById("score");
        element.innerHTML = "Score\n" + score;
    }
	
	window.onload = init;

