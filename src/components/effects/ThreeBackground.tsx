"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * WebGL particle field behind the hero.
 *
 * Performance and accessibility notes:
 *  - three.js is imported dynamically inside the effect, so it is code-split
 *    out of the initial bundle and never downloaded on reduced-motion visits.
 *  - The render loop is paused when the tab is hidden or the canvas scrolls
 *    out of view, which keeps it off the main thread during reading.
 *  - Device pixel ratio is capped at 1.75 to protect low-end GPUs.
 *  - A CSS gradient fallback renders when WebGL is unavailable.
 */
export function ThreeBackground({ density = 1 }: { density?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        const THREE = await import("three");
        if (disposed) return;

        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: false,
          powerPreference: "low-power",
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.domElement.setAttribute("aria-hidden", "true");
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          62,
          container.clientWidth / container.clientHeight,
          0.1,
          100,
        );
        camera.position.z = 16;

        // --- Particle field -------------------------------------------------
        const count = Math.round(1100 * density);
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        const seeds = new Float32Array(count);

        for (let i = 0; i < count; i += 1) {
          positions[i * 3] = (Math.random() - 0.5) * 46;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 28;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 26;
          scales[i] = Math.random() * 1.6 + 0.4;
          seeds[i] = Math.random() * Math.PI * 2;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
        geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

        const material = new THREE.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          uniforms: {
            uTime: { value: 0 },
            uPixelRatio: { value: renderer.getPixelRatio() },
            uColorA: { value: new THREE.Color("#4d7cff") },
            uColorB: { value: new THREE.Color("#35d6f5") },
          },
          vertexShader: /* glsl */ `
            uniform float uTime;
            uniform float uPixelRatio;
            attribute float aScale;
            attribute float aSeed;
            varying float vAlpha;
            varying float vMix;

            void main() {
              vec3 pos = position;
              pos.y += sin(uTime * 0.28 + aSeed) * 0.9;
              pos.x += cos(uTime * 0.19 + aSeed) * 0.6;

              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_Position = projectionMatrix * mvPosition;
              gl_PointSize = aScale * 7.0 * uPixelRatio * (1.0 / -mvPosition.z);

              vAlpha = smoothstep(30.0, 6.0, -mvPosition.z);
              vMix = fract(aSeed * 0.159);
            }
          `,
          fragmentShader: /* glsl */ `
            uniform vec3 uColorA;
            uniform vec3 uColorB;
            varying float vAlpha;
            varying float vMix;

            void main() {
              float d = distance(gl_PointCoord, vec2(0.5));
              if (d > 0.5) discard;
              float falloff = smoothstep(0.5, 0.0, d);
              vec3 color = mix(uColorA, uColorB, vMix);
              gl_FragColor = vec4(color, falloff * vAlpha * 0.85);
            }
          `,
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);

        // --- Interaction & loop --------------------------------------------
        const pointer = { x: 0, y: 0 };
        const target = { x: 0, y: 0 };
        const fine = window.matchMedia("(pointer: fine)").matches;

        const onPointerMove = (event: PointerEvent) => {
          target.x = (event.clientX / window.innerWidth) * 2 - 1;
          target.y = (event.clientY / window.innerHeight) * 2 - 1;
        };
        if (fine) window.addEventListener("pointermove", onPointerMove, { passive: true });

        const onResize = () => {
          if (!container.clientWidth) return;
          camera.aspect = container.clientWidth / container.clientHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(container.clientWidth, container.clientHeight);
        };
        const resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(container);

        let visible = true;
        const intersectionObserver = new IntersectionObserver(
          ([entry]) => {
            visible = entry?.isIntersecting ?? true;
          },
          { threshold: 0 },
        );
        intersectionObserver.observe(container);

        const onVisibility = () => {
          if (document.hidden) visible = false;
        };
        document.addEventListener("visibilitychange", onVisibility);

        const clock = new THREE.Clock();
        let frame = 0;

        const tick = () => {
          frame = requestAnimationFrame(tick);
          if (!visible || document.hidden) return;

          const elapsed = clock.getElapsedTime();
          material.uniforms.uTime.value = elapsed;

          pointer.x += (target.x - pointer.x) * 0.045;
          pointer.y += (target.y - pointer.y) * 0.045;

          points.rotation.y = elapsed * 0.018 + pointer.x * 0.18;
          points.rotation.x = pointer.y * 0.12;

          renderer.render(scene, camera);
        };
        tick();

        cleanup = () => {
          cancelAnimationFrame(frame);
          resizeObserver.disconnect();
          intersectionObserver.disconnect();
          document.removeEventListener("visibilitychange", onVisibility);
          if (fine) window.removeEventListener("pointermove", onPointerMove);
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch {
        setFailed(true);
      }
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [density, prefersReduced]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {(prefersReduced || failed) && (
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_20%,rgba(77,124,255,0.16),transparent_70%)]" />
      )}
    </div>
  );
}
