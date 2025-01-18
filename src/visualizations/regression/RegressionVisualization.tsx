import React, { useMemo } from 'react';
import { G, Circle, Path, Line, Rect } from 'react-native-svg';
import { RegressionVisualizationProps } from '../../types/visualization';
import { colors } from '../../theme';

const PADDING = 10; // Reduced padding to use more space

const RegressionVisualization: React.FC<RegressionVisualizationProps> = ({
  width,
  height,
  data,
  predictionLine,
  state,
  config,
  handlers,
}) => {
  const scalePoint = useMemo(() => {
    const range = { min: -5, max: 5 }; // Fixed range for consistent scale
    
    return {
      toSvg: (point: { x: number, y: number }) => ({
        x: ((point.x - range.min) / (range.max - range.min)) * (width - 2 * PADDING) + PADDING,
        y: ((range.max - point.y) / (range.max - range.min)) * (height - 2 * PADDING) + PADDING
      }),
      toData: (svgX: number, svgY: number) => ({
        x: ((svgX - PADDING) / (width - 2 * PADDING)) * (range.max - range.min) + range.min,
        y: range.max - (((svgY - PADDING) / (height - 2 * PADDING)) * (range.max - range.min))
      })
    };
  }, [width, height]);

  const gridLines = useMemo(() => {
    const lines = [];
    const gridCount = 10;
    const adjustedWidth = width - (2 * PADDING);
    const adjustedHeight = height - (2 * PADDING);

    // Draw more frequent grid lines
    for (let i = 0; i <= gridCount; i++) {
      const x = PADDING + (adjustedWidth * i) / gridCount;
      const y = PADDING + (adjustedHeight * i) / gridCount;

      // Horizontal lines
      lines.push(
        <Line
          key={`h${i}`}
          x1={PADDING}
          y1={y}
          x2={width - PADDING}
          y2={y}
          stroke={colors.text}
          strokeWidth={0.5}
          opacity={0.2}
        />
      );

      // Vertical lines
      lines.push(
        <Line
          key={`v${i}`}
          x1={x}
          y1={PADDING}
          x2={x}
          y2={height - PADDING}
          stroke={colors.text}
          strokeWidth={0.5}
          opacity={0.2}
        />
      );
    }

    return lines;
  }, [width, height]);

  return (
    <G>
      {/* Background */}
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill={colors.surface}
        rx={12}
      />

      {/* Grid */}
      {gridLines}

      {/* Data points */}
      {data.map((point, i) => {
        const scaledPoint = scalePoint.toSvg(point);
        return (
          <Circle
            key={i}
            cx={scaledPoint.x}
            cy={scaledPoint.y}
            r={4}
            fill={colors.primary}
            opacity={0.8}
          />
        );
      })}

      {/* Prediction line */}
      {predictionLine && predictionLine.length > 1 && (
        <Path
          d={`M ${predictionLine.map(p => {
            const scaledPoint = scalePoint.toSvg(p);
            return `${scaledPoint.x},${scaledPoint.y}`;
          }).join(' L ')}`}
          stroke={colors.text}
          strokeWidth={2}
          fill="none"
        />
      )}

      {/* Axes */}
      <Line
        x1={PADDING}
        y1={height - PADDING}
        x2={width - PADDING}
        y2={height - PADDING}
        stroke={colors.textSecondary}
        strokeWidth={2}
      />
      <Line
        x1={PADDING}
        y1={PADDING}
        x2={PADDING}
        y2={height - PADDING}
        stroke={colors.textSecondary}
        strokeWidth={2}
      />
    </G>
  );
};

export default RegressionVisualization;