const scene = new THREE.Scene()

let model

const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(0, 0, 4)
scene.add(camera)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
hemiLight.position.set(0, 3, 2);
scene.add(hemiLight);


const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(sizes.width, sizes.height)
renderer.physicallyCorrectLights = true;

const canvas = document.querySelector('.canvas')
canvas.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// const spacetexture = new THREE.TextureLoader().load('textures/space.jpg');
// scene.background = spacetexture;

const gltfloader = new THREE.GLTFLoader()
gltfloader.load(
    "model/scene.gltf",
    (gltf) => {
        gltf.scene.traverse(function(child) {
            if (child.isMesh) {
                child.geometry.center()
            }
        })
        gltf.scene.scale.set(0.015, 0.015, 0.015)
        model = gltf.scene
        model.position.y = 0.15
        scene.add(model)
        tick()
    })

camera.position.x = -1.3

const clock = new THREE.Clock()
var oldtime = 0

const tick = () => {

    var elpsedtime = clock.getElapsedTime()
    var newtime = elpsedtime - oldtime
    oldtime = elpsedtime

    // Render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)

    // Animation
    model.rotation.y += newtime

}