var matrix = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

var grid = new PF.Grid(matrix);
var finder = new PF.AStarFinder();

function Ghosts(x, y){
    var material = new THREE.MeshLambertMaterial();
    material.color.setHex(Math.random() * 0xffffff );
    var geom = new THREE.SphereGeometry(8);
    this.position = new THREE.Vector2();
    this.mesh = new THREE.Mesh(geom, material);
    this.mesh.position.set(x, y, 5);
    this.moveTo = new THREE.Vector3(x, y, 5);
    this.timerStart = true;
    this.speed = Math.random() * .3 + .1;
    this.delay = Math.random() * 3 + 1;
    console.log(this.delay);
    this.time = new THREE.Clock();
    scene.add(this.mesh);
}

Ghosts.prototype.update = function(){
    if(this.time != null){
        if(this.timerStart)
        {
            this.time.start();
            this.timerStart = false;
            return;
        }
    
        if(this.time.getElapsedTime() >= this.delay)
        {
                this.time = null;
        }
        return;
    }
        
    var vector = new THREE.Vector3();

    var at = getCell(this.mesh.position.x, this.mesh.position.y);

    var go = getCell(player.position.x, player.position.y);

    var gridBackup = grid.clone();
    var path = finder.findPath(at.x, at.y, go.x, go.y, gridBackup);
    
    if(at.equals(go)){
        lose = true;
        return;
    }
    
    if(path.length > 0){
        this.moveTo = getPosition(path[1][0], path[1][1]);
        this.moving = true;
    }
    
    vector.subVectors(this.moveTo, this.mesh.position);
    vector.normalize();
    vector.multiplyScalar(this.speed);
    this.mesh.position.add(vector);
}
