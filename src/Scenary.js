/**
 * Asigna caracteristicas al objeto que se crea (por ahora solo paredes)
 * @param {*} name nombre del objeto (por ahora solo paredes)
 * @param {*} sx tamanho en largo
 * @param {*} sy tamanho en alto
 * @param {*} rotationX rotacion sobre el eje x largo en radianes
 * @param {*} rotationY rotacion sobre el eje y en radianes
 * @param {*} path ruta de la textura del objeto a usar
 * @returns 
 */
function assignCharacteristics(name, sx, sy, rotationX, rotationY, path) {
    const geometry = new THREE.PlaneGeometry( sx, sy );
    const material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide } );
    const scenaryPlane = new THREE.Mesh( geometry, material );
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load( path, (texture) => {
        scenaryPlane.material.map = texture;
        scenaryPlane.material.needsUpdate = true;
    });
    scenaryPlane.rotation.x = Math.PI * rotationX;
    scenaryPlane.rotation.y = Math.PI * rotationY;
    scenaryPlane.name = name;

    return scenaryPlane;
}

/* Asigna las posiciones que debe tener el escenario */
function setPositions(floor, roof, front, back, right, left){
    floor.position.set( 0,
                        0,
                        0 );
    front.position.set( 0,
                        front.geometry.parameters.height / 2,
                        floor.geometry.parameters.height / 2 );
    right.position.set( - floor.geometry.parameters.width / 2,
                        right.geometry.parameters.height / 2,
                        0 );
    left.position.set( floor.geometry.parameters.width / 2,
                        left.geometry.parameters.height / 2,
                        0 );
    back.position.set( 0, 
                        back.geometry.parameters.height / 2,
                        - floor.geometry.parameters.height / 2 );
    roof.position.set( 0, 
                        front.geometry.parameters.height, 
                        0 );
}

const tamFijoX = 10, tamFijoY = 2, tamFijoZ = 2;
const floor = assignCharacteristics(    "Floor",        tamFijoX, tamFijoZ, 0.5, 0  ,   "/img/scenary/roof.jpg");
const roof = assignCharacteristics(     "Roof",         tamFijoX, tamFijoZ, 0.5, 0  ,   "/img/scenary/roof.jpg");
const wallFront = assignCharacteristics("WallFront",    tamFijoX, tamFijoY, 0  , 0  ,   "/img/scenary/roof.jpg");
const wallRight = assignCharacteristics("WallRight",    tamFijoZ, tamFijoY, 0  , 0.5,   "/img/scenary/roof.jpg");
const wallLeft = assignCharacteristics( "WallLeft",     tamFijoZ, tamFijoY, 0  , 0.5,   "/img/scenary/roof.jpg");
const wallBack = assignCharacteristics( "WallBack",     tamFijoX, tamFijoY, 0  , 0  ,   "/img/scenary/roof.jpg");

setPositions(floor, roof, wallFront, wallBack, wallRight, wallLeft);

export {floor, roof, wallFront, wallLeft, wallRight, wallBack}; //Export Objects.
