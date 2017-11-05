var vShader3 = 
'\n' + 
'void main()\n'+
'{ \n'+
'	gl_Position = projectionMatrix * \n'+
'		modelViewMatrix * \n'+
'		vec4(position,1.0); \n'+
'} \n'+
'\n';

var fShader3 =
'\n' + 
'uniform float red; \n'+
'uniform float green; \n'+
'uniform float blue; \n'+
'void main()  \n'+
'{ \n'+
'	gl_FragColor = vec4(red, \n'+
'						green, \n'+
'						blue, \n'+
'						1.0); \n'+
'} \n'+
'\n';

var uniforms3 = { red: {type: 'f', value: 1.0 }, green: {type: 'f', value: 0.0 }, blue: {type: 'f', value: 1.0 } }

	function createCustomMaterialFromGLSLCode3()
	{
		var shaderMaterial = new THREE.ShaderMaterial({uniforms:uniforms3,vertexShader:vShader3,fragmentShader:fShader3});
		return shaderMaterial;
	}
