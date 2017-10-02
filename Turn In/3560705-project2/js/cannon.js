var hAngle = 0;
var vAngle = 0;
var turnSpeed = 1;
var ammo_selected = 0;
var cannonSound;

function Cannon(x, y, z) {
    var cannonLength = 30;
    var geom = new THREE.CylinderGeometry(5, 5, 35, 32);
    var mat = new THREE.MeshLambertMaterial({color:'white'});
    
    mat.color.setHex(0xb6bbc4);

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
    this.mesh.rotateZ((90 * Math.PI) / 180);
    
    this.forwardVector = new THREE.Vector3(1, 0, 0);
    
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.camera.position = new THREE.Vector3(x, y, z + 10);
    this.camera.up.set(0, 0, 1);
    this.camera.rotateX((90 * Math.PI) / 180);
    this.camera.rotateY((-90 * Math.PI) / 180);
    
    var baseGeom = new THREE.SphereGeometry(20, 20, 20);
    var baseMat = new THREE.MeshLambertMaterial();
    baseMat.color.setHex(0x404449);
    var cannonbase = new THREE.Mesh(baseGeom, baseMat);
    cannonbase.position = new THREE.Vector3(x - 10, y, z - 5);
    scene.add(cannonbase);
    
    this.timer = new THREE.Clock(false);
}

Cannon.prototype.rotate = function(){
    var newPos = this.mesh.position.x + (this.width/2 + this.speed) * xDir;

    if(newPos <= 5 && newPos >= -5)
            this.mesh.position.x += this.speed * xDir;
}

Cannon.prototype.pitch = function(dir){
    if(vAngle + (turnSpeed * dir) < -90)
        return;
    if(vAngle + (turnSpeed * dir) > 0)
        return;
    vAngle += turnSpeed * dir;
    var angle = (turnSpeed * dir * Math.PI) / 180;
    this.mesh.rotateX(angle);
    this.camera.rotateX(-1 * angle);
    var axis = new THREE.Vector3(0,1,0);
    this.forwardVector.normalize();
    this.forwardVector.applyAxisAngle(axis, angle);
    console.log("Forward vector = " + this.forwardVector.x, + "," + this.forwardVector.y + "," + this.forwardVector.z);
}

Cannon.prototype.yaw = function(dir){
    if(hAngle + (turnSpeed * dir) < -45)
        return;
    if(hAngle + (turnSpeed * dir) > 45)
        return;
    hAngle += turnSpeed * dir;
    var angle = (turnSpeed * dir * Math.PI) / 180;
    this.mesh.rotateZ(angle);
    this.camera.rotateY(angle);
    var axis = new THREE.Vector3(0,0,1);
    this.forwardVector.normalize();
    this.forwardVector.applyAxisAngle(axis, angle);
    console.log("Forward vector = " + this.forwardVector.x, + "," + this.forwardVector.y + "," + this.forwardVector.z);
}

Cannon.prototype.fire = function(){
    var direction = new THREE.Vector3(0, 0, -1);
    var position = new THREE.Vector3();
    position.addVectors(this.mesh.position, this.forwardVector.multiplyScalar(10));
    position = position.add(this.forwardVector);
    direction.applyQuaternion(this.camera.quaternion);
    direction.multiplyScalar(200);
    console.log("position:" + position.x + " " + position.y + " " + position.z);
    cannonSound.play();
    if(ammo_selected == 0)
        return new BulletStandard(position, direction);
    if(ammo_selected == 1){
        console.log(direction);
        return new Bullet_BIG_BOY(position, direction);
    }
}

Cannon.prototype.switchAmmo = function(ammo){

    if(ammo_selected == ammo)
        return;
    
    if(ammo == 0){
        console.log("ammo0");
        ammo_selected = 0;
        document.getElementById("ammo1_selected").id = "ammo1";
        document.getElementById("ammo0").id = "ammo0_selected";
    }
    
    if(ammo == 1){
        ammo_selected = 1;
        console.log("ammo1");
        console.log(document.getElementById("ammo_selected"));
        document.getElementById("ammo0_selected").id = "ammo0";
        document.getElementById("ammo1").id = "ammo1_selected";
    }


}