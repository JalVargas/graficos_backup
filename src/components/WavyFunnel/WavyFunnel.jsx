import PropTypes from 'prop-types';
import './WavyFunnel.css';

const WavyFunnel = ({
  data = [],
  width = 400,
  height = 500,
  waveAmplitude = 15,
  waveFrequency = 3,
  leftMargin = 50,
  segmentGap = 4,
  animated = true
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="wavy-funnel-empty">
        No hay datos para mostrar
      </div>
    );
  }

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const segmentHeight = (height - (data.length - 1) * segmentGap) / data.length;

  const generateWavyPath = (startY, endY, startWidth, endWidth) => {
    const leftX = leftMargin;
    
    const startLeftX = leftX;
    const endLeftX = leftX;
    const endRightX = leftX + endWidth;

    // Left side - straight line (M and L)
    let path = `M ${startLeftX} ${startY}`;
    path += ` L ${endLeftX} ${endY}`;

    // Bottom edge
    path += ` L ${endRightX} ${endY}`;

    // Right side - wavy curve using quadratic bezier (Q)
    const segments = 10;
    const segHeight = (endY - startY) / segments;
    
    for (let i = segments - 1; i >= 0; i--) {
      const y1 = startY + (i + 1) * segHeight;
      const y0 = startY + i * segHeight;
      
      // Calculate width at each y position (linear interpolation for funnel effect)
      const progress0 = i / segments;
      const x0 = leftX + startWidth + (endWidth - startWidth) * progress0;
      
      // Apply sinusoidal wave to the right edge
      const waveOffset0 = Math.sin((y0 / height) * Math.PI * waveFrequency) * waveAmplitude;
      
      const midY = (y0 + y1) / 2;
      const midWaveOffset = Math.sin((midY / height) * Math.PI * waveFrequency) * waveAmplitude;
      const progress1 = (i + 1) / segments;
      const x1 = leftX + startWidth + (endWidth - startWidth) * progress1;
      const midX = (x0 + x1) / 2 + midWaveOffset;
      
      // Quadratic curve for smooth wave effect
      path += ` Q ${midX} ${midY} ${x0 + waveOffset0} ${y0}`;
    }

    // Top edge back to start
    path += ` L ${startLeftX} ${startY}`;
    path += ' Z';

    return path;
  };

  const getSegmentDimensions = (index) => {
    const maxWidth = width - leftMargin - 20;
    const minWidth = maxWidth * 0.3;
    
    const startWidth = maxWidth - (index / data.length) * (maxWidth - minWidth);
    const endWidth = maxWidth - ((index + 1) / data.length) * (maxWidth - minWidth);
    
    const startY = index * (segmentHeight + segmentGap);
    const endY = startY + segmentHeight;
    
    return { startWidth, endWidth, startY, endY };
  };

  return (
    <div className={`wavy-funnel-container ${animated ? 'animated' : ''}`}>
      <svg 
        width={width} 
        height={height} 
        className="wavy-funnel-svg"
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          {data.map((item, index) => (
            <linearGradient
              key={`gradient-${index}`}
              id={`funnel-gradient-${index}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={item.color} stopOpacity="0.9" />
              <stop offset="100%" stopColor={item.color} stopOpacity="0.6" />
            </linearGradient>
          ))}
        </defs>
        
        {data.map((item, index) => {
          const { startWidth, endWidth, startY, endY } = getSegmentDimensions(index);
          const path = generateWavyPath(startY, endY, startWidth, endWidth);
          const percentage = ((item.value / totalValue) * 100).toFixed(1);
          
          return (
            <g key={index} className="funnel-segment">
              <path
                d={path}
                fill={`url(#funnel-gradient-${index})`}
                className="funnel-path"
                style={{
                  animationDelay: animated ? `${index * 0.1}s` : '0s'
                }}
              />
              <text
                x={leftMargin + startWidth / 2}
                y={startY + segmentHeight / 2}
                className="funnel-label"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {item.label}
              </text>
              <text
                x={leftMargin + startWidth / 2}
                y={startY + segmentHeight / 2 + 18}
                className="funnel-value"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {item.value.toLocaleString()} ({percentage}%)
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

WavyFunnel.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired
    })
  ),
  width: PropTypes.number,
  height: PropTypes.number,
  waveAmplitude: PropTypes.number,
  waveFrequency: PropTypes.number,
  leftMargin: PropTypes.number,
  segmentGap: PropTypes.number,
  animated: PropTypes.bool
};

export default WavyFunnel;
