	var renderer;
	var scene;
	var camera;
	
	function init()
	{
		scene = new THREE.Scene();
		setupRenderer();
		setupCamera();
		addSpotlight();
		
		// Main code here.
		addBox();

		
		// Output to the stream
		document.body.appendChild( renderer.domElement );
		
		// Call render
		render();
	}
	
	function setupRenderer()
	{
		renderer = new THREE.WebGLRenderer();
		renderer.setClearColor( 0x000000, 1.0 );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMapEnabled = true;
	}
	
	function setupCamera()
	{
		camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
		camera.position.x = 0;
		camera.position.y = 0;
		camera.position.z = 13;
		camera.lookAt( scene.position );
	}
	
	function render()
	{
		box.rotation.x += 0.01;
		box.rotation.y += 0.01;
		box.rotation.z += 0.01;
		
		// Request animation frame
		requestAnimationFrame( render );
		
		// Call render()
		renderer.render( scene, camera );
	}
	
	function addSpotlight()
	{
		var spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.position.set( 10, 20, 20 );
        spotLight.shadowCameraNear = 20;
        spotLight.shadowCameraFar = 50;
		spotLight.lookAt( new THREE.Vector3( 0, 0, 0 ) );
        scene.add( spotLight );
	}
	
	window.onload = init;

	var box;
	function addBox()
	{
		//var mat = new THREE.MeshLambertMaterial({color:0xff00ff});
        var mat = createCustomMaterialFromGLSLCode("fragmentSimple");
		var geo = new THREE.BoxGeometry( 2, 2, 2 );
		box = new THREE.Mesh( geo, mat );
		scene.add( box );
	}
