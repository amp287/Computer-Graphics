	var renderer, rendererHUD;
	var scene;
	var camera, cameraHUD;
    var controls;
	
	var player;
	
	var rw = 200, rh = 150;
	var ca = 100, ar = 2;
	
	function init()
	{
		scene = new THREE.Scene();

		setupRenderers();
		setupCameras();
		
		setupSpotlight(100,100,0xff0000,1);
		setupSpotlight(100,-100,0x00ff00,2);
		setupSpotlight(-100,-100,0x0000ff,3);
		setupSpotlight(-100,100,0xffff00,4);
		
		setupPlayer();
        
        addObjectsToScene();

		// Main code here.
		
		// Output to the stream
	
		var container = document.getElementById("MainView");
		container.appendChild( renderer.domElement );

		// HUD
		var containerHUD = document.getElementById("HUDView");
		containerHUD.appendChild( rendererHUD.domElement );
		
        controls = new THREE.PointerLockControls(camera);
        controls.enabled = true;
        scene.add(controls.getObject());
		
       
        
		// Call render
		render();
	}
	
	function setupPlayer()
	{
		var ballGeometry = new THREE.SphereGeometry( 3 );
		var ballMaterial = new THREE.MeshLambertMaterial({color:'white'});
		player = new THREE.Mesh( ballGeometry, ballMaterial );
		scene.add( player );
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
		camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
		camera.lookAt( scene.position );

		// HUD
		cameraHUD = new THREE.PerspectiveCamera(ca,ar,0.1,4000);
		cameraHUD.position.y = 41;
		cameraHUD.lookAt( new THREE.Vector3(0,0,0) );
	}
	
	function render()
	{
		if( Key.isDown( Key.A ) )
		{
			camera.rotation.y += 0.01;
		}
		if( Key.isDown( Key.D ) )
		{
			camera.rotation.y -= 0.01;
		}

		if( Key.isDown( Key.W ) )
		{
			var deltaX = Math.sin(camera.rotation.y)*.2;
			var deltaZ = Math.cos(camera.rotation.y)*.2;
			camera.position.x -= deltaX;
			camera.position.z -= deltaZ;
		}
		if( Key.isDown( Key.S ) )
		{
			var deltaX = Math.sin(camera.rotation.y)*.2;
			var deltaZ = Math.cos(camera.rotation.y)*.2;
			camera.position.x += deltaX;
			camera.position.z += deltaZ;
		}
		
		player.position.x = camera.position.x;
		player.position.y = camera.position.y;
		player.position.z = camera.position.z;

		
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
	
	function setupSpotlight(x,z,color,number)
	{
		spotLight = new THREE.SpotLight( color, 12, 300, 1, 0, 0 );
        spotLight.position.set( x, 100, z );
		spotLight.target.position.set( x,0,z);
		spotLight.name = "SpotLight"+number;
        scene.add(spotLight);
	}

function addObjectsToScene()
	{
		var x, z;
		for( z=-100; z<=100; z+=5 )
		{
			for( x=-100; x<=100; x+= 5)
			{
				if( x == 0 && z == 0 )
				{
					continue;
				}
				var r = Math.floor( Math.random() * 255 );
				var g = Math.floor( Math.random() * 255 );
				var b = Math.floor( Math.random() * 255 );
				var col = r * 65536 + g * 256 + b;
				var cube = new THREE.Mesh(new THREE.BoxGeometry(2,2,2),new THREE.MeshLambertMaterial({color:col}));
				cube.position.x = x;
				cube.position.z = z;
				scene.add( cube );
			}
		}
	}
	
	window.onload = init;

