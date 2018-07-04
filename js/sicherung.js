let zeichner,
  tShirt,
  scene,
  kamera,
  kControlle;

function objektErstellen () {
  let mtlLoader = new THREE.MTLLoader();
  mtlLoader.setPath('../texture/');
  mtlLoader.load('tee_male.mtl', function ( materials ) {
    materials.preload();

    let objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('../models/');
    objLoader.load('tee_male.obj', function ( object ) {
        console.log(object)
        scene.add( object );
      }, function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

      },
      // called when loading has errors
      function ( error ) {

        console.log( 'An error happened' );

      });
  } );
}

function sceneErstellen () {
  scene = new THREE.Scene();

  // Lichter
  /*scene.add( new THREE.AmbientLight( 0x222222 ) );
  let licht = new THREE.DirectionalLight( 0xFFFFFF, 0.7 );
  licht.position.set( 200, 500, 500 );
  scene.add( licht );
  licht = new THREE.DirectionalLight( 0xFFFFFF, 0.9 );
  licht.position.set( -200, -100, -400 );
  scene.add( licht );*/

}
function init () {
  //const bildBreite = 846;
  //const bildHoehe = 494;
  // For grading the window is fixed in size; here's general code:
  const bildBreite = window.innerWidth;
  const bildHoehe = window.innerHeight;
  const divRatio = bildBreite / bildHoehe;

  // Zeichner
  zeichner = new THREE.WebGLRenderer( { antialias: true} );
  zeichner.gammaInput = true;
  zeichner.gammaOutput = true;
  zeichner.setSize(bildBreite, bildHoehe);
  zeichner.setClearColor( 0xFFFFFF, 1.0 );

  // Kamera
  kamera = new THREE.PerspectiveCamera( 35, divRatio, 1, 8000 );
  kamera.position.set( -220, 820, -1260 );

  // Kamera Controlle
  kControlle = new THREE.OrbitControls(kamera, zeichner.domElement);
  kControlle.target.set(0,270,0);
}

function zeichenflaecheErstellen () {
  const zeichenflaeche = document.querySelector('#zeichenflaeche');
  const canvas = zeichenflaeche.getElementsByTagName('canvas');
  if (canvas.length>0) {
    zeichenflaeche.removeChild(canvas[0]);
  }
  zeichenflaeche.appendChild( zeichner.domElement );
}
function renderer() {

  kControlle.update();

  zeichner.render(scene, kamera);
}

try {
  init();
  sceneErstellen();
  zeichenflaecheErstellen();
  objektErstellen();
  renderer();
} catch(e) {
  let errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
  document.querySelector('#zeichenflaeche').append(errorReport+e);
}
