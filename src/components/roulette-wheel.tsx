"use client";
import React, { useState, useRef, useEffect } from 'react';
import { spinRoulette } from '@/actions/roulette';
import { ROULETTE_PRIZES, type RoulettePrize } from '@/data/roulette-prizes';

const SPIN_DURATION_MS = 5000;

// Calcula la rotación final para que el segmento ganador quede en la parte superior (puntero)
const calculateRotation = (currentRotation: number, winningIndex: number): number => {
  const extraSpins = 5; // Vueltas extra para efecto visual
  const segmentAngle = 360 / ROULETTE_PRIZES.length;
  // Queremos que el centro del segmento ganador quede en 0° (parte superior)
  const desiredRotation = (360 - winningIndex * segmentAngle) % 360;
  const currentMod = currentRotation % 360;
  let delta = desiredRotation - currentMod;
  if (delta < 0) delta += 360;
  return currentRotation + extraSpins * 360 + delta;
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
  return [
    "M", x, y,
    "L", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y,
    "Z"
  ].join(" ");
};

const RouletteWheel: React.FC = () => {
  const [rotation, setRotation] = useState<number>(0);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [winner, setWinner] = useState<RoulettePrize | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The server draws the prize (or returns the one already won) and the wheel animates to it
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    spinRoulette().then((prizeId) => {
      if (cancelled) return;
      const prize = ROULETTE_PRIZES.find((p) => p.id === prizeId) ?? ROULETTE_PRIZES[0];
      setRotation((current) => calculateRotation(current, prize.id));
      setSpinning(true);
      timer = setTimeout(() => {
        setSpinning(false);
        setWinner(prize);
      }, SPIN_DURATION_MS);
    });

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

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
          {ROULETTE_PRIZES.map((prize, i) => {
            const segmentAngle = 360 / ROULETTE_PRIZES.length;
            const startAngle = i * segmentAngle - segmentAngle / 2;
            const endAngle = i * segmentAngle + segmentAngle / 2;
            const path = describeArc(center, center, radius, startAngle, endAngle);
            const fillColor = `hsl(${i * (360 / ROULETTE_PRIZES.length)}, 80%, 50%)`;
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
