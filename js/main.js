// Variabeln initalisieren
let renderer,
    scene,
    camera,
    cameraControl,
    tShirt;

function init() {
  // Zeichenfläche
  const signArea = document.querySelector('#signArea');
  const width = window.innerWidth/2;
  const height = window.innerHeight/2;

// Definieren des WebGL Renderer und zur DOM hinzufügen
  renderer = new THREE.WebGLRenderer( { antialias: true} );
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
  renderer.setSize( width, height );
  renderer.setClearColor( 0xFEFEFE, 1.0 );
  signArea.appendChild( renderer.domElement );

  // Kamera
  camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 8000 );
  camera.position.set( -220, 500, -700 );

// Kamera Controlle
  cameraControl = new THREE.OrbitControls(camera, renderer.domElement);
  cameraControl.target.set(0,360,0);
}

/**
 * Erstellt 3D-Welt
 */
function createdWorld() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog( 0xAAAAAA, 3000, 5000 );

  // Lichter
  scene.add( new THREE.AmbientLight( 0x222222 ) );
  light = new THREE.DirectionalLight( 0xFFFFFF, 0.9 );
  light.position.set( 200, 500, 500 );
  scene.add( light );
  light = new THREE.DirectionalLight( 0xFFFFFF, 1 );
  light.position.set( -200, -150, -400 );
  scene.add( light );

  renderShirt();
}
/**
 * Erstellen des T-Shirt
 * @param shirt
 */
function renderShirt(){
  let mtlLoader = new THREE.MTLLoader();
  mtlLoader.setPath('../models/');
  mtlLoader.load('tee_male.mtl', materials => {
    mtlLoader.setMaterialOptions({invertTrProperty: 0});
    console.log(mtlLoader )
    materials.preload();


    const objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('../models/');
    objLoader.load('tee_male.obj', object => {
      object.rotation.x = -1.7;
      object.rotation.z = 0.2;
      object.position.y = innerHeight / 2;
      tShirt = objLoader;
        object.traverse (function (child) {
          if (child instanceof THREE.Mesh) {
            child.material.shininess= 0.5;
          }
        });
      scene.add( object );
    },
    function ( xhr ) {
      console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
      console.log( 'An error happened' );
    });
  });
}

function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  const clock = new THREE.Clock();
  let delta = clock.getDelta();
  cameraControl.update(delta);

  renderer.render( scene, camera );
}

// Beginn der DOM-Manipulation
// Erzeugen der T-Shirtfarbe Elemente
const red = document.querySelector('#red');
const green = document.querySelector('#green');
const blue = document.querySelector('#blue');

// Erzeugen der Kragen Farbe Elemente
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
});

cBlue.addEventListener('click', function() {
  tShirt.materials.materials.Collar_Band_0_4.color.setHex(0x0000FF);
  tShirt.materials.materials.Collar_Band_0_5.color.setHex(0x0000FF);
});

try {
  init();
  createdWorld();
  animate();
  render();

} catch(e) {
  let errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
  document.querySelector('#signArea').append(errorReport+e);
}






