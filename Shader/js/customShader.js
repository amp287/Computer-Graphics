function loadShader(shadertype) 
{
    return document.getElementById(shadertype).textContent;
}

function createCustomMaterialFromGLSLCode(fragmentName)
{
    var frag = loadShader(fragmentName);
    var vert = loadShader("vertexSimple");
    var shaderMaterial = new THREE.ShaderMaterial({vertexShader:vert,fragmentShader:frag});
    return shaderMaterial;
}
