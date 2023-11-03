
const geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
const material = new THREE.MeshBasicMaterial( { side: THREE.DoubleSide } );
const referenceObject = new THREE.Mesh( geometry, material );

referenceObject.name = 'cubo'; 
referenceObject.visible = false;    // Por defecto False.

export {referenceObject}; //Export Object.