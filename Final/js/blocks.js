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

function moving_block(x, y, z, light, dir){
    Block.call(this, x, y, z, light);
    this.direction = dir;
}


moving_block.prototype.update = function(){
    
}