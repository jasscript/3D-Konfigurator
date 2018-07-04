
let renderer,
  camera,
  light,
  tShirt;

const zeichenflaeche = document.querySelector('#zeichenflaeche')
const uhr = new THREE.Clock();

let scene = new THREE.Scene();

light = new THREE.DirectionalLight( 0xE7EFE2, 0.8 );
light.position.set(1,1,-1)

scene.add( light );

light = new THREE.AmbientLight( 0xffffff, 0.2 );
scene.add( light );

renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
zeichenflaeche.appendChild( renderer.domElement );

// Kamera
camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 8000 );
camera.position.set( -220, 500, -700 );

// Kamera Controlle
let cameraControl = new THREE.OrbitControls(camera, renderer.domElement);
cameraControl.target.set(0,360,0);


let mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('../models/');
mtlLoader.load('tee_male.mtl', function ( materials ) {
  materials.preload();
  console.log(mtlLoader);








  let objLoader = new THREE.OBJLoader();
  objLoader.setMaterials(materials);


  objLoader.setPath('../models/');
  objLoader.load('tee_male.obj', function ( object ) {
      object.rotation.x = -1.7;
      object.rotation.z = 0.2;
      object.position.y = innerHeight / 2;



      /*
      // Vogel
                  var vogel = new THREE.Object3D();
                  erstellTrinkvogel( vogel );
                  welt.add( vogel );
      */

      tShirt = objLoader;
      scene.add( object)
      scene.add( object);



    }, function ( xhr ) {

      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    // called when loading has errors
    function ( error ) {

      console.log( 'An error happened' );
    });
});


function animate() {


  requestAnimationFrame( animate );
  render();
}
function render() {
  let delta = uhr.getDelta();
  cameraControl.update(delta);
  renderer.render( scene, camera );
}


try {
  animate();
} catch(e) {
  let errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
  document.querySelector('#zeichenflaeche').append(errorReport+e);
}
// Erzeugen der T-Shirtfarbe Elemente
const red = document.querySelector('#red');
const green = document.querySelector('#green');
const blue = document.querySelector('#blue');

// Erzeugen der Krageb Farbe Elemente
const cRed = document.querySelector('#cRed');
const cGreen = document.querySelector('#cGreen');
const cBlue = document.querySelector('#cBlue');

// Events um die Unifarbe des T-Shirts zu ändern
red.addEventListener('click', function() {
  tShirt.materials.materials.Main_0_0.color.setHex(0xFF0000);
  tShirt.materials.materials.Main_0_2.color.setHex(0xFF0000);
  tShirt.materials.materials.druckdesign.color.setHex(0xFF0000);
  tShirt.materials.materials.Shadow_0_1.color.setHex(0xFF0000);
  tShirt.materials.materials.Shadow_0_3.color.setHex(0xFF0000);
  tShirt.materials.materials.Collar_Band_0_4.color.setHex(0xFF0000);
  tShirt.materials.materials.Collar_Band_0_5.color.setHex(0xFF0000);
  console.log(tShirt.materials.materials)
});

green.addEventListener('click', function() {
  tShirt.materials.materials.Main_0_0.color.setHex(0x00FF00);
  tShirt.materials.materials.Main_0_2.color.setHex(0x00FF00);
  tShirt.materials.materials.druckdesign.color.setHex(0x00FF00);
  tShirt.materials.materials.Shadow_0_1.color.setHex(0x00FF00);
  tShirt.materials.materials.Shadow_0_3.color.setHex(0x00FF00);
  tShirt.materials.materials.Collar_Band_0_4.color.setHex(0x00FF00);
  tShirt.materials.materials.Collar_Band_0_5.color.setHex(0x00FF00);
});

blue.addEventListener('click', function() {
  tShirt.materials.materials.Main_0_0.color.setHex(0x0000FF);
  tShirt.materials.materials.Main_0_2.color.setHex(0x0000FF);
  tShirt.materials.materials.druckdesign.color.setHex(0x0000FF);
  tShirt.materials.materials.Shadow_0_1.color.setHex(0x0000FF);
  tShirt.materials.materials.Shadow_0_3.color.setHex(0x0000FF);
  tShirt.materials.materials.Collar_Band_0_4.color.setHex(0x0000FF);
  tShirt.materials.materials.Collar_Band_0_5.color.setHex(0x0000FF);
});

// Events um die Kragenfarbe zu ändern
cRed.addEventListener('click', function() {
  tShirt.materials.materials.Collar_Band_0_4.color.setHex(0xFF0000);
  tShirt.materials.materials.Collar_Band_0_5.color.setHex(0xFF0000);
})

cGreen.addEventListener('click', function() {
  tShirt.materials.materials.Collar_Band_0_4.color.setHex(0x00FF00);
  tShirt.materials.materials.Collar_Band_0_5.color.setHex(0x00FF00);
})

cBlue.addEventListener('click', function() {
  tShirt.materials.materials.Collar_Band_0_4.color.setHex(0x0000FF);
  tShirt.materials.materials.Collar_Band_0_5.color.setHex(0x0000FF);
})

//funktion um Kragen Menü zu erstellen

function makeCollar() {
  if(collar.children.length > 1) {
    console.log('test')
  }

  for( let i = 0; i < array.length; i++) {

    const li = document.createElement('li');
    const button = document.createElement('button');
    li.setAttribute("id", array[i]);

    collar.appendChild(li);
    li.appendChild(button)
    console.log(collar)

  }
}



function renderShirt( shirt ){

}

function renderTexture( texture ) {
  let textureLoader = new THREE.TextureLoader();
  textureLoader.setPath('../models/')
  textureLoader.load('jersey_col.png', texture =>
  {
    let cone = new THREE.MeshBasicMaterial({map: texture});
    console.log(cone)
    texture.add(cone);
  });
}
/*
function erstellTrinkvogel(vvogel) {
  var support = new THREE.Object3D();
  var body = new THREE.Object3D();
  var head = new THREE.Object3D();

  // Modele
  // Grundplatte, Beine und Fuesse
  modelUnterstuezung(support);

  // Körper und Kopf verbindung
  erstelleKoerper(body);

  // Kopf und Hut
  erstelleKopf(head);

  // make moving piece

  var bodyhead = new THREE.Object3D();
  bodyhead.add(body);
  bodyhead.add(head);

  vvogel.add(support);
  vvogel.add(bodyhead);
}
*/
