var thwomp = new Audio("sounds/Super Mario 64 Thwomp Sound.mp3");

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
        thwomp.play();
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

function Ball(x, y, z){
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new Physijs.createMaterial(new THREE.MeshPhongMaterial({color:"white"}), .95, .95);
    this.mesh = new Physijs.BoxMesh(this.geometry, this.material);
    this.mesh.position.set(x, y, z);
    this.fwd_cam =  new THREE.PerspectiveCamera( 75, 1, 1, 1000 );
    this.fwd_cam.rotateY((180 * Math.PI) / 180);
    //this.fwd_cam.rotateY((180 * Math.PI) / 180);
    //this.mesh.rotateX((90 * Math.PI) / 180);
    //this.mesh.rotateY((180 * Math.PI) / 180);
    this.mesh.add(this.fwd_cam);
    
    this.mesh.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
    // `this` has collided with `other_object` with an impact speed of `relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`
        if(other_object.name == "Player"){
            player.attacked();
            console.log("ATTACKED");
        } 

    });
}

Ball.prototype.update = function(){
    var distance = new THREE.Vector3();
    distance.subVectors(this.mesh.position, player.mesh.position);

    if(distance.length() < 5){
        this.chase(distance);
    }
}

Ball.prototype.chase = function(dir_vec){
    var fwd_vec = new THREE.Vector3();
    var spin = new THREE.Vector3();
    dir_vec.normalize();
    this.fwd_cam.getWorldDirection(fwd_vec);
    spin.set(player.mesh.position.x, player.mesh.position.y, 1);
    this.mesh.lookAt(spin);
    this.mesh._dirtyRotation = true;
    /*if(fwd_vec != dir_vec){
       
        spin.subVectors(dir_vec, fwd_vec);
        console.log(spin);
        spin.y = 0;
        spin.z = 0;
        spin.multiplyScalar(3);
        this.mesh.setAngularVelocity(spin);
        return;
    }*/
    
    this.mesh.setLinearVelocity(fwd_vec);
}

