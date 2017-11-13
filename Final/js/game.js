var renderer;
var camera;
var scene;
var ambient;
var player;
var light;
var clock;

Physijs.scripts.worker = 'libs/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

function init(){
    var player_mesh;
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
    
    light = new THREE.DirectionalLight(0x000000, .1);
    light.position.set(-100, 100, 100);
    scene.add(light);
    
    generateMap(light);
    
    player = new Player(25, -95, 10);
    
    var loader = new THREE.JSONLoader();
    
    loader.load("models/Model.json", function(geometry, materials){
        materials.forEach(function(material){
            material.skinning = true;
        });
        player.skin = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
        player.anim_mixer = new THREE.AnimationMixer(player.skin);
        player.clips = player.skin.animations;
        player.mesh.add(player.skin);
        player.skin.rotateX((90 * Math.PI) / 180);
        player.skin.rotateY((180 * Math.PI) / 180);
        player.skin.scale.set(1.5, 1.5, 1.5);
        player.skin.position.z -= 1;
        player.anim_mixer.clipAction('Idle').play();
        //player.anim_mixer.clipAction('Run').play();
        clock = new THREE.Clock();
        render(); 
    });
}

function render(){
    requestAnimationFrame( render );
    scene.simulate();

    if(player.update() != 0){
        
    }
    
    for(i = 0; i < block_list.length; i++){
        block_list[i].update();
    }

    scene.simulate();
    
    renderer.setViewport( 0, 0, window.innerWidth * .98, window.innerHeight * .97);
    renderer.render( scene, camera );
}

window.onload = init;