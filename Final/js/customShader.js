function loadShader(shadertype) 
{
    return document.getElementById(shadertype).textContent;
}

function createCustomMaterialFromGLSLCode(fragmentName, uniforms)
{
    var frag = loadShader(fragmentName);
    var vert = loadShader("VertexShader");
    var shaderMaterial = new THREE.ShaderMaterial({uniforms: uniforms, vertexShader:vert,fragmentShader:frag});
    return shaderMaterial;
}
