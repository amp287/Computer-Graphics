	var renderer;
	var scene;
	var camera;
	var uniforms;

	function init()
	{
		scene = new THREE.Scene();
		setupRenderer();
		setupCamera();
		addSpotlight();

        
        uniforms = {
        time:{type: "f", value: 1.0}
        }
				
		// Main code here.
		addBox();
        
        addSphere();
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
        uniforms.time.value += 0.05;
		rotate(box);
        rotate(box2);
        rotate(sphere);
        rotate(sphere2);
		
		// Request animation frame
		requestAnimationFrame( render );
		
		// Call render()
		renderer.render( scene, camera );
	}

    function rotate(mesh){
        mesh.rotation.x += 0.01;
		mesh.rotation.y += 0.01;
		mesh.rotation.z += 0.01;
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

	var box, box2;
	function addBox()
	{
		//var mat = new THREE.MeshLambertMaterial({color:0xff00ff});
        var mat = createCustomMaterialFromGLSLCode("fragmentSquareAnimated");
		var geo = new THREE.BoxGeometry( 2, 2, 2 );
		box = new THREE.Mesh( geo, mat );
		scene.add( box );
        box.position.y += 3;
        
        var mat2 = createCustomMaterialFromGLSLCode("fragmentSquare");
        var geo2 = new THREE.BoxGeometry( 2, 2, 2 );
		box2 = new THREE.Mesh( geo2, mat2 );
		scene.add( box2 );
        box2.position.x = -5;
        box2.position.y += 3;
	}

    var sphere, sphere2;
    function addSphere(){
        var mat = createCustomMaterialFromGLSLCode("fragmentSphereAnimated");
        var geo = new THREE.SphereGeometry( 2, 10, 10 );
		sphere = new THREE.Mesh( geo, mat );
		scene.add( sphere );
        sphere.position.y -= 2;
        
        var mat2 = createCustomMaterialFromGLSLCode("fragmentSphere");
		sphere2 = new THREE.Mesh( geo, mat2 );
		scene.add( sphere2 );
        sphere2.position.x = -5;
        sphere2.position.y -= 2;
    }
