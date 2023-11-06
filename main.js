import {scene} from "./src/Scene.js";
import {camera, FollowObject, wallLimits} from "./src/Camera.js";
import {renderer} from "./src/Renderer.js";
import {referenceObject} from "./src/referenceObject.js";
import {marco, art1, art2, art3, slide1, slide2, slide3, space, FollowArt} from "./src/artObject.js";
import resize from "./src/Resize.js";
import * as Scenary from "./src/Scenary.js";
import loopMachine from "./src/LoopMachine.js";
import keyListener from "./src/KeyListener.js";
import {KeyCode, limit} from "./src/KeyCode.js";
import {onMouseClick} from "./src/Mouse.js";
let setLookBehind = false;

let limitArr = [true, true, true, true];

/*------------------------------------------------------------*/
/************************ ADD TO SCENE ************************/
/*------------------------------------------------------------*/
scene.add( 
    camera,
    referenceObject,
    marco,
    art1,
    art2,
    art3,
    slide1, 
    slide2, 
    slide3, 
    space
);
scene.add(  
    Scenary.floor,        
    Scenary.roof,
    Scenary.wallFront,
    Scenary.wallLeft, 
    Scenary.wallRight, 
    Scenary.wallBack 
);

marco.material.needsUpdate = true;  
art1.material.needsUpdate = true;  
art2.material.needsUpdate = true;  
art3.material.needsUpdate = true;  

/*------------------------------------------------------------*/
/************************ SET POSITION ************************/
/*------------------------------------------------------------*/

camera.position.set( 
    0,
    0.5, 
    Scenary.wallBack.position.z + referenceObject.geometry.parameters.depth
);  
camera.rotateY(Math.PI);
referenceObject.position.set(    
    0,
    referenceObject.geometry.parameters.height / 2, 
    camera.position.z + referenceObject.geometry.parameters.depth * 2
);
marco.position.set( 
    1.5, 
    0.5, 
    Scenary.wallBack.position.z + 0.01
);
art1.position.set( 
    -1.5, 
    0.5,
    Scenary.wallBack.position.z + 0.01
);
art2.position.set( 
    4.5, 
    0.5,
    Scenary.wallBack.position.z + 0.01
);
art3.position.set( 
    -4.5, 
    0.5,
    Scenary.wallBack.position.z + 0.01
);
slide1.position.set(
    1.5, 
    0.5,
    Scenary.wallFront.position.z - 0.01
)
slide2.position.set(
    -1.5, 
    0.5,
    Scenary.wallFront.position.z - 0.01
)
slide3.position.set(
    4.5, 
    0.5,
    Scenary.wallFront.position.z - 0.01
)
space.position.set(
    -4.5,
    0.5,
    Scenary.wallFront.position.z - 0.01
)
console.log(camera);    
/*------------------------------------------------------------*/
/************************* START LOOP *************************/
/*------------------------------------------------------------*/

loopMachine.addCallback(() => {

    
    /*------------------------------------------------------------*/
    /**************** ObjectToFollow Transitions ******************/
    /*------------------------------------------------------------*/

    if(keyListener.isPressed(KeyCode.KEY_O))        referenceObject.position.set(0, referenceObject.geometry.parameters.height / 2, 0);
    if(keyListener.isPressed(KeyCode.ENTER))        referenceObject.translateY(0.1);
    if(keyListener.isPressed(KeyCode.BACKSPACE))    referenceObject.translateY(-0.1);

    if(keyListener.isPressed(KeyCode.ARROW_RIGHT) && limitArr[limit.right]){    // Movimiento hacía la derecha
        camera.translateX(0.025);
        wallLimits(camera, limitArr[limit.right]);
    }
    if(keyListener.isPressed(KeyCode.ARROW_DOWN) && limitArr[limit.back]){      // Movimiento hacía atrás
        camera.translateZ(0.025);
        wallLimits(camera, limitArr[limit.back]);
    }   
    if(keyListener.isPressed(KeyCode.ARROW_UP) && limitArr[limit.front]){       // Movimiento hacía adelante
        camera.translateZ(-0.025);
        wallLimits(camera, limitArr[limit.front]);
    }     
    if(keyListener.isPressed(KeyCode.ARROW_LEFT) && limitArr[limit.left]){      // Movimiento hacía la izquierda
        camera.translateX(-0.025);
        wallLimits(camera, limitArr[limit.left]);
    }   
    if(keyListener.isPressed(KeyCode.KEY_E))        camera.rotateY(0.1);        // Rotación hacía la izquierda
    if(keyListener.isPressed(KeyCode.KEY_R))        camera.rotateY(-0.1);       // Rotación hacía la derecha

    /*------------------------------------------------------------*/
    /************************ CAMERA ZOOM *************************/
    /*------------------------------------------------------------*/

    if(keyListener.isPressed(KeyCode.KEY_Q)){
        camera.fov += 0.5; // Cambia el valor de campo de visión
        camera.updateProjectionMatrix(); // Actualiza la matriz de proyección
        console.log(camera.fov);
    }
    if(keyListener.isPressed(KeyCode.KEY_W)){
        camera.fov -= 0.5; // Cambia el valor de campo de visión
        camera.updateProjectionMatrix(); // Actualiza la matriz de proyección
        console.log(camera.fov);
    }

    /*------------------------------------------------------------*/
    /************** DIFFERENT CAMERAS POSITIONS *******************/
    /*------------------------------------------------------------*/

    if(keyListener.isPressed(KeyCode.KEY_1))   camera.position.set(Scenary.wallLeft.position.x * 2,Scenary.roof.position.y * 2,  Scenary.wallBack.position.z * 2)
    if(keyListener.isPressed(KeyCode.KEY_2))   camera.position.set(Scenary.wallRight.position.x * 2,Scenary.roof.position.y * 2,  Scenary.wallBack.position.z * 2)
    if(keyListener.isPressed(KeyCode.KEY_3))   camera.position.set(Scenary.wallLeft.position.x * 2,Scenary.roof.position.y * 2, - Scenary.wallBack.position.z * 2)
    if(keyListener.isPressed(KeyCode.KEY_4))   camera.position.set(Scenary.wallRight.position.x * 2,Scenary.roof.position.y * 2, - Scenary.wallBack.position.z * 2)

    /*------------------------------------------------------------*/
    /********************* SET LOOK BEHIND ************************/
    /*------------------------------------------------------------*/
    // if(keyListener.isPressed(KeyCode.KEY_E))   setLookBehind = true;
    // if(keyListener.isPressed(KeyCode.KEY_R))   setLookBehind = false;
    //FollowObject(referenceObject, setLookBehind);

    /*------------------------------------------------------------*/
    /************** Set movements to ObjectToFollow ***************/
    /*------------------------------------------------------------*/
    /*if(keyListener.down(KeyCode.KEY_L)) {  // PRESS KEY_L TO GO TO RIGHT IMG
        i -= 1;
        i = artRotation(artArray, i);
    }
    if(keyListener.isPressed(KeyCode.KEY_K)) {  // PRESS KEY_L TO GO TO LEFT IMG
        i += 1;
        i = artRotation(artArray, i);
        console.log("camera:" + camera.position);
    } */

    renderer.render(scene, camera);
});

resize.start(renderer);
loopMachine.start();
keyListener.start();