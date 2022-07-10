/* eslint-disable */

import React, { useMemo, useEffect, useState, useRef } from "react";
import { Pixels } from "../../hooks/use-editor";

import tailwindsConfig from "../../../tailwind.config";

import { transpose } from "../../features/TileUtils";

const currentBackgroundColor = tailwindsConfig.theme.extend.colors.bg;

interface CanvasAnimationProps {
  pixels: Pixels;
  height: number;
  width: number;
  isLoading: boolean;
  palette: string[];
  className?: string;
}

function randomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}

const CanvasAnimation = (props: CanvasAnimationProps) => {
  const { height, width, pixels: canvasPixels, isLoading, className } = props;

  const columns = useMemo(
    () => Array(width).fill(currentBackgroundColor),
    [width]
  );
  const rows = useMemo(
    () => Array(height).fill(currentBackgroundColor),
    [height]
  );

  const buildingCanvas = useMemo(() => {
    let newCanvasPixels = JSON.parse(JSON.stringify(canvasPixels));
    const firstCanvasRow = newCanvasPixels[0];

    newCanvasPixels = rows.map((r, index) => {
      if (index === 0) return firstCanvasRow;
      return rows;
    });

    return transpose(newCanvasPixels);
  }, []);

  const [_, setTick] = useState(0);
  const currentX = useRef(0);
  const consumedY = useRef<number[]>([]);
  const pixs = useRef<Pixels>(canvasPixels);

  useEffect(() => {
    // @ts-ignore
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        const y = randomNumber(0, height - 1);
        const x = currentX?.current;
        const previousY = consumedY.current || [];

        if (previousY.includes(y)) return;

        // @ts-ignore
        pixs.current?.[y]?.[x] = canvasPixels?.[y]?.[x];

        previousY.push(y);
        consumedY.current = previousY;

        setTick(Math.random());

        // @ts-ignore
        if (currentX.current === height - 1) clearInterval(interval);

        if (previousY.length === height - 1) {
          currentX.current = currentX.current + 1;
          consumedY.current = [];
        }
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => {
      // @ts-ignore
      clearInterval(interval);
    };
  }, [isLoading, height, width]);

  return (
    <div className={className}>
      <div className="canvas bg-white">
        {columns.map((bgy, y) => {
          return rows.map((bgx, x) => {
            return (
              <div
                id={`${x}_${y}`}
                key={`${x}_${y}`}
                className={`box ${isLoading && "box-disabled"}`}
                style={{
                  // @ts-ignore
                  backgroundColor: pixs.current?.[x]?.[y],
                }}
              ></div>
            );
          });
        })}
      </div>

      <style jsx>
        {`
          .canvas {
            display: grid;
            z-index: 100;
            grid-template-columns: repeat(${width}, 1fr);
            user-select: none;
            touch-action: none;
            width: calc(${width} * 1rem);
            height: calc(${height} * 1rem);
          }

          .box {
            width: 1rem;
            height: 1rem;
            border: 1px solid rgba(0, 0, 0, 0.15);
            border-width: 1px 1px 1px 1px;
          }
          .box-disabled {
            border: unset;
          }
        `}
      </style>
    </div>
  );
};

export default CanvasAnimation;
