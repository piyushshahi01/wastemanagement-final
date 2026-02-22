import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Landing() {
    const mountRef = useRef(null);
    const navigate = useNavigate();
    const [isExploding, setIsExploding] = useState(false);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        // Scene Setup
        const scene = new THREE.Scene();
        // Transparent background so our CSS gradients show through
        scene.background = null;

        const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        camera.position.z = 30;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mount.appendChild(renderer.domElement);

        // Particle Mesh (Digital Twin City Concept)
        const particleCount = 2000;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const originalPositions = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            // Distribute particles in a wide subtle cylinder/city-like field
            const x = (Math.random() - 0.5) * 100;
            const y = (Math.random() - 0.5) * 60;
            const z = (Math.random() - 0.5) * 50;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            originalPositions[i * 3] = x;
            originalPositions[i * 3 + 1] = y;
            originalPositions[i * 3 + 2] = z;

            velocities[i * 3] = 0;
            velocities[i * 3 + 1] = 0;
            velocities[i * 3 + 2] = 0;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Create a circular texture for particles
        const canvas = document.createElement('canvas');
        canvas.width = 16; canvas.height = 16;
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(8, 8, 8, 0, Math.PI * 2);
        ctx.fillStyle = '#10B981'; // Tailwind Green-500
        ctx.fill();
        const texture = new THREE.CanvasTexture(canvas);

        const material = new THREE.PointsMaterial({
            size: 0.5,
            map: texture,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        const particles = new THREE.Points(geometry, material);
        scene.add(particles);

        // Mouse Tracking
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const windowHalfX = mount.clientWidth / 2;
        const windowHalfY = mount.clientHeight / 2;

        const onDocumentMouseMove = (event) => {
            mouseX = (event.clientX - windowHalfX);
            mouseY = (event.clientY - windowHalfY);
        };

        document.addEventListener('mousemove', onDocumentMouseMove);

        // Handle Resize
        const onWindowResize = () => {
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener('resize', onWindowResize);

        // Animation Loop
        let animationId;
        let frameCount = 0;

        const animate = () => {
            animationId = requestAnimationFrame(animate);

            // Apply explosion physics if triggered
            if (isExplodingRef.current) {
                const positions = particles.geometry.attributes.position.array;

                for (let i = 0; i < particleCount; i++) {
                    const i3 = i * 3;

                    // Initialize explosive velocity once
                    if (velocities[i3] === 0 && velocities[i3 + 1] === 0) {
                        const angle = Math.random() * Math.PI * 2;
                        const speed = 1 + Math.random() * 3;
                        velocities[i3] = Math.cos(angle) * speed;
                        velocities[i3 + 1] = Math.sin(angle) * speed;
                        velocities[i3 + 2] = (Math.random() - 0.5) * speed * 5;
                    }

                    positions[i3] += velocities[i3];
                    positions[i3 + 1] += velocities[i3 + 1];
                    positions[i3 + 2] += velocities[i3 + 2];
                }

                material.opacity -= 0.02; // Fade out during explosion
                particles.geometry.attributes.position.needsUpdate = true;
            } else {
                // Normal Gravity/Drift State
                targetX = mouseX * 0.05;
                targetY = mouseY * 0.05;

                // Subtle mesh rotation based on mouse
                particles.rotation.y += 0.002;
                particles.rotation.x += (targetY * 0.0002 - particles.rotation.x) * 0.05;
                particles.rotation.y += (targetX * 0.0002 - particles.rotation.y) * 0.05;

                // Make particles gently drift towards cursor
                const positions = particles.geometry.attributes.position.array;
                frameCount += 0.01;

                for (let i = 0; i < particleCount; i++) {
                    const i3 = i * 3;

                    // Wave motion
                    const wave = Math.sin(frameCount + i) * 0.02;

                    // Pull towards mouse (gravity effect)
                    const dx = targetX * 0.2 - positions[i3];
                    const dy = -targetY * 0.2 - positions[i3 + 1];

                    // Return to original slowly + gravity + wave
                    positions[i3] += (originalPositions[i3] - positions[i3]) * 0.01 + dx * 0.001;
                    positions[i3 + 1] += (originalPositions[i3 + 1] - positions[i3 + 1]) * 0.01 + dy * 0.001 + wave;
                }
                particles.geometry.attributes.position.needsUpdate = true;
            }

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            mount.removeChild(renderer.domElement);
            document.removeEventListener('mousemove', onDocumentMouseMove);
            window.removeEventListener('resize', onWindowResize);
            cancelAnimationFrame(animationId);
            geometry.dispose();
            material.dispose();
            texture.dispose();
        };
    }, []);

    // We need a ref for the explosion flag to be accessible instantly inside the requestAnimationFrame loop
    const isExplodingRef = useRef(false);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-200 dark:from-[#05000a] dark:to-[#0a0f18]">
            {/* The ThreeJS Canvas Container */}
            <div ref={mountRef} className="absolute inset-0 z-0"></div>

            {/* UI Overlay */}
            <div className={`relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none transition-opacity duration-500 ${isExploding ? 'opacity-0' : 'opacity-100'}`}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="flex flex-col items-center"
                >
                    <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md p-6 rounded-full shadow-2xl mb-8 border border-white/20">
                        <Leaf className="w-16 h-16 text-green-500" />
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400 dark:from-green-400 dark:to-emerald-200 tracking-tighter mb-4 drop-shadow-sm text-center">
                        WasteSync AI
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium max-w-2xl text-center mb-12">
                        The ultimate intelligent platform for urban waste management. Optimize, track, and recycle smarter.
                    </p>

                    <div className="flex gap-4 pointer-events-auto">
                        <button
                            onClick={() => {
                                setIsExploding(true);
                                isExplodingRef.current = true;
                                setTimeout(() => navigate('/login'), 1200);
                            }}
                            className="group relative px-8 py-4 bg-green-500 text-white text-xl font-bold rounded-full overflow-hidden shadow-[0_0_40px_rgba(34,197,94,0.4)] hover:shadow-[0_0_60px_rgba(34,197,94,0.6)] transition-all active:scale-95"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className="relative flex items-center gap-3">
                                Log In
                                <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                    →
                                </motion.span>
                            </span>
                        </button>

                        <button
                            onClick={() => {
                                setIsExploding(true);
                                isExplodingRef.current = true;
                                setTimeout(() => navigate('/register'), 1200);
                            }}
                            className="group relative px-8 py-4 bg-transparent border-2 border-green-500 text-green-500 hover:text-white dark:text-green-400 text-xl font-bold rounded-full overflow-hidden hover:shadow-[0_0_40px_rgba(34,197,94,0.2)] transition-all active:scale-95"
                        >
                            <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <span className="relative flex items-center gap-3">
                                Create Account
                            </span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
