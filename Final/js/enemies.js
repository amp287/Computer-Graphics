function FallingWall(x, y, z, timing){
    this.geometry = new THREE.BoxGeometry(block_size, block_size, block_size);
    this.material = new Physijs.createMaterial(new THREE.MeshPhongMaterial({color:"white"}), 0, 0);
    this.mesh = new Physijs.BoxMesh(this.geometry, this.material);
    this.timer = new THREE.Clock();
    this.timing = timing;
    this.down = false;
    this.speed = 2;
    this.hit_bottom = false;
    
    this.mesh.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
    // `this` has collided with `other_object` with an impact speed of `relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`
        if(other_object.name != "Player"){
            this.hit_bottom = true;
        }
    });
}

FallingWall.prototype.update = function(){
    if(this.down && !this.hit_bottom){
        this.setLinearVelocity(new THREE.Vector3(0, 0, -speed));
    }
    
    if(this.hit_bottom){
        this.down = false;
    }
}