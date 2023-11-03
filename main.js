import {scene} from "./src/Scene.js";
import {camera, FollowObject} from "./src/Camera.js";
import {renderer} from "./src/Renderer.js";
import {referenceObject} from "./src/referenceObject.js";
import {artArray, FollowArt, artRotation} from "./src/artObject.js";
import resize from "./src/Resize.js";
import * as Scenary from "./src/Scenary.js";
import loopMachine from "./src/LoopMachine.js";
import keyListener from "./src/KeyListener.js";
import KeyCode from "./src/KeyCode.js";
//import mouse from "./src/Mouse.js";

let setLookBehind = false;
let i = 0;

/*------------------------------------------------------------*/
/************************ ADD TO SCENE ************************/
/*------------------------------------------------------------*/
scene.add( 
    camera,
    referenceObject,
    artArray[0], 
    artArray[1], 
    artArray[2], 
    artArray[3] 
);
scene.add(  
    Scenary.floor,        
    Scenary.roof,
    Scenary.wallFront,
    Scenary.wallLeft, 
    Scenary.wallRight, 
    Scenary.wallBack 
);

artArray[0].material.needsUpdate = false;  
artArray[1].material.needsUpdate = false;  
artArray[2].material.needsUpdate = false;  
artArray[3].material.needsUpdate = false;  

/*------------------------------------------------------------*/
/************************ SET POSITION ************************/
/*------------------------------------------------------------*/

camera.position.set( 
    0,
    referenceObject.geometry.parameters.height * 2, 
    Scenary.wallBack.position.z + referenceObject.geometry.parameters.depth
);  
referenceObject.position.set(    
    0,
    referenceObject.geometry.parameters.height / 2, 
    camera.position.z + referenceObject.geometry.parameters.depth * 2
);
artArray[0].position.set( 
    1.5, 
    artArray[0].geometry.parameters.height / 2, 
    0
);
artArray[1].position.set( 
    -1.5, 
    artArray[1].geometry.parameters.height / 2, 
    0
);
artArray[2].position.set( 
    4.5, 
    artArray[2].geometry.parameters.height / 2, 
    0
);
artArray[3].position.set( 
    -4.5, 
    artArray[3].geometry.parameters.height / 2, 
    0
);

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
     if(keyListener.isPressed(KeyCode.ARROW_RIGHT))  referenceObject.translateX(-0.1);        
     if(keyListener.isPressed(KeyCode.ARROW_DOWN))   referenceObject.translateZ(-0.1);
     if(keyListener.isPressed(KeyCode.ARROW_UP))     referenceObject.translateZ(0.1);
     if(keyListener.isPressed(KeyCode.ARROW_LEFT))   referenceObject.translateX(0.1);

    /*------------------------------------------------------------*/
    /************************ CAMERA ZOOM *************************/
    /*------------------------------------------------------------*/

    if(keyListener.isPressed(KeyCode.KEY_Q)){
        camera.fov += 0.5; // Cambia el valor de campo de visión
        camera.updateProjectionMatrix(); // Actualiza la matriz de proyección
    }
    if(keyListener.isPressed(KeyCode.KEY_W)){
        camera.fov -= 0.5; // Cambia el valor de campo de visión
        camera.updateProjectionMatrix(); // Actualiza la matriz de proyección
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
    if(keyListener.isPressed(KeyCode.KEY_E))   setLookBehind = true;
    if(keyListener.isPressed(KeyCode.KEY_R))   setLookBehind = false;
    FollowObject(referenceObject, setLookBehind);

    /*------------------------------------------------------------*/
    /************** Set movements to ObjectToFollow ***************/
    /*------------------------------------------------------------*/
    if(keyListener.down(KeyCode.KEY_L)) {  // PRESS KEY_L TO GO TO RIGHT IMG
        i -= 1;
        i = artRotation(artArray, i);
    }
    if(keyListener.isPressed(KeyCode.KEY_K)) {  // PRESS KEY_L TO GO TO LEFT IMG
        i += 1;
        i = artRotation(artArray, i);
        console.log("camera:" + camera.position);
    } 
    renderer.render(scene, camera);
});

resize.start(renderer);
loopMachine.start();
keyListener.start();