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

function WavyFunnel10D3({ data = [], width = 580, height = 550 }) {
  const padding = { right: 140 };
  const funnelWidth = width - padding.right;
  const segmentHeight = (height - (data.length - 1)) / data.length;
  const maxValue = Math.max(...data.map((d) => d.value));

  const segments = data.map((item, idx) => {
    const startWidth = (data[idx].value / maxValue) * funnelWidth;
    const endWidth =
      idx < data.length - 1
        ? (data[idx + 1].value / maxValue) * funnelWidth
        : (data[idx].value / maxValue) * funnelWidth * 0.8;
    const startY = idx * segmentHeight;
    const endY = startY + segmentHeight;

    const x0 = 0;
    const x1Start = startWidth;
    const x1End = endWidth;

    const isLastSegment = idx === data.length - 1;
    const curveIntensity = 0.66;
    const curveHeight = segmentHeight * curveIntensity;

    /**
     * M: Move to left-top corner
     * L: Line to right-top corner
     * C: Cubic Bézier curve to right-bottom (creates the S-shape)
     * L: Line back to left-bottom
     * Z: Close path
     */
    const pathD = `
      M ${x0} ${startY}
      L ${x1Start} ${startY}
      C ${x1Start} ${startY + curveHeight}, ${x1End} ${endY - curveHeight}, ${x1End} ${endY}
      L ${x0} ${endY}
      Z
    `;

    const labelX = width - padding.right - 30;
    const lineStartX = endWidth;
    const valueY = endY - 30;
    const labelY = endY - 12;

    return (
      <g key={idx}>
        <path
          d={pathD}
          fill={item.color || defaultColors[idx % defaultColors.length]}
        />
        <text
          x={labelX}
          y={valueY}
          className="funnel-value-right"
          fill={item.color || defaultColors[idx % defaultColors.length]}
          fontFamily="Roboto"
          fontWeight="700"
          fontSize="22px"
        >
          {item.value.toLocaleString()}
        </text>
        <text
          x={labelX}
          y={labelY}
          className="funnel-label-right"
          fill="#2d3a3f"
          fontFamily="Roboto"
          fontSize="14px"
        >
          {item.label}
        </text>
        {!isLastSegment && (
          <line
            x1={lineStartX}
            y1={endY}
            x2={width - padding.right * 0.5}
            y2={endY}
            stroke="#d3e2e8"
            className="connector-line"
            strokeWidth="1"
          />
        )}
      </g>
    );
  });

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {segments}
    </svg>
  );
}

export default WavyFunnel10D3;
