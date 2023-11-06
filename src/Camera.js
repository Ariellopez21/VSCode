// import cube from "./Cube.js";
import * as Scenary from "./Scenary.js";

const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.05, 1000 );

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

function wallLimits(camera, limit) {

    if(camera.position.z > Scenary.wallFront.position.z - 0.1){
        console.log("Limite pared Frontal");
        limit = false;
        camera.position.z -= 0.035;
    } /* Ajustar Posicionamiento respecto a Pared Frontal */
    if(camera.position.z < Scenary.wallBack.position.z + 0.1){
        console.log("Limite pared Trasera");
        limit = false;
        camera.position.z += 0.035;
    } /* Ajustar Posicionamiento respecto a Pared Trasera */
    if(camera.position.x < Scenary.wallRight.position.x + 0.1){
        console.log("Limite pared Derecha");
        limit = false;
        camera.position.x += 0.035;
    } /* Ajustar Posicionamiento respecto a Pared Lateral Derecha */
    if(camera.position.x > Scenary.wallLeft.position.x - 0.1){
        console.log("Limite pared Izquierda");
        limit = false;
        camera.position.x -= 0.035;
    } /* Ajustar Posicionamiento respecto a Pared Lateral Izquierda */
}

export {camera, FollowObject, wallLimits}; //Export Objects and Methods.