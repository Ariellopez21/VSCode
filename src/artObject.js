// Relaciones 16:9 ; 9:16 ; 1:1
/* Creación de Objetos Marco que cada uno va a tener una img del arte. */
/*
function CreateArtBox(nameArt, pathArt) {
  const geometry = new THREE.PlaneGeometry( 1, 1);
  const textureLoader = new THREE.TextureLoader();
  var artObject;
  textureLoader.load( pathArt, (texture) => {
    const material = new THREE.MeshBasicMaterial( { map: texture } );
    artObject = new THREE.Mesh(geometry, material);
    //artObject.material.needsUpdate = true;  
    artObject.scale.set(0.2, 2, 1);
    
  });
  //artObject.name = nameArt;
  return artObject;
}*/
//const marco = CreateArtBox('primerArte', '../img/art/spiderman.jpg');
import {camera} from "./Camera.js";
import {referenceObject} from "./referenceObject.js";

/**
 * Asigna caracteristicas al objeto que se crea (por ahora solo paredes)
 * @param {String} name nombre del arte
 * @param {float} sx tamanho en largo
 * @param {float} sy tamanho en alto
 * @param {float} rotationX rotacion sobre el eje x largo en radianes
 * @param {String} path ruta de la textura del objeto a usar
 * @returns {THREE.Mesh} retorna un objeto3D con las características asignadas.
 */
function CreateArtBox(name, sx, sy, rotationX, path) {

  const geometry = new THREE.PlaneGeometry( sx, sy );
  const material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide } );
  const artObject = new THREE.Mesh( geometry, material );
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load( path, (texture) => {
    artObject.material.map = texture;
    artObject.material.needsUpdate = true;
    artObject.scale.set( 0.5, 0.2, 0.00001 );
  });
  artObject.rotation.x = Math.PI * rotationX;
  artObject.name = name;

  return artObject;
}
function FollowArt(objectToFollow) {

  /* Determina la posicion que debe tener el objeto de ref. */
  referenceObject.position.set(
    objectToFollow.position.x, 
    objectToFollow.position.y - referenceObject.geometry.parameters.height / 2, 
    - referenceObject.geometry.parameters.depth * 3 /4
  );
  /* Determina la posicion actual del arte a seguir. */
  const targetPosition = 
    new THREE.Vector3(
      objectToFollow.position.x, 
      objectToFollow.position.y - referenceObject.geometry.parameters.height , 
      referenceObject.geometry.parameters.depth / 2
    );

  /* Posicion final sera la posicion actual del objeto + la posicion determinada por el Vector3. */
  const finalCameraPosition = targetPosition.clone(); //.add(offset);

  /* Ajustar Posición de la Camara respecto al Objeto */
  camera.position.lerp(finalCameraPosition, 1); 

  camera.lookAt(targetPosition);
}

/*function artRotation(artArray, index) {
  if(index > 3) index = 0;
  if(index < 0) index = 3;
  console.log(index);
  FollowArt(artArray[index]);
  return index;
}*/

const artArray = [];
//artArray.push(marco); artArray.push(art1); artArray.push(art2); artArray.push(art3);


const marco = CreateArtBox("spiderman", 1, 1, 0, "/img/art/spiderman.jpg");
const art1 = CreateArtBox("aurora", 1, 1, 0, "/img/art/aurora.jpg");
const art2 = CreateArtBox("cr7", 1, 1.5, 0, "/img/art/cr7.jpg");
const art3 = CreateArtBox("vertical", 1, 1, 0, "/img/tests/artVertical.png");
const slide1 = CreateArtBox("slide1", 2, 2, 0, "/img/menu/slide1.jpg");
const slide2 = CreateArtBox("slide2", 2, 2.5, 0, "/img/menu/slide2.jpg");
const slide3 = CreateArtBox("slide3", 2, 3, 0, "/img/menu/slide3.jpg");
const space = CreateArtBox("space", 1.2, 1, 0, "/img/menu/space.jpg");

export {marco, art1, art2, art3, slide1, slide2, slide3, space, FollowArt}; //Export Object.