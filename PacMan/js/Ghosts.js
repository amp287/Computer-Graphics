function Ghosts(x, y){
    var material = new THREE.MeshLambertMaterial({color:'green'});
    var geom = new THREE.SphereGeometry(8);
    this.mesh = new THREE.Mesh(geom, material);
    this.mesh.position.set(x, y, 5);
    scene.add(this.mesh);
}

Ghosts.prototype.update = function(){
    var vector = new THREE.Vector3();
    
    vector.subVectors(player.position, this.mesh.position);
    vector.normalize();
    vector.multiplyScalar(0.1);
    this.mesh.position.add(vector);
}
