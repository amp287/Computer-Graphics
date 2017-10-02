function BulletStandard(locationVector, forceVector) {
    var geometry =  new THREE.SphereGeometry( 3 );
    var material = Physijs.createMaterial( new THREE.MeshLambertMaterial({color:'white'}), 1, 1 );
    this.ball = new Physijs.SphereMesh(geometry, material);
    this.ball.position = locationVector;
    this.ball.name = "ball Standard";
    scene.add(this.ball);
    this.time = new THREE.Clock();
    this.ball.setLinearVelocity(forceVector);
}

BulletStandard.prototype.destroy = function(scene){

}

BulletStandard.prototype.update = function(){
    console.log("Ball length:" + this.ball.getLinearVelocity().length());
    if(this.time.getElapsedTime() > 3){
        scene.remove(this.ball);
        this.time.stop();
        return 1;
    }
    return 0;
}


function Bullet_BIG_BOY(locationVector, directionVector){
    var geometry =  new THREE.SphereGeometry( 10 );
    var material = Physijs.createMaterial( new THREE.MeshLambertMaterial({color:'white'}), 1, 1 );
    this.ball = new Physijs.SphereMesh(geometry, material);
    this.ball.position = locationVector;
    this.ball.name = "ball Standard";
    scene.add(this.ball);
    this.time = new THREE.Clock();
    this.ball.setLinearVelocity(directionVector);
}

Bullet_BIG_BOY.prototype.update = function(){
    if(this.time.getElapsedTime() > 3){
        scene.remove(this.ball);
        this.time.stop();
        return 1;
    }
    return 0;
}
