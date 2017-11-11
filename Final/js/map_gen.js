var block_list = [];

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
        
        if(map.grid[i] == "-"){
            cube = new Block(leftTop.x, leftTop.y, leftTop.z, light);
            cube.mesh.position.x  += (block_size * (i % map.width));
            cube.mesh.position.y -= block_size * level;
            scene.add(cube.mesh);
            block_list.push(cube);
        } else if(map.grid[i] == "<-"){
            var x, y;
            x = leftTop.x;
            y = leftTop.y;
            x += (block_size * (i % map.width));
            y -= block_size * level;
            cube = new MovingBlock(x, y, leftTop.z, light, new THREE.Vector3(-1, 0, 0));
            scene.add(cube.mesh);
            block_list.push(cube);
            cube.mesh.setAngularFactor(new THREE.Vector3(0, 0, 0));
            cube.mesh.setLinearFactor(new THREE.Vector3(1, 1, 0));
        } else if(map.grid[i] == "->"){
            var x, y;
            x = leftTop.x;
            y = leftTop.y;
            x += (block_size * (i % map.width));
            y -= block_size * level;
            cube = new MovingBlock(x, y, leftTop.z, light, new THREE.Vector3(1, 0, 0));
            scene.add(cube.mesh);
            block_list.push(cube);
            cube.mesh.setAngularFactor(new THREE.Vector3(0, 0, 0));
            cube.mesh.setLinearFactor(new THREE.Vector3(1, 1, 0));
        }
    }
}
