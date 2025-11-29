import React from "react";
import PropTypes from "prop-types";
import { area } from "d3-shape";

const defaultColors = [
  "#449995", // Teal (Sessions)
  "#86C5A9", // Light Green (Vehicle Views)
  "#EACD6D", // Yellow (True Leads)
  "#009B96", // Dark Teal
  "#DC5C1E", // Orange
  "#F1883C", // Light Orange
  "#71C7A7", // Green
  "#EAB235", // Gold
];

/**
 * Funnel segment with d3-area (lado izquierdo recto, derecho ondulado)
 */
function WavyFunnel10D3({
  data = [],
  width = 580,
  height = 550,
  waveAmplitude = 15,
  waveFrequency = 6,
  leftMargin = 30,
  segmentGap = 0,
}) {
  if (!data || data.length === 0) {
    return <div>No hay datos para mostrar</div>;
  }

  const padding = { right: 140 };
  const funnelWidth = width - leftMargin - padding.right;
  const segmentHeight = (height - (data.length - 1) * segmentGap) / data.length;

  // Calcula la onda para el borde derecho
  const getWaveOffset = (y) => {
    const progressY = y / height;
    const dynamicAmplitude = waveAmplitude * (0.4 + progressY * 0.6);
    return (
      Math.sin(progressY * Math.PI * waveFrequency + Math.PI * 0.25) *
      dynamicAmplitude
    );
  };

  // Calcula el ancho del segmento en Y
  const getWidthAtY = (startWidth, endWidth, startY, endY, y) => {
    const progress = (y - startY) / (endY - startY);
    return startWidth + (endWidth - startWidth) * progress;
  };

  // Genera los paths de cada segmento
  const paths = data.map((item, idx) => {
    const maxWidth = funnelWidth;
    const minWidth = maxWidth * 0.08;
    const startWidth = maxWidth - (idx / data.length) * (maxWidth - minWidth);
    const endWidth =
      maxWidth - ((idx + 1) / data.length) * (maxWidth - minWidth);
    const startY = idx * (segmentHeight + segmentGap);
    const endY = startY + segmentHeight;
    const N = 32; // puntos para suavidad

    // Lado izquierdo (recto)
    const leftSide = Array.from({ length: N }, (_, i) => {
      const y = startY + ((endY - startY) * i) / (N - 1);
      return [leftMargin, y];
    });

    // Lado derecho (ondulado)
    const rightSide = Array.from({ length: N }, (_, i) => {
      const y = endY - ((endY - startY) * i) / (N - 1);
      const widthAtY = getWidthAtY(startWidth, endWidth, startY, endY, y);
      const wave = getWaveOffset(y);
      return [leftMargin + widthAtY + wave, y];
    });

    // Área cerrada (lado izquierdo + derecho)
    const points = [...leftSide, ...rightSide];

    // d3-area espera arrays de [x, y]
    const areaGen = area()
      .x((d) => d[0])
      .y((d) => d[1]);

    return (
      <path
        key={idx}
        d={areaGen(points)}
        fill={item.color || defaultColors[idx % defaultColors.length]}
        stroke="#fff"
        strokeWidth={1.5}
      />
    );
  });

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {paths}
    </svg>
  );
}

WavyFunnel10D3.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string,
    })
  ),
  width: PropTypes.number,
  height: PropTypes.number,
  waveAmplitude: PropTypes.number,
  waveFrequency: PropTypes.number,
  leftMargin: PropTypes.number,
  segmentGap: PropTypes.number,
};

export default WavyFunnel10D3;
