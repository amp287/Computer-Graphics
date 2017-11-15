var block_list = [];
var enemy_list = [];
var map;
function generateMap(light){
    map = new Map();
    var leftTop = new THREE.Vector3(0, 0, 0);
    var level = 0;
    
    for(i = 0; i < map.width * map.height; i++){
        var cube;
        var tokens;
        
        if(i % map.width == 0 && i != 0)
            level++;
        
        tokens = map.grid[i].split(" ");
        
        var x, y, z;
            x = leftTop.x;
            y = leftTop.y;
            x += (block_size * (i % map.width));
            y -= block_size * level;
            z = leftTop.z;
        
        if(tokens[0] == "-"){
            if(tokens.length > 2)
                z += tokens[1];
            
            cube = new Block(x, y, z, light, null);

            block_list.push(cube);
            
            scene.add(cube.mesh);
            cube.mesh.setAngularFactor(new THREE.Vector3(0, 0, 0));
            cube.mesh.setLinearFactor(new THREE.Vector3(1, 1, 0));
        } else if(tokens[0] == "<-"){
            
            if(tokens.length > 4)
                z += tokens[3];
            
            cube = new MovingBlock(x, y, z, light, new THREE.Vector3(-1, 0, 0), new THREE.Vector3(244, 149, 66), tokens[1], tokens[2]);
            
            block_list.push(cube);
            
            scene.add(cube.mesh);
            cube.mesh.setAngularFactor(new THREE.Vector3(0, 0, 0));
            cube.mesh.setLinearFactor(new THREE.Vector3(1, 1, 0));
        } else if(tokens[0] == '->'){
           
            if(tokens.length > 4)
                z += tokens[3];
            
            cube = new MovingBlock(x, y, z, light, new THREE.Vector3(1, 0, 0), new THREE.Vector3(244, 149, 66), tokens[1], tokens[2]);
            
            block_list.push(cube);
            
            scene.add(cube.mesh);
            cube.mesh.setAngularFactor(new THREE.Vector3(0, 0, 0));
            cube.mesh.setLinearFactor(new THREE.Vector3(1, 1, 0));
            
        } else if(tokens[0] == '^'){
            
            if(tokens.length > 4)
                z += tokens[3];
            
            cube = new MovingBlock(x, y, z, light, new THREE.Vector3(0, 1, 0), new THREE.Vector3(72, 244, 66), tokens[1], tokens[2]);
            
            block_list.push(cube);
            
            scene.add(cube.mesh);
            cube.mesh.setAngularFactor(new THREE.Vector3(0, 0, 0));
            cube.mesh.setLinearFactor(new THREE.Vector3(1, 1, 0));
            
        } else if(tokens[0] == "+"){
            
            if(tokens.length > 2)
                z += tokens[1];
            
            cube = new WallBlock(x, y, leftTop.z, light, null);
            
            scene.add(cube.mesh);
            cube.mesh.setAngularFactor(new THREE.Vector3(0, 0, 0));
            cube.mesh.setLinearFactor(new THREE.Vector3(0, 0, 0));
            
        }
        
        if(cube != null){

        }

    }
    
    gen_enemies();
}
    
function gen_enemies(){
    var leftTop = new THREE.Vector3(0, 0, 0);
    var level = 0;
    
    for(i = 0; i < map.width * map.height; i++){
        var enemy;
        var tokens;
        
        if(i % map.width == 0 && i != 0)
            level++;
        
        tokens = map.enemies[i].split(" ");
        
        var x, y, z;
            x = leftTop.x;
            y = leftTop.y;
            x += (block_size * (i % map.width));
            y -= block_size * level;
            z = leftTop.z + 5;
        
        if(tokens[0] == "o"){
         
        } else if(tokens[0] == "b"){
            enemy = new Ball(x, y, z);
            scene.add(enemy.mesh);
            enemy_list.push(enemy);
         
        } else if(tokens[0] == '->'){
           
        } else if(tokens[0] == '^'){
            
        } else if(tokens[0] == "+"){
            
        }
    }
}
