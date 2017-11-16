var spawn_location;
var jump_sound = new Audio("sounds/jump.mp3");

function Player(x, y, z){
    this.geometry = new THREE.BoxGeometry(.5, .5, 2);
    this.material = new Physijs.createMaterial(new THREE.MeshLambertMaterial({color:'yellow'}), 1, 0);
    this.mesh = new Physijs.BoxMesh( this.geometry, this.material );
    this.mesh.material.visible = false;
    this.fwd_cam =  new THREE.PerspectiveCamera( 75, 1, 1, 1000 );
    this.fwd_cam.rotateX((90 * Math.PI) / 180);
    this.mesh.add(this.fwd_cam);
    this.mesh.position.set(x, y, z);
    this.obj = new THREE.Object3D();
    this.obj.position.set(x,y,z);
    this.obj.add(camera);
    this.skin = null;
    this.anim_mixer = null;
    this.clips = null;
    this.currentAction = "Idle";
    this.hearts = 3;
    this.mesh.name = "player";
    camera.position.set(0, -5, 5);
    camera.rotateX((-25 * Math.PI) / 180);
    spawn_location = new THREE.Vector3(x, y, z);
    
    this.mesh.name = "player";
    this.jumped = false;
    scene.add(this.obj);
    scene.add(this.mesh);
    this.mesh.setAngularFactor(new THREE.Vector3(0, 0, 0));
    this.attacking = false;
    this.attacking_timer = new THREE.Clock({autostart:false});
    this.attacked_bool = false;
    this.attacked_timer = new THREE.Clock({autostart:false});

    this.mesh.addEventListener( 'collision', function( other_object, relative_velocity, relative_rotation, contact_normal ) {
    // `this` has collided with `other_object` with an impact speed of `relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`
        var str = other_object.name.split(" ");
        if(str[0] == "enemy"){
            if(player.attacking){
                var velocity = new THREE.Vector3();
                player.fwd_cam.getWorldDirection(velocity);
                enemy_list[parseInt(str[1])].attacked(velocity);
            }
        } 
    });
}

