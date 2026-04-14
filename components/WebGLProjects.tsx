"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WebGLProjects({
    onUpdate,
}: {
    onUpdate?: (progress: number) => void;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = ref.current;
        if (!container) return;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            5000
        );

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        const planes: THREE.Mesh[] = [];

        for (let i = 0; i < 3; i++) {
            const geometry = new THREE.PlaneGeometry(6, 3);
            const material = new THREE.MeshBasicMaterial({
                color: "#BFFF00",
                transparent: true,
                opacity: 0.2,
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.z = -i * 10;
            mesh.position.y = -i * 0.5;

            scene.add(mesh);
            planes.push(mesh);
        }

        const scrollLength = window.innerHeight * planes.length;

        ScrollTrigger.create({
            trigger: container,
            start: "top top",
            end: `+=${scrollLength}`,
            scrub: true,
            pin: true,
            onUpdate: (self) => {
                const progress = self.progress;

                camera.position.z = -progress * planes.length * 10;

                onUpdate?.(progress); // 🔥 send progress to UI
            },
        });

        const animate = () => {
            requestAnimationFrame(animate);

            planes.forEach((plane) => {
                const dist = Math.abs(camera.position.z - plane.position.z);

                plane.scale.setScalar(1 + (10 - dist) * 0.05);

                (plane.material as THREE.MeshBasicMaterial).opacity =
                    THREE.MathUtils.clamp(1 - dist * 0.1, 0.1, 0.3);
            });

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            renderer.dispose();
            container.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={ref} className="absolute inset-0 z-0" />;
}