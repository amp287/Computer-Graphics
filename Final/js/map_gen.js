function generateMap(light){
    var map = new Map();
    var leftTop = new THREE.Vector3(0, 0, 0);
    var level = 0;
    
    for(i = 0; i < map.width * map.height; i++){
        var cube;
        var ball;
        var ghost;
        
        if(i % map.width == 0 && i != 0)
            level++;
        
        if(map.grid[i] == 1){
            cube = new Block(leftTop.x, leftTop.y, leftTop.z, light);
            cube.mesh.position.x  += (block_size * (i % map.width));
            cube.mesh.position.y -= block_size * level;
            scene.add(cube.mesh);
        } else if(map.grid[i] == 2){
          
        } else if(map.grid[i] == 3){

        }
    }
}
