"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim"; // loads tsparticles-slim

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particleOptions: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent", // Set to transparent so page background shows
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: false, // Optional: enable for interaction
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "grab", // "connect" or "grab" can be nice
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          grab: {
            distance: 140,
            links: {
              opacity: 0.5,
            }
          },
          connect: { // If using onHover mode: "connect"
            distance: 100,
            links: {
              opacity: 0.5
            }
          }
        },
      },
      particles: {
        color: {
          value: "#ffffff", // Dot color - adjust for visibility on dark theme
        },
        links: {
          color: "#ffffff", // Line color - adjust for visibility
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1, // Adjust speed
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800, // Adjust for dot density
          },
          value: 150, // Increased from 80
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 }, // Dot size
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        options={particleOptions}
        className="fixed top-0 left-0 w-full h-full z-[-1]" // Ensure it's behind content
      />
    );
  }

  return null;
};

export default ParticlesBackground;
