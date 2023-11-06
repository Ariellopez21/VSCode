// import {renderer} from "./Renderer.js";
// import {camera} from "./Camera.js";

// // Supongamos que tienes una instancia de tu canvas en una variable llamada 'renderer' y una instancia de tu escena en una variable llamada 'scene'.

// // Agregar un event listener para el clic derecho en el canvas
// renderer.domElement.addEventListener('contextmenu', function (event) {
//     event.preventDefault(); // Esto evita que aparezca el menú contextual del navegador.
  
//     // Puedes realizar acciones aquí cuando se hace clic derecho.
//     // Por ejemplo, puedes realizar una acción en función de la posición del clic en la escena.
//     const mouse = new THREE.Vector2();
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  
//     const raycaster = new THREE.Raycaster();
//     raycaster.setFromCamera(mouse, camera); // 'camera' es tu instancia de PerspectiveCamera
  
//     const intersects = raycaster.intersectObjects(scene.children, true); // Verificar si el rayo intersecta con objetos en la escena
  
//     if (intersects.length > 0) {
//       // Se hizo clic derecho en un objeto en la escena.
//       const clickedObject = intersects[0].object;
//       // Realiza acciones específicas para el objeto si es necesario.
//     }
//   });

//   export {mouse};
import {camera} from "./Camera.js";
import {renderer} from "./Renderer.js";
import {scene} from "./Scene.js";

renderer.domElement.addEventListener('click', onMouseClick, false);

function onMouseClick(event) {
  // Obtén la posición del clic en coordenadas de la ventana.
  let x = (event.clientX / window.innerWidth) * 2 - 1;
  let y = - (event.clientY / window.innerHeight) * 2 + 1;

  // Crea un rayo que parte de la cámara y pasa por la posición del clic.
  let raycaster = new THREE.Raycaster();
  let mouseVector = new THREE.Vector2(x, y);
  raycaster.setFromCamera(mouseVector, camera);

  // Encuentra objetos intersecados por el rayo.
  let intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    // El mouse hizo clic en un objeto 3D.
    let clickedObject = intersects[0].object;
    console.log("Hiciste clic!");
    console.log(clickedObject);
    // Realiza acciones específicas en función del objeto clicado.
    // Por ejemplo, puedes cambiar su color o realizar una animación.
  }
}

export {onMouseClick};