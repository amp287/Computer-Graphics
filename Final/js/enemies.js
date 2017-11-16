var thwomp = new Audio("sounds/Super Mario 64 Thwomp Sound.mp3");
var enemy_num = 0;
var enemy_mesh;

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
    this.fwd_cam.up = new THREE.Vector3(0, 0 , 1);
    this.fwd_cam.rotateY((180 * Math.PI) / 180);
    this.attacked_bool = false;
    this.mesh.material.visible = false;
    this.model = null;
    //this.fwd_cam.rotateY((180 * Math.PI) / 180);
    //this.mesh.rotateX((90 * Math.PI) / 180);
    //this.mesh.rotateY((180 * Math.PI) / 180);
    this.mesh.add(this.fwd_cam);
    this.mesh.name = "enemy" + " " + enemy_num;
    this.mesh.rotateY((-90 * Math.PI) / 180);
    enemy_num++;
    this.attacked_timer = new THREE.Clock({autostart:false});
    //scene.add(this.mesh);
    this.mesh.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
    // `this` has collided with `other_object` with an impact speed of `relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`
        if(other_object.name == "player"){
            if(!player.attacking){
                var vector = new THREE.Vector3();
                var enemy = enemy_list[this.name.split(" ")[1]];
                enemy.attacked_bool = true;
                enemy.attacked_timer.start();
                vector.subVectors(player.mesh.position, enemy.mesh.position);
                player.attacked(vector);
                var vector = new THREE.Vector3();                
            }
        } 
    });
}

Ball.prototype.update = function(){
    var distance = new THREE.Vector3();
    distance.subVectors(this.mesh.position, player.mesh.position);
    
    if(this.attacked_bool){
       if(this.attacked_timer.getElapsedTime() > 1){
           this.attacked_bool = false;
           this.attacked_timer.stop();
       } 
    } else if(distance.length() < 5){
        this.chase(distance);
    }
    
}

function enemy_init(){
    console.log(enemy_mesh);
    for(i = 0; i < enemy_list.length; i++){
        var enemy = enemy_list[i];
        enemy.model = enemy_mesh.clone();
        enemy.mesh.add(enemy.model);
        enemy.model.rotateX((-90 * Math.PI) / 180);
        enemy.model.rotateZ((-90 * Math.PI) / 180);
        //enemy.model.rotateY((180 * Math.PI) / 180);
        scene.add(enemy.mesh);
        enemy.mesh.setAngularFactor(new THREE.Vector3(1, 1, 0));
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
    
    this.mesh.setLinearVelocity(fwd_vec);
}

Ball.prototype.attacked = function(dir_vec){
    this.attacked_bool = true;
    this.attacked_timer.start();
    dir_vec.multiplyScalar(10);
    this.mesh.setLinearVelocity(dir_vec);
}
