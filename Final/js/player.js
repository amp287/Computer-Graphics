function Player(x, y, z){
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new Physijs.createMaterial(new THREE.MeshLambertMaterial({color:'yellow'}), 0, 0);
    this.mesh = new Physijs.BoxMesh( this.geometry, this.material );
    this.fwd_cam =  new THREE.PerspectiveCamera( 75, 1, 1, 1000 );
    this.fwd_cam.rotateX((90 * Math.PI) / 180);
    this.mesh.add(this.fwd_cam);
    this.mesh.position.set(x, y, z);
    this.obj = new THREE.Object3D();
    this.obj.position.set(x,y,z);
    this.obj.add(camera);
    camera.position.set(0, -5, 5);
    camera.rotateX((-25 * Math.PI) / 180);
    
    this.mesh.name = "player";
    this.jumped = false;
    scene.add(this.obj);
    scene.add(this.mesh);
}

Player.prototype.update = function(){
        
    var velocity = new THREE.Vector3();
    var check_jump = new THREE.Vector3();

    check_jump = this.mesh.getLinearVelocity();
    
    this.fwd_cam.getWorldDirection(velocity);
    if(Math.abs(check_jump.z) < .1)
        velocity.multiplyScalar(12);
    else
        velocity.multiplyScalar(5);

    velocity.z = this.mesh.getLinearVelocity().z;

    if(Key.isDown(Key.W)) {
        this.mesh.setLinearVelocity(velocity);
    } else if(Key.isDown(Key.S)) {
        velocity.multiplyScalar(-1);
        this.mesh.setLinearVelocity(velocity);
    } else {
        var temp = this.mesh.getLinearVelocity();
        temp.x = 0;
        temp.y = 0;
        this.mesh.setLinearVelocity(temp);

    }

    if(Key.isDown(Key.A)) {
        var force = new THREE.Vector3(0, 0, 5);
        this.mesh.setAngularVelocity(force)
    } else if( Key.isDown( Key.D ) ) {
        var force = new THREE.Vector3(0, 0, -5);
        this.mesh.setAngularVelocity(force)
    } else {
       this.mesh.setAngularVelocity(new THREE.Vector3(0, 0, 0));  
    }

    if(Key.isDown(Key.LEFTARROW)){
        this.obj.rotateZ((2 * Math.PI) / 180);
    } else if(Key.isDown(Key.RIGHTARROW)){
        this.obj.rotateZ((-2 * Math.PI) / 180);
    }

    if(Key.isDown(Key.SPACE) && Math.abs(check_jump.z) < .1){
         var velocity = this.mesh.getLinearVelocity();
        this.mesh.setLinearVelocity(new THREE.Vector3(velocity.x, velocity.y, 15));
    }
    console.log(check_jump);
    this.obj.position.x = this.mesh.position.x;
    this.obj.position.y = this.mesh.position.y;
    this.obj.position.z = this.mesh.position.z;
}