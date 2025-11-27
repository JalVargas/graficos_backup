import React from 'react';
import PropTypes from 'prop-types';
import './WavyFunnel10.css';

const defaultColors = [
  '#449995', // Teal (Sessions)
  '#86C5A9', // Light Green (Vehicle Views)
  '#EACD6D', // Yellow (True Leads)
  '#009B96', // Dark Teal
  '#DC5C1E', // Orange
  '#F1883C', // Light Orange
  '#71C7A7', // Green
  '#EAB235', // Gold
];

const WavyFunnel10 = ({
  data = [],
  width = 580,
  height = 550,
  waveAmplitude = 15,
  waveFrequency,
  leftMargin = 30,
  segmentGap = 0,
  animated = true,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="wavy-funnel-10-empty">No hay datos para mostrar</div>
    );
  }

  const padding = { right: 140 };
  const funnelWidth = width - leftMargin - padding.right;
  const segmentHeight = (height - (data.length - 1) * segmentGap) / data.length;

  const generateWavyPath = (
    startY,
    endY,
    startWidth,
    endWidth,
    totalHeight,
  ) => {
    const leftX = leftMargin;

    const startLeftX = leftX;
    const endLeftX = leftX;
    const endRightX = leftX + endWidth;

    // Calculate wave offset at exact Y positions for continuity
    // Amplitude increases gradually from top to bottom
    const getWaveOffset = (y) => {
      const progressY = y / totalHeight; // 0 at top, 1 at bottom
      const dynamicAmplitude = waveAmplitude * (0.4 + progressY * 0.6); // starts at 40%, grows to 100%
      // Phase shift: starts curving inward at top, ends curving outward at bottom
      return (
        Math.sin((y / totalHeight) * Math.PI * waveFrequency + Math.PI * 0.25) *
        dynamicAmplitude
      );
    };

    // Get width at a specific Y position
    const getWidthAtY = (y) => {
      const progress = (y - startY) / (endY - startY);
      return startWidth + (endWidth - startWidth) * progress;
    };

    // Left side - straight line (M and L)
    let path = `M ${startLeftX} ${startY}`;
    path += ` L ${endLeftX} ${endY}`;

    // Bottom edge - with wave offset at end
    const endWaveOffset = getWaveOffset(endY);
    path += ` L ${endRightX + endWaveOffset} ${endY}`;

    // Right side - smooth wavy curve
    const segments = 20;
    const segHeight = (endY - startY) / segments;

    for (let i = segments - 1; i >= 0; i--) {
      const y = startY + i * segHeight;
      const widthAtY = getWidthAtY(y);
      const waveOffset = getWaveOffset(y);
      const x = leftX + widthAtY + waveOffset;

      path += ` L ${x} ${y}`;
    }

    // Close path
    path += ' Z';

    return path;
  };

  const getSegmentDimensions = (index) => {
    const maxWidth = funnelWidth;
    const minWidth = maxWidth * 0.08;

    const startWidth = maxWidth - (index / data.length) * (maxWidth - minWidth);
    const endWidth =
      maxWidth - ((index + 1) / data.length) * (maxWidth - minWidth);

    const startY = index * (segmentHeight + segmentGap);
    const endY = startY + segmentHeight;

    return { startWidth, endWidth, startY, endY };
  };

  // Asignar color automáticamente
  const coloredData = data.map((item, idx) => ({
    ...item,
    color: defaultColors[idx % defaultColors.length],
  }));

  // Calcular waveFrequency armónico si no se pasa como prop
  const harmonicWaveFrequency =
    waveFrequency || Math.max(4, Math.round(data.length * 1.1));

  return (
    <div className={`wavy-funnel-10-container ${animated ? 'animated' : ''}`}>
      <svg
        width={width}
        height={height}
        className="wavy-funnel-10-svg"
        viewBox={`0 0 ${width} ${height}`}
      >
        {/* Render all segment paths first */}
        {coloredData.map((item, index) => {
          const { startWidth, endWidth, startY, endY } =
            getSegmentDimensions(index);
          const path = generateWavyPath(
            startY,
            endY,
            startWidth,
            endWidth,
            height,
          );

          return (
            <path
              key={`path-${index}`}
              d={path}
              fill={item.color}
              className="funnel-10-path"
              style={{
                animationDelay: animated ? `${index * 0.1}s` : '0s',
              }}
            />
          );
        })}

        {/* Render separator lines and labels */}
        {coloredData.map((item, index) => {
          const { endWidth, endY } = getSegmentDimensions(index);
          const labelX = width - padding.right + 10;
          const isLastSegment = index === data.length - 1;

          // Calculate wave offset at endY matching the path's wave calculation
          const progressY = endY / height;
          const dynamicAmplitude = waveAmplitude * (0.4 + progressY * 0.6);
          const waveOffset =
            Math.sin(
              (endY / height) * Math.PI * harmonicWaveFrequency +
                Math.PI * 0.25,
            ) * dynamicAmplitude;

          // Line starts at the right edge of the segment with wave offset
          const lineStartX = leftMargin + endWidth + waveOffset;

          // Labels positioned above the line (endY is the line position)
          // Value above, label below value
          const valueY = endY - 18;
          const labelY = endY - 4;

          return (
            <g key={`labels-${index}`} className="funnel-10-segment">
              {/* Value number - above */}
              <text
                x={labelX}
                y={valueY}
                className="funnel-10-value-right"
                style={{ fill: item.color }}
              >
                {item.value.toLocaleString()}
              </text>
              {/* Label text - below value */}
              <text x={labelX} y={labelY} className="funnel-10-label-right">
                {item.label}
              </text>
              {/* Horizontal connector line at segment separation, skip for last segment */}
              {!isLastSegment && (
                <line
                  x1={lineStartX}
                  y1={endY}
                  x2={width - 10}
                  y2={endY}
                  stroke="#9ca3af"
                  strokeWidth="1"
                  className="connector-10-line"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

WavyFunnel10.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ),
  width: PropTypes.number,
  height: PropTypes.number,
  waveAmplitude: PropTypes.number,
  waveFrequency: PropTypes.number,
  leftMargin: PropTypes.number,
  segmentGap: PropTypes.number,
  animated: PropTypes.bool,
};

export default WavyFunnel10;
