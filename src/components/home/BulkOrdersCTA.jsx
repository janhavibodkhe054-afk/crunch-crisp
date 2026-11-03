
import React, {
  Suspense,
  useRef,
  useState,
  useEffect,
  useMemo,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useReducedMotion } from "framer-motion";
import * as THREE from "three";
import {
  ArrowUpRight,
  Phone,
  CheckCircle2,
  PackageCheck,
} from "lucide-react";

const phoneNumber = "8983973799";

const whatsappMessage = encodeURIComponent(
  "Hello Crunch & Crisp India LLP, I would like to enquire about bulk agricultural products. Please share more details."
);

const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${whatsappMessage}`;

const kernelsPerRow = 12;
const kernelRows = 19;

function CornCob({ reducedMotion }) {
  const groupRef = useRef();

  const kernels = useMemo(() => {
    const result = [];

    for (let row = 0; row < kernelRows; row++) {
      const y = (row - (kernelRows - 1) / 2) * 0.135;

      const taper = Math.pow(
        Math.max(0, 1 - Math.pow(y / 1.48, 4)),
        0.35
      );

      const radius = 0.43 * taper + 0.045;

      for (let col = 0; col < kernelsPerRow; col++) {
        const angle =
          (col / kernelsPerRow) * Math.PI * 2 +
          (row % 2) * 0.16;

        result.push({
          position: [
            Math.cos(angle) * radius,
            y,
            Math.sin(angle) * radius,
          ],
          rotation: [0, -angle, 0],
          color:
            (row + col) % 5 === 0
              ? "#F9C53D"
              : (row + col) % 3 === 0
              ? "#EAA519"
              : "#FFD45A",
        });
      }
    }

    return result;
  }, []);

  const geometry = useMemo(
    () => new THREE.SphereGeometry(1, 8, 7),
    []
  );

  const materials = useMemo(
    () => [
      new THREE.MeshStandardMaterial({
        color: "#F9C53D",
        roughness: 0.38,
        metalness: 0.04,
      }),
      new THREE.MeshStandardMaterial({
        color: "#EAA519",
        roughness: 0.4,
        metalness: 0.03,
      }),
      new THREE.MeshStandardMaterial({
        color: "#FFD45A",
        roughness: 0.35,
        metalness: 0.04,
      }),
    ],
    []
  );

  const instances = useMemo(() => {
    const groups = [[], [], []];

    kernels.forEach((kernel, index) => {
      groups[index % 3].push(kernel);
    });

    return groups;
  }, [kernels]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!reducedMotion) {
      groupRef.current.rotation.y += delta * 0.32;

      const targetX = state.pointer.y * 0.13;
      const targetZ = -0.2 + state.pointer.x * 0.13;

      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetX,
        3,
        delta
      );

      groupRef.current.rotation.z = THREE.MathUtils.damp(
        groupRef.current.rotation.z,
        targetZ,
        3,
        delta
      );

      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 1.2) * 0.06;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, -0.2]}>
      {/* INNER COB */}
      <mesh>
        <cylinderGeometry args={[0.31, 0.33, 2.55, 16]} />
        <meshStandardMaterial
          color="#D9A54B"
          roughness={0.9}
        />
      </mesh>

      {/* CORN KERNELS */}
      {instances.map((kernelGroup, groupIndex) => (
        <KernelInstances
          key={groupIndex}
          kernels={kernelGroup}
          geometry={geometry}
          material={materials[groupIndex]}
        />
      ))}

      {/* COB STEM */}
      <mesh position={[0, -1.43, 0]}>
        <cylinderGeometry args={[0.12, 0.17, 0.36, 10]} />
        <meshStandardMaterial color="#678C35" />
      </mesh>

      {/* GREEN HUSK */}
      <mesh
        position={[0.23, -0.88, 0]}
        rotation={[0.1, 0, -0.38]}
      >
        <coneGeometry args={[0.22, 1.15, 8]} />
        <meshStandardMaterial
          color="#67973D"
          side={THREE.DoubleSide}
          roughness={0.85}
        />
      </mesh>

      <mesh
        position={[-0.2, -0.9, 0.04]}
        rotation={[0, 0, 0.4]}
      >
        <coneGeometry args={[0.21, 1.05, 8]} />
        <meshStandardMaterial
          color="#85A94A"
          side={THREE.DoubleSide}
          roughness={0.85}
        />
      </mesh>
    </group>
  );
}

function KernelInstances({ kernels, geometry, material }) {
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;

    const dummy = new THREE.Object3D();

    kernels.forEach((kernel, index) => {
      dummy.position.set(...kernel.position);
      dummy.rotation.set(...kernel.rotation);
      dummy.scale.set(0.115, 0.085, 0.11);
      dummy.updateMatrix();

      ref.current.setMatrixAt(index, dummy.matrix);
    });

    ref.current.instanceMatrix.needsUpdate = true;
  }, [kernels]);

  return (
    <instancedMesh
      ref={ref}
      args={[geometry, material, kernels.length]}
      frustumCulled={false}
    />
  );
}

function FloatingParticles({ reducedMotion }) {
  const groupRef = useRef();

  const particles = useMemo(() => {
    const points = [];

    for (let i = 0; i < 22; i++) {
      const angle = i * 2.39996;
      const radius = 1.05 + (i % 4) * 0.22;

      points.push([
        Math.cos(angle) * radius,
        ((i * 7) % 19) / 7 - 1.3,
        Math.sin(angle) * radius,
      ]);
    }

    return points;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;

    groupRef.current.rotation.y += delta * 0.07;
  });

  return (
    <group ref={groupRef}>
      {particles.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[index % 3 === 0 ? 0.025 : 0.015, 6, 6]} />
          <meshBasicMaterial
            color={index % 2 === 0 ? "#F4B51C" : "#FFE28B"}
          />
        </mesh>
      ))}
    </group>
  );
}

function CornScene({ reducedMotion }) {
  return (
    <Canvas
      camera={{
        position: [0, 0, 5.2],
        fov: 38,
      }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={1.6} />

      <directionalLight
        position={[3, 5, 5]}
        intensity={2.4}
        color="#FFFFFF"
      />

      <pointLight
        position={[-3, 0, 2]}
        intensity={1.5}
        color="#F4B51C"
      />

      <Suspense fallback={null}>
        <CornCob reducedMotion={reducedMotion} />
        <FloatingParticles reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}

export default function BulkOrdersCTA() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="bulk-orders"
      className="relative isolate overflow-hidden bg-[#F8F9FA]"
    >
      <div className="grid grid-cols-1 lg:min-h-[340px] lg:grid-cols-[43%_57%]">

        {/* LEFT 3D CORN VISUAL */}
        <div className="relative isolate h-[270px] overflow-hidden bg-gradient-to-br from-[#17283A] via-[#243D4D] to-[#142333] sm:h-[310px] lg:h-auto">

          {/* BACKGROUND DECORATION */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-[230px] w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#F4B51C]/20" />

            <div className="absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

            <div className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F4B51C]/10 blur-[50px]" />
          </div>

          {/* ACTUAL 3D CANVAS */}
          <div className="absolute inset-0">
            <CornScene reducedMotion={reducedMotion} />
          </div>

          {/* TOP LABEL */}
          <div className="pointer-events-none absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold tracking-[1.5px] text-white">
            CORN PROCESSING • AGRI SUPPLY
          </div>

          {/* BOTTOM LABEL */}
          <div className="pointer-events-none absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold tracking-[1px] text-white">
            <PackageCheck size={14} className="text-[#F4B51C]" />
            CRUNCH & CRISP INDIA LLP
          </div>

          {/* DIAGONAL EDGE */}
          <div
            className="pointer-events-none absolute inset-y-0 -right-[1px] hidden w-[65px] bg-[#F8F9FA] lg:block"
            style={{
              clipPath:
                "polygon(100% 0,100% 100%,0 100%)",
            }}
          />
        </div>

        {/* RIGHT CTA CONTENT */}
        <div className="relative flex flex-col justify-center px-6 py-9 sm:px-10 lg:px-12 lg:py-10 xl:px-16">

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-3 flex items-center gap-3"
          >
            <span className="h-[2px] w-7 bg-[#E66A16]" />

            <span className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#E66A16]">
              BULK & BUSINESS ENQUIRIES
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="max-w-[650px] text-[clamp(27px,3vw,41px)] font-extrabold leading-[1.18] tracking-[-1px] text-[#202A38]"
          >
            Looking for Quality Agricultural Products{" "}
            <span className="text-[#E66A16]">
              in Bulk?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mt-4 max-w-[610px] text-[13px] leading-[1.8] text-[#687583] sm:text-[14px]"
          >
            Connect with Crunch & Crisp India LLP for corn-based
            products, agricultural commodities and frozen food
            requirements. Share your product specifications and
            required quantities with our team.
          </motion.p>

          {/* HIGHLIGHTS */}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {[
              "Bulk Requirements",
              "B2B Enquiries",
              "Product Discussions",
            ].map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <CheckCircle2
                  size={15}
                  className="text-[#E66A16]"
                />
                <span className="text-[11px] font-semibold text-[#536273]">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.22 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[9px] bg-gradient-to-r from-[#E66A16] to-[#E9AC12] px-6 text-[12px] font-extrabold text-white shadow-[0_8px_20px_rgba(230,106,22,0.18)] transition-transform duration-300 hover:-translate-y-1"
            >
              Get Bulk Quote
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>

            <a
              href={`tel:+91${phoneNumber}`}
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-[9px] border border-[#E66A16] bg-white px-6 text-[12px] font-extrabold text-[#E66A16] transition-colors duration-300 hover:bg-[#FFF2E5]"
            >
              <Phone size={16} />
              Call Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
