var renderer;
var camera;
var scene;
var ambient;
var player;
var light;

Physijs.scripts.worker = 'libs/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

function init(){
    camera = new THREE.PerspectiveCamera( 75, (window.innerWidth / window.innerHeight) * .97, 1, 1000 );
    camera.rotateX((90 * Math.PI) / 180);
    //acamera.position.set(25, -95, 10);
    scene = new Physijs.Scene();
    scene.setGravity(new THREE.Vector3( 0, 0, -30 ));
    
    var urlPrefix = "images/";
    var urls = [ urlPrefix + "right.bmp", urlPrefix + "left.bmp",
    urlPrefix + "back.bmp", urlPrefix + "front.bmp",
    urlPrefix + "up.bmp", urlPrefix + "down.bmp" ];
    var textureCube = new THREE.CubeTextureLoader().load(urls);
    textureCube.format = THREE.RGBFormat;
    scene.background = textureCube;
    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0x000000, 0 );
    renderer.setSize( window.innerWidth * .98, window.innerHeight * .97);
    renderer.shadowMapEnabled = true;
    document.body.appendChild( renderer.domElement );
    
    var ambient = new THREE.AmbientLight( 0xffffff );
    scene.add( ambient );
    
    light = new THREE.DirectionalLight(0x000000, 1);
    light.position.set(-100, 100, 100);
    scene.add(light);
    
    generateMap(light);
    
    player = new Player(25, -95, 10);
    

    render();
    
}

function render(){
    requestAnimationFrame( render );
    scene.simulate();
    /*if(Key.isDown(Key.A)) {
            //var force = new THREE.Vector3(0, 0, 5);
            //player.setAngularVelocity(force)
            camera.rotateY((1 * Math.PI) / 180);
		} else if( Key.isDown( Key.D ) ) {
            //var force = new THREE.Vector3(0, 0, -5);
            //player.setAngularVelocity(force)
            camera.rotateY((-1 * Math.PI) / 180);
		} else {
           //player.setAngularVelocity(new THREE.Vector3(0, 0, 0));  
        }*/
    player.update();
    
    for(i = 0; i < block_list.length; i++){
        block_list[i].update();
    }

    scene.simulate();
    
    renderer.setViewport( 0, 0, window.innerWidth * .98, window.innerHeight * .97);
    renderer.render( scene, camera );
}

window.onload = init;