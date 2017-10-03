	var renderer;
	var scene;
	var overview_camera;
    var current_camera;
	var light;
	
	<!-- add objects in the scope so all methods can access -->
	var groundPlane;
	var ball;
    var cannon;
    var bullet;
    var canFire = true;
    var score = 0;
    var music;
    var movingBlock;

	<!-- 2. Add the following two lines. -->
	Physijs.scripts.worker = 'libs/physijs_worker.js';
    Physijs.scripts.ammo = 'ammo.js';
	
	function init()
	{
		<!-- 3. Edit the scene creation -->
		scene = new Physijs.Scene();
		scene.setGravity(new THREE.Vector3( 0, 0, -30 ));

		overview_camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
        overview_camera.position.x = 0;
        overview_camera.position.y = -200;
        overview_camera.position.z = 100;
        //camera.lookAt( scene.position );
        overview_camera.rotation.x = 65 * Math.PI/180;
		overview_camera.lookAt( scene.position );
		current_camera = overview_camera;
		renderer = new THREE.WebGLRenderer();
		//						color     alpha
		renderer.setClearColor( 0x000000, 1.0 );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMapEnabled = true;

		addSpotLight();
		
		<!-- 4. Ground plane -->
		createGroundPlane();
	
		<!-- 5. Ball -->
        createBoxs();
        createCannon();
        scoreFunc();
        loadSounds();
        
        var castle = new Castle1(new THREE.Vector3(70, 0, 10));
        
        var castle2 = new Castle2(new THREE.Vector3(70, 80, 10));
        
        var castle3 = new Castle3(new THREE.Vector3(50, -100, 10));
        
        var castle4 = new Castle4(new THREE.Vector3(100, -80, 10));

        
        movingBlock = new MovingBlock(new THREE.Vector3(20, 0, 11));
        
        music.volume = 0.2;
        
        music.play();

		// Output to the stream
		document.body.appendChild( renderer.domElement );
		
		// Call render
		render();
	}
	
	function render()
	{
        movingBlock.update();
        
        if(Key.isDown(Key.two)){
            current_camera = overview_camera;
        } else if(Key.isDown(Key.one)){
            current_camera = cannon.camera;
        }
        if(Key.isDown(Key.A)){
            cannon.yaw(1);
        }
        else if(Key.isDown(Key.D)){
            cannon.yaw(-1);
        }
        else if(Key.isDown(Key.W)){
            cannon.pitch(-1);
        }
        else if(Key.isDown(Key.S)){
            cannon.pitch(1);
        }
        else if(Key.isDown(Key.zero)){
            cannon.switchAmmo(1);
        }
        else if(Key.isDown(Key.nine)){
            cannon.switchAmmo(0);
        }

        if(Key.isDown(Key.F) && canFire){
            bullet = cannon.fire();
            canFire = false;
        }
        
        if(bullet != null){
            var del = bullet.update();
            if(del == 1){
                console.log("DELETE");
                bullet = null;
                canFire = true;
            }
        }
        
		<!-- 6. Physics simulation -->
		scene.simulate();
        
        document.getElementById("score").innerHTML="Score="  + score;
		
		// Request animation frame
		requestAnimationFrame( render );
		
		// Call render()
		renderer.render( scene, current_camera);
	}
	
	function addSpotLight()
	{
        light = new THREE.DirectionalLight( 0xffffff, 0.5 );
        light.position.set( 0, 0, 200 );
        light.shadowCameraNear = 10;
        light.shadowCameraFar = 1000;
        light.castShadow = true;
        scene.add(light);
	}

	<!-- 4. Ground plane -->
	function createGroundPlane()
	{
		var planeTexture = THREE.ImageUtils.loadTexture('images/groundterrain.jpg');
		
		//                                                                                           friction restitution
		var planeMaterial = new Physijs.createMaterial(new THREE.MeshLambertMaterial({map:planeTexture}), .95, 1.3 );
		var planeGeometry = new THREE.PlaneGeometry( 300, 300, 6 );
		groundPlane = new Physijs.BoxMesh( planeGeometry, planeMaterial, 0 );
		groundPlane.name = "GroundPlane";
		
		scene.add( groundPlane );
        
		var groundPlane1 = new Physijs.BoxMesh( planeGeometry, planeMaterial, 0 );
        groundPlane1.position = new THREE.Vector3(300, 300, 0);
		groundPlane1.name = "GroundPlane";
		
		scene.add( groundPlane1 );
        
        var groundPlane2 = new Physijs.BoxMesh( planeGeometry, planeMaterial, 0 );
        groundPlane2.position = new THREE.Vector3(300, 0, 0);
		groundPlane2.name = "GroundPlane";
		
		scene.add( groundPlane2 );
        
        var groundPlane3 = new Physijs.BoxMesh( planeGeometry, planeMaterial, 0 );
        groundPlane3.position = new THREE.Vector3(0, 300, 0);
		groundPlane3.name = "GroundPlane";
		
		scene.add( groundPlane3 );
        
        var groundPlane4 = new Physijs.BoxMesh( planeGeometry, planeMaterial, 0 );
        groundPlane4.position = new THREE.Vector3(0, -300, 0);
		groundPlane4.name = "GroundPlane";
		
		scene.add( groundPlane4 );
        
        var groundPlane5 = new Physijs.BoxMesh( planeGeometry, planeMaterial, 0 );
        groundPlane5.position = new THREE.Vector3(300, -300, 0);
		groundPlane5.name = "GroundPlane";
		
		scene.add( groundPlane5 );
	}

    function createBoxs(){
        var vec = new THREE.Vector3(50, 0, 7.5);
        //var Box1 = new Block(vec);
        /*var boxGeom = new THREE.BoxGeometry( 5, 5, 15);
        var mat = new Physijs.createMaterial(new THREE.MeshLambertMaterial({color:'white'}), .95, 0);
        box = new Physijs.BoxMesh(boxGeom, mat);
        box.position.x = 50;
        box.position.y = 0;
        box.position.z =7.5;
        scene.add(box);*/
    }

	<!-- 5. Create ball -->
	function createBall()
	{
		var ballGeometry = new THREE.SphereGeometry( 3 );
		
		//                                                                                     friction restitution
		var ballMaterial = Physijs.createMaterial( new THREE.MeshLambertMaterial({color:'white'}), .95, 1 );
		ball = new Physijs.SphereMesh( ballGeometry, ballMaterial );
		
		ball.position.x = -50;
		ball.position.y = 0;
		ball.position.z = 10;
		
		ball.name = 'CannonBall';
		scene.add( ball );
        ball.setLinearVelocity(new THREE.Vector3(100, 0, 0));
	}


    function createCannon(){
        cannon = new Cannon(-50, 0, 10);
        scene.add(cannon.mesh);
        current_camera = cannon.camera;

    }

    function scoreFunc(){
        
        var scoreObjectGeometry = new THREE.TextGeometry( "Austin Peace",
		{
			size: 2,
			height: 0.4,
			curveSegments: 10,
			bevelEnabled: false
		});
		
		var scoreObjectMaterial = new THREE.MeshLambertMaterial({color:0xb6bbc4});
		goal_text = new THREE.Mesh( scoreObjectGeometry, scoreObjectMaterial );
        
        goal_text.position = new THREE.Vector3(-20, -20, 10);
        goal_text.rotateX((90 * Math.PI) / 180);
        goal_text.rotateY((-90 * Math.PI) / 180);2
        scene.add(goal_text);
    }

    function loadSounds() {
        cannonSound = new Audio("sounds/cannon.mp3");
        music = new Audio("sounds/music.m4a");
    }

	window.onload = init;
