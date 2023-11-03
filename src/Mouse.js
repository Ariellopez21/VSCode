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