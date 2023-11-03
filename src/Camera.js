// import cube from "./Cube.js";

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.05, 1000 );

/**
 * Posee un objeto camara dentro de la funcion que realiza movimientos para seguir a una determinada distancia.
 * @param {*} objectToFollow  Es el objeto que la camara seguira.
 * @param {*} setLookBehind Es un parametro boolean que cuando es True, la camara se posicionara delante del objectToFollow y mirara al objeto por delante de el.
 */
function FollowObject(objectToFollow, setLookBehind) {

    /* Determina la posicion actual del objeto a seguir. */
    const targetPosition = objectToFollow.position.clone();  
    let offset;
    /* Ajusta el desplazamiento según tus necesidades utilizando offset */
    /* Vector3 es un Vector con que compara la posicion  */
    if (setLookBehind) offset = new THREE.Vector3(0, objectToFollow.geometry.parameters.height / 2 ,  objectToFollow.geometry.parameters.depth * 2);
    else offset = new THREE.Vector3(0, objectToFollow.geometry.parameters.height / 2, - objectToFollow.geometry.parameters.depth * 2);

    /* Posicion final sera la posicion actual del objeto + la posicion determinada por el Vector3. */
    const finalCameraPosition = targetPosition.clone().add(offset);
  
    /* Ajustar Posición de la Camara respecto al Objeto */
    camera.position.lerp(finalCameraPosition, 0.5); 
  
    camera.lookAt(targetPosition);
}

export {camera, FollowObject}; //Export Objects and Methods.