Player.prototype.update = function(){
    var speed = 9, turn_speed = 5;
    var velocity = new THREE.Vector3();
    var check_jump = new THREE.Vector3();
    var moving = false;
    
    this.anim_mixer.update(clock.getDelta());
    
    check_jump = this.mesh.getLinearVelocity();
    
    this.fwd_cam.getWorldDirection(velocity);
    if(Math.abs(check_jump.z) < .1){
        velocity.multiplyScalar(speed);
    } else {
        velocity.multiplyScalar(speed / 2);
        turn_speed /= 4;
    }
    
    if(this.attacking_timer.running){

        if(this.attacking_timer.getElapsedTime() > .5){
            this.attacking_timer.stop();
            this.attacking = false;
            if(this.currentAction == "Attack"){
                stopAnims();
                console.log("HI");
                this.anim_mixer.clipAction('Idle').play();
                this.currentAction = "Idle";
            }
        }
    }
    if(this.attacked_bool){
         if(this.attacked_timer.getElapsedTime() > .5){
            this.attacked_timer.stop();
            this.attacked_bool = false;
         }
    }
    
    if(!this.attacked_bool){
        if(Math.abs(check_jump.z) < .1 && this.currentAction == "Jump"){
            this.currentAction = "";
        } else if(this.currentAction == "Jump"){
             this.anim_mixer.clipAction("Jump").play();
        }

        velocity.z = this.mesh.getLinearVelocity().z;

        if(Key.isDown(Key.F) && this.attacking == false && this.currentAction != "Jump"){
            this.attacking_timer.start();
            stopAnims();
            this.anim_mixer.clipAction("Attack.002").play();
            this.currentAction = "Attack";
            this.attacking = true;
        } else if(Key.isDown(Key.W)) {
            this.mesh.setLinearVelocity(velocity);
            if(this.currentAction != "Run" && this.currentAction != "Jump"){
                stopAnims(true);
                this.anim_mixer.clipAction('Run').play();
                this.currentAction = "Run";
            }
        } else if(Key.isDown(Key.S)) {
            velocity.multiplyScalar(-1);
            this.mesh.setLinearVelocity(velocity);
            if(this.currentAction != "Run" && this.currentAction != "Jump"){
                stopAnims(true);
                this.anim_mixer.clipAction('Run').play();
                this.currentAction = "Run";
            }

        } else if(this.currentAction != "Jump"){
            var temp = this.mesh.getLinearVelocity();
            temp.x = 0;
            temp.y = 0;
            //this.mesh.setLinearVelocity(temp);
            if(this.currentAction != "Idle" &&  Math.abs(check_jump.z) < .1 && !this.attacking){
                stopAnims();
                this.anim_mixer.clipAction('Idle').play();
                this.currentAction = "Idle";
            }
        }

        if(Key.isDown(Key.A)) {
            //var force = new THREE.Vector3(0, 0, turn_speed);
            //this.mesh.setAngularVelocity(force)
            this.mesh.rotateZ((8 * Math.PI) / 180);
            this.mesh.__dirtyRotation = true;
        } else if( Key.isDown( Key.D ) ) {
            this.mesh.rotateZ((-8 * Math.PI) / 180);
            this.mesh.__dirtyRotation = true;
        } else {
           this.mesh.setAngularVelocity(new THREE.Vector3(0, 0, 0));  
        }

        if(Key.isDown(Key.E)){
            this.obj.rotateZ((3 * Math.PI) / 180);
        } else if(Key.isDown(Key.Q)){
            this.obj.rotateZ((-3 * Math.PI) / 180);
        }

        if(Key.isDown(Key.SPACE) && Math.abs(check_jump.z) < .1){
             var velocity = this.mesh.getLinearVelocity();
            this.mesh.setLinearVelocity(new THREE.Vector3(velocity.x, velocity.y, 9));
            this.anim_mixer.clipAction("Jump").play();
            this.currentAction = "Jump";
            jump_sound.play();
            jump_sound.volume = .6;
        }

        if(Key.isDown(Key.C)){
            this.obj.rotation = this.fwd_cam.rotation;
        }
    }
    
    
    this.obj.position.x = this.mesh.position.x;
    this.obj.position.y = this.mesh.position.y;
    this.obj.position.z = this.mesh.position.z;
    
    if(this.mesh.position.z < -10){
        this.hearts--;
        if(removeHeart() != 0)
            return -1;
        this.mesh.position.set(spawn_location.x, spawn_location.y, spawn_location.z);
        this.mesh.__dirtyPosition = true;
        
    }
    return 0;
}

Player.prototype.fadeAct = function(name){
    var clipFr = THREE.AnimationClip.findByName(this.clips, this.activeAction);
    var clipsTo = THREE.AnimationClip.findByName(this.clips, name);
    var from = this.anim_mixer.clipAction(clipFr).play();
    var to =  this.anim_mixer.clipAction(clipTo).play();

    from.enabled = true;
    to.enabled = true;

    if (to.loop === THREE.LoopOnce) {
        to.reset();
    }

    from.crossFadeTo(to, 0.3);
    this.activeAction = name;
}

Player.prototype.attacked = function(direction){
    this.hearts--;
    this.attacked_bool = true;
    this.attacked_timer.start();
    direction.multiplyScalar(7);
    removeHeart();
    this.mesh.setLinearVelocity(direction);
}

function stopAnims(stopAttack){
    player.anim_mixer.clipAction('Jump').stop();
    player.anim_mixer.clipAction('Run').stop();
    player.anim_mixer.clipAction('Idle').stop();
    if(!stopAttack)
        player.anim_mixer.clipAction('Attack.002').stop();
}

function removeHeart(){
    if(player.hearts == 2){
        document.getElementById("h3").style.display = "none";
        return 0;
    }
    if(player.hearts == 1){
        document.getElementById("h2").style.display = "none";
        return 0;
    }
    if(player.hearts == 0){
        document.getElementById("h1").style.display = "none";
        lose_flag = true;
        return -1;
    }
    
}