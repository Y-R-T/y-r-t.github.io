// game.js

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 100;
camera.position.y = 50;
camera.lookAt(0, 0, 0);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建SimplexNoise实例
const simplex = new SimplexNoise();

// 地形大小
const width = 100;
const depth = 100;
const segments = 100;

// 创建平面几何体
const geometry = new THREE.PlaneGeometry(width, depth, segments, segments);

// 修改顶点高度
const vertices = geometry.attributes.position.array;
for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i];
    const y = vertices[i + 1];
    const noise = simplex.noise2D(x / 10, y / 10);
    vertices[i + 2] = noise * 10;
}
geometry.computeVertexNormals();

// 创建材质
const material = new THREE.MeshLambertMaterial({ color: 0x88cc88, wireframe: false });

// 创建网格
const terrain = new THREE.Mesh(geometry, material);
terrain.rotation.x = -Math.PI / 2;
scene.add(terrain);

// 创建光源
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// 添加环境光
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

// 渲染函数
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// 处理窗口大小改变
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
