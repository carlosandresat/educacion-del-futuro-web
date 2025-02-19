"use client";
import React, { useState, useRef, useEffect } from 'react';
import { getPrizeCookie, createPrizeCookie } from '@/actions/roulette';

type Prize = {
  id: number;
  name: string;
  weight: number;
  type: "image" | "text";
  image?: string;
};

const RouletteWheel: React.FC = () => {
  // Definición de los 12 premios con sus pesos y tipos
  const prizes: Prize[] = [
    { id: 0, name: "Airpods", weight: 1, type: "image", image: "/gift-airpods.png" },
    { id: 1, name: "Casco VR", weight: 2, type: "image", image: "/gift-vr.png" },
    { id: 2, name: "Amazon Prime", weight: 5, type: "image", image: "/gift-prime.png" },
    { id: 3, name: "Foto Profesional", weight: 5, type: "image", image: "/gift-photo.jpg" },
    { id: 4, name: "Netflix", weight: 10, type: "image", image: "/gift-netflix.webp" },
    { id: 5, name: "Disney+", weight: 10, type: "image", image: "/gift-disney.svg" },
    { id: 6, name: "Recarga $3", weight: 10, type: "text" },
    { id: 7, name: "Spotify", weight: 10, type: "image",  image: "/gift-spotify.png"},
    { id: 8, name: "Coca Cola", weight: 10, type: "image", image: "/gift-cocacola.png" },
    { id: 9, name: "Clase Gratis", weight: 10, type: "text" },
    { id: 10, name: "Agua", weight: 10, type: "image", image: "/gift-dasani.webp" },
  ];

  const [rotation, setRotation] = useState<number>(0);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [winner, setWinner] = useState<Prize | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const useRoulette = async () => {
      const rouletteCookie = await getPrizeCookie()
      if (rouletteCookie){
        const currentPrize = prizes.find((prize)=> prize.name===rouletteCookie.value)
        spinWheel(currentPrize)
      } else {
        const prize = spinWheel()
        createPrizeCookie(prize.name)
      }
    }
    useRoulette()
  }, [])

  // Suma total de los pesos para la selección aleatoria
  const totalWeight = prizes.reduce((sum, prize) => sum + prize.weight, 0);

  // Función que devuelve un premio aleatorio basado en los pesos asignados
  const getRandomPrize = (): Prize => {
    let random = Math.random() * totalWeight;
    for (const prize of prizes) {
      if (random < prize.weight) {
        return prize;
      }
      random -= prize.weight;
    }
    // Fallback en caso de error: retorna el último premio
    return prizes[prizes.length - 1];
  };

  // Calcula la rotación final para que el segmento ganador quede en la parte superior (puntero)
  const calculateRotation = (currentRotation: number, winningIndex: number): number => {
    const extraSpins = 5; // Vueltas extra para efecto visual
    const segmentAngle = 360 / prizes.length; // Cada segmento ocupa 30°
    // Queremos que el centro del segmento ganador quede en 0° (parte superior)
    const desiredRotation = (360 - winningIndex * segmentAngle) % 360;
    const currentMod = currentRotation % 360;
    let delta = desiredRotation - currentMod;
    if (delta < 0) delta += 360;
    return currentRotation + extraSpins * 360 + delta;
  };

  // Inicia el giro de la ruleta
  const spinWheel = (defaultPrize?:Prize) => {
    const winningPrize = defaultPrize ? defaultPrize : getRandomPrize();
    const newRotation = calculateRotation(rotation, winningPrize.id);
    setRotation(newRotation);
    setSpinning(true);
    // Tiempo de animación: 5 segundos
    setTimeout(() => {
      setSpinning(false);
      setWinner(winningPrize);
    }, 5000);
    return winningPrize;
  };

  // Funciones auxiliares para dibujar cada segmento de la ruleta con SVG
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    // Ajustamos los ángulos para que 0° esté en la parte superior
    const start = polarToCartesian(x, y, radius, startAngle - 90);
    const end = polarToCartesian(x, y, radius, endAngle - 90);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    const d = [
      "M", x, y,
      "L", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y,
      "Z"
    ].join(" ");
    return d;
  };

  const wheelSize = 300;
  const center = wheelSize / 2;
  const radius = wheelSize / 2;

  return (
    <div className="relative mx-auto" style={{ width: wheelSize }}>
      {/* Puntero (indicador) */}
      <div
        className="absolute z-10"
        style={{
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%) rotate(180deg)',
          width: 0,
          height: 0,
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderBottom: '20px solid red',
        }}
      ></div>

      {/* Contenedor de la ruleta con la animación de giro */}
      <div
        ref={wheelRef}
        style={{
          transition: 'transform 5s cubic-bezier(0.33, 1, 0.68, 1)',
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <svg width={wheelSize} height={wheelSize} viewBox={`0 0 ${wheelSize} ${wheelSize}`}>
          {prizes.map((prize, i) => {
            const segmentAngle = 360 / prizes.length;
            const startAngle = i * segmentAngle - segmentAngle / 2;
            const endAngle = i * segmentAngle + segmentAngle / 2;
            const path = describeArc(center, center, radius, startAngle, endAngle);
            const fillColor = `hsl(${i * (360 / prizes.length)}, 80%, 50%)`;
            const midAngle = (startAngle + endAngle) / 2;
            const textPos = polarToCartesian(center, center, radius * 0.65, midAngle - 90);
            return (
              <g key={i}>
                <path d={path} fill={fillColor} stroke="#000000" strokeWidth="2" />
                {prize.type === "text" ? (
                  <text
                    x={textPos.x}
                    y={textPos.y}
                    fill="#fff"
                    fontSize="14"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    transform={`rotate(${midAngle}, ${textPos.x}, ${textPos.y})`}
                    writingMode="vertical-lr"
                  >
                    {prize.name}
                  </text>
                ) : (
                  <image
                    href={prize.image}
                    x={textPos.x - 20}
                    y={textPos.y - 20}
                    width="40"
                    height="40"
                    transform={`rotate(${midAngle}, ${textPos.x}, ${textPos.y})`}
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mensaje con el premio ganador */}
      {winner && !spinning && (
        <div className="mt-5 text-center text-xl font-bold">
          ¡Ganaste: {winner.name}!
        </div>
      )}
    </div>
  );
};

export default RouletteWheel;
