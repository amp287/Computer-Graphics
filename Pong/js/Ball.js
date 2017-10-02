function Ball(){
    var ballSphere = new THREE.SphereGeometry(.5);
    var ballMaterial = new THREE.MeshBasicMaterial({color:'blue'});
    this.mesh = new THREE.Mesh(ballSphere, ballMaterial);
    this.mesh.position.x = 0;
    this.mesh.position.y = 0;
    this.dirX = Math.random();
    this.dirY = Math.random();
    
    if(this.dirX > .5)  this.dirX = 1;
    else                this.dirX = -1;
    if(this.dirY > .5)  this.dirY = 1;
    else                this.dirY = -1;
    
    this.three = new Audio("sounds/3.mp3");
    this.four = new Audio("sounds/4.mp3");
    
    this.speed = 0.2;
}

Ball.prototype.update = function(){
   if( this.mesh.position.x < -4  || this.mesh.position.x > 4) {
       if(this.mesh.position.x > 0) {
          this.dirX = (Math.random() * -1) - .2;
           this.three.play();
       } else if(this.mesh.position.x < 0) {
           this.dirX = Math.random() + .2;
           this.four.play();
       }
    }

    if( this.mesh.position.y < -8.5 || this.mesh.position.y > 8.5) {
        this.speed += .01;
        this.dirY = this.dirY * -1;
        this.dirX = (Math.random() * 2) - 1;
    }
    this.mesh.position.x += this.dirX * this.speed;
    this.mesh.position.y += this.dirY * this.speed;
}

Ball.prototype.reset = function(){
    this.mesh.position.x = 0;
    this.mesh.position.y = 0;
    if(this.dirX > .5)  this.dirX = 1;
    else                this.dirX = -1;
    if(this.dirY > .5)  this.dirY = 1;
    else                this.dirY = -1;
    this.speed = 0.2;
}