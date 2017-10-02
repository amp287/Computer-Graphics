function Paddle(speed, x, y, z, width, height, depth) {
    this.speed = speed;
    this.width = width;
    this.height = height;
    var geom = new THREE.BoxGeometry( width, height, depth);
    var mat = new THREE.MeshBasicMaterial();
    mat.color.setHex(Math.random() * 0xffffff );
    this.mesh = new THREE.Mesh( geom, mat );
    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
}

Paddle.prototype.move = function(xDir){
    var newPos = this.mesh.position.x + (this.width/2 + this.speed) * xDir;

    if(newPos <= 5 && newPos >= -5)
            this.mesh.position.x += this.speed * xDir;
}

Paddle.prototype.AI_move = function(ball_pos) {
    if(ball_pos > this.mesh.position.x)
        this.mesh.position.x += this.speed;
    else if(ball_pos < this.mesh.position.x)
        this.mesh.position.x -= this.speed;
     //this.mesh.position.x = ball_pos;
}