var vShader2 = 
'\n' + 
'varying vec3 vNormal; \n'+
'void main()\n'+
'{ \n'+
'   vNormal = normal; \n'+
'	gl_Position = projectionMatrix * \n'+
'		modelViewMatrix * \n'+
'		vec4(position,1.0); \n'+
'} \n'+
'\n';

var fShader2 =
'\n' + 
'varying vec3 vNormal; \n'+
'void main()  \n'+
'{ \n'+
'   vec3 light = vec3(0.5,0.2,1.0); \n'+
'   light = normalize(light); \n'+
'   float fProd = max(0.0,dot(vNormal,light)); \n'+
'	gl_FragColor = vec4(fProd,  // R \n'+
'						fProd,  // G \n'+
'						fProd,  // B \n'+
'						1.0);   // A \n'+
'} \n '+
'\n';
	
	function createCustomMaterialFromGLSLCode2()
	{
		var shaderMaterial = new THREE.ShaderMaterial({vertexShader:vShader2,fragmentShader:fShader2});
		return shaderMaterial;
	}
