var block_size = 5;

function Block(x, y, z, light, color){
    var vector = new THREE.Vector3(x, y, z);
    this.geometry = new THREE.BoxGeometry(block_size, block_size, 1);
   // this.material = new Physijs.createMaterial(new THREE.MeshStandardMaterial(), .95, 0);
    if(color == null){
        color = new THREE.Vector3(122, 233, 239);
    }
    var uniforms = {
        lightPos:{value: light.position},
        color:{value: color}
    }
    this.material = new Physijs.createMaterial(new createCustomMaterialFromGLSLCode("RimLightFragShader", uniforms), 2, 0);
    this.mesh = new Physijs.BoxMesh(this.geometry, this.material);
    this.mesh.mass = 0;
    this.mesh.position.set(x, y, z);
}

function MovingBlock(x, y, z, light, dir_vector, color, time, speed){
    Block.call(this, x, y, z, light, color);
    this.direction = dir_vector;
    this.start = new THREE.Vector3(x, y, z);
    this.mesh.mass = 1;
    this.timer = new THREE.Clock();
    this.time = time;
    this.speed = speed;
}

function WallBlock(x, y, z, light, color){
    Block.call(this, x, y, z, light, color);
    this.mesh.rotateX((90 * Math.PI) / 180);
    this.mesh.position.z += block_size / 1.5;
}

Block.prototype.update = function(){
    
}

MovingBlock.prototype.update = function(){
    var velocity = new THREE.Vector3(this.direction.x, this.direction.y, this.direction.z);
    if(this.timer.getElapsedTime() > this.time){
        this.direction.multiplyScalar(-1);
        this.timer.stop();
        this.timer.start();
    }
    this.mesh.setLinearVelocity(velocity.multiplyScalar(this.speed));
}

function WinningSphere(x, y, z){
    var geom = new THREE.SphereGeometry(1, 8, 8);
    var mat = new Physijs.createMaterial(new THREE.MeshBasicMaterial({color:"yellow"}), 0, 0);
    this.mesh = new Physijs.SphereMesh(geom, mat);
    this.mesh.position.set(x, y, z);
    scene.add(this.mesh);
    this.mesh.setLinearFactor(new THREE.Vector3(0,0,0));
    this.mesh.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
    // `this` has collided with `other_object` with an impact speed of `relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`
        if(other_object.name == "player"){
            winning_flag = true;
            console.log("HELLO>?");
        } 
    });
    //this.mesh.
}