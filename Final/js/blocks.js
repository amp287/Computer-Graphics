var block_size = 5;

function Block(x, y, z, light){
    var vector = new THREE.Vector3(x, y, z);
    this.geometry = new THREE.BoxGeometry(block_size, block_size, 1);
   // this.material = new Physijs.createMaterial(new THREE.MeshStandardMaterial(), .95, 0);
    
    var uniforms = {
        lightPos:{value: light.position},
        color:{value: new THREE.Vector3(122, 233, 239)}
    }
    this.material = new Physijs.createMaterial(new createCustomMaterialFromGLSLCode("RimLightFragShader", uniforms), .95, 0);
    this.mesh = new Physijs.BoxMesh(this.geometry, this.material);
    this.mesh.mass = 0;
    this.mesh.position.set(x, y, z);
}

function MovingBlock(x, y, z, light, dir_vector){
    Block.call(this, x, y, z, light);
    this.direction = dir_vector;
    this.start = new THREE.Vector3(x, y, z);
    this.mesh.mass = 1;
    this.start_rotation = this.mesh.rotation;
    this.timer = new THREE.Clock();
}

Block.prototype.update = function(){
    
}

MovingBlock.prototype.update = function(){
    
    if(this.timer.getElapsedTime() > 6){
        this.direction.multiplyScalar(-1);
        this.timer.stop();
        this.timer.start();
    }

    this.mesh.setLinearVelocity(this.direction);

}