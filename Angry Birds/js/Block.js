function Block(locationVector, width, height, depth) {
    var geometry = new THREE.BoxGeometry(width,height, depth);
    var material = Physijs.createMaterial( new THREE.MeshLambertMaterial({color:'white'}), .95, .3 );
    this.block = new Physijs.BoxMesh(geometry, material);
    this.block.position = locationVector;
    this.block.name = "block";
    scene.add(this.block);
    
}

function Target(locationVector, width, height, depth){
    var geometry = new THREE.BoxGeometry(width,height, depth);
    var material = Physijs.createMaterial( new THREE.MeshLambertMaterial({color:'yellow'}), .95, .3 );
    this.block = new Physijs.BoxMesh(geometry, material);
    this.block.position = locationVector;
    this.block.name = "target";
    this.status = "alive";
    scene.add(this.block);
    this.block.addEventListener( 'collision', function( other_object, linear_velocity, angular_velocity )
		{
            if(this.status != "dead"){
                if( other_object.name == "GroundPlane" ){
                score++;
                console.log("Collision with ground");
                    this.status = "dead";
			     }
            }

		});
}

function MovingBlock(locationVector){
    var geometry = new THREE.BoxGeometry(10,10, 20);
    var material = Physijs.createMaterial( new THREE.MeshLambertMaterial({color:'white'}), 0, .5 );
    this.block = new Physijs.BoxMesh(geometry, material);
    this.block.position = locationVector;
    this.block.name = "block";
    this.direction = new THREE.Vector3(0, -20, 0);
    scene.add(this.block);
    this.block.setLinearVelocity(this.direction);
    //this.block.applyCentralForce(this.direction);
}

MovingBlock.prototype.update = function(){
    console.log(this.block.position);
    if(this.block.position.y < -20){
        console.log("TURN");
        this.direction.multiplyScalar(-1);
        this.block.setLinearVelocity(this.direction);

    }
    else if(this.block.position.y > 20){
        console.log("TURN 2");
        this.direction.multiplyScalar(-1);
        this.block.setLinearVelocity(this.direction);
    }
}

function Castle1(locationVector){
    
    for(i = 0; i < 5; i++){
        var vect = new THREE.Vector3();
        var addV = new THREE.Vector3(0, 10, 0);
        addV.multiplyScalar(i);
        vect.addVectors(locationVector, addV);
        var block = new Block(vect, 10, 10, 10);
    }
    
    var vect = new THREE.Vector3();
    vect.addVectors(locationVector, new THREE.Vector3(0,0,10));
    var target = new Target(vect, 10, 10, 10);
}

function Castle2(locationVector){
    for(i = 0; i < 5; i++){
        var vect = new THREE.Vector3();
        var addV = new THREE.Vector3(-10, 5, 0);
        addV.multiplyScalar(i);
        vect.addVectors(locationVector, addV);
        var block = new Block(vect, 10, 10, 10);
         if(i == 3)
            var target = new Target(new THREE.Vector3(vect.x ,vect.y, vect.z + 15), 10, 10, 10);
    }
    
    locationVector.x -= 40;
    
    for(i = 0; i < 5; i++){
        var vect = new THREE.Vector3();
        var addV = new THREE.Vector3(-10, 5, 0);
        addV.multiplyScalar(i);
        vect.addVectors(locationVector, addV);
        var block = new Block(vect, 10, 10, 10);
    }
    
    locationVector.z += 10;
    for(i = 0; i < 5; i++){
        var vect = new THREE.Vector3();
        var addV = new THREE.Vector3(-10, 5, 0);
        addV.multiplyScalar(i);
        vect.addVectors(locationVector, addV);
        var block = new Block(vect, 10, 10, 10);
    }
}

function Castle3(locationVector){
    for(i = 0; i < 5; i++){
        var vect = new THREE.Vector3();
        var addV = new THREE.Vector3(10, 0, 0);
        addV.multiplyScalar(i);
        vect.addVectors(locationVector, addV);
        var block = new Block(vect, 10, 10, 10);
         if(i == 3)
            var target = new Target(new THREE.Vector3(vect.x ,vect.y, vect.z + 15), 10, 10, 10);
    }
    
    locationVector.y += 30;
    
    for(i = 0; i < 5; i++){
        var vect = new THREE.Vector3();
        var addV = new THREE.Vector3(-10, 5, 0);
        addV.multiplyScalar(i);
        vect.addVectors(locationVector, addV);
        var block = new Block(vect, 10, 10, 10);
    }
    
    locationVector.z += 10;
    for(i = 0; i < 5; i++){
        var vect = new THREE.Vector3();
        var addV = new THREE.Vector3(-10, 5, 0);
        addV.multiplyScalar(i);
        vect.addVectors(locationVector, addV);
        var block = new Block(vect, 10, 10, 10);
    }

}

function Castle4(locationVector){
     for(i = 0; i < 5; i++){
        var vect = new THREE.Vector3();
        var addV = new THREE.Vector3(1, 12, 0);
        addV.multiplyScalar(i);
        vect.addVectors(locationVector, addV);
        var block = new Block(vect, 10, 10, 10);
         if(i == 3)
            var target = new Target(new THREE.Vector3(vect.x ,vect.y, vect.z + 15), 10, 10, 10);
    }
    
    locationVector.x -=10;
    
    for(i = 0; i < 5; i++){
        var vect = new THREE.Vector3();
        var addV = new THREE.Vector3(1, 12, 0);
        addV.multiplyScalar(i);
        vect.addVectors(locationVector, addV);
        var block = new Block(vect, 10, 10, 10);
    }
    
    locationVector.z += 10;
    for(i = 0; i < 5; i++){
        var vect = new THREE.Vector3();2
        var addV = new THREE.Vector3(1, 12, 0);
        addV.multiplyScalar(i);
        vect.addVectors(locationVector, addV);
        var block = new Block(vect, 10, 10, 10);
    }
     locationVector.x -=10;
    for(i = 0; i < 5; i++){
        var vect = new THREE.Vector3();2
        var addV = new THREE.Vector3(1, 12, 0);
        addV.multiplyScalar(i);
        vect.addVectors(locationVector, addV);
        var block = new Block(vect, 10, 10, 10);
    }
}
