	var renderer;
	var scene;
	var camera;
    var angle = 0;
    var pivot;
    var selected = null;

    Physijs.scripts.worker = 'libs/physijs_worker.js';
    Physijs.scripts.ammo = 'ammo.js';
    
	function init() {   
		scene = new Physijs.Scene();
		scene.setGravity(new THREE.Vector3( 0, 0, -30 ));

        renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setClearColor( 0x000000, 0 );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMapEnabled = true;
        renderer.shadowMapSoft = true;
        renderer.setViewport( 0, 0, window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.set(0, -10, 10);
                //camera.rotateZ((90 * Math.PI) / 180);
        //camera.rotateX((45 * Math.PI) / 180);
        camera.rotateZ((-90 * Math.PI) / 180);
        camera.lookAt(new THREE.Vector3(0, 0, 10));
        var hemi = new THREE.HemisphereLight(0x2cdff7, 0xf4f7f7, 0.5);
        
        createPlane();
        
        scene.add(hemi);
        
        var ambient = new THREE.AmbientLight( 0x444444 );
		scene.add( ambient );
        
        var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
        light.position.set( 0, 0, 200 );
        light.shadowCameraNear = 10;
        light.shadowCameraFar = 1000;
        light.castShadow = true;
        light.shadowCameraLeft = -30;
		light.shadowCameraTop = -30;
		light.shadowCameraRight = 30;
		light.shadowCameraBottom = 30;
		light.shadowCameraNear = 20;
		light.shadowCameraFar = 200;
		light.shadowBias = -.001
		light.shadowMapWidth = light.shadowMapHeight = 2048;
		light.shadowDarkness = .5;
        scene.add(light);
        
        createTower();
        
        pivot = new THREE.Object3D();
        scene.add(pivot);
        pivot.position.set(0, 0, 10);
        pivot.add(camera);
        camera.position.set(0, -10, 0);
        camera.rotateX((-20 * Math.PI) / 180);
		render();
	}

    function createPlane(){
        var geom = new THREE.PlaneGeometry(20, 20);
        var mat = new Physijs.createMaterial(new THREE.MeshStandardMaterial({color:"grey"}));
        
        var plane = new Physijs.PlaneMesh(geom, mat, .95, 0);
        plane.position.set(0, 0, 0);
        plane.mass = 0;
        plane.name = "Ground";
        scene.add(plane);
    }
    
    function createTower(){        
        for(i = 0; i < 10; i++){
            for(j = 0; j < 3; j++){
                var geom = new THREE.BoxGeometry(1, 3, 1);
                var mat = new Physijs.createMaterial(new THREE.MeshStandardMaterial({color:"tan"}), .3, 0);
                var mesh = new Physijs.BoxMesh(geom, mat);
                mesh.name = "Block";
                if(i % 2){
                    mesh.position.set(-1, 0, .6);
                    mesh.position.x += (j * 1);
                    mesh.position.z += (i * 1);
                } else {
                    mesh.position.set(0, 1, .6);
                    mesh.position.y -= (j * 1);
                    mesh.position.z += (i * 1);
                    mesh.rotateZ((90 * Math.PI) / 180);
                }
                scene.add(mesh);
            }
        }
    }

	function render()
	{
        var zAxis = new THREE.Vector3(0, 0, 1);
        scene.simulate();
        if(Key.isDown(Key.A)){
            pivot.rotateOnAxis(zAxis, -0.05);
        } else if(Key.isDown(Key.D)){
            pivot.rotateOnAxis(zAxis, 0.05);
        }
		// Request animation frame
		requestAnimationFrame( render );
		
		renderer.render( scene, camera );
	}

    document.addEventListener('mousedown', onMouseDown, false);

    function onMouseDown(event) {
        var mouse = new THREE.Vector2();
        event.preventDefault();

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        //var vector = new THREE.Vector3( x, y, 0.5 );

        var raycaster = new THREE.Raycaster();

        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects( scene.children );
        console.log(intersects);
        if (intersects.length > 0){
            if(intersects[0].object.name == "Block"){
                intersects[0].object.material.color.set( 0xff0000 );
                selected = intersects[0].object;
            }
        }
    }
    
    document.addEventListener('mousemove', onMouseMove, false);
    
    function onMouseMove(event){
        if(selected == null)
            return;
        var mouse = new THREE.Vector3();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = (event.clientY / window.innerHeight) * 2 - 1;
        mouse.z = selected.position.z;
        
        if(mouse.equals(selected.position) || selected.getLinearVelocity() > 0){
            return;
        }
        var vect = new THREE.Vector3();
        vect.subVectors(selected.position, mouse);
        vect.multiplyScalar(2);
        vect.z = 0;
        //selected.setLinearFactor(selected.position.sub(mouse).multiplyScalar(1));
        selected.setLinearVelocity(vect);
    }

    document.addEventListener('mouseup', onMouseUp, false);
    
    function onMouseUp(event){
        if(selected == null)
            return;
        selected.material.color.set('tan');
        selected = null;
        console.log("UP");
    }
	
	window.onload = init;